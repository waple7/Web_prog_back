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
        if (content.trim() === '') {
            sendInvalidRequest('');
            return;
        }
        sendSuccessMessage('Карточка успешно создана');
        const cardData = { title, content };
        const card = createCard(cardData);

        cardContainer.appendChild(card);

        saveToLocalStorage();

        attachDeleteHandler(card);
    }


    function sendInvalidRequest(errorMessage) {
        // Создаем объект для отправки на сервер
        const payload = { errorMessage };

        // Отправляем на сервер сообщение об ошибке
        socket.emit('invalidRequest', payload);
    }
    function sendSuccessMessage(successMessage) {
        const payload = { successMessage };

        // Отправляем сообщение о успешном создании карточки на сервер
        socket.emit('success', payload);
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

// Создаем WebSocket соединение
const socket = io(window.location.origin);

// Подписываемся на событие 'error' от сервера
socket.on('error', function (errorMessage) {
    // Выводим сообщение об ошибке
    showToastError(errorMessage);
});

function showToastError(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'left',
        backgroundColor: 'linear-gradient(to right, #AA95DA, #AA95DA)',
    }).showToast();
}

// Подписываемся на событие 'success' от сервера
socket.on('success', function (payload) {
    // Извлекаем сообщение об успешном создании карточки из объекта payload
    const message = payload.successMessage;
    // Выводим сообщение о успешном создании карточки
    showToastSuccess(message);
});


function showToastSuccess(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'left',
        backgroundColor: 'linear-gradient(to right, #AA95DA, #AA95DA)',
    }).showToast();
}

