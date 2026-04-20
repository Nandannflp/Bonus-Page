// --- Particle Background Animation ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;

function initParticles() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            color: `rgba(${Math.random()>0.5?'167, 139, 250':'99, 102, 241'}, ${Math.random()*0.3 + 0.1})`
        });
    }
}

function renderParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
            
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist/150)})`;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(renderParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
renderParticles();

// --- Confetti Effect (for unlocking) ---
const confCanvas = document.getElementById('confetti-canvas');
const confCtx = confCanvas.getContext('2d');
let confWidth, confHeight, confetti = [];

function resizeConfetti() {
    confWidth = confCanvas.width = window.innerWidth;
    confHeight = confCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function fireConfetti() {
    const wasEmpty = confetti.length === 0;
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: confWidth / 2,
            y: confHeight / 2 + 100,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * -10 - 5,
            radius: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    if (wasEmpty) requestAnimationFrame(renderConfetti);
}

function renderConfetti() {
    confCtx.clearRect(0, 0, confWidth, confHeight);
    let activeConfetti = [];
    
    for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.2; // gravity
        c.rotation += c.rotationSpeed;
        
        confCtx.save();
        confCtx.translate(c.x, c.y);
        confCtx.rotate((c.rotation * Math.PI) / 180);
        confCtx.fillStyle = c.color;
        confCtx.fillRect(-c.radius, -c.radius, c.radius*2, c.radius*2);
        confCtx.restore();
        
        if (c.y < confHeight + 20) activeConfetti.push(c);
    }
    confetti = activeConfetti;
    if (confetti.length > 0) {
        requestAnimationFrame(renderConfetti);
    }
}

// --- Toast System ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const msg = toast.querySelector('.toast-message');
    
    icon.textContent = type === 'success' ? '✅' : '❌';
    msg.textContent = message;
    
    toast.style.borderColor = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.classList.remove('hidden');
    
    // Trigger reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 3000);
}

// --- Secret Code Logic (Game State) ---
const SECRET_CODE_DAY1_B64 = "Sk9JTjAxMQ=="; // JOIN011
const SECRET_CODE_DAY2_B64 = "Qk9PTTAxMQ=="; // BOOM011

let day1Unlocked = false;
let day2Unlocked = false;

function updateUIState() {
    // Day 1
    const day1Content = document.getElementById('day1-content');
    const day1Wrap = document.getElementById('day1-code-wrap');
    const day1Status = document.getElementById('day1-status');
    
    if (day1Unlocked) {
        day1Content.classList.remove('blurred');
        day1Wrap.classList.add('hidden');
        day1Status.innerHTML = `<span class="status-dot unlocked"></span><span>Unlocked</span>`;
    } else {
        day1Content.classList.add('blurred');
        day1Wrap.classList.remove('hidden');
        day1Status.innerHTML = `<span class="status-dot locked"></span><span>Locked — Enter secret code to unlock</span>`;
    }
    
    // Day 2
    const day2Content = document.getElementById('day2-content');
    const day2Wrap = document.getElementById('day2-code-wrap');
    const day2Status = document.getElementById('day2-status');
    
    if (day2Unlocked) {
        day2Content.classList.remove('blurred');
        day2Wrap.classList.add('hidden');
        day2Status.innerHTML = `<span class="status-dot unlocked"></span><span>Unlocked</span>`;
    } else {
        day2Content.classList.add('blurred');
        day2Wrap.classList.remove('hidden');
        day2Status.innerHTML = `<span class="status-dot locked"></span><span>Locked — Enter secret code to unlock</span>`;
    }
    
    // Referral (Unlocked if Day 1 AND Day 2 are unlocked)
    const refContent = document.getElementById('referral-content');
    const refLocked = document.getElementById('referral-locked');
    const refStatus = document.getElementById('referral-status');
    const refLinkInput = document.getElementById('referral-link');
    
    if (day1Unlocked && day2Unlocked) {
        refContent.classList.remove('blurred');
        refLocked.classList.add('hidden');
        refStatus.innerHTML = `<span class="status-dot unlocked"></span><span>Vault Unlocked</span>`;
        refLinkInput.value = `https://bonuses.example.com/ref/${currentUser?.name || 'user'}123`;
    } else {
        refContent.classList.add('blurred');
        refLocked.classList.remove('hidden');
        refStatus.innerHTML = `<span class="status-dot locked"></span><span>Locked — Unlock Day 1 & Day 2 first</span>`;
    }
}

// Check Day 1 Code
document.getElementById('day1-code-btn').addEventListener('click', () => {
    const input = document.getElementById('day1-code').value.trim().toUpperCase();
    const errorMsg = document.getElementById('day1-error');
    const inputCard = document.querySelector('#day1-code-wrap .code-input-card');
    
    if (btoa(input) === SECRET_CODE_DAY1_B64) {
        day1Unlocked = true;
        errorMsg.classList.add('hidden');
        fireConfetti();
        showToast('Day 1 Bonuses Unlocked!');
        updateUIState();
    } else {
        errorMsg.classList.remove('hidden');
        inputCard.classList.add('shake');
        setTimeout(() => inputCard.classList.remove('shake'), 400);
    }
});

// Check Day 2 Code
document.getElementById('day2-code-btn').addEventListener('click', () => {
    const input = document.getElementById('day2-code').value.trim().toUpperCase();
    const errorMsg = document.getElementById('day2-error');
    const inputCard = document.querySelector('#day2-code-wrap .code-input-card');
    
    if (btoa(input) === SECRET_CODE_DAY2_B64) {
        day2Unlocked = true;
        errorMsg.classList.add('hidden');
        fireConfetti();
        showToast('Day 2 Bonuses Unlocked!');
        
        // If both unlocked, extra celebration for Vault
        if (day1Unlocked) {
            setTimeout(() => {
                fireConfetti();
                showToast('Treasure Vault Unlocked!', 'success');
            }, 1000);
        }
        updateUIState();
    } else {
        errorMsg.classList.remove('hidden');
        inputCard.classList.add('shake');
        setTimeout(() => inputCard.classList.remove('shake'), 400);
    }
});

// Allow Enter key to submit codes
document.getElementById('day1-code').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('day1-code-btn').click();
});
document.getElementById('day2-code').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('day2-code-btn').click();
});

// Copy Referral Link
document.getElementById('copy-link-btn').addEventListener('click', () => {
    const linkInput = document.getElementById('referral-link');
    linkInput.select();
    document.execCommand('copy');
    showToast('Referral link copied to clipboard!');
});

// Referral Form Submit
document.getElementById('referral-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const friendName = document.getElementById('ref-friend-name').value;
    showToast(`Invite sent successfully to ${friendName}!`);
    e.target.reset();
    
    // Simulate updating stats
    const currentRef = parseInt(document.getElementById('ref-count').textContent);
    document.getElementById('ref-count').textContent = currentRef + 1;
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.bonus-section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize UI State
updateUIState();
