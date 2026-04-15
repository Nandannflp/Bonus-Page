import re
import json

with open('legacy/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract only the body content
body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL | re.IGNORECASE)
if body_match:
    html = body_match.group(1)

# we just dump html directly into dangerouslySetInnerHTML to avoid ANY parsing errors!
safe_html = json.dumps(html)

jsx = f"""
import React from 'react';

export default function LegacyLayout() {{
  return (
    <div dangerouslySetInnerHTML={{{{ __html: {safe_html} }}}} />
  );
}}
"""

with open('src/components/LegacyLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

print("Converted successfully")
