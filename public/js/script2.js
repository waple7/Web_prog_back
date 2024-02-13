document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('cardForm');
    const cardContainer = document.getElementById('cardContainer');

    loadFromLocalStorage();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const cardTitle = document.getElementById('cardTitle').value;
        const cardContent = document.getElementById('cardContent').textContent;

        createAndSaveCard(cardTitle, cardContent);

        document.getElementById('cardContent').textContent = '';
    });

    function createAndSaveCard(title, content) {
        if (content.trim() === '') { // если попробовать сделать запрос с пробелом от сработает toaster
            showToastError('Ошибка: Неправильный запрос');
            return;
        }

        const cardData = { title, content };
        const card = createCard(cardData);

        cardContainer.appendChild(card);

        saveToLocalStorage();

        attachDeleteHandler(card);
    }

    function showToastError(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: 'top',
            position: 'left',
            backgroundColor: 'linear-gradient(to right, #AA95DA, #AA95DA)',
        }).showToast();
    }

    function attachDeleteHandler(card) {
        const deleteBtn = card.querySelector('button');
        deleteBtn.addEventListener('click', function () {
            cardContainer.removeChild(card);

            saveToLocalStorage();
        });
    }

    function createCard(cardData) {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = cardData.title;

        const cardContent = document.createElement('p');
        cardContent.textContent = cardData.content;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить заказ';

        card.appendChild(cardTitle);
        card.appendChild(cardContent);
        card.appendChild(deleteBtn);

        return card;
    }

    function saveToLocalStorage() {
        const cards = Array.from(cardContainer.querySelectorAll('.card'));
        const cardsData = cards.map(card => ({
            title: card.querySelector('h2').textContent,
            content: card.querySelector('p').textContent,
        }));
        localStorage.setItem('userInput', JSON.stringify(cardsData));
    }

    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('userInput');
        if (savedData) {
            const cardsData = JSON.parse(savedData);
            cardsData.forEach(cardData => {
                const card = createCard(cardData);
                cardContainer.appendChild(card);
                attachDeleteHandler(card);
            });
        }
    }
});
