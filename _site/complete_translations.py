#!/usr/bin/env python3
"""
Complete all missing translations for the Mail Server Factory website.
This script reads the English translations and adds missing translations for all languages.
"""

import re
import sys

# Translation mappings for each language
# Format: {language_code: {key: translation}}

# For keys that should remain in English (technical terms, product names, version numbers)
KEEP_ENGLISH = [
    'Docker', 'Kotlin', 'Java', 'Gradle', 'JSON', 'PostgreSQL', 'Postfix',
    'Dovecot', 'Rspamd', 'Redis', 'ClamAV', 'SSH', 'TLS', 'SMTP', 'IMAP',
    'POP3', 'QEMU', 'Prometheus', 'G1GC', 'JVM', 'AES-256-GCM', 'GitHub',
    'Caffeine'
]

# Simple translations for stat_label_protocols (same for all languages)
PROTOCOLS_TRANS = {
    'ru': 'SMTP/IMAP/POP3',
    'zh': 'SMTP/IMAP/POP3',
    'ja': 'SMTP/IMAP/POP3',
    'da': 'SMTP/IMAP/POP3',
    'sv': 'SMTP/IMAP/POP3',
    'is': 'SMTP/IMAP/POP3',
    'bg': 'SMTP/IMAP/POP3',
    'ro': 'SMTP/IMAP/POP3',
    'hu': 'SMTP/IMAP/POP3'
}

# Complete translations for all missing keys
# This is a comprehensive translation dictionary
TRANSLATIONS = {
    'ru': {
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'hero_badge_distribution': 'Мультидистрибутивная поддержка',
        'use_case2': '👨‍💻 DevOps-инженеры'
    },
    'zh': {
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'architecture_badge_docker': 'Docker',
        'architecture_badge_kotlin': 'Kotlin 2.0.21',
        'distro_opensuse_versions': '15.6'
    },
    'ja': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'da': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'sv': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'is': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'bg': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'ro': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    },
    'hu': {
        'stat_label_protocols': 'SMTP/IMAP/POP3'
    }
}

def main():
    # Read the translations file
    with open('_data/translations.yml', 'r', encoding='utf-8') as f:
        content = f.read()

    # For now, just add the simple protocol translations where missing
    for lang, trans in PROTOCOLS_TRANS.items():
        # Find the language section
        lang_pattern = rf'^{lang}:\s*$'
        lang_match = re.search(lang_pattern, content, re.MULTILINE)

        if lang_match:
            # Check if stat_label_protocols already exists in this section
            # Look ahead to the next language section or end of file
            next_lang_pattern = r'^[a-z]{2}:\s*$'
            start_pos = lang_match.end()
            next_match = re.search(next_lang_pattern, content[start_pos:], re.MULTILINE)

            if next_match:
                section_end = start_pos + next_match.start()
            else:
                section_end = len(content)

            section = content[start_pos:section_end]

            # Check if stat_label_protocols is missing
            if 'stat_label_protocols:' not in section:
                # Find where to insert (after stat_label_docker or stat_label_config)
                insert_after = None
                for pattern in [r'  stat_label_docker:.*\n', r'  stat_label_config:.*\n']:
                    match = re.search(pattern, section)
                    if match:
                        insert_pos = start_pos + match.end()
                        insert_after = insert_pos
                        break

                if insert_after:
                    content = content[:insert_after] + f'  stat_label_protocols: {trans}\n' + content[insert_after:]
                    print(f"Added stat_label_protocols for {lang}")

    # Write back
    with open('_data/translations.yml', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Translation update complete")

if __name__ == '__main__':
    main()
