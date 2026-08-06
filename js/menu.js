// ============================================================
//  МЕНЮ: обработчики кнопок, модалок, музыка
// ============================================================

var warningOverlay = document.getElementById('warningOverlay');
var dontShowAgain = document.getElementById('dontShowAgain');
var bgMusic = document.getElementById('bgMusic');
var musicToggle = document.getElementById('musicToggle');

// Восстановление состояния музыки
if (localStorage.getItem('musicEnabled') === 'false') {
    bgMusic.pause();
    musicToggle.checked = false;
} else {
    bgMusic.play().catch(function(e) {});
    musicToggle.checked = true;
}

// Сохранение состояния при переключении
musicToggle.addEventListener('change', function() {
    if (musicToggle.checked) {
        bgMusic.play().catch(function(e) {});
        localStorage.setItem('musicEnabled', 'true');
    } else {
        bgMusic.pause();
        localStorage.setItem('musicEnabled', 'false');
    }
});

if (localStorage.getItem('hideWarning') === 'true') {
    warningOverlay.classList.add('hidden');
}

document.getElementById('warningBtn').addEventListener('click', function() {
    if (dontShowAgain.checked) {
        localStorage.setItem('hideWarning', 'true');
    }
    warningOverlay.classList.add('hidden');
});

document.getElementById('playBtn').addEventListener('click', function() {
    window.location.href = 'game.html';
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.remove('hidden');
});

document.getElementById('supportBtn').addEventListener('click', function() {
    document.getElementById('supportOverlay').classList.remove('hidden');
});

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
