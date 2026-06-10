// ============================================================
// Camp Ignite Jerseys — Main App Logic
// ============================================================

function getCart() {
  return JSON.parse(localStorage.getItem("ci_cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("ci_cart", JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "inline" : "none";
  });
}
function addToCart(jerseyId, size, kitType) {
  const cart = getCart();
  const jersey = JERSEYS.find(j => j.id === jerseyId);
  const key = `${jerseyId}-${size}-${kitType}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ key, jerseyId, size, kitType, name: jersey.team, type: kitType, price: jersey.price, emoji: jersey.emoji, qty: 1 });
  }
  saveCart(cart);
  showToast(`${jersey.emoji} ${jersey.team} ${kitType} (${size}) added!`);
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderJerseyCard(jersey) {
  const card = document.createElement("div");
  card.className = "jersey-card";
  card.dataset.category = jersey.category;

  const sizeOptions = SIZES.map(s => `<option value="${s}">${s}</option>`).join("");

  // EPL crests vs emoji for world cup
  let visualContent;
  if (jersey.category === "epl" && jersey.crest && EPL_CRESTS[jersey.crest]) {
    visualContent = `<div class="jersey-crest-wrap">${EPL_CRESTS[jersey.crest]}</div>`;
  } else {
    visualContent = `<div class="jersey-emoji-wrap">
      <span class="jersey-emoji">${jersey.emoji}</span>
      <span class="jersey-ball">⚽</span>
    </div>`;
  }

  card.innerHTML = `
    ${jersey.badge ? `<div class="jersey-badge">${jersey.badge}</div>` : ""}
    <div class="jersey-visual" id="visual-${jersey.id}" style="background: linear-gradient(135deg, ${jersey.colors[0]}33, ${jersey.colors[1]}22);">
      ${visualContent}
      <div class="jersey-stripe" style="background:${jersey.colors[0]}"></div>
    </div>
    <div class="jersey-info">
      <div class="jersey-league">${jersey.league} · ${jersey.season}</div>
      <h3 class="jersey-team">${jersey.team}</h3>
      <div class="jersey-type-display" id="kit-label-${jersey.id}">${jersey.type} Kit</div>
      <p class="jersey-desc">${jersey.description}</p>
      <div class="jersey-bottom">
        <div class="jersey-price">KES ${jersey.price.toLocaleString()}</div>
        <div class="jersey-selects-row">
          <select class="kit-select" id="kit-${jersey.id}" onchange="onKitChange(${jersey.id}, this.value)">
            <option value="Home">🏠 Home Kit</option>
            <option value="Away">✈️ Away Kit</option>
          </select>
          <select class="size-select" id="size-${jersey.id}">
            <option value="">Size</option>
            ${sizeOptions}
          </select>
        </div>
        <button class="btn-add" onclick="handleAddToCart(${jersey.id})">Add to Cart</button>
      </div>
    </div>
  `;
  return card;
}

// When kit changes, flip the card's visual colour tone
function onKitChange(jerseyId, kitValue) {
  const jersey = JERSEYS.find(j => j.id === jerseyId);
  const visual = document.getElementById(`visual-${jerseyId}`);
  const label = document.getElementById(`kit-label-${jerseyId}`);
  if (!visual || !jersey) return;

  if (kitValue === "Away") {
    // Swap colours for away look
    visual.style.background = `linear-gradient(135deg, ${jersey.colors[1]}44, ${jersey.colors[0]}22)`;
  } else {
    visual.style.background = `linear-gradient(135deg, ${jersey.colors[0]}33, ${jersey.colors[1]}22)`;
  }
  if (label) label.textContent = `${kitValue} Kit`;
}

function handleAddToCart(jerseyId) {
  const sizeEl = document.getElementById(`size-${jerseyId}`);
  const kitEl  = document.getElementById(`kit-${jerseyId}`);
  if (!sizeEl || !sizeEl.value) {
    showToast("⚠️ Please select a size first!");
    sizeEl && sizeEl.focus();
    return;
  }
  const kitType = kitEl ? kitEl.value : "Home";
  addToCart(jerseyId, sizeEl.value, kitType);
}

function renderGrid(filter = "all") {
  const grid = document.getElementById("jersey-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = filter === "all" ? JERSEYS : JERSEYS.filter(j => j.category === filter);
  filtered.forEach(j => grid.appendChild(renderJerseyCard(j)));
}

function initFilters() {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderGrid(tab.dataset.filter);
    });
  });
}

function initNav() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => menu.classList.toggle("open"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderGrid();
  initFilters();
  initNav();
});
