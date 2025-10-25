const { translate } = require('@vitalets/google-translate-api');

const text = process.argv[2];

const lang = process.argv[3];

translate(text, {to: lang}).then(res => console.log(res.text)).catch(err => console.error(err.message));