// ============================================================
// CampIgnite Jerseys — Main App Logic
// ============================================================

// ── Cart State ──────────────────────────────────────────────
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
function addToCart(jerseyId, size) {
  const cart = getCart();
  const jersey = JERSEYS.find(j => j.id === jerseyId);
  const key = `${jerseyId}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ key, jerseyId, size, name: jersey.team, type: jersey.type, price: jersey.price, emoji: jersey.emoji, qty: 1 });
  }
  saveCart(cart);
  showToast(`${jersey.emoji} ${jersey.team} (${size}) added to cart!`);
}

// ── Toast ────────────────────────────────────────────────────
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

// ── Jersey Card ──────────────────────────────────────────────
function renderJerseyCard(jersey) {
  const card = document.createElement("div");
  card.className = "jersey-card";
  card.dataset.category = jersey.category;

  const sizeOptions = SIZES.map(s => `<option value="${s}">${s}</option>`).join("");

  card.innerHTML = `
    ${jersey.badge ? `<div class="jersey-badge">${jersey.badge}</div>` : ""}
    <div class="jersey-visual" style="background: linear-gradient(135deg, ${jersey.colors[0]}22, ${jersey.colors[1]}33);">
      <div class="jersey-emoji-wrap">
        <span class="jersey-emoji">${jersey.emoji}</span>
        <span class="jersey-ball">⚽</span>
      </div>
      <div class="jersey-stripe" style="background:${jersey.colors[0]}"></div>
    </div>
    <div class="jersey-info">
      <div class="jersey-league">${jersey.league} · ${jersey.season}</div>
      <h3 class="jersey-team">${jersey.team}</h3>
      <div class="jersey-type">${jersey.type} Kit</div>
      <p class="jersey-desc">${jersey.description}</p>
      <div class="jersey-bottom">
        <div class="jersey-price">KES ${jersey.price.toLocaleString()}</div>
        <div class="jersey-actions-row">
          <select class="size-select" id="size-${jersey.id}">
            <option value="">Size</option>
            ${sizeOptions}
          </select>
          <button class="btn-add" onclick="handleAddToCart(${jersey.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  return card;
}

function handleAddToCart(jerseyId) {
  const sizeEl = document.getElementById(`size-${jerseyId}`);
  if (!sizeEl || !sizeEl.value) {
    showToast("⚠️ Please select a size first!");
    sizeEl && sizeEl.focus();
    return;
  }
  addToCart(jerseyId, sizeEl.value);
}

// ── Render Grid ──────────────────────────────────────────────
function renderGrid(filter = "all") {
  const grid = document.getElementById("jersey-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = filter === "all" ? JERSEYS : JERSEYS.filter(j => j.category === filter);
  filtered.forEach(j => grid.appendChild(renderJerseyCard(j)));
}

// ── Filter Tabs ──────────────────────────────────────────────
function initFilters() {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderGrid(tab.dataset.filter);
    });
  });
}

// ── Hamburger Menu ───────────────────────────────────────────
function initNav() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => menu.classList.toggle("open"));
  }
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderGrid();
  initFilters();
  initNav();
});
