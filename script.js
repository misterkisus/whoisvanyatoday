document.getElementById('generateButton').addEventListener('click', function() {
    const phrases = ["казел", "казлина", "говнюк", "писькосос", "дерьмоед", "уебище", "гандонище", "тварь", "эммм"];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    document.querySelector('h1').innerHTML = `Ваня сегодня ${randomPhrase}`;
});
