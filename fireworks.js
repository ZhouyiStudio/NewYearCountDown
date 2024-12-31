// fireworks.js
window.onload = function() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.age = 0;
            this.maxAge = 60;
        }

        update() {
            this.age++;
            if (this.age < this.maxAge) {
                particles.push(new Particle(this.x, this.y));
            }
        }

        draw() {
            if (this.age < this.maxAge) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.age = 0;
            this.maxAge = 100;
            this.velocityX = (Math.random() - 0.5) * 4;
            this.velocityY = (Math.random() - 0.5) * 4;
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
                ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.age / this.maxAge})`;
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

    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(x, y));
    }, 1000);

    loop();
}
