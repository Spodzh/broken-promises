// ============================================================
//  ПИКСЕЛЬНЫЙ ДОЖДЬ + ВСЕ ЭФФЕКТЫ (ГАРАНТИРОВАННОЕ ОТОБРАЖЕНИЕ)
// ============================================================
(function() {
    var canvas = document.getElementById('rainCanvas');
    if (!canvas) {
        console.warn('rainCanvas не найден');
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var width, height;
    var drops = [];
    var fogParticles = [];
    var steamParticles = [];
    var leaves = [];
    var lightning = null;
    var lightningTimer = 0;
    var lightningInterval = 180;
    var windows = [];
    var glassDrops = [];

    var numDrops = 180;
    var numFog = 30;
    var numSteam = 20;
    var numLeaves = 12;
    var numGlassDrops = 8;

    // Фонарь
    var lamp = {
        x: 0,
        y: 0,
        on: true,
        glow: 0.8
    };

    function resize() {
        var container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        console.log('Canvas размер:', width, 'x', height);
        initDrops();
        initFog();
        initSteam();
        initLeaves();
        initWindows();
        initGlassDrops();
        lamp.x = 60;
        lamp.y = height - 80;
    }

    function initDrops() { /* как было */ }
    function initFog() { /* как было */ }
    function initSteam() { /* как было */ }
    function initLeaves() { /* как было */ }

    function initWindows() {
        windows = [];
        var positions = [
            { x: 50, y: 40 },
            { x: 150, y: 30 },
            { x: 280, y: 60 },
            { x: 400, y: 20 },
            { x: 550, y: 50 },
            { x: 700, y: 35 }
        ];
        for (var i = 0; i < positions.length; i++) {
            var w = positions[i];
            windows.push({
                x: w.x,
                y: w.y,
                width: 20 + Math.random() * 20,
                height: 25 + Math.random() * 15,
                on: true,  // всегда включены
                flickerTimer: 0,
                flickerInterval: 100 + Math.random() * 200
            });
        }
    }

    function initGlassDrops() {
        glassDrops = [];
        for (var i = 0; i < numGlassDrops; i++) {
            glassDrops.push({
                x: 20 + Math.random() * (width - 40),
                y: 20 + Math.random() * (height - 40),
                speed: 0.3 + Math.random() * 0.6,
                size: 2 + Math.floor(Math.random() * 4),
                length: 4 + Math.random() * 8,
                opacity: 0.25  // увеличено
            });
        }
    }

    function spawnLightning() { /* как было */ }
    function drawLightning() { /* как было */ }

    function drawLamp() {
        var l = lamp;
        if (!l.on) return;
        // Свет фонаря (ярче)
        ctx.save();
        var gradient = ctx.createRadialGradient(l.x, l.y, 5, l.x, l.y, 90);
        gradient.addColorStop(0, 'rgba(255, 220, 150, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 220, 150, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(l.x - 90, l.y - 90, 180, 180);
        ctx.restore();

        // Столб фонаря
        ctx.fillStyle = '#3a2c24';
        ctx.fillRect(l.x - 3, l.y - 30, 6, 30);
        ctx.fillRect(l.x - 8, l.y - 38, 16, 8);
        // Лампочка
        ctx.fillStyle = '#f0e6d0';
        ctx.fillRect(l.x - 4, l.y - 42, 8, 6);
        ctx.fillStyle = '#b8a090';
        ctx.fillRect(l.x - 2, l.y - 44, 4, 2);
        // Мерцание (оставляем, но не выключаем)
        if (Math.random() > 0.98) {
            l.glow = 0.5 + Math.random() * 0.5;
        }
    }

    function drawWindows() {
        for (var i = 0; i < windows.length; i++) {
            var w = windows[i];
            if (!w.on) continue;
            var brightness = 0.6 + Math.random() * 0.2;
            ctx.fillStyle = 'rgba(255, 200, 100, ' + brightness + ')';
            ctx.fillRect(w.x, w.y, w.width, w.height);
            ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
            ctx.fillRect(w.x + 2, w.y + 2, w.width - 4, w.height - 4);
            // Случайное мерцание (не выключаем полностью)
            if (Math.random() > 0.995) {
                w.on = !w.on;
                setTimeout(function(el) {
                    el.on = true;
                }, 200, w);
            }
        }
    }

    function drawSteam() {
        for (var i = 0; i < steamParticles.length; i++) {
            var s = steamParticles[i];
            ctx.fillStyle = 'rgba(200, 210, 220, ' + s.opacity + ')';
            var size = s.size;
            var x = Math.floor(s.x);
            var y = Math.floor(s.y);
            for (var dx = 0; dx < size; dx += 4) {
                for (var dy = 0; dy < size * 0.6; dy += 4) {
                    if (Math.random() > 0.4) continue;
                    ctx.fillRect(x + dx, y + dy, 2, 2);
                }
            }
            s.y += s.speedY;
            s.x += s.speedX;
            if (s.y < -s.size) {
                s.y = height + Math.random() * 20;
                s.x = Math.random() * width;
                s.size = 10 + Math.random() * 30;
                s.opacity = 0.08 + Math.random() * 0.1; // ярче
            }
        }
    }

    function drawGlassDrops() {
        for (var i = 0; i < glassDrops.length; i++) {
            var d = glassDrops[i];
            ctx.fillStyle = 'rgba(255, 255, 255, ' + d.opacity + ')';
            for (var j = 0; j < d.length; j++) {
                var yPos = Math.floor(d.y + j);
                var xPos = Math.floor(d.x);
                ctx.fillRect(xPos, yPos, d.size, 1);
            }
            d.y += d.speed;
            if (d.y > height - 20) {
                d.y = 20;
                d.x = 20 + Math.random() * (width - 40);
                d.speed = 0.3 + Math.random() * 0.6;
                d.length = 4 + Math.random() * 8;
                d.opacity = 0.2 + Math.random() * 0.2;
            }
        }
    }

    function drawLeaves() {
        for (var i = 0; i < leaves.length; i++) {
            var leaf = leaves[i];
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation);
            ctx.fillStyle = leaf.color;
            ctx.fillRect(-leaf.size/2, -leaf.size/2, leaf.size, leaf.size);
            ctx.fillRect(-leaf.size/4, -leaf.size/4, leaf.size/2, leaf.size/2);
            ctx.restore();
            leaf.x += leaf.speedX;
            leaf.y += leaf.speedY;
            leaf.rotation += leaf.rotSpeed;
            if (leaf.x > width + 20) {
                leaf.x = -20;
                leaf.y = Math.random() * height;
            }
            if (leaf.y > height + 20) {
                leaf.y = -20;
                leaf.x = Math.random() * width;
            }
        }
    }

    function drawRain() {
        ctx.clearRect(0, 0, width, height);

        // Окна (задний план)
        drawWindows();

        // Туман
        for (var i = 0; i < fogParticles.length; i++) {
            var f = fogParticles[i];
            ctx.fillStyle = 'rgba(200, 210, 220, ' + f.opacity + ')';
            var size = f.size;
            var x = Math.floor(f.x);
            var y = Math.floor(f.y);
            for (var dx = 0; dx < size; dx += 4) {
                for (var dy = 0; dy < size * 0.6; dy += 4) {
                    if (Math.random() > 0.3) continue;
                    ctx.fillRect(x + dx, y + dy, 2, 2);
                }
            }
            f.x += f.speedX;
            if (f.x > width + f.size) {
                f.x = -f.size - Math.random() * 100;
                f.y = Math.random() * height;
            }
        }

        // Пар
        drawSteam();

        // Листья
        drawLeaves();

        // Дождь
        for (var i = 0; i < drops.length; i++) {
            var d = drops[i];
            ctx.fillStyle = 'rgba(180, 200, 220, ' + d.opacity + ')';
            for (var j = 0; j < d.length; j++) {
                var yPos = Math.floor(d.y + j);
                var xPos = Math.floor(d.x);
                ctx.fillRect(xPos, yPos, d.width, 1);
            }
            d.y += d.speed;
            if (d.y > height + d.length) {
                d.y = -d.length - Math.random() * 20;
                d.x = Math.random() * width;
                d.speed = 1.5 + Math.random() * 3;
                d.length = 6 + Math.floor(Math.random() * 16);
                d.opacity = 0.25 + Math.random() * 0.4;
            }
        }

        // Капли на стекле (поверх дождя)
        drawGlassDrops();

        // Фонарь (поверх всего)
        drawLamp();

        // Молнии (самый верх)
        if (lightning) {
            drawLightning();
            lightning.alpha -= 0.125;
            lightning.timer--;
            if (lightning.timer <= 0 || lightning.alpha <= 0) {
                lightning = null;
            }
        } else {
            lightningTimer++;
            if (lightningTimer > lightningInterval + Math.random() * 100) {
                spawnLightning();
                lightningTimer = 0;
                lightningInterval = 150 + Math.floor(Math.random() * 200);
            }
        }

        requestAnimationFrame(drawRain);
    }

    window.addEventListener('resize', resize);
    resize();
    drawRain();
})();
