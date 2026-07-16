let storyData = null;
let currentSceneId = 'start';
let visitedScenes = new Set();
let isTyping = false;
let typeTimer = null;
let fullText = '';
let LANG = 'ru';

async function loadStory() {
    try {
        const response = await fetch('story.json');
        if (!response.ok) throw new Error('Ошибка загрузки сценария');
        storyData = await response.json();
        const saved = localStorage.getItem('saveProgress');
        if (saved) {
            const data = JSON.parse(saved);
            currentSceneId = data.scene || storyData.startScene;
            visitedScenes = new Set(data.visited || []);
        } else {
            currentSceneId = storyData.startScene;
        }
        renderScene(currentSceneId);
    } catch (e) {
        document.getElementById('scene-text').innerHTML = '❌ Не удалось загрузить сценарий. Проверьте story.json';
        console.error(e);
    }
}

function renderScene(sceneId) {
    const scene = storyData.scenes.find(s => s.id === sceneId);
    if (!scene) {
        document.getElementById('scene-text').innerHTML = 'Сцена не найдена.';
        return;
    }
    visitedScenes.add(sceneId);
    localStorage.setItem('saveProgress', JSON.stringify({ scene: sceneId, visited: Array.from(visitedScenes) }));

    // Фон
    if (scene.background) {
        document.getElementById('background').style.backgroundImage = `url('${scene.background}')`;
    }

    // Изображение
    const img = document.getElementById('scene-img');
    if (scene.image) {
        img.src = scene.image;
        img.style.display = 'block';
        img.style.opacity = '0';
        setTimeout(() => { img.style.opacity = '1'; }, 50);
    } else {
        img.style.display = 'none';
    }

    // Имя говорящего
    const speakerEl = document.getElementById('speaker-name');
    if (scene.speaker) {
        speakerEl.textContent = scene.speaker;
        speakerEl.className = 'visible';
    } else {
        speakerEl.className = '';
    }

    // Текст
    const textEl = document.getElementById('scene-text');
    textEl.innerHTML = '';
    fullText = scene.text_ru || scene.text || '';
    isTyping = true;
    typeText(textEl, fullText, 0, 20);

    // Кнопки выбора
    const choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    if (scene.choices && scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text_ru || choice.text || '';
            btn.addEventListener('click', () => {
                if (choice.nextId) {
                    renderScene(choice.nextId);
                } else {
                    showEnding();
                }
            });
            choicesEl.appendChild(btn);
        });
    } else {
        // Концовка
        showEnding();
    }

    // Обновление прогресса
    const total = storyData.scenes.length;
    const progress = Math.min(100, Math.round((visitedScenes.size / total) * 100));
    document.getElementById('progress-text').textContent = progress + '%';

    // Клик по тексту для ускорения печати
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
        typeTimer = setTimeout(() => typeText(element, text, index + 1, speed), speed);
    } else {
        isTyping = false;
    }
}

function showEnding() {
    const textEl = document.getElementById('scene-text');
    textEl.innerHTML = '🏁 Конец. Спасибо за игру!';
    const choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';
    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn';
    restartBtn.textContent = '🔄 Начать заново';
    restartBtn.addEventListener('click', resetGame);
    choicesEl.appendChild(restartBtn);
    localStorage.removeItem('saveProgress');
    document.getElementById('speaker-name').className = '';
}

function resetGame() {
    localStorage.removeItem('saveProgress');
    visitedScenes = new Set();
    currentSceneId = storyData.startScene;
    renderScene(currentSceneId);
}

window.onload = loadStory;
