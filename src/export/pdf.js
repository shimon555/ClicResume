/**
 * PDF Export Module
 * High-quality PDF export using html2canvas + jsPDF.
 * Also supports browser print for ATS-friendly text PDF.
 */

/** Wait for all fonts to be loaded */
async function waitForFonts() {
    if (document.fonts?.ready) {
        try { await document.fonts.ready; } catch {}
    }
}

/** Measure A4 page height in CSS pixels */
function cssA4PageHeightPx() {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:210mm;height:297mm;inset:0 auto auto 0;';
    document.body.appendChild(probe);
    const height = probe.getBoundingClientRect().height;
    probe.remove();
    return height;
}

/** Prepare a clean clone of the CV for export */
function prepareExportClone() {
    const source = document.querySelector('.cv-page');
    if (!source) return null;

    const clone = source.cloneNode(true);
    clone.classList.add('exporting-cv');
    clone.setAttribute('dir', 'rtl');
    clone.style.width = '210mm';
    clone.style.minHeight = 'auto';
    clone.style.height = 'auto';
    clone.style.boxShadow = 'none';
    clone.style.transform = 'none';
    clone.style.position = 'relative';
    clone.style.left = '0';
    clone.style.top = '0';

    clone.querySelectorAll('.screen-only-footer, .a4-page-guide').forEach(el => el.remove());

    [clone, ...clone.querySelectorAll('*')].forEach(el => {
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
    });

    const root = clone.querySelector(':scope > div');
    if (root) {
        root.style.minHeight = 'auto';
        root.style.height = 'auto';
    }

    const holder = document.createElement('div');
    holder.className = 'pdf-workbench';
    holder.setAttribute('dir', 'ltr');
    holder.appendChild(clone);
    document.body.appendChild(holder);

    return { holder, clone, root };
}

/** Lock clone height to exact A4 pages */
function lockCloneToA4Pages(clone, root) {
    const onePagePx = cssA4PageHeightPx();
    const contentPx = Math.max(clone.scrollHeight, root?.scrollHeight || 0);
    const pages = Math.max(1, Math.ceil((contentPx - 6) / onePagePx));
    const targetPx = Math.ceil(pages * onePagePx);
    clone.style.height = `${targetPx}px`;
    clone.style.minHeight = `${targetPx}px`;
    if (root) {
        root.style.minHeight = `${targetPx}px`;
        root.style.height = 'auto';
    }
    return pages;
}

/** Render export canvas */
async function renderExportCanvas(clone) {
    return window.html2canvas(clone, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        letterRendering: true,
        backgroundColor: '#ffffff',
        scrollX: 0, scrollY: 0, x: 0, y: 0,
        width: clone.offsetWidth,
        height: clone.offsetHeight,
        windowWidth: clone.offsetWidth,
        windowHeight: clone.offsetHeight
    });
}

/** Score how much "ink" is on a horizontal band of pixels */
function rowInkScore(ctx, canvas, y, band = 6) {
    const startY = Math.max(0, Math.min(canvas.height - 1, Math.round(y - band / 2)));
    const height = Math.max(1, Math.min(band, canvas.height - startY));
    const data = ctx.getImageData(0, startY, canvas.width, height).data;
    let ink = 0;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 10 && (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245)) ink++;
    }
    return ink / (canvas.width * height);
}

/** Find the best page break point (least ink) */
function findSmartCut(ctx, canvas, startY, desiredEndY, onePageContentPx) {
    const minSlice = Math.round(onePageContentPx * 0.55);
    const minY = Math.min(canvas.height, startY + minSlice);
    const maxY = Math.min(canvas.height, desiredEndY + Math.round(canvas.width * 0.22));
    const searchStart = Math.max(minY, desiredEndY - Math.round(canvas.width * 0.18));

    let bestY = Math.min(canvas.height, desiredEndY);
    let bestScore = Infinity;

    for (let y = searchStart; y <= maxY; y += 8) {
        const score = rowInkScore(ctx, canvas, y, 10) + Math.abs(y - desiredEndY) / canvas.width * 0.03;
        if (score < bestScore) {
            bestScore = score;
            bestY = y;
        }
    }
    return Math.max(minY, Math.min(canvas.height, bestY));
}

