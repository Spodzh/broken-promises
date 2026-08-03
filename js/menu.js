// ============================================================
//  МЕНЮ: обработчики кнопок, модалки, fullscreen
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

// Fullscreen
document.getElementById('fullscreenBtn').addEventListener('click', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function(err) {
            // Если fullscreen не поддерживается или заблокирован — игнорируем
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
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
