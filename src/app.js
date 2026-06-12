/**
 * Main Application Module
 * Registers the Alpine.js cvApp component with all state and methods.
 */

import { createEmptyCV, snapshot, restoreSnapshot, hasCvContent, COLOR_MAP } from './cv-data.js';
import { SECTION_DEFS, ALL_SECTION_IDS, DEFAULT_ORDER, DEFAULT_VISIBLE } from './sections.js';
import { saveDraft, loadDraft, migrateFromV2 } from './storage.js';
import { track } from './analytics.js';
import { renderCV } from './templates/index.js';
import { exportPdf, printPdf, getPageCount } from './export/pdf.js';
import { exportImage } from './export/image.js';
import { exportJson, importJson } from './export/json-io.js';
import { validate, getTips, getRandomTip } from './writing-tips.js';
import { initDragSort, moveSection } from './drag-sort.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('cvApp', () => {
        const empty = createEmptyCV();

        return {
            // --- UI State ---
            activeTab: 'edit',
            demoMenuOpen: false,
            fullPreview: false,
            isDesktop: window.innerWidth >= 1024,
            saveStatus: '',
            exportStatus: '',
            pageCount: 1,
            analyticsDraftStarted: false,
            analyticsCvCreated: false,
            autosaveTimer: null,
            showTips: false,
            currentTipSection: '',
            currentTip: '',
            validationIssues: [],
            sectionManagerOpen: false,
            renderedCV: '',

            // --- Data ---
            ...empty,
            colorMap: COLOR_MAP,
            sectionDefs: SECTION_DEFS,
            allSectionIds: ALL_SECTION_IDS,

            // --- Computed ---
            get exportFileName() {
                const clean = (this.personal.name || 'קורות-חיים').replace(/[\\/:*?"<>|]+/g, '-').trim();
                return clean || 'קורות-חיים';
            },
            get longContentMessage() {
                if (this.pageCount <= 1) return '';
                return `התוכן צפוי להתפרס על ${this.pageCount} עמודי A4. הייצוא יתאים את הגובה אוטומטית.`;
            },

            // --- Template Rendering ---
            updateRenderedCV() {
                const data = {
                    personal: this.personal,
                    experience: this.experience,
                    education: this.education,
                    military: this.military,
                    volunteering: this.volunteering,
                    projects: this.projects,
                    certifications: this.certifications,
                    skills: this.skills,
                    languages: this.languages,
                    settings: this.settings
                };
                this.renderedCV = renderCV(this.settings.theme, data);
            },

            // --- Section Management ---
            isSectionVisible(id) {
                return this.settings.visibleSections.includes(id);
            },
            toggleSection(id) {
                const idx = this.settings.visibleSections.indexOf(id);
                if (idx >= 0) {
                    this.settings.visibleSections.splice(idx, 1);
                } else {
                    this.settings.visibleSections.push(id);
                    // Also add to order if not there
                    if (!this.settings.sectionOrder.includes(id)) {
                        this.settings.sectionOrder.push(id);
                    }
                }
            },
            moveSectionUp(id) {
                this.settings.sectionOrder = moveSection(this.settings.sectionOrder, id, 'up');
            },
            moveSectionDown(id) {
                this.settings.sectionOrder = moveSection(this.settings.sectionOrder, id, 'down');
            },
            get orderedVisibleSections() {
                const order = this.settings.sectionOrder;
                const visible = new Set(this.settings.visibleSections);
                const result = [];
                for (const id of order) {
                    if (visible.has(id) && SECTION_DEFS[id] && SECTION_DEFS[id].type === 'list') {
                        result.push(id);
                    }
                }
                return result;
            },

            // --- List Section Actions (generic) ---
            addItem(sectionId) {
                const def = SECTION_DEFS[sectionId];
                if (!def || def.type !== 'list') return;
                this[sectionId].push({ ...def.itemDefaults });
            },
            removeItem(sectionId, index) {
                this[sectionId].splice(index, 1);
            },

            // --- Skills ---
            skillsInput: '',
            updateSkills() {
                this.skills = this.skillsInput.split(',').map(s => s.trim()).filter(Boolean);
            },

            // --- Languages ---
            addLanguage() { this.languages.push({ name: '', level: '' }); },
            removeLanguage(i) { this.languages.splice(i, 1); },

            // --- Storage ---
            doSaveDraft(manual = true) {
                const data = this._snapshot();
                const ok = saveDraft(data);
                if (manual) track('draft_saved');
                if (manual) this.flashSaveStatus(ok ? 'הטיוטה נשמרה בדפדפן הזה בלבד' : 'לא ניתן היה לשמור את הטיוטה');
            },
            doLoadDraft() {
                const data = loadDraft();
                if (!data) {
                    this.flashSaveStatus('לא נמצאה טיוטה שמורה');
                    return;
                }
                restoreSnapshot(this, data);
                this.skillsInput = this.skills.join(', ');
                this.flashSaveStatus('הטיוטה נטענה מהדפדפן המקומי');
                this.$nextTick(() => { this.updateRenderedCV(); this.updatePageInfo(); });
            },
            flashSaveStatus(message) {
                this.saveStatus = message;
                clearTimeout(this._saveStatusTimer);
                this._saveStatusTimer = setTimeout(() => { this.saveStatus = ''; }, 2800);
            },
            queueAutosave() {
                clearTimeout(this.autosaveTimer);
                this.autosaveTimer = setTimeout(() => this.doSaveDraft(false), 650);
            },

            // --- Export ---
            async doPrintCV() {
                this.activeTab = 'preview';
                this.exportStatus = 'מכין PDF איכותי...';
                try {
                    await this.$nextTick();
                    const pages = await exportPdf(this.exportFileName);
                    this.pageCount = pages;
                    this._trackCvCreated('pdf');
                } catch (err) {
                    console.error(err);
                    alert('הייצוא נכשל. נסו להפחית מעט תוכן או לבחור תבנית קומפקטית יותר.');
                } finally {
                    this.exportStatus = '';
                }
            },
            async doExportImage(type = 'png') {
                this.exportStatus = `מכין ${type.toUpperCase()}...`;
                try {
                    await exportImage(type, this.exportFileName);
                    this._trackCvCreated(type);
                } catch (err) {
                    console.error(err);
                    alert('ייצוא התמונה נכשל. נסו שוב או בחרו PDF.');
                } finally {
                    this.exportStatus = '';
                }
            },
            doPrintTextPdf() {
                printPdf();
            },
            doExportJson() {
                const data = this._snapshot();
                exportJson({ ...this, settings: data.settings }, this.exportFileName);
                track('json_exported');
            },
            async doImportJson() {
                const data = await importJson();
                if (data) {
                    restoreSnapshot(this, data);
                    this.skillsInput = this.skills.join(', ');
                    this.$nextTick(() => { this.updateRenderedCV(); this.updatePageInfo(); });
                    this.flashSaveStatus('קורות חיים נטענו מקובץ JSON');
                    track('json_imported');
                }
            },

            // --- Demos ---
            demos: {},
            async loadDemos() {
                const demoFiles = ['data-scientist', 'marketing', 'nurse', 'accountant'];
                for (const name of demoFiles) {
                    try {
                        const resp = await fetch(`demos/${name}.json`);
                        if (resp.ok) this.demos[name] = await resp.json();
                    } catch {}
                }
            },
            loadDemo(key) {
                const d = this.demos[key];
                if (!d) return;
                restoreSnapshot(this, d);
                this.skillsInput = this.skills.join(', ');
                this.demoMenuOpen = false;
                track('demo_loaded', { demo: key });
                this.$nextTick(() => { this.updateRenderedCV(); this.updatePageInfo(); });
            },

            // --- Validation & Tips ---
            runValidation() {
                const data = {
                    personal: this.personal,
                    experience: this.experience,
                    education: this.education,
                    military: this.military,
                    skills: this.skills,
                    languages: this.languages
                };
                this.validationIssues = validate(data);
            },
            showSectionTip(sectionId) {
                const tip = getRandomTip(sectionId);
                if (tip) {
                    this.currentTipSection = SECTION_DEFS[sectionId]?.label || sectionId;
                    this.currentTip = tip;
                    this.showTips = true;
                }
            },
            hideTip() {
                this.showTips = false;
            },

            // --- Clear ---
            clearData() {
                const empty = createEmptyCV();
                Object.assign(this, empty);
                this.skillsInput = '';
                this.analyticsDraftStarted = false;
                this.analyticsCvCreated = false;
                track('draft_cleared');
                this.$nextTick(() => { this.updateRenderedCV(); this.updatePageInfo(); });
            },

            // --- Page Info ---
            updatePageInfo() {
                this.$nextTick(() => {
                    this.pageCount = getPageCount();
                });
            },

            // --- Analytics helpers ---
            _trackDraftStarted() {
                if (this.analyticsDraftStarted || !hasCvContent(this)) return;
                this.analyticsDraftStarted = true;
                track('cv_started', { theme: this.settings.theme, color: this.settings.color });
            },
            _trackCvCreated(format) {
                if (!this.analyticsCvCreated) {
                    this.analyticsCvCreated = true;
                    track('cv_created', { theme: this.settings.theme, color: this.settings.color });
                }
                track('cv_exported', { format, theme: this.settings.theme, color: this.settings.color });
            },

            // --- Snapshot helper ---
            _snapshot() {
                return snapshot(this);
            },

            // --- Init ---
            init() {
                track('page_view');

                // Try to load saved draft (v3 or migrate from v2)
                let saved = loadDraft();
                if (!saved) saved = migrateFromV2();

                if (saved) {
                    restoreSnapshot(this, saved);
                    this.skillsInput = this.skills.join(', ');
                    this.saveStatus = 'נטענה טיוטה מקומית אחרונה';
                    setTimeout(() => { this.saveStatus = ''; }, 2400);
                }

                // Load demo data
                this.loadDemos();

                // Resize handler
                this._resizeHandler = () => {
                    this.isDesktop = window.innerWidth >= 1024;
                    this.updatePageInfo();
                };
                window.addEventListener('resize', this._resizeHandler);

                // Watch for changes → autosave + re-render
                this.$watch(
                    () => JSON.stringify({
                        settings: this.settings,
                        personal: this.personal,
                        experience: this.experience,
                        education: this.education,
                        military: this.military,
                        volunteering: this.volunteering,
                        projects: this.projects,
                        certifications: this.certifications,
                        skillsInput: this.skillsInput,
                        languages: this.languages
                    }),
                    () => {
                        this.queueAutosave();
                        this._trackDraftStarted();
                        this.updateRenderedCV();
                        this.updatePageInfo();
                    }
                );

                // Init drag sort after DOM ready
                this.$nextTick(() => {
                    this.updateRenderedCV();
                    this.updatePageInfo();
                    const sortContainer = document.getElementById('section-sort-list');
                    if (sortContainer) {
                        initDragSort(sortContainer, (newOrder) => {
                            this.settings.sectionOrder = newOrder;
                        });
                    }
                });
            }
        };
    });
});
