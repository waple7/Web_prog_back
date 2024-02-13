let errorOccurred = false;

async function fetchDataFilter(userId) {
    if (errorOccurred) {
        return;
    }

    const fetchString = Math.round(Math.random()) === 0;
    let albumId = fetchString ? 1 : 2;

    let url = `https://jsonplaceholder.typicode.com/users/${userId}/photos?albumId=${albumId}`;


    console.log('URL:', url);

    try {
        const response = await fetch(url);

        if (response.status !== 200) {
            return { error: true, message: 'Ошибка при получении данных' };
        }

        return response.json();
    } catch (error) {
        errorOccurred = true;

        const errorContainer = document.getElementById('error_container');
        errorContainer.style.display = 'block';

        const loadingContainer = document.getElementById('loading_container');
        loadingContainer.style.display = 'none';

        return { error: true, message: 'Ошибка при получении данных' };
    }
}

function update(userDetails) {
    const userDetailsContainer = document.getElementById('user_describe_container');
    const loadingContainer = document.getElementById('loading_container');
    const userCardTemplate = document.getElementById('photo_template');

    userDetailsContainer.innerHTML = '';

    for (const photo of userDetails.slice(0, 5)) {
        const listItem = userCardTemplate.content.cloneNode(true);

        // listItem.querySelector('p').textContent = `AlbumId: ${photo.albumId}, Title: ${photo.title}`;

        listItem.querySelector('p').textContent = `${photo.title}`;


        listItem.querySelector('img').src = photo.thumbnailUrl;

        userDetailsContainer.appendChild(listItem);
    }

    loadingContainer.style.display = 'none';
    userDetailsContainer.style.display = 'flex';
}

async function fetchData(userId, numRequests) {
    for (let i = 0; i < numRequests; i++) {
        try {
            const userData = await fetchDataFilter(userId, i);

            update(userData);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}
const userId = 1;
setTimeout(function () {
    fetchData(userId,1);
}, 1000);
