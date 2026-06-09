// ============================================================
// Cart Page Logic
// ============================================================

function renderCart() {
  const cart = getCart();
  const listEl = document.getElementById("cart-items-list");
  const emptyEl = document.getElementById("cart-empty");
  const summaryCol = document.getElementById("cart-summary-col");

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = "";
    emptyEl && emptyEl.classList.remove("hidden");
    summaryCol && (summaryCol.style.display = "none");
    return;
  }

  emptyEl && emptyEl.classList.add("hidden");
  summaryCol && (summaryCol.style.display = "");
  listEl.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} <span class="cart-item-type">${item.type}</span></div>
        <div class="cart-item-size">Size: <strong>${item.size}</strong></div>
        <div class="cart-item-price">KES ${item.price.toLocaleString()} each</div>
      </div>
      <div class="cart-item-qty-col">
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty('${item.key}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.key}', 1)">+</button>
        </div>
        <div class="cart-item-subtotal">KES ${(item.price * item.qty).toLocaleString()}</div>
        <button class="remove-btn" onclick="removeItem('${item.key}')">🗑️</button>
      </div>
    `;
    listEl.appendChild(row);
  });

  renderSummary(cart);
  fillHiddenFields(cart);
}

function renderSummary(cart) {
  const linesEl = document.getElementById("summary-lines");
  const totalEl = document.getElementById("summary-total");
  if (!linesEl || !totalEl) return;

  let total = 0;
  linesEl.innerHTML = cart.map(item => {
    const sub = item.price * item.qty;
    total += sub;
    return `<div class="summary-line">
      <span>${item.emoji} ${item.name} (${item.size}) ×${item.qty}</span>
      <span>KES ${sub.toLocaleString()}</span>
    </div>`;
  }).join("");
  totalEl.textContent = `KES ${total.toLocaleString()}`;
}

function fillHiddenFields(cart) {
  const itemsEl = document.getElementById("hidden-items");
  const totalEl = document.getElementById("hidden-total");
  if (itemsEl) itemsEl.value = cart.map(i => `${i.name} ${i.type} (${i.size}) x${i.qty}`).join(", ");
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (totalEl) totalEl.value = `KES ${total.toLocaleString()}`;
}

function changeQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
    renderCart();
  }
}

function removeItem(key) {
  const cart = getCart().filter(i => i.key !== key);
  saveCart(cart);
  renderCart();
  showToast("Item removed from cart");
}

// ── Populate M-Pesa Info from data.js ────────────────────────
function populateMpesaInfo() {
  const instrEl = document.getElementById("mpesa-instruction-text");
  const numbersEl = document.getElementById("mpesa-numbers");
  if (!instrEl || !numbersEl) return;

  instrEl.textContent = PAYMENT_INFO.instructions;

  numbersEl.innerHTML = `
    <div class="mpesa-number-card">
      <div class="mpesa-label">📲 Phone Number (Send Money)</div>
      <div class="mpesa-val" onclick="copyText('${PAYMENT_INFO.phoneNumber}', this)">${PAYMENT_INFO.phoneNumber} <span class="copy-hint">tap to copy</span></div>
    </div>
    <div class="mpesa-number-card">
      <div class="mpesa-label">🏪 Till Number (Buy Goods)</div>
      <div class="mpesa-val" onclick="copyText('${PAYMENT_INFO.tillNumber}', this)">${PAYMENT_INFO.tillNumber} <span class="copy-hint">tap to copy</span></div>
    </div>
    <div class="mpesa-account-name">Account Name: <strong>${PAYMENT_INFO.accountName}</strong></div>
  `;
}

function copyText(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    el.querySelector(".copy-hint").textContent = "✅ Copied!";
    setTimeout(() => el.querySelector(".copy-hint").textContent = "tap to copy", 2000);
  });
}

// ── Form submit / success modal ──────────────────────────────
function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
  saveCart([]);
  renderCart();
  updateCartBadge();
  window.location.href = "index.html";
}

function initOrderForm() {
  const form = document.getElementById("order-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    btn.textContent = "Sending…";
    btn.disabled = true;

    const data = new FormData(form);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (res.ok) {
        document.getElementById("success-modal").classList.remove("hidden");
      } else {
        alert("There was a problem submitting your order. Please try again or contact us directly.");
        btn.textContent = "🔥 Submit Order";
        btn.disabled = false;
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
      btn.textContent = "🔥 Submit Order";
      btn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateMpesaInfo();
  renderCart();
  initOrderForm();
});
