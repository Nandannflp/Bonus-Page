with open('public/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Instead of blindly wrapping, let's replace document.addEventListener('DOMContentLoaded', ...) 
# with our polling init function if it's there. 
# Also all the global variable initializations like:
# const canvas = document.getElementById('particles-canvas');
# ctx = canvas.getContext('2d');
# should be moved inside a function.

# Let's just wrap the WHOLE file in a function `initApp()` and call it defensively.

if "function bootstrapLegacyApp()" not in js:
    # We must replace `document.addEventListener('DOMContentLoaded', () => {` with `() => {` so it executes synchronously inside our wrapper if needed, or better yet, just leave it because DOMContentLoaded will NOT fire again if missed. 
    # Actually, if we just wrap the whole code block in:
    '''
    function bootstrapLegacyApp() {
        const checkCanvas = document.getElementById('particles-canvas');
        if (!checkCanvas) {
            setTimeout(bootstrapLegacyApp, 100);
            return;
        }
        if (window.legacyAppInitialized) return;
        window.legacyAppInitialized = true;
        
        // original script
        ...
        
        // manually dispatch DOMContentLoaded to trigger inner listeners if any
        window.dispatchEvent(new Event('DOMContentLoaded'));
    }
    bootstrapLegacyApp();
    '''
    
    js = js.replace("document.addEventListener('DOMContentLoaded', () => {", "// auto-run instead\n(() => {")
    # There's also `window.addEventListener('scroll', ...)` and similar, those are fine.
    
    new_js = """
// Script robustly waits for React DOM to mount
function bootstrapLegacyApp() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) {
        // Retry until React mounts the element
        setTimeout(bootstrapLegacyApp, 100);
        return;
    }
    // Prevent double init
    if (window.legacyAppInitialized) return;
    window.legacyAppInitialized = true;

""" + js + """
}
// Start polling immediately when script loads
bootstrapLegacyApp();
"""
    with open('public/app.js', 'w', encoding='utf-8') as f:
        f.write(new_js)
    with open('legacy/app.js', 'w', encoding='utf-8') as f:
        f.write(new_js)
