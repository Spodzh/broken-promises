// ============================================================
//  ДОЖДЬ + ТУМАН + МОЛНИИ + ЛИСТЬЯ + ФОНАРЬ + ОКНА + ПАР
// ============================================================
(function() {
    var canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
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
        glow: 0,
        flicker: 0,
        on: true
    };

    function resize() {
        var container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initDrops();
        initFog();
        initSteam();
        initLeaves();
        initWindows();
        initGlassDrops();
        lamp.x = 40;
        lamp.y = height - 60;
    }

    function initDrops() {
        drops = [];
        for (var i = 0; i < numDrops; i++) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                length: 6 + Math.floor(Math.random() * 16),
                speed: 1.5 + Math.random() * 3,
                opacity: 0.25 + Math.random() * 0.4,
                width: 2
            });
        }
    }

    function initFog() {
        fogParticles = [];
        for (var i = 0; i < numFog; i++) {
            fogParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 30 + Math.random() * 80,
                speedX: 0.1 + Math.random() * 0.3,
                opacity: 0.02 + Math.random() * 0.04
            });
        }
    }

    function initSteam() {
        steamParticles = [];
        for (var i = 0; i < numSteam; i++) {
            steamParticles.push({
                x: Math.random() * width,
                y: height - Math.random() * 100,
                size: 10 + Math.random() * 30,
                speedY: -0.2 - Math.random() * 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                opacity: 0.03 + Math.random() * 0.05,
                life: 0
            });
        }
    }

    function initLeaves() {
        leaves = [];
        for (var i = 0; i < numLeaves; i++) {
            leaves.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 3 + Math.floor(Math.random() * 5),
                speedX: -0.5 + Math.random() * 1.5,
                speedY: 0.2 + Math.random() * 0.8,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                color: Math.random() > 0.6 ? '#7a5a3a' : '#5a4a3a'
            });
        }
    }

    function initWindows() {
        windows = [];
        // Создаём несколько окон на заднем плане
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
                on: Math.random() > 0.3,
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
                opacity: 0.1 + Math.random() * 0.15
            });
        }
    }

    function spawnLightning() {
        var x = Math.random() * width;
        var y = 0;
        var branches = 3 + Math.floor(Math.random() * 4);
        lightning = {
            x: x,
            y: y,
            branches: branches,
            alpha: 1.0,
            timer: 8
        };
    }

    function drawLightning() {
        if (!lightning) return;
        var l = lightning;
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 10;

        var startX = l.x;
        var startY = l.y;
        for (var i = 0; i < l.branches; i++) {
            var endX = startX + (Math.random() - 0.5) * 60;
            var endY = startY + 40 + Math.random() * 50;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            var steps = 3 + Math.floor(Math.random() * 4);
            var prevX = startX, prevY = startY;
            for (var j = 0; j < steps; j++) {
                var nextX = prevX + (Math.random() - 0.5) * 40;
                var nextY = prevY + 20 + Math.random() * 30;
                ctx.lineTo(nextX, nextY);
                prevX = nextX;
                prevY = nextY;
            }
            ctx.stroke();
            if (Math.random() > 0.5) {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                var branchX = prevX + (Math.random() - 0.5) * 30;
                var branchY = prevY + 20 + Math.random() * 20;
                ctx.lineTo(branchX, branchY);
                ctx.stroke();
            }
            startX = l.x + (Math.random() - 0.5) * 20;
            startY = l.y + 20 + Math.random() * 30;
        }
        ctx.restore();
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (l.alpha * 0.1) + ')';
        ctx.fillRect(0, 0, width, height);
    }

    function drawLamp() {
        var l = lamp;
        if (!l.on) return;
        ctx.save();
        var gradient = ctx.createRadialGradient(l.x, l.y, 5, l.x, l.y, 70);
        gradient.addColorStop(0, 'rgba(200, 180, 100, ' + (0.1 + l.glow * 0.1) + ')');
        gradient.addColorStop(1, 'rgba(200, 180, 100, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(l.x - 70, l.y - 70, 140, 140);
        ctx.restore();

        ctx.fillStyle = '#3a2c24';
        ctx.fillRect(l.x - 2, l.y - 20, 4, 20);
        ctx.fillRect(l.x - 6, l.y - 26, 12, 6);
        ctx.fillStyle = '#f0e6d0';
        ctx.fillRect(l.x - 3, l.y - 28, 6, 4);
        ctx.fillStyle = '#b8a090';
        ctx.fillRect(l.x - 2, l.y - 30, 4, 2);
        l.flicker++;
        if (l.flicker > 30 + Math.random() * 60) {
            l.flicker = 0;
            if (Math.random() > 0.7) {
                l.on = !l.on;
                if (l.on) l.glow = 0.5 + Math.random() * 0.5;
            } else {
                l.glow = 0.5 + Math.random() * 0.5;
            }
        }
    }

    function drawWindows() {
        for (var i = 0; i < windows.length; i++) {
            var w = windows[i];
            if (!w.on) continue;
            var brightness = 0.4 + Math.random() * 0.2;
            ctx.fillStyle = 'rgba(255, 200, 100, ' + brightness + ')';
            ctx.fillRect(w.x, w.y, w.width, w.height);
            ctx.fillStyle = 'rgba(255, 255, 200, 0.2)';
            ctx.fillRect(w.x + 2, w.y + 2, w.width - 4, w.height - 4);
            // Мерцание
            w.flickerTimer++;
            if (w.flickerTimer > w.flickerInterval + Math.random() * 50) {
                w.flickerTimer = 0;
                if (Math.random() > 0.8) {
                    w.on = !w.on;
                }
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
                s.opacity = 0.03 + Math.random() * 0.05;
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
                d.opacity = 0.1 + Math.random() * 0.15;
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

        // Окна (на заднем плане)
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

        // Капли на стекле
        drawGlassDrops();

        // Фонарь
        drawLamp();

        // Молнии
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
})();
