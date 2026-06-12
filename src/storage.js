/**
 * Storage Module
 * Handles localStorage persistence for CV drafts.
 */

const STORAGE_KEY = 'clicresume-hebrew-cv-draft-v3';

export function saveDraft(snapshot) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
        return true;
    } catch {
        return false;
    }
}

export function loadDraft() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function clearDraft() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch {
        return false;
    }
}

/** Attempt to migrate from v2 storage key */
export function migrateFromV2() {
    const V2_KEY = 'clicresume-hebrew-cv-draft-v2';
    try {
        const raw = localStorage.getItem(V2_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        // Add missing fields with defaults
        if (!data.military) data.military = [];
        if (!data.volunteering) data.volunteering = [];
        if (!data.projects) data.projects = [];
        if (!data.certifications) data.certifications = [];
        if (!data.settings?.sectionOrder) {
            data.settings = data.settings || {};
            data.settings.sectionOrder = ['about', 'experience', 'education', 'skills', 'languages'];
            data.settings.visibleSections = ['about', 'experience', 'education', 'skills', 'languages'];
        }
        // Save to new key and remove old
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.removeItem(V2_KEY);
        return data;
    } catch {
        return null;
    }
}
