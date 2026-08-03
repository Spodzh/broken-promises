// ============================================================
//  ДВИЖОК ИГРЫ (С ПЛАВНОСТЬЮ И МОДАЛКОЙ КОНЦА)
// ============================================================
var currentScene = storyData.startScene;
var visited = new Set();
var isTyping = false;
var timer = null;
var fullText = '';
var stats = {};
var endingShown = false;

// Элементы модалки
var endingOverlay = document.getElementById('endingOverlay');
var endingText = document.getElementById('endingText');
var endingStatsBox = document.getElementById('endingStatsBox');
var endingStatsContent = document.getElementById('endingStatsContent');
var showStatsBtn = document.getElementById('showStatsBtn');
var endingRestartBtn = document.getElementById('endingRestartBtn');
var endingMenuBtn = document.getElementById('endingMenuBtn');

// Обработчики
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
}

function render(sceneId) {
    var scene = storyData.scenes.find(function(s) { return s.id === sceneId; });
    if (!scene) {
        document.getElementById('text').innerHTML = 'Сцена не найдена.';
        return;
    }
    visited.add(sceneId);
    localStorage.setItem('save', JSON.stringify({ scene: sceneId, visited: Array.from(visited), stats: stats }));

    if (scene.background) {
        document.getElementById('bg').style.backgroundImage = 'url(' + scene.background + ')';
    }

    var speaker = document.getElementById('speaker');
    if (scene.speaker) {
        speaker.textContent = scene.speaker;
        speaker.className = 'show';
    } else {
        speaker.className = '';
    }

    var textEl = document.getElementById('text');
    textEl.innerHTML = '';
    fullText = scene.text || '';

    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';

    isTyping = true;
    typeWriter(textEl, fullText, 0, function() {
        isTyping = false;
        showChoices(scene);
    });

    var total = storyData.scenes.length;
    var progress = Math.min(100, Math.round((visited.size / total) * 100));
    document.getElementById('fill').style.width = progress + '%';

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
    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(function(choice) {
            var btn = document.createElement('button');
            btn.className = 'btn active';
            btn.textContent = choice.text;
            btn.onclick = function() {
                trackChoice(choice.text, choice.nextId);
                if (choice.nextId) {
                    render(choice.nextId);
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
            }, 15);
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
if (saved) {
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
