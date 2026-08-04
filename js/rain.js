// ============================================================
//  ПИКСЕЛЬНЫЙ ДОЖДЬ + ТУМАН + МОЛНИИ + ЛИСТЬЯ + ЛУЖИ
// ============================================================
(function() {
    var canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var width, height;
    var drops = [];
    var fogParticles = [];
    var leaves = [];
    var lightning = null;
    var lightningTimer = 0;
    var lightningInterval = 180;

    var numDrops = 180;
    var numFog = 30;
    var numLeaves = 12;

    function resize() {
        var container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initDrops();
        initFog();
        initLeaves();
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

    function initLeaves() {
        leaves = [];
        for (var i = 0; i < numLeaves; i++) {
            leaves.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: 3 + Math.floor(Math.random() * 4),
                speedY: 0.3 + Math.random() * 0.6,
                speedX: 0.2 + Math.random() * 0.4,
                opacity: 0.3 + Math.random() * 0.4,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02
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

    function drawPuddles() {
        // Рисуем несколько светлых пятен в нижней части
        for (var i = 0; i < 5; i++) {
            var x = (i * 0.2 + 0.1) * width;
            var y = height - 20 - Math.random() * 30;
            var radius = 10 + Math.random() * 20;
            ctx.fillStyle = 'rgba(180, 200, 220, 0.03)';
            ctx.fillRect(x, y, radius, radius * 0.3);
            ctx.fillStyle = 'rgba(200, 210, 220, 0.02)';
            ctx.fillRect(x + 3, y + 2, radius * 0.5, radius * 0.2);
        }
    }

    function drawLeaves() {
        for (var i = 0; i < leaves.length; i++) {
            var l = leaves[i];
            ctx.fillStyle = 'rgba(60, 50, 40, ' + l.opacity + ')';
            var size = l.size;
            // Рисуем лист как прямоугольник с поворотом
            ctx.save();
            ctx.translate(Math.floor(l.x), Math.floor(l.y));
            ctx.rotate(l.rotation);
            ctx.fillRect(-size/2, -size/4, size, size/2);
            ctx.restore();
            // Движение
            l.x += l.speedX * 0.5;
            l.y += l.speedY;
            l.rotation += l.rotSpeed;
            if (l.y > height + 20) {
                l.y = -20 - Math.random() * 30;
                l.x = Math.random() * width;
                l.speedX = 0.2 + Math.random() * 0.4;
                l.speedY = 0.3 + Math.random() * 0.6;
            }
            if (l.x > width + 20) l.x = -20;
            if (l.x < -20) l.x = width + 20;
        }
    }

    function drawRain() {
        ctx.clearRect(0, 0, width, height);

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

        // Лужи
        drawPuddles();

        // Листья
        drawLeaves();

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
