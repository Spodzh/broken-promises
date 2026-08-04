// ============================================================
//  ПИКСЕЛЬНЫЙ ДОЖДЬ И ТУМАН НА СТАРТОВОМ ЭКРАНЕ
// ============================================================
(function() {
    var canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var width, height;
    var drops = [];
    var fogParticles = [];
    var numDrops = 180; // больше капель
    var numFog = 30;    // облачные частицы

    function resize() {
        var container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initDrops();
        initFog();
    }

    function initDrops() {
        drops = [];
        for (var i = 0; i < numDrops; i++) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                length: 6 + Math.floor(Math.random() * 16),
                speed: 1.5 + Math.random() * 3, // медленнее
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

    function drawRain() {
        ctx.clearRect(0, 0, width, height);

        // === Рисуем туман ===
        for (var i = 0; i < fogParticles.length; i++) {
            var f = fogParticles[i];
            ctx.fillStyle = 'rgba(200, 210, 220, ' + f.opacity + ')';
            var size = f.size;
            var x = Math.floor(f.x);
            var y = Math.floor(f.y);
            // Рисуем облако как набор пиксельных пятен
            for (var dx = 0; dx < size; dx += 4) {
                for (var dy = 0; dy < size * 0.6; dy += 4) {
                    if (Math.random() > 0.3) continue;
                    ctx.fillRect(x + dx, y + dy, 2, 2);
                }
            }
            // Движение тумана
            f.x += f.speedX;
            if (f.x > width + f.size) {
                f.x = -f.size - Math.random() * 100;
                f.y = Math.random() * height;
            }
        }

        // === Рисуем дождь ===
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

        requestAnimationFrame(drawRain);
    }

    window.addEventListener('resize', resize);
    resize();
    drawRain();
})();
