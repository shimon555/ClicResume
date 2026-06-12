/**
 * JSON Import/Export
 * Allows users to save/load CV data as JSON files.
 */

import { snapshot } from '../cv-data.js';

/**
 * Export CV data as a downloadable JSON file.
 * @param {object} data - The CV data (will be snapshotted)
 * @param {string} fileName - File name without extension
 */
export function exportJson(data, fileName = 'קורות-חיים') {
    const json = JSON.stringify(snapshot(data), null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Import CV data from a JSON file.
 * Opens a file picker and returns the parsed data.
 * @returns {Promise<object|null>} Parsed CV data or null if cancelled
 */
export function importJson() {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.style.display = 'none';

        input.addEventListener('change', () => {
            const file = input.files?.[0];
            if (!file) { resolve(null); return; }

            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result);
                    resolve(data);
                } catch {
                    alert('הקובץ אינו JSON תקין.');
                    resolve(null);
                }
            };
            reader.onerror = () => {
                alert('שגיאה בקריאת הקובץ.');
                resolve(null);
            };
            reader.readAsText(file);
        });

        input.addEventListener('cancel', () => resolve(null));
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
}
