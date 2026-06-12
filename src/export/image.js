/**
 * Image Export Module
 * Export CV as PNG or JPEG.
 */

/** Wait for fonts */
async function waitForFonts() {
    if (document.fonts?.ready) {
        try { await document.fonts.ready; } catch {}
    }
}

/** Prepare export clone (same logic as pdf.js) */
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
    if (root) { root.style.minHeight = 'auto'; root.style.height = 'auto'; }

    const holder = document.createElement('div');
    holder.className = 'pdf-workbench';
    holder.setAttribute('dir', 'ltr');
    holder.appendChild(clone);
    document.body.appendChild(holder);
    return { holder, clone, root };
}

function cssA4PageHeightPx() {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:210mm;height:297mm;inset:0 auto auto 0;';
    document.body.appendChild(probe);
    const h = probe.getBoundingClientRect().height;
    probe.remove();
    return h;
}

function lockCloneToA4Pages(clone, root) {
    const onePagePx = cssA4PageHeightPx();
    const contentPx = Math.max(clone.scrollHeight, root?.scrollHeight || 0);
    const pages = Math.max(1, Math.ceil((contentPx - 6) / onePagePx));
    const targetPx = Math.ceil(pages * onePagePx);
    clone.style.height = `${targetPx}px`;
    clone.style.minHeight = `${targetPx}px`;
    if (root) { root.style.minHeight = `${targetPx}px`; root.style.height = 'auto'; }
    return pages;
}

/**
 * Export CV as image (PNG or JPEG)
 * @param {string} type - 'png' or 'jpeg'
 * @param {string} fileName - File name without extension
 */
export async function exportImage(type = 'png', fileName = 'קורות-חיים') {
    await waitForFonts();
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const prepared = prepareExportClone();
    if (!prepared) throw new Error('לא נמצא אלמנט CV');

    try {
        lockCloneToA4Pages(prepared.clone, prepared.root);
        const canvas = await window.html2canvas(prepared.clone, {
            scale: 2.5,
            useCORS: true,
            allowTaint: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            scrollX: 0, scrollY: 0, x: 0, y: 0,
            width: prepared.clone.offsetWidth,
            height: prepared.clone.offsetHeight,
            windowWidth: prepared.clone.offsetWidth,
            windowHeight: prepared.clone.offsetHeight
        });

        const link = document.createElement('a');
        const mime = type === 'jpeg' ? 'image/jpeg' : 'image/png';
        link.download = `${fileName}.${type}`;
        link.href = canvas.toDataURL(mime, 0.98);
        link.click();
    } finally {
        prepared.holder.remove();
    }
}
