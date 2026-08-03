// ============================================================
//  МЕНЮ: обработчики кнопок, модалок
// ============================================================

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
