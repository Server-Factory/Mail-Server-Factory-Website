const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Offline Translation Manager for Mail Server Factory
 * Provides local/offline translation strategies when APIs are unavailable
 */

class OfflineTranslationManager {
    constructor() {
        this.translationDictionaries = {};
        this.batchQueue = [];
        this.status = {
            processed: 0,
            pending: 0,
            failed: 0
        };
    }

    /**
     * Load pre-built translation dictionaries
     */
    async loadDictionaries() {
        const dictDir = path.join(__dirname, 'translation-dictionaries');

        if (!fs.existsSync(dictDir)) {
            fs.mkdirSync(dictDir, { recursive: true });
            console.log('📁 Created translation dictionaries directory');
            return;
        }

        const files = fs.readdirSync(dictDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const lang = file.replace('.json', '');
            try {
                const content = fs.readFileSync(path.join(dictDir, file), 'utf8');
                this.translationDictionaries[lang] = JSON.parse(content);
                console.log(`📚 Loaded dictionary for ${lang}: ${Object.keys(this.translationDictionaries[lang]).length} entries`);
            } catch (error) {
                console.error(`❌ Failed to load dictionary for ${lang}:`, error.message);
            }
        }
    }

    /**
     * Get translation from local dictionary
     */
    getTranslation(key, targetLang) {
        if (!this.translationDictionaries[targetLang]) {
            return null;
        }

        return this.translationDictionaries[targetLang][key] || null;
    }

    /**
     * Add translation to batch queue for manual processing
     */
    addToBatchQueue(key, englishText, targetLang) {
        this.batchQueue.push({
            key,
            englishText,
            targetLang,
            timestamp: new Date().toISOString(),
            status: 'pending'
        });
        this.status.pending++;
    }

    /**
     * Process batch queue manually
     */
    async processBatchQueue() {
        if (this.batchQueue.length === 0) {
            console.log('📋 Batch queue is empty');
            return;
        }

        console.log(`📋 Processing ${this.batchQueue.length} pending translations...`);

        // Group by language for better organization
        const byLanguage = {};
        for (const item of this.batchQueue) {
            if (!byLanguage[item.targetLang]) {
                byLanguage[item.targetLang] = [];
            }
            byLanguage[item.targetLang].push(item);
        }

        // Create batch files for each language
        for (const [lang, items] of Object.entries(byLanguage)) {
            const batchFile = path.join(__dirname, `batch-${lang}-${Date.now()}.json`);
            fs.writeFileSync(batchFile, JSON.stringify(items, null, 2));
            console.log(`📄 Created batch file: ${batchFile} (${items.length} items)`);
        }

        console.log('✅ Batch files created. Please translate manually and use addTranslationsFromBatch()');
    }

    /**
     * Add translations from processed batch file
     */
    async addTranslationsFromBatch(batchFilePath, targetLang) {
        if (!fs.existsSync(batchFilePath)) {
            throw new Error(`Batch file not found: ${batchFilePath}`);
        }

        const batchData = JSON.parse(fs.readFileSync(batchFilePath, 'utf8'));

        if (!this.translationDictionaries[targetLang]) {
            this.translationDictionaries[targetLang] = {};
        }

        let added = 0;
        for (const item of batchData) {
            if (item.translatedText && item.translatedText.trim()) {
                this.translationDictionaries[targetLang][item.key] = item.translatedText.trim();
                added++;
                this.status.processed++;
                this.status.pending--;
            }
        }

        // Save updated dictionary
        this.saveDictionary(targetLang);

        console.log(`✅ Added ${added} translations for ${targetLang}`);
        return added;
    }

    /**
     * Save dictionary to file
     */
    saveDictionary(lang) {
        const dictDir = path.join(__dirname, 'translation-dictionaries');
        const filePath = path.join(dictDir, `${lang}.json`);

        fs.writeFileSync(filePath, JSON.stringify(this.translationDictionaries[lang], null, 2));
        console.log(`💾 Saved dictionary for ${lang}`);
    }

    /**
     * Generate fallback translations with markers
     */
    generateFallbackTranslation(key, englishText, targetLang) {
        return `[${targetLang.toUpperCase()}] ${englishText}`;
    }

    /**
     * Translate missing keys using available strategies
     */
    async translateMissingKeys(missingKeys, targetLang) {
        console.log(`🌍 Translating ${missingKeys.length} missing keys for ${targetLang}...`);

        const results = {
            translated: 0,
            fallback: 0,
            failed: 0
        };

        for (const key of missingKeys) {
            const englishText = this.getEnglishText(key);

            // Strategy 1: Local dictionary
            let translation = this.getTranslation(key, targetLang);

            if (translation) {
                results.translated++;
                continue;
            }

            // Strategy 2: Add to batch queue for manual processing
            this.addToBatchQueue(key, englishText, targetLang);
            translation = this.generateFallbackTranslation(key, englishText, targetLang);
            results.fallback++;

            // Update translations.yml with fallback
            this.updateTranslationFile(key, translation, targetLang);
        }

        console.log(`📊 Translation results for ${targetLang}:`, results);
        return results;
    }

    /**
     * Get English text for a key
     */
    getEnglishText(key) {
        // This would need to be implemented to extract from translations.yml
        // For now, return the key itself
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Update translations.yml with new translation
     */
    updateTranslationFile(key, translation, targetLang) {
        const filePath = path.join(__dirname, '_data/translations.yml');

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const data = yaml.load(content);

            if (!data[targetLang]) {
                data[targetLang] = {};
            }

            data[targetLang][key] = translation;

            const updatedContent = yaml.dump(data, {
                indent: 2,
                lineWidth: -1,
                noRefs: true
            });

            fs.writeFileSync(filePath, updatedContent);
            console.log(`✅ Updated ${key} for ${targetLang}`);

        } catch (error) {
            console.error(`❌ Failed to update translation file:`, error.message);
        }
    }

    /**
     * Get status report
     */
    getStatus() {
        return {
            ...this.status,
            dictionaries: Object.keys(this.translationDictionaries).length,
            batchQueueSize: this.batchQueue.length
        };
    }

    /**
     * Initialize the manager
     */
    async initialize() {
        await this.loadDictionaries();
        console.log('🚀 Offline Translation Manager initialized');
        console.log('📊 Status:', this.getStatus());
    }
}

// CLI interface
async function main() {
    const manager = new OfflineTranslationManager();
    await manager.initialize();

    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'process-batch':
            await manager.processBatchQueue();
            break;

        case 'add-batch':
            if (args.length < 3) {
                console.error('Usage: node offline-translation-manager.js add-batch <batch-file> <lang>');
                process.exit(1);
            }
            const batchFile = args[1];
            const lang = args[2];
            await manager.addTranslationsFromBatch(batchFile, lang);
            break;

        case 'status':
            console.log('📊 Translation Manager Status:');
            console.log(JSON.stringify(manager.getStatus(), null, 2));
            break;

        case 'translate-missing':
            if (args.length < 2) {
                console.error('Usage: node offline-translation-manager.js translate-missing <lang>');
                process.exit(1);
            }
            const targetLang = args[1];
            // This would need missing keys as input
            console.log('Please provide missing keys to translate');
            break;

        default:
            console.log('📖 Offline Translation Manager Commands:');
            console.log('  process-batch          Process pending translations into batch files');
            console.log('  add-batch <file> <lang> Add translations from processed batch file');
            console.log('  status                 Show current status');
            console.log('  translate-missing <lang> Translate missing keys for language');
            break;
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = OfflineTranslationManager;