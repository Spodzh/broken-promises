// ============================================================
//  ДВИЖОК ИГРЫ (v2.8.0) – с анимациями, переходами, эмоциями
// ============================================================
var currentScene = storyData.startScene;
var visited = new Set();
var isTyping = false;
var timer = null;
var fullText = '';
var stats = {};
var endingShown = false;
var currentSlot = null;

// Проверка слота
var urlParams = new URLSearchParams(window.location.search);
var slotParam = urlParams.get('slot');
if (slotParam) {
    currentSlot = parseInt(slotParam);
    var savedData = SaveSystem.load(currentSlot);
    if (savedData) {
        currentScene = savedData.scene || storyData.startScene;
        visited = new Set(savedData.visited || []);
        stats = savedData.stats || {};
    }
}

// Кешируем DOM
var textEl = document.getElementById('text');
var choicesEl = document.getElementById('choices');
var speakerEl = document.getElementById('speaker');
var avatarEl = document.getElementById('speaker-avatar');
var bgEl = document.getElementById('bg');
var fillEl = document.getElementById('fill');
var itemImg = document.getElementById('item-img');
var itemContainer = document.getElementById('item-image');
var transitionOverlay = document.getElementById('transition-overlay');

var endingOverlay = document.getElementById('endingOverlay');
var endingText = document.getElementById('endingText');
var endingStatsBox = document.getElementById('endingStatsBox');
var endingStatsContent = document.getElementById('endingStatsContent');
var showStatsBtn = document.getElementById('showStatsBtn');
var endingRestartBtn = document.getElementById('endingRestartBtn');
var endingMenuBtn = document.getElementById('endingMenuBtn');

// ===== АВАТАРЫ =====
var avatars = {
    'Повествователь': 'images/portraits/narrator.png',
    'Кира': 'images/portraits/kira.png',
    'Димон': 'images/portraits/dimon.png',
    'Марк': 'images/portraits/mark.png',
    'Серёга': 'images/portraits/sergey.png',
    'Дядька Гена': 'images/portraits/gena.png',
    'Мама': 'images/portraits/mom.png',
    'Продавщица': 'images/portraits/seller.png',
    'Тётя Зина': 'images/portraits/zina.png',
    'Учительница': 'images/portraits/teacher.png',
    'Колян': 'images/portraits/kolyan.png',
    'Бабушка': 'images/portraits/grandma.png'
};
var defaultAvatar = 'images/portraits/default.png';

// ===== АНИМАЦИИ АВАТАРОВ =====
var avatarAnimInterval = null;
var currentEmotion = 'neutral';

// Карта эмоций (папки с аватарками)
var emotionMap = {
    'neutral': 'images/portraits/',
    'smile': 'images/portraits/smile/',
    'sad': 'images/portraits/sad/'
};

function startAvatarAnimations() {
    if (avatarAnimInterval) clearInterval(avatarAnimInterval);
    avatarAnimInterval = setInterval(function() {
        // Моргание (случайно)
        if (Math.random() < 0.3 && avatarEl.classList.contains('visible')) {
            avatarEl.style.transition = 'none';
            avatarEl.style.opacity = '0';
            setTimeout(function() {
                avatarEl.style.opacity = '1';
                avatarEl.style.transition = 'opacity 0.1s steps(2)';
            }, 100);
        }
    }, 4000);

    // Покачивание (CSS-анимация)
    avatarEl.style.animation = 'avatarFloat 3s infinite alternate ease-in-out';
}

function stopAvatarAnimations() {
    if (avatarAnimInterval) clearInterval(avatarAnimInterval);
    avatarEl.style.animation = '';
}

function updateAvatarEmotion(emotion) {
    if (emotion && emotionMap[emotion]) {
        var base = avatarEl.src.split('/').pop();
        var newSrc = emotionMap[emotion] + base;
        avatarEl.src = newSrc;
        currentEmotion = emotion;
    }
}

// ===== МУЗЫКА =====
var bgMusic = document.getElementById('bgMusic');
if (localStorage.getItem('musicEnabled') !== 'false') {
    bgMusic.play().catch(function(e) {});
}
var savedVolume = localStorage.getItem('volume');
if (savedVolume !== null) {
    bgMusic.volume = parseFloat(savedVolume);
} else {
    bgMusic.volume = 0.7;
}

endingRestartBtn.addEventListener('click', resetGame);
endingMenuBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

var statsVisible = false;
showStatsBtn.addEventListener('click', function() {
    if (statsVisible) {
        endingStatsBox.style.display = 'none';
        statsVisible = false;
        showStatsBtn.textContent = '📊 Показать статистику';
    } else {
        endingStatsBox.style.display = 'block';
        statsVisible = true;
        showStatsBtn.textContent = '📊 Скрыть статистику';
    }
});

function trackChoice(choiceText, nextId) {
    if (choiceText.indexOf("Довериться") !== -1) stats.trustDimon = "Да";
    if (choiceText.indexOf("Ответить резко") !== -1) stats.stoodUp = "Да";
    if (choiceText.indexOf("Заступиться") !== -1) stats.stoodUp = "Да";
    if (nextId === "work_honest") stats.path = "Честный труд";
    if (nextId === "work_criminal") stats.path = "Криминал";
    if (nextId === "work_security") stats.path = "Охрана";
    if (choiceText.indexOf("Поцеловать") !== -1) stats.kissed = "Да";
    if (nextId === "ending_good_1" || nextId === "ending_good_2") stats.ending = "Хорошая";
    if (nextId === "ending_mid_1" || nextId === "ending_mid_2") stats.ending = "Средняя";
    if (nextId === "final_choice_bad") stats.ending = "Плохая";
    if (nextId.indexOf("chapter_") !== -1) {
        stats.chapter = parseInt(nextId.split('_')[1]);
    }
    autoSave();
}

