const fs = require('fs');
const yaml = require('js-yaml');

// Read the YAML file
const translations = yaml.load(fs.readFileSync('_data/translations.yml', 'utf8'));

// Convert to JavaScript object format
let jsContent = '// This file is auto-generated from _data/translations.yml\n';
jsContent += 'window.siteTranslations = {\n';

const languages = Object.keys(translations);
languages.forEach((lang, langIndex) => {
  jsContent += `  "${lang}": {\n`;

  const keys = Object.keys(translations[lang]);
  keys.forEach((key, keyIndex) => {
    let value = translations[lang][key];
    // Handle non-string values
    if (value === null || value === undefined) {
      value = '';
    } else if (typeof value !== 'string') {
      value = String(value);
    }
    // Escape quotes and handle special characters
    value = value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    jsContent += `    "${key}": "${value}"`;

    if (keyIndex < keys.length - 1) {
      jsContent += ',';
    }
    jsContent += '\n';
  });

  jsContent += '  }';
  if (langIndex < languages.length - 1) {
    jsContent += ',';
  }
  jsContent += '\n';
});

jsContent += '};\n';

// Write to file
fs.writeFileSync('assets/js/translations.js', jsContent, 'utf8');

console.log('Generated translations.js successfully');