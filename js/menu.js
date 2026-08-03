// Вставляем тексты
document.getElementById('subtitle').textContent = LANG.menu.subtitle;
document.getElementById('playBtn').textContent = LANG.menu.play;
document.getElementById('settingsBtn').textContent = LANG.menu.settings;
document.getElementById('supportBtn').textContent = LANG.menu.support;
document.getElementById('wtitle').textContent = LANG.menu.warningTitle;
document.getElementById('wtext').textContent = LANG.menu.warningText;
document.getElementById('wbtn').textContent = LANG.menu.warningBtn;

// Обработчики
document.getElementById('playBtn').onclick = function() {
    window.location.href = 'game.html';
};
document.getElementById('settingsBtn').onclick = function() {
    alert('Настройки будут позже');
};
document.getElementById('supportBtn').onclick = function() {
    window.open('https://t.me/brokenpromisesgame', '_blank');
};
document.getElementById('wbtn').onclick = function() {
    document.getElementById('warning').classList.add('hidden');
};