function autoSave() {
    if (currentSlot) {
        var total = storyData.scenes.length;
        var progress = Math.min(100, Math.round((visited.size / total) * 100));
        SaveSystem.save(currentSlot, {
            scene: currentScene,
            visited: visited,
            stats: stats,
            progress: progress
        });
    }
}

// ===== ПИКСЕЛЬНЫЙ ПЕРЕХОД =====
function fadeToScene(sceneId) {
    transitionOverlay.classList.add('active');
    setTimeout(function() {
        render(sceneId);
        transitionOverlay.classList.remove('active');
    }, 500);
}

function render(sceneId) {
    var scene = storyData.scenes.find(function(s) { return s.id === sceneId; });
    if (!scene) {
        textEl.innerHTML = 'Сцена не найдена.';
        return;
    }
    visited.add(sceneId);
    currentScene = sceneId;
    autoSave();

    // Фон
    if (scene.background) {
        bgEl.style.backgroundImage = 'url(' + scene.background + ')';
    }

    // Спикер и аватар
    if (scene.speaker) {
        speakerEl.textContent = scene.speaker;
        speakerEl.className = 'show';
        var avatarPath = avatars[scene.speaker] || defaultAvatar;
        avatarEl.src = avatarPath;
        avatarEl.className = 'visible';
        // Запускаем анимации аватара (если есть)
        if (!avatarAnimInterval) startAvatarAnimations();
        // Эмоция (по умолчанию нейтральная)
        // В будущем можно добавить поле emotion в сцены
    } else {
        speakerEl.className = '';
        avatarEl.className = '';
        stopAvatarAnimations();
    }

    // Картинка предмета
    if (scene.image && scene.image.startsWith('images/items/')) {
        itemImg.src = scene.image;
        itemContainer.style.display = 'block';
        itemImg.style.opacity = '0';
        setTimeout(function() { itemImg.style.opacity = '1'; }, 50);
    } else {
        itemContainer.style.display = 'none';
    }

    // Текст
    textEl.innerHTML = '';
    fullText = scene.text || '';
    choicesEl.innerHTML = '';

    isTyping = true;
    typeWriter(textEl, fullText, 0, function() {
        isTyping = false;
        showChoices(scene);
    });

    var total = storyData.scenes.length;
    var progress = Math.min(100, Math.round((visited.size / total) * 100));
    fillEl.style.width = progress + '%';

    textEl.onclick = function() {
        if (isTyping) {
            clearTimeout(timer);
            textEl.innerHTML = fullText;
            isTyping = false;
            showChoices(scene);
        }
    };
}

function showChoices(scene) {
    choicesEl.innerHTML = '';
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(function(choice) {
            var btn = document.createElement('button');
            btn.className = 'btn active';
            btn.textContent = choice.text;
            btn.onclick = function() {
                trackChoice(choice.text, choice.nextId);
                if (choice.nextId) {
                    fadeToScene(choice.nextId);
                } else {
                    showEnd();
                }
            };
            choicesEl.appendChild(btn);
        });
    } else {
        showEnd();
    }
}

function typeWriter(element, text, index, callback) {
    if (index < text.length) {
        requestAnimationFrame(function() {
            element.innerHTML += text.charAt(index);
            timer = setTimeout(function() {
                typeWriter(element, text, index + 1, callback);
            }, 12);
        });
    } else {
        if (callback) callback();
    }
}

function showEnd() {
    if (endingShown) return;
    endingShown = true;

    var statsText = '';
    statsText += 'Доверился Димону? ' + (stats.trustDimon || 'Нет') + '\n';
    statsText += 'Заступался за слабых? ' + (stats.stoodUp || 'Нет') + '\n';
    statsText += 'Путь в жизни: ' + (stats.path || 'Не выбран') + '\n';
    statsText += 'Поцеловал Киру? ' + (stats.kissed || 'Нет') + '\n';
    statsText += 'Финальная концовка: ' + (stats.ending || 'Неизвестно');
    endingStatsContent.textContent = statsText;
    endingStatsBox.style.display = 'none';
    statsVisible = false;
    showStatsBtn.textContent = '📊 Показать статистику';

    endingText.textContent = fullText || 'Твоя история завершена.';
    endingOverlay.classList.remove('hidden');
    localStorage.removeItem('save');
}

function resetGame() {
    endingOverlay.classList.add('hidden');
    endingShown = false;
    visited = new Set();
    stats = {};
    currentScene = storyData.startScene;
    render(currentScene);
}

var saved = localStorage.getItem('save');
if (saved && !currentSlot) {
    try {
        var data = JSON.parse(saved);
        currentScene = data.scene || storyData.startScene;
        visited = new Set(data.visited || []);
        stats = data.stats || {};
    } catch(e) {}
}
render(currentScene);

document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});
