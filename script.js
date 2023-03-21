function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  }

  function getCookie(name) {
    const nameWithEquals = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nameWithEquals) === 0) {
        return cookie.substring(nameWithEquals.length, cookie.length);
      }
    }
    return '';
  }

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
    setCookie('nextClickTime', nextClickTime, 1);
    updateCountdown(nextClickTime);
  }

  function updateCountdown(nextClickTime) {
    const now = new Date().getTime();
    const timeLeft = nextClickTime - now;

    if (timeLeft <= 0) {
      document.cookie = 'nextClickTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

  document.addEventListener('DOMContentLoaded', function () {
    const nextClickTime = getCookie('nextClickTime');

    if (!nextClickTime || new Date().getTime() >= nextClickTime) {
      enableButton();
    } else {
      disableButton();
      updateCountdown(parseInt(nextClickTime, 10));
    }
  });
