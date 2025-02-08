
document.addEventListener('DOMContentLoaded', fetchNews);




async function fetchNews() {
    const response = await fetch('https://btu-ex-2025-0bf797fecbae.herokuapp.com/news');
    const newsList = await response.json();
    const tbody = document.getElementById('news-list');
    tbody.innerHTML = '';
    console.log(newsList);
    newsList.forEach(news => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${news.id}</td>
            <td>${news.title}</td>
            <td>${news.category}</td>
            <td>${news.likes ? news.likes : 'N/A'}</td>
            <td>${news.dateUpdated ? news.dateUpdated : 'N/A'}</td>
            <td>${news.currentDate ? news.currentDate : 'N/A'}</td>
            <td>
                <button class="btn btn-delete" onclick="deleteNews('${news.id}', this)">Delete</button>
                <button class="btn btn-update" onclick="window.location.href='add-to-list.html?id=${news.id}'">Update</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function deleteNews(id, button) {
    await fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${id}`, { method: 'DELETE' });
    const row = button.closest('tr');
    row.classList.add('fade-out');
    setTimeout(() => row.remove(), 500);
}

document.addEventListener('DOMContentLoaded', fetchNews);