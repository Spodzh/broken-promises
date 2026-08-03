// ============================================================
//  МЕНЮ: обработчики кнопок, модалок
// ============================================================

// Предупреждение
var warningOverlay = document.getElementById('warningOverlay');
var dontShowAgain = document.getElementById('dontShowAgain');

if (localStorage.getItem('hideWarning') === 'true') {
    warningOverlay.classList.add('hidden');
}

document.getElementById('warningBtn').addEventListener('click', function() {
    if (dontShowAgain.checked) {
        localStorage.setItem('hideWarning', 'true');
    }
    warningOverlay.classList.add('hidden');
});

// Кнопка "Играть"
document.getElementById('playBtn').addEventListener('click', function() {
    window.location.href = 'game.html';
});

// Настройки
document.getElementById('settingsBtn').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.remove('hidden');
});

// Поддержка
document.getElementById('supportBtn').addEventListener('click', function() {
    document.getElementById('supportOverlay').classList.remove('hidden');
});

// Закрытие модалок
function closeSettings() {
    document.getElementById('settingsOverlay').classList.add('hidden');
}
function closeSupport() {
    document.getElementById('supportOverlay').classList.add('hidden');
}

document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });
});
