// ============================================================
//  ПИКСЕЛЬНЫЙ ДОЖДЬ НА СТАРТОВОМ ЭКРАНЕ
// ============================================================
(function() {
    var canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var width, height;
    var drops = [];
    var numDrops = 120;

    function resize() {
        var container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        initDrops();
    }

    function initDrops() {
        drops = [];
        for (var i = 0; i < numDrops; i++) {
            drops.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                length: 8 + Math.floor(Math.random() * 20),
                speed: 3 + Math.random() * 6,
                opacity: 0.3 + Math.random() * 0.5,
                width: 2
            });
        }
    }

    function drawRain() {
        ctx.clearRect(0, 0, width, height);
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
                d.speed = 3 + Math.random() * 6;
                d.length = 8 + Math.floor(Math.random() * 20);
                d.opacity = 0.3 + Math.random() * 0.5;
            }
        }
        requestAnimationFrame(drawRain);
    }

    window.addEventListener('resize', resize);
    resize();
    drawRain();
})();
