// ------------------------------
// CACHING LAYER (Option A)
// ------------------------------
async function getCachedData() {
  const CACHE_KEY = "newsData";
  const CACHE_TIME_KEY = "newsDataTime";
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  const now = Date.now();
  const lastFetch = localStorage.getItem(CACHE_TIME_KEY);
  const cached = localStorage.getItem(CACHE_KEY);

  // If cached data exists AND it's fresh, use it
  if (cached && lastFetch && (now - lastFetch < CACHE_DURATION)) {
    return JSON.parse(cached);
  }

  // Otherwise fetch fresh data
  const res = await fetch("https://script.google.com/macros/s/AKfycbwOElKb4jLpqNXrY4dSC4JKiOQizApnBxV6hYZWUkR6QlDNFqnwaJY_9gbEAfD2FvEy/exec");
  const data = await res.json();

  // Save to cache
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, now);

  return data;
}



// ------------------------------
// CATEGORY PAGE
// ------------------------------
async function loadCategory(categoryName) {
  const data = await getCachedData();

  const container = document.getElementById("articles");
  container.innerHTML = "";

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



// ------------------------------
// HOMEPAGE (TOP STORIES)
// ------------------------------
async function loadTopStories() {
  const data = await getCachedData();

  const container = document.getElementById("articles");
  container.innerHTML = "";

  const header = document.createElement("h2");
  header.textContent = "Top Stories";
  header.className = "category-title";
  container.appendChild(header);

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



// ------------------------------
// FULL FEED PAGE
// ------------------------------
async function loadArticles() {
  const data = await getCachedData();

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


