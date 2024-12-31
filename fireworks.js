// fireworks.js
window.onload = function() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, y, size, isFirst) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.age = 0;
            this.maxAge = isFirst ? 100 : 60; // 超大的烟花持续更长时间
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.age++;
            if (this.age < this.maxAge) {
                for (let i = 0; i < 5; i++) {
                    particles.push(new Particle(this.x, this.y, this.color, this.size));
                }
            }
        }

        draw() {
            if (this.age < this.maxAge) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
    }

    class Particle {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.age = 0;
            this.maxAge = 100;
            this.velocityX = (Math.random() - 0.5) * 6 * size;
            this.velocityY = (Math.random() - 0.5) * 6 * size;
            this.color = color;
        }

        update() {
            this.age++;
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityY += 0.02; // gravity effect
        }

        draw() {
            if (this.age < this.maxAge) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${1 - this.age / this.maxAge})`;
                ctx.fill();
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(firework => firework.update());
        fireworks.forEach(firework => firework.draw());
        particles.forEach(particle => particle.update());
        particles.forEach(particle => particle.draw());
        requestAnimationFrame(loop);
    }

    // 超大的烟花
    setTimeout(() => {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        fireworks.push(new Firework(x, y, 3, true));
    }, 500);

    // 定时器，生成小的烟花
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(x, y, 1, false));
    }, 1000);

    loop();
}
