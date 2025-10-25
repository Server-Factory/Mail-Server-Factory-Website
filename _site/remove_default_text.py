#!/usr/bin/env python3
"""
Remove default text from HTML elements with data-i18n attributes.
This ensures that all text comes from localization, not from hardcoded HTML.
"""

import re

def remove_default_text_from_html():
    with open('index.md', 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match elements with data-i18n that have content between tags
    # This is complex because we need to handle nested tags and various element types
    # For simplicity, let's target the most common patterns

    # Pattern 1: <tag data-i18n="key">text</tag>
    pattern1 = r'(<[a-zA-Z][^>]*data-i18n="[^"]*"[^>]*>)([^<]+)(</[a-zA-Z]+>)'
    content = re.sub(pattern1, r'\1\3', content)

    # Pattern 2: Handle self-closing tags or tags with attributes
    # This is trickier, but let's try a more specific approach

    # For elements that might have nested content, we need to be careful
    # Let's handle specific cases

    # Remove text from h1, h2, h3, h4, p, span, li, td, th, div with data-i18n
    patterns = [
        (r'(<h[1-6][^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</h[1-6]>)', r'\1\3'),
        (r'(<p[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</p>)', r'\1\3'),
        (r'(<span[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</span>)', r'\1\3'),
        (r'(<li[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</li>)', r'\1\3'),
        (r'(<td[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</td>)', r'\1\3'),
        (r'(<th[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</th>)', r'\1\3'),
        (r'(<div[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</div>)', r'\1\3'),
        (r'(<a[^>]*data-i18n="[^"]*"[^>]*>)([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)(</a>)', r'\1\3'),
    ]

    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

    # Handle pre and code blocks specially
    pre_pattern = r'(<pre[^>]*data-i18n="[^"]*"[^>]*>)(.*?)(</pre>)'
    content = re.sub(pre_pattern, r'\1\3', content, flags=re.MULTILINE | re.DOTALL)

    code_pattern = r'(<code[^>]*data-i18n="[^"]*"[^>]*>)(.*?)(</code>)'
    content = re.sub(code_pattern, r'\1\3', content, flags=re.MULTILINE | re.DOTALL)

    with open('index.md', 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ Removed default text from HTML elements with data-i18n attributes")

if __name__ == '__main__':
    remove_default_text_from_html()