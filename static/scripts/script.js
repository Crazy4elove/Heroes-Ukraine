document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('heroes-container');
    if (container) {
        fetch('/static/data/data.json')
            .then(response => response.json())
            .then(data => displayHeroes(data.heroes));
    }

    const brigadeContainer = document.getElementById('brigade-members');
    if (brigadeContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const brigadeId = urlParams.get('brigade');
        if (brigadeId) {
            fetch('/static/data/data.json')
                .then(response => response.json())
                .then(data => displayBrigade(data, brigadeId));
        }
    }
});

function displayHeroes(heroes) {
    const container = document.getElementById('heroes-container');
    container.innerHTML = '';

    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('hero-card');
        heroCard.innerHTML = `
            <img src="${hero.photo}" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p><strong>Категорія:</strong> ${hero.category}</p>
            <p><strong>Біографія:</strong> ${hero.bio}</p>
            <p><strong>Статус:</strong> ${hero.status}</p>
            <p><strong>Бригада:</strong> <a href="brigade.html?brigade=${hero.brigadeId}">${hero.brigadeName}</a></p>
        `;
        container.appendChild(heroCard);
    });
}

function displayBrigade(data, brigadeId) {
    const brigade = data.brigades.find(b => b.id === brigadeId);
    if (brigade) {
        document.getElementById('brigade-name').innerText = brigade.name;
        document.getElementById('brigade-info').innerText = brigade.info;

        const membersContainer = document.getElementById('brigade-members');
        membersContainer.innerHTML = '';

        brigade.members.forEach(memberId => {
            const member = data.heroes.find(hero => hero.id === memberId);
            if (member) {
                const memberCard = document.createElement('div');
                memberCard.classList.add('hero-card');
                memberCard.innerHTML = `
                    <img src="${member.photo}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.bio}</p>
                `;
                membersContainer.appendChild(memberCard);
            }
        });
    }
}

function filterHeroes(category) {
    fetch('/static/data/data.json')
        .then(response => response.json())
        .then(data => {
            if (category === 'active') {
                const filtered = data.heroes.filter(hero => hero.status === 'На передовій');
                displayHeroes(filtered);
                }

            else if (category === 'fallen') {
                filtered = data.heroes.filter(hero => hero.status === 'Загинув');
                displayHeroes(filtered);
                }

            else if (category === 'volunteers') {
                filtered = data.heroes.filter(hero => hero.status === 'Волонтер');
                displayHeroes(filtered);
                }

            else if (category === 'prisoners'){
                filtered = data.heroes.filter(hero => hero.status === 'Полонений');
                displayHeroes(filtered);
                }

            else if (category === 'awarded'){
                filtered = data.heroes.filter(hero => hero.status === 'Нагородженний');
                displayHeroes(filtered);
                }
            else {
                const filtered = category === 'all' ? data.heroes : data.heroes.filter(hero => hero.category === category);
                displayHeroes(filtered);
                }
        });
}

