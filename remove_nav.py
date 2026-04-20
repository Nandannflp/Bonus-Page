import re

with open('src/components/LegacyLayout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific nav-right block
content = re.sub(
    r'<div class=\\"nav-right\\">.*?</nav>', 
    '<div class=\\"nav-right\\"></div>\\n        </nav>', 
    content, 
    flags=re.DOTALL
)

with open('src/components/LegacyLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
