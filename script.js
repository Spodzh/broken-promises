let storyData = null;
let currentSceneId = 'start';
let visitedScenes = new Set();
const LANG = 'ru';

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

    if (scene.background) {
        document.getElementById('background').style.backgroundImage = `url('${scene.background}')`;
    }

    const img = document.getElementById('scene-img');
    if (scene.image) {
        img.src = scene.image;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    const textEl = document.getElementById('scene-text');
    textEl.innerHTML = '';
    const text = scene.text_ru || scene.text || '';
    typeText(textEl, text, 0, 25);

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
                    document.getElementById('scene-text').innerHTML = '🏁 Конец. Спасибо за игру!';
                    choicesEl.innerHTML = '';
                    localStorage.removeItem('saveProgress');
                }
            });
            choicesEl.appendChild(btn);
        });
    } else {
        const endMsg = document.createElement('p');
        endMsg.textContent = '🏁 Конец.';
        endMsg.style.color = '#b8a090';
        endMsg.style.textAlign = 'center';
        choicesEl.appendChild(endMsg);
    }

    const total = storyData.scenes.length;
    const progress = Math.min(100, Math.round((visitedScenes.size / total) * 100));
    document.getElementById('progress-text').textContent = progress + '%';
}

function typeText(element, text, index, speed) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1, speed), speed);
    }
}

window.onload = loadStory;
