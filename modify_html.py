import re

files = ['legacy/index.html', 'src/components/LegacyLayout.tsx']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove auth-overlay
    content = re.sub(r'(?s)<!-- ===== AUTH OVERLAY ===== -->.*?<!-- ===== MAIN APP ===== -->', '<!-- ===== MAIN APP ===== -->', content)
    
    # Remove user-menu
    content = re.sub(r'(?s)<div class="nav-right">.*?</nav>', '<div class="nav-right"></div>\n        </nav>', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
