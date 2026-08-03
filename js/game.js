// Движок игры (использует storyData и LANG)
var currentScene = storyData.startScene;
var visited = new Set();
var isTyping = false;
var timer = null;
var fullText = '';
var stats = {};

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
    isTyping = true;
    typeWriter(textEl, fullText, 0);

    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(function(choice) {
            var btn = document.createElement('button');
            btn.className = 'btn';
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

    var total = storyData.scenes.length;
    var progress = Math.min(100, Math.round((visited.size / total) * 100));
    document.getElementById('fill').style.width = progress + '%';

    textEl.onclick = function() {
        if (isTyping) {
            clearTimeout(timer);
            textEl.innerHTML = fullText;
            isTyping = false;
        }
    };
}

function typeWriter(element, text, index) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        timer = setTimeout(function() {
            typeWriter(element, text, index + 1);
        }, 20);
    } else {
        isTyping = false;
    }
}

function showEnd() {
    var textEl = document.getElementById('text');
    var statsText = '';
    statsText += '--- СТАТИСТИКА ВЫБОРОВ ---\n';
    statsText += 'Доверился Димону? ' + (stats.trustDimon || 'Нет') + '\n';
    statsText += 'Заступался за слабых? ' + (stats.stoodUp || 'Нет') + '\n';
    statsText += 'Путь в жизни: ' + (stats.path || 'Не выбран') + '\n';
    statsText += 'Поцеловал Киру? ' + (stats.kissed || 'Нет') + '\n';
    statsText += 'Финальная концовка: ' + (stats.ending || 'Неизвестно') + '\n';
    statsText += '----------------------------------';
    textEl.innerHTML = LANG.game.endTitle + '\n\n' + statsText;

    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    var btn = document.createElement('button');
    btn.className = 'btn restart-btn';
    btn.textContent = LANG.game.restart;
    btn.onclick = resetGame;
    choicesEl.appendChild(btn);
    localStorage.removeItem('save');
}

function resetGame() {
    visited = new Set();
    stats = {};
    currentScene = storyData.startScene;
    render(currentScene);
}

// Загрузка сохранения
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

// Кнопка "Меню"
document.getElementById('backBtn').textContent = LANG.game.back;
document.getElementById('backBtn').onclick = function() {
    window.location.href = 'index.html';
};
