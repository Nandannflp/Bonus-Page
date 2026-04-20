import re

with open('legacy/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the replacements mapping
replacements = [
    (r'<span class="badge-icon">🌅</span>', '<img src="/day1.png" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;" alt="Day 1 Logo" />'),
    (r'<span class="badge-icon">🌄</span>', '<img src="/day2.png" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;" alt="Day 2 Logo" />'),
    (r'<span class="badge-icon">💎</span>', '<img src="/diamond.png" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;" alt="Referral Logo" />'),
    (r'<div class="code-icon">🔐</div>', '<div class="code-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#lock-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>'),
    (r'<span class="chest-icon">🏆</span>', '<span class="chest-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #fbbf24;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></span>'),
    (r'<h3 style="margin-bottom: 20px; font-size: 1.4rem; color: #fbbf24; text-align: center;">🚀 Your\n                        Referral Goal Progress</h3>', '<h3 style="margin-bottom: 20px; font-size: 1.4rem; color: #fbbf24; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #fbbf24;"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg> Your Referral Goal Progress</h3>'),
    (r'<div class="tier-medal">🥉</div>', '<div class="tier-medal"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b08d57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></div>'),
    (r'<div class="tier-medal">🥈</div>', '<div class="tier-medal"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg></div>'),
    (r'<div class="tier-medal">💎</div>', '<div class="tier-medal"><img src="/diamond.png" style="width: 42px; height: 42px; object-fit: cover; filter: drop-shadow(0 0 10px rgba(236,72,153,0.5));" alt="Diamond Modal" /></div>'),
    (r'<h3>💎 Vault Ultimate Bonanza</h3>', '<h3 style="display: flex; align-items: center; gap: 10px;"><img src="/diamond.png" style="width: 32px; height: 32px; object-fit: cover;" alt="Diamond" /> Vault Ultimate Bonanza</h3>'),
    (r'style="background: rgba\(236, 72, 153, 0.15\); color: #f472b6; border-color: rgba\(236, 72, 153, 0.3\);">💎\n                                20\+ Referrals</span>', 'style="background: rgba(236, 72, 153, 0.15); color: #f472b6; border-color: rgba(236, 72, 153, 0.3);"><img src="/diamond.png" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;" alt="Diamond" />\n                                20+ Referrals</span>'),
    (r'<div class="hero-badge">🎁 EXCLUSIVE ACCESS</div>', '<div class="hero-badge" style="display: flex; align-items: center; gap: 8px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #fbbf24;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg> EXCLUSIVE ACCESS</div>')
]

for old, new in replacements:
    html = re.sub(old, new, html, flags=re.MULTILINE)

# Address Javascript alerts with emojis
html = html.replace('alert("🎉 Bronze Tier Unlocked!', 'alert("⭐ Bronze Tier Unlocked!')
html = html.replace('alert("🥈 Silver Tier Unlocked!', 'alert("⭐ Silver Tier Unlocked!')
html = html.replace('alert("💎 DIAMOND TIER UNLOCKED!', 'alert("⭐ DIAMOND TIER UNLOCKED!')


with open('legacy/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
