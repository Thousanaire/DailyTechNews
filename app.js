// Load ONLY one category (used on category pages)
async function loadCategory(categoryName) {
  const res = await fetch("articles.json");
  const data = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  // Category title
  const header = document.createElement("h2");
  header.className = "category-title";
  header.textContent = categoryName;
  container.appendChild(header);

  const articles = data[categoryName];

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



// Load TOP STORIES (homepage)
async function loadTopStories() {
  const res = await fetch("articles.json");
  const data = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  // Top Stories header
  const header = document.createElement("h2");
  header.textContent = "Top Stories";
  header.className = "category-title";
  container.appendChild(header);

  // Loop through each category and take the first article
  for (const categoryName in data) {
    const articles = data[categoryName];
    const topArticle = articles[0];

    if (topArticle) {
      const card = document.createElement("div");
      card.className = "article-card";

      card.innerHTML = `
        <h3>${topArticle.title}</h3>
        <p>${topArticle.summary}</p>
        <p><strong>Category:</strong> ${categoryName}</p>
        <p><strong>Source:</strong> ${topArticle.source}</p>
        <a href="${topArticle.url}" target="_blank">Read original</a>
      `;

      container.appendChild(card);
    }
  }
}



// Load ALL articles (optional full feed page)
async function loadArticles() {
  const res = await fetch("articles.json");
  const data = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  for (const categoryName in data) {
    const categoryHeader = document.createElement("h2");
    categoryHeader.className = "category-title";
    categoryHeader.textContent = categoryName;
    container.appendChild(categoryHeader);

    const articles = data[categoryName];

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
