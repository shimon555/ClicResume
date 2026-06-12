/**
 * Drag & Drop Section Ordering
 * Lightweight drag-to-reorder for the section list in the editor.
 * Uses HTML5 Drag and Drop API.
 */

/**
 * Initialize drag-sort on a container.
 * @param {HTMLElement} container - The list container
 * @param {Function} onReorder - Callback with new order array: (newOrder: string[]) => void
 */
export function initDragSort(container, onReorder) {
    if (!container) return;

    let draggedId = null;
    let draggedEl = null;

    container.addEventListener('dragstart', (e) => {
        const item = e.target.closest('[data-section-id]');
        if (!item) return;
        draggedId = item.dataset.sectionId;
        draggedEl = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggedId);
    });

    container.addEventListener('dragend', (e) => {
        if (draggedEl) {
            draggedEl.classList.remove('dragging');
        }
        draggedId = null;
        draggedEl = null;
        // Remove all drag-over indicators
        container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const target = e.target.closest('[data-section-id]');
        if (!target || target === draggedEl) return;

        // Remove previous indicators
        container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        target.classList.add('drag-over');
    });

    container.addEventListener('dragleave', (e) => {
        const target = e.target.closest('[data-section-id]');
        if (target) target.classList.remove('drag-over');
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target.closest('[data-section-id]');
        if (!target || !draggedId || target.dataset.sectionId === draggedId) return;

        // Collect current order
        const items = [...container.querySelectorAll('[data-section-id]')];
        const order = items.map(el => el.dataset.sectionId);
        const fromIdx = order.indexOf(draggedId);
        const toIdx = order.indexOf(target.dataset.sectionId);

        if (fromIdx === -1 || toIdx === -1) return;

        // Move item
        order.splice(fromIdx, 1);
        order.splice(toIdx, 0, draggedId);

        // Remove indicators
        container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));

        onReorder(order);
    });
}

/**
 * Move a section up or down (keyboard/button alternative to drag).
 * @param {string[]} order - Current order
 * @param {string} sectionId - Section to move
 * @param {'up' | 'down'} direction
 * @returns {string[]} New order
 */
export function moveSection(order, sectionId, direction) {
    const idx = order.indexOf(sectionId);
    if (idx === -1) return order;

    const newOrder = [...order];
    if (direction === 'up' && idx > 0) {
        [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    } else if (direction === 'down' && idx < newOrder.length - 1) {
        [newOrder[idx + 1], newOrder[idx]] = [newOrder[idx], newOrder[idx + 1]];
    }
    return newOrder;
}
