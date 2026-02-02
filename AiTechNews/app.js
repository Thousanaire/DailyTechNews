async function loadArticles() {
  const res = await fetch("articles.json");
  const articles = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";

    card.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.summary}</p>
      <p><strong>Source:</strong> ${article.source}</p>
      <a href="${article.url}" target="_blank">Read original</a>
    `;

    container.appendChild(card);
  });
}

loadArticles();
