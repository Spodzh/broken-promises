// ============================================================
//  МЕНЮ: обработчики кнопок, модалок, музыка, громкость
// ============================================================

var warningOverlay = document.getElementById('warningOverlay');
var dontShowAgain = document.getElementById('dontShowAgain');
var bgMusic = document.getElementById('bgMusic');
var musicToggle = document.getElementById('musicToggle');
var volumeSlider = document.getElementById('volumeSlider');

// Восстановление состояния музыки
if (localStorage.getItem('musicEnabled') === 'false') {
    bgMusic.pause();
    musicToggle.checked = false;
} else {
    bgMusic.play().catch(function(e) {});
    musicToggle.checked = true;
}

// Громкость
var savedVolume = localStorage.getItem('volume');
if (savedVolume !== null) {
    bgMusic.volume = parseFloat(savedVolume);
    if (volumeSlider) volumeSlider.value = savedVolume;
} else {
    bgMusic.volume = 0.7;
    if (volumeSlider) volumeSlider.value = '0.7';
}

musicToggle.addEventListener('change', function() {
    if (musicToggle.checked) {
        bgMusic.play().catch(function(e) {});
        localStorage.setItem('musicEnabled', 'true');
    } else {
        bgMusic.pause();
        localStorage.setItem('musicEnabled', 'false');
    }
});

if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
        var val = parseFloat(this.value);
        bgMusic.volume = val;
        localStorage.setItem('volume', val.toString());
    });
}

// Дисклеймер
if (localStorage.getItem('hideWarning') === 'true') {
    warningOverlay.classList.add('hidden');
}

document.getElementById('warningBtn').addEventListener('click', function() {
    if (dontShowAgain.checked) {
        localStorage.setItem('hideWarning', 'true');
    }
    warningOverlay.classList.add('hidden');
});

// Кнопки меню
document.getElementById('playBtn').addEventListener('click', function() {
    window.location.href = 'game.html';
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.remove('hidden');
});

document.getElementById('supportBtn').addEventListener('click', function() {
    document.getElementById('supportOverlay').classList.remove('hidden');
});

// Кнопка загрузки (новая)
document.getElementById('loadBtn').addEventListener('click', function() {
    document.getElementById('loadOverlay').classList.remove('hidden');
    renderSlots();
});

function renderSlots() {
    var slots = SaveSystem.getAllSlots();
    for (var i = 0; i < SaveSystem.slots.length; i++) {
        var s = SaveSystem.slots[i];
        var data = slots[s];
        var container = document.getElementById('slot-' + s);
        if (!container) continue;
        if (data) {
            container.innerHTML = 
                '<span class="slot-date">' + data.date + '</span>' +
                '<span class="slot-progress">' + data.progress + '%</span>' +
                '<span class="slot-chapter">Глава ' + (data.stats && data.stats.chapter ? data.stats.chapter : '?') + '</span>';
            container.className = 'slot-card occupied';
            container.onclick = function(slot) {
                return function() {
                    var data = SaveSystem.load(slot);
                    if (data) {
                        // Передаём данные в game.html через URL параметры
                        window.location.href = 'game.html?slot=' + slot;
                    }
                };
            }(s);
        } else {
            container.innerHTML = '<span class="slot-empty">Пусто</span>';
            container.className = 'slot-card empty';
            container.onclick = null;
        }
    }
}

function closeLoad() {
    document.getElementById('loadOverlay').classList.add('hidden');
}

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
