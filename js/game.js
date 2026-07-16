// Движок игры
var currentSceneId = storyData.startScene;
var visitedScenes = new Set();
var isTyping = false;
var typeTimer = null;
var fullText = '';
var stats = {
    trustDimon: false,
    stoodUp: false,
    choseHonest: false,
    choseCriminal: false,
    choseSecurity: false,
    kissedKira: false,
    finalEnding: ''
};

// DOM-элементы
var endingOverlay = document.getElementById('ending-overlay');
var endingText = document.getElementById('ending-text');
var endingStats = document.getElementById('ending-stats');
var endingRestart = document.getElementById('ending-restart');
var endingMenu = document.getElementById('ending-menu');

// Назначаем обработчики
endingRestart.addEventListener('click', resetGame);
endingMenu.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Устанавливаем русские тексты интерфейса
document.getElementById('back-btn').textContent = LANG.ui.back;
document.getElementById('ending-title').textContent = LANG.ui.endTitle;
endingRestart.textContent = LANG.ui.restart;
endingMenu.textContent = LANG.ui.menu;

function startGame() {
    var saved = localStorage.getItem('saveProgress');
    if (saved) {
        var data = JSON.parse(saved);
        currentSceneId = data.scene || storyData.startScene;
        visitedScenes = new Set(data.visited || []);
        if (data.stats) stats = data.stats;
    } else {
        currentSceneId = storyData.startScene;
    }
    renderScene(currentSceneId);
}

function renderScene(sceneId) {
    var scene = storyData.scenes.find(function(s) { return s.id === sceneId; });
    if (!scene) {
        document.getElementById('scene-text').innerHTML = '\u0421\u0446\u0435\u043d\u0430 ' + sceneId + ' \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430.';
        return;
    }
    visitedScenes.add(sceneId);
    localStorage.setItem('saveProgress', JSON.stringify({ scene: sceneId, visited: Array.from(visitedScenes), stats: stats }));

    if (scene.background) {
        document.getElementById('background').style.backgroundImage = 'url(\'' + scene.background + '\')';
    }

    var img = document.getElementById('scene-img');
    if (scene.image) {
        img.src = scene.image;
        img.style.display = 'block';
        img.style.opacity = '0';
        setTimeout(function() { img.style.opacity = '1'; }, 50);
    } else {
        img.style.display = 'none';
    }

    var speakerEl = document.getElementById('speaker-name');
    if (scene.speaker) {
        speakerEl.textContent = scene.speaker;
        speakerEl.className = 'visible';
    } else {
        speakerEl.className = '';
    }

    var textEl = document.getElementById('scene-text');
    textEl.innerHTML = '';
    fullText = scene.text_ru || scene.text || '';
    isTyping = true;
    typeText(textEl, fullText, 0, 20);

    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(function(choice) {
            var btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text_ru || choice.text || '';
            btn.addEventListener('click', function() {
                // Сбор статистики
                if (choice.nextId === 'school_1_1' && choice.text_ru && choice.text_ru.indexOf('\u0414\u043e\u0432\u0435\u0440\u0438\u0442\u044c') !== -1) stats.trustDimon = true;
                if (choice.nextId === 'school_2_1' && choice.text_ru && choice.text_ru.indexOf('\u0437\u0430\u0441\u0442\u0443\u043f\u0438\u0442\u044c') !== -1) stats.stoodUp = true;
                if (choice.nextId === 'work_honest') stats.choseHonest = true;
                if (choice.nextId === 'work_criminal') stats.choseCriminal = true;
                if (choice.nextId === 'work_security') stats.choseSecurity = true;
                if (choice.nextId === 'ptu_1' && choice.text_ru && choice.text_ru.indexOf('\u041f\u043e\u0446\u0435\u043b\u043e\u0432\u0430\u0442\u044c') !== -1) stats.kissedKira = true;

                if (choice.nextId) {
                    renderScene(choice.nextId);
                } else {
                    stats.finalEnding = sceneId;
                    showEnding();
                }
            });
            choicesEl.appendChild(btn);
        });
    } else {
        stats.finalEnding = sceneId;
        showEnding();
    }

    var total = storyData.scenes.length;
    var progress = Math.min(100, Math.round((visitedScenes.size / total) * 100));
    document.getElementById('progress-text').textContent = progress + '%';
    document.getElementById('progress-fill').style.width = progress + '%';

    textEl.onclick = function() {
        if (isTyping) {
            clearTimeout(typeTimer);
            textEl.innerHTML = fullText;
            isTyping = false;
        }
    };
}

function typeText(element, text, index, speed) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        typeTimer = setTimeout(function() { typeText(element, text, index + 1, speed); }, speed);
    } else {
        isTyping = false;
    }
}

function showEnding() {
    document.getElementById('choices').innerHTML = '';
    endingText.textContent = fullText || '\u0422\u0432\u043e\u044f \u0438\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430.';

    var statsText = '';
    statsText += '\u0422\u044b \u0434\u043e\u0432\u0435\u0440\u0438\u043b\u0441\u044f \u0414\u0438\u043c\u043e\u043d\u0443? ' + (stats.trustDimon ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u0417\u0430\u0441\u0442\u0443\u043f\u0430\u043b\u0441\u044f \u0437\u0430 \u0441\u043b\u0430\u0431\u044b\u0445? ' + (stats.stoodUp ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u0412\u044b\u0431\u0440\u0430\u043b \u0447\u0435\u0441\u0442\u043d\u044b\u0439 \u0442\u0440\u0443\u0434? ' + (stats.choseHonest ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u041f\u043e\u0448\u0451\u043b \u0432 \u043a\u0440\u0438\u043c\u0438\u043d\u0430\u043b? ' + (stats.choseCriminal ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u0420\u0430\u0431\u043e\u0442\u0430\u043b \u0432 \u043e\u0445\u0440\u0430\u043d\u0435? ' + (stats.choseSecurity ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u041f\u043e\u0446\u0435\u043b\u043e\u0432\u0430\u043b \u041a\u0438\u0440\u0443? ' + (stats.kissedKira ? '\u0414\u0430' : '\u041d\u0435\u0442') + '\n';
    statsText += '\u0424\u0438\u043d\u0430\u043b\u044c\u043d\u0430\u044f \u043a\u043e\u043d\u0446\u043e\u0432\u043a\u0430: ' + (stats.finalEnding || '\u043d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e');
    endingStats.textContent = statsText;

    endingOverlay.style.display = 'flex';
    localStorage.removeItem('saveProgress');
}

function resetGame() {
    endingOverlay.style.display = 'none';
    localStorage.removeItem('saveProgress');
    visitedScenes = new Set();
    stats = { trustDimon: false, stoodUp: false, choseHonest: false, choseCriminal: false, choseSecurity: false, kissedKira: false, finalEnding: '' };
    currentSceneId = storyData.startScene;
    renderScene(currentSceneId);
}

window.onload = startGame;
