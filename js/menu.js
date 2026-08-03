// Логика меню
document.getElementById('playBtn').onclick = function() {
    window.location.href = 'game.html';
};
document.getElementById('settingsBtn').onclick = function() {
    alert('⚙ Настройки в разработке\nСкоро здесь появятся регулировка звука и языка.');
};
document.getElementById('supportBtn').onclick = function() {
    window.open('https://t.me/brokenpromisesgame', '_blank');
};
document.getElementById('wbtn').onclick = function() {
    document.getElementById('warning').classList.add('hidden');
};
