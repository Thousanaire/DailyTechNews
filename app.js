async function loadArticles() {
  const res = await fetch("articles.json");
  const data = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  // Loop through each category in the JSON
  for (const categoryName in data) {
    // Create a category header
    const categoryHeader = document.createElement("h2");
    categoryHeader.className = "category-title";
    categoryHeader.textContent = categoryName;
    container.appendChild(categoryHeader);

    // Get all articles in this category
    const articles = data[categoryName];

    // Loop through each article
    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "article-card";

      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <p><strong>Source:</strong> ${article.source}</p>
        <a href="${article.url}" target="_blank">Read original</a>
      `;

      container.appendChild(card);
    });
  }
}

loadArticles();


