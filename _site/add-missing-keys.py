#!/usr/bin/env python3

"""
Add missing translation keys that are used in index.md but not in translations.yml
"""

import yaml
from collections import OrderedDict

# Missing keys - use English for all languages (non-critical content)
MISSING_KEYS_EN = {
    'enterprise_performance_desc': 'Enterprise-scale performance with advanced caching, JVM tuning, and optimized resource utilization.',
    'testing_run_command': 'Run tests: ./gradlew test',
    'table_family_debian': 'Debian',
    'table_family_rhel': 'RHEL',
    'table_family_suse': 'SUSE',
    'compatibility_note': 'Note: SELinux enforcing mode is not currently supported. All distributions have been tested with SELinux in permissive mode or disabled.',
}

def load_yaml_ordered(filepath):
    """Load YAML while preserving order"""
    class OrderedLoader(yaml.SafeLoader):
        pass

    def construct_mapping(loader, node):
        loader.flatten_mapping(node)
        return OrderedDict(loader.construct_pairs(node))

    OrderedLoader.add_constructor(
        yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
        construct_mapping)

    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.load(f, OrderedLoader)

def save_yaml_ordered(data, filepath):
    """Save YAML while preserving order"""
    class OrderedDumper(yaml.SafeDumper):
        pass

    def _dict_representer(dumper, data):
        return dumper.represent_mapping(
            yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
            data.items())

    OrderedDumper.add_representer(OrderedDict, _dict_representer)

    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, Dumper=OrderedDumper,
                 allow_unicode=True, default_flow_style=False,
                 sort_keys=False, width=120)

def add_missing_keys(translations_path):
    """Add missing keys to all languages"""

    print("Loading translations...")
    translations = load_yaml_ordered(translations_path)

    keys_added = 0

    for lang_code, lang_data in translations.items():
        if not lang_data:
            continue

        for key, value in MISSING_KEYS_EN.items():
            if key not in lang_data:
                lang_data[key] = value
                print(f"  [{lang_code}] Added '{key}'")
                keys_added += 1

    print(f"\nAdded {keys_added} keys across all languages")

    print(f"Writing to {translations_path}...")
    save_yaml_ordered(translations, translations_path)
    print("✓ Missing keys added successfully!")

    return keys_added

if __name__ == '__main__':
    add_missing_keys('_data/translations.yml')
