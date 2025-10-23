const fs = require('fs');
const yaml = require('js-yaml');

function validateTranslations() {
    try {
        const fileContents = fs.readFileSync('_data/translations.yml', 'utf8');
        const translations = yaml.load(fileContents);

        const languages = Object.keys(translations);
        const englishKeys = Object.keys(translations.en);

        console.log(`Found ${languages.length} languages: ${languages.join(', ')}`);
        console.log(`English has ${englishKeys.length} keys`);

        let allValid = true;
        const issues = [];

        languages.forEach(lang => {
            if (lang === 'en') return;

            const langKeys = Object.keys(translations[lang]);
            const missingKeys = englishKeys.filter(key => !langKeys.includes(key));
            const extraKeys = langKeys.filter(key => !englishKeys.includes(key));

            if (missingKeys.length > 0) {
                issues.push(`${lang}: Missing keys: ${missingKeys.join(', ')}`);
                allValid = false;
            }

            if (extraKeys.length > 0) {
                issues.push(`${lang}: Extra keys: ${extraKeys.join(', ')}`);
                allValid = false;
            }

            // Check for untranslated content
            const technicalKeys = ['stat_label_protocols', 'architecture_badge_kotlin', 'architecture_badge_java', 'architecture_badge_gradle', 'architecture_badge_docker', 'architecture_badge_ssh', 'architecture_badge_json'];
            englishKeys.forEach(key => {
                if (!technicalKeys.includes(key) && translations[lang][key] === translations.en[key]) {
                    issues.push(`${lang}: Key '${key}' is not translated (same as English)`);
                    allValid = false;
                }

                // Check for English words in translation
                const englishWords = ['and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall', 'this', 'that', 'these', 'those', 'here', 'there', 'where', 'when', 'why', 'how', 'what', 'which', 'who', 'Download', 'View', 'Like', 'Boss', 'Run', 'Your', 'Enterprise', 'Grade', 'Automated', 'Installation', 'Comprehensive', 'Testing', 'Multi', 'Distribution', 'Why', 'Factory', 'Features', 'without', 'complexity', 'Zero', 'Touch', 'Deployment', 'Docker', 'Native', 'Security', 'Built', 'In', 'Battle', 'Tested', 'Code', 'SSH', 'Based', 'Remote', 'Execution', 'Complete', 'Stack', 'Advanced', 'Monitoring', 'Observability', 'Configuration', 'Management', 'Performance', 'Optimization', 'Technology', 'Powered', 'industry', 'leading', 'open', 'source', 'technologies', 'Enterprise', 'Architecture', 'Multi', 'layered', 'architecture', 'designed', 'scalability', 'How', 'It', 'Works', 'Three', 'simple', 'steps', 'your', 'production', 'Configure', 'Deploy', 'Use', 'Quick', 'Start', 'Quality', 'Testing', 'comprehensive', 'test', 'coverage', 'ensures', 'reliability', 'Distribution', 'Support', 'Matrix', 'Deploy', 'latest', 'modern', 'Linux', 'distributions', 'Launcher', 'production', 'ready', 'bash', 'wrapper', 'grade', 'error', 'handling', 'Who', 'Uses', 'Documentation', 'Resources', 'Ready', 'deploy', 'Join', 'community', 'take', 'control', 'email', 'infrastructure', 'today', 'Open', 'source', 'Free', 'forever', 'Community', 'supported'];

                const text = translations[lang][key].toLowerCase();
                const words = text.split(/\s+/);
                const foundEnglish = words.filter(word => {
                    const cleanWord = word.replace(/[^\w]/g, '');
                    return englishWords.includes(cleanWord) && cleanWord.length > 2;
                });

                if (foundEnglish.length > 0) {
                    issues.push(`${lang}: Key '${key}' contains English words: ${foundEnglish.join(', ')}`);
                    allValid = false;
                }
            });
        });

        if (allValid) {
            console.log('✅ All translations are valid!');
        } else {
            console.log('❌ Translation issues found:');
            issues.forEach(issue => console.log(`  - ${issue}`));
        }

        return allValid;
    } catch (error) {
        console.error('Error validating translations:', error);
        return false;
    }
}

if (require.main === module) {
    validateTranslations();
}

module.exports = validateTranslations;