/** Convert canvas to paged PDF */
function canvasToPagedPdf(canvas, fileName, marginsMm = { top: 0, bottom: 0 }) {
    const jsPDFCtor = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDFCtor) throw new Error('jsPDF לא נטען בדפדפן');

    const pdf = new jsPDFCtor({
        orientation: 'portrait', unit: 'mm', format: 'a4',
        compress: true, putOnlyUsedFonts: true
    });

    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const topMm = marginsMm.top;
    const bottomMm = marginsMm.bottom;
    const usableHeightMm = pageHeightMm - topMm - bottomMm;
    const exportingEl = document.querySelector('.exporting-cv');
    const canvasScale = canvas.width / (exportingEl?.offsetWidth || canvas.width);
    const usableHeightPx = Math.round(cssA4PageHeightPx() * canvasScale);
    const sourceCtx = canvas.getContext('2d', { willReadFrequently: true });
    const plannedPages = Math.max(1, Math.ceil((canvas.height - 18) / usableHeightPx));
    const slices = [];
    let sourceY = 0;

    while (sourceY < canvas.height - 2 && slices.length < plannedPages) {
        const isLastPage = slices.length === plannedPages - 1;
        const desiredEndY = Math.min(canvas.height, sourceY + usableHeightPx);
        const remainingAfter = plannedPages - slices.length - 1;
        const minCut = canvas.height - (remainingAfter * usableHeightPx);
        let cutY = isLastPage ? canvas.height : findSmartCut(sourceCtx, canvas, sourceY, desiredEndY, usableHeightPx);
        cutY = isLastPage ? canvas.height : Math.max(cutY, minCut);
        cutY = Math.min(cutY, canvas.height);
        slices.push({ sourceY, sliceHeight: Math.max(1, cutY - sourceY) });
        sourceY = cutY;
    }

    slices.forEach((slice, page) => {
        if (page > 0) pdf.addPage('a4', 'portrait');
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = slice.sliceHeight;
        const ctx = pageCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, slice.sourceY, canvas.width, slice.sliceHeight, 0, 0, canvas.width, slice.sliceHeight);
        const imgData = pageCanvas.toDataURL('image/jpeg', 0.99);
        const sliceHMm = Math.min(usableHeightMm, slice.sliceHeight / usableHeightPx * usableHeightMm);
        pdf.addImage(imgData, 'JPEG', 0, topMm, pageWidthMm, sliceHMm, undefined, 'FAST');
    });

    pdf.save(`${fileName}.pdf`);
    return slices.length;
}

/**
 * Export CV as high-quality PDF (image-based)
 * @param {string} fileName - File name without extension
 * @returns {Promise<number>} Number of pages
 */
export async function exportPdf(fileName = 'קורות-חיים') {
    await waitForFonts();
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const prepared = prepareExportClone();
    if (!prepared) throw new Error('לא נמצא אלמנט CV');

    try {
        const pages = lockCloneToA4Pages(prepared.clone, prepared.root);
        const canvas = await renderExportCanvas(prepared.clone);
        return canvasToPagedPdf(canvas, fileName);
    } finally {
        prepared.holder.remove();
    }
}

/**
 * Print-based export for ATS-friendly PDF with selectable text.
 * Opens the browser's print dialog.
 */
export function printPdf() {
    window.print();
}

/**
 * Calculate current page count
 */
export function getPageCount() {
    const page = document.querySelector('.cv-page');
    if (!page) return 1;
    const root = page.querySelector(':scope > div');
    const onePagePx = cssA4PageHeightPx();
    const contentPx = Math.max(page.scrollHeight, root?.scrollHeight || 0);
    return Math.max(1, Math.ceil((contentPx - 6) / onePagePx));
}
