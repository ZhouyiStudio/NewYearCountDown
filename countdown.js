// countdown.js
function updateCountdown() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    flipCard('days', days);
    flipCard('hours', hours);
    flipCard('minutes', minutes);
    flipCard('seconds', seconds);
}

function flipCard(id, newValue) {
    const card = document.getElementById(id);
    const front = document.getElementById(`${id}-front`);
    const back = document.getElementById(`${id}-back`);

    if (front.innerText != newValue) {
        back.innerText = newValue;
        card.querySelector('.flip-card-inner').style.transform = 'rotateX(180deg)';

        setTimeout(() => {
            front.innerText = newValue;
            card.querySelector('.flip-card-inner').style.transform = 'rotateX(0deg)';
        }, 600);
    }
}

// 更新倒计时每秒
setInterval(updateCountdown, 1000);

// 初始调用
updateCountdown();
