const generateButton = document.getElementById('generateButton');

function animateText(element) {
  element.classList.add('fade-in');
  setTimeout(function () {
    element.classList.remove('fade-in');
  }, 800);
}

function startCountdown() {
  const now = new Date().getTime();
  const nextClickTime = now + 24 * 60 * 60 * 1000;
  localStorage.setItem('nextClickTime', nextClickTime);
  updateCountdown(nextClickTime);
}

function updateCountdown(nextClickTime) {
  const now = new Date().getTime();
  const timeLeft = nextClickTime - now;

  if (timeLeft <= 0) {
    localStorage.removeItem('nextClickTime');
    enableButton();
    return;
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  generateButton.innerHTML = `Осталось: ${hours}ч ${minutes}м ${seconds}с`;
  setTimeout(() => updateCountdown(nextClickTime), 1000);
}

function disableButton() {
  generateButton.disabled = true;
  generateButton.style.opacity = 0.5;
  startCountdown();
}

function enableButton() {
  generateButton.disabled = false;
  generateButton.style.opacity = 1;
  generateButton.innerHTML = 'Кто сегодня Ваня';
}

generateButton.addEventListener('click', function () {
  const phrases = ['казел', 'казлина', 'говнюк'];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const heading = document.querySelector('h1');
  heading.innerHTML = `Ваня сегодня ${randomPhrase}`;
  animateText(heading);
  disableButton();
});

// Остальной код остается без изменений

document.addEventListener('DOMContentLoaded', function () {
    // Добавим задержку перед проверкой состояния таймера в localStorage
    setTimeout(() => {
      const nextClickTime = localStorage.getItem('nextClickTime');

      if (!nextClickTime || new Date().getTime() >= nextClickTime) {
        enableButton();
      } else {
        disableButton();
        updateCountdown(parseInt(nextClickTime, 10));
      }
    }, 100); // Задержка в 100 миллисекунд
  });
