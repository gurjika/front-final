const apiUrl = "https://btu-ex-2025-0bf797fecbae.herokuapp.com/news";
const form = document.getElementById("news-form");
const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("id");

if (newsId) {
    document.getElementById("form-title").innerText = "Update News";
    fetchNews(newsId);
}

async function fetchNews(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
        document.getElementById("editor-firstname").value = data.editorFirstName;
        document.getElementById("editor-lastname").value = data.editorLastName;
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const editorFirstName = document.getElementById("editor-firstname").value.trim();
    const editorLastName = document.getElementById("editor-lastname").value.trim();
    if (!title || !description || !editorFirstName || !editorLastName) {
        alert("All fields are required!");
        return;
    }

    const newsData = { title, description, category, editorFirstName, editorLastName };

    try {
        let response;
        if (newsId) {
            response = await fetch(`${apiUrl}/${newsId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newsData),
            });
        } else {
            response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newsData),
            });
        }

        if (response.ok) {
            window.location.href = "news-list.html"; 
        } else {
            alert("Failed to save news. Please try again.");
        }
    } catch (error) {
        console.error("Error saving news:", error);
        alert("An error occurred while saving the news.");
    }
});