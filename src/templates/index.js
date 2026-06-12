/**
 * Template Registry
 * Imports all templates and provides a unified render interface.
 */

import { render as renderModern } from './modern.js';
import { render as renderClassic } from './classic.js';
import { render as renderMinimal } from './minimal.js';
import { render as renderBanner } from './banner.js';
import { render as renderExecutive } from './executive.js';
import { render as renderCompact } from './compact.js';

const templates = {
    modern: renderModern,
    classic: renderClassic,
    minimal: renderMinimal,
    banner: renderBanner,
    executive: renderExecutive,
    compact: renderCompact
};

/**
 * Render CV HTML for the given theme.
 * @param {string} theme - Template name
 * @param {object} data - Full CV data object
 * @returns {string} HTML string
 */
export function renderCV(theme, data) {
    const fn = templates[theme] || templates.modern;
    return fn(data);
}

export const TEMPLATE_IDS = Object.keys(templates);
