const fs = require('fs');
let htmlContent = fs.readFileSync('legacy/index.html', 'utf-8');

const match = htmlContent.match(/(<!-- ===== PARTICLES BACKGROUND ===== -->.*?)<!-- Toast Notification -->/s);
if(match) {
    let snippet = match[1];
    
    snippet += "<!-- Toast Notification -->\n    <div class=\"toast hidden\" id=\"toast\">\n        <span class=\"toast-icon\"></span>\n        <span class=\"toast-message\"></span>\n    </div>\n\n    <!-- Confetti Canvas -->\n    <canvas id=\"confetti-canvas\"></canvas>\n\n";
    
    const cleanStr = JSON.stringify(snippet);

    const out = `import React from 'react';

export default function LegacyLayout() {
  return (
    <div dangerouslySetInnerHTML={{ __html: ${cleanStr} }} />
  );
}`;

    fs.writeFileSync('src/components/LegacyLayout.tsx', out);
    console.log('Fixed LegacyLayout!');
} else {
    console.log('Match failed');

}
