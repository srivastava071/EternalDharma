/**
 * EternalDharma - Enhanced Product Search & Discovery Engine
 * Provides instant fuzzy matching across scriptures, characters, philosophy, and stories.
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("discoverySearchInput");
  const searchBtn = document.getElementById("discoverySearchBtn");
  const resultsContainer = document.getElementById("discoveryResultsContainer");
  const resultsGrid = document.getElementById("discoveryResultsGrid");
  const resultsCount = document.getElementById("discoveryResultsCount");
  const suggestionChips = document.querySelectorAll(".suggestion-chip");

  // Comprehensive Knowledge Base
  const KNOWLEDGE_BASE = [
    {
      keywords: ["bhagavad gita", "gita", "krishna", "arjuna", "teachings"],
      title: "Bhagavad Gita",
      category: "Scripture • Sacred Dialogue",
      desc: "Lord Krishna's timeless dialogue on duty, righteousness, and detached action.",
      link: "mahabharata.html#bhishma"
    },
    {
      keywords: ["karma", "action", "destiny", "cause", "effect", "फल"],
      title: "Law of Karma",
      category: "Core Philosophy",
      desc: "Understand how conscious intention and selfless action shape destiny.",
      link: "sanatan.html"
    },
    {
      keywords: ["dharma", "duty", "righteousness", "truth", "न्याय", "सत्य"],
      title: "Dharma (Righteous Duty)",
      category: "Core Philosophy",
      desc: "The universal moral cosmic order and individual righteous duty.",
      link: "sanatan.html"
    },
    {
      keywords: ["moksha", "liberation", "freedom", "mukti", "मुक्ति", "मोक्ष"],
      title: "Moksha (Spiritual Liberation)",
      category: "Core Philosophy",
      desc: "The ultimate transcendence beyond the cycle of rebirth into pure bliss.",
      link: "sanatan.html"
    },
    {
      keywords: ["ramayana", "ram", "rama", "sita", "valmiki", "ayodhya"],
      title: "The Ramayana",
      category: "Epic • Itihasa",
      desc: "The journey of Maryada Purushottam Lord Rama and the victory of Dharma over adharma.",
      link: "ramayana.html"
    },
    {
      keywords: ["mahabharata", "kurukshetra", "pandavas", "kauravas", "vyasa"],
      title: "The Mahabharata",
      category: "Epic • 18 Parvas",
      desc: "The greatest epic exploring justice, loyalty, statecraft, and human nature.",
      link: "mahabharata.html"
    },
    {
      keywords: ["hanuman", "bhakti", "sanjeevani", "devotion", "sundara"],
      title: "Lord Hanuman & Pure Bhakti",
      category: "Divine Story • Devotion",
      desc: "The lifting of the Dronagiri mountain and the selfless power of divine devotion.",
      link: "stories.html#hanuman"
    },
    {
      keywords: ["temple", "miracle", "tirupati", "venkateswara", "kashi", "kedarnath"],
      title: "Sacred Temples & Miracles",
      category: "Heritage & Miracles",
      desc: "Ancient Jyotirlingas, coastal shrines, and miraculous answers to devotee prayers.",
      link: "temples.html"
    },
    {
      keywords: ["shloka", "wisdom", "verses", "sanskrit", "daily"],
      title: "Daily Shloka & Verses",
      category: "Daily Wisdom",
      desc: "Curated Sanskrit shlokas with contextual English translations for reflection.",
      link: "#daily-wisdom"
    }
  ];

  function executeSearch(query) {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) {
      // Default view: show top 3 featured results
      renderResults(KNOWLEDGE_BASE.slice(0, 3), "Recommended Explorations");
      return;
    }

    const matches = KNOWLEDGE_BASE.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(cleanQuery);
      const descMatch = item.desc.toLowerCase().includes(cleanQuery);
      const catMatch = item.category.toLowerCase().includes(cleanQuery);
      const kwMatch = item.keywords.some(kw => kw.includes(cleanQuery) || cleanQuery.includes(kw));
      return titleMatch || descMatch || catMatch || kwMatch;
    });

    renderResults(matches, `Results for "${query}"`);
  }

  function renderResults(items, headerText) {
    resultsGrid.innerHTML = "";
    if (resultsCount) {
      resultsCount.textContent = headerText;
    }

    if (items.length === 0) {
      resultsGrid.innerHTML = `
        <div class="no-results-box">
          <p>No direct match found. Try exploring <strong>Dharma</strong>, <strong>Ramayana</strong>, <strong>Karma</strong>, or <strong>Bhagavad Gita</strong>.</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "result-item-card";
      card.innerHTML = `
        <div>
          <span class="result-category-badge">${item.category}</span>
          <h4 class="result-item-title">${item.title}</h4>
          <p class="result-item-desc">${item.desc}</p>
        </div>
        <a href="${item.link}" class="result-item-link">Explore teaching &rarr;</a>
      `;
      card.addEventListener("click", () => {
        window.location.href = item.link;
      });
      resultsGrid.appendChild(card);
    });
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      executeSearch(e.target.value);
    });
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeSearch(searchInput.value);
      }
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      executeSearch(searchInput.value);
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const term = chip.getAttribute("data-term") || chip.textContent.trim();
      if (searchInput) {
        searchInput.value = term;
        searchInput.focus();
      }
      executeSearch(term);
    });
  });

  // Initial State: Render top 3 recommendations
  executeSearch("");
});
