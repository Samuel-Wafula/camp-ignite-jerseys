// ============================================================
// Cart Page Logic — Camp Ignite 2026
// ============================================================

let currentPaymentType = "full";

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

function getTotal(cart) {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderSummary(cart) {
  const linesEl = document.getElementById("summary-lines");
  const totalEl = document.getElementById("summary-total");
  const fullAmountLabel = document.getElementById("full-amount-label");
  if (!linesEl || !totalEl) return;

  const total = getTotal(cart);
  linesEl.innerHTML = cart.map(item => {
    const sub = item.price * item.qty;
    return `<div class="summary-line">
      <span>${item.emoji} ${item.name} (${item.size}) ×${item.qty}</span>
      <span>KES ${sub.toLocaleString()}</span>
    </div>`;
  }).join("");
  totalEl.textContent = `KES ${total.toLocaleString()}`;
  if (fullAmountLabel) fullAmountLabel.textContent = `KES ${total.toLocaleString()}`;
  updatePaymentDisplay(cart, currentPaymentType);
}

function updatePaymentDisplay(cart, type) {
  const total = getTotal(cart);
  const amountDueDisplay = document.getElementById("amount-due-display");
  const depositInfo = document.getElementById("deposit-info");
  const depositSchedule = document.getElementById("deposit-schedule");
  const hiddenPayType = document.getElementById("hidden-payment-type");
  const hiddenAmountToPay = document.getElementById("hidden-amount-to-pay");

  if (type === "deposit") {
    const deposit = DEPOSIT_AMOUNT;
    const balance = total - deposit;
    const perInstalment = Math.ceil(balance / INSTALLMENTS);

    if (amountDueDisplay) amountDueDisplay.textContent = `KES ${deposit.toLocaleString()} (deposit)`;
    if (depositInfo) depositInfo.classList.remove("hidden");
    if (depositSchedule) {
      depositSchedule.innerHTML = `
        <div class="deposit-row">
          <span>💳 Pay now (deposit)</span>
          <span class="deposit-now">KES ${deposit.toLocaleString()}</span>
        </div>
        <div class="deposit-row">
          <span>📅 Instalment 1</span>
          <span>KES ${perInstalment.toLocaleString()}</span>
        </div>
        <div class="deposit-row">
          <span>📅 Instalment 2</span>
          <span>KES ${(balance - perInstalment).toLocaleString()}</span>
        </div>
        <div class="deposit-row total-row">
          <span>Total</span>
          <span>KES ${total.toLocaleString()}</span>
        </div>
        <p class="deposit-note">⚠️ Jersey reserved on deposit. Full balance must be paid before pickup. We'll contact you for instalment dates.</p>
      `;
    }
    if (hiddenPayType) hiddenPayType.value = "deposit-KES800";
    if (hiddenAmountToPay) hiddenAmountToPay.value = `KES ${deposit} (deposit, balance KES ${balance} in ${INSTALLMENTS} instalments)`;
  } else {
    if (amountDueDisplay) amountDueDisplay.textContent = `KES ${total.toLocaleString()}`;
    if (depositInfo) depositInfo.classList.add("hidden");
    if (hiddenPayType) hiddenPayType.value = "full";
    if (hiddenAmountToPay) hiddenAmountToPay.value = `KES ${total.toLocaleString()} (full)`;
  }
}

function fillHiddenFields(cart) {
  const itemsEl = document.getElementById("hidden-items");
  const totalEl = document.getElementById("hidden-total");
  if (itemsEl) itemsEl.value = cart.map(i => `${i.name} ${i.type} (${i.size}) x${i.qty}`).join(", ");
  const total = getTotal(cart);
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

function populateMpesaInfo() {
  const numbersEl = document.getElementById("mpesa-numbers");
  if (!numbersEl) return;
  numbersEl.innerHTML = `
    <div class="mpesa-number-card">
      <div class="mpesa-label">🏪 Till Number (Lipa na M-Pesa → Buy Goods)</div>
      <div class="mpesa-val" onclick="copyText('${PAYMENT_INFO.tillNumber}', this)">${PAYMENT_INFO.tillNumber} <span class="copy-hint">tap to copy</span></div>
    </div>
    <div class="mpesa-account-name">Name: <strong>${PAYMENT_INFO.accountName}</strong></div>
  `;
}

function copyText(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    el.querySelector(".copy-hint").textContent = "✅ Copied!";
    setTimeout(() => el.querySelector(".copy-hint").textContent = "tap to copy", 2000);
  });
}

function closeModal() {
  document.getElementById("success-modal").classList.add("hidden");
  saveCart([]);
  renderCart();
  updateCartBadge();
  window.location.href = "index.html";
}

function initPaymentOptions() {
  document.querySelectorAll('input[name="payment-type"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentPaymentType = e.target.value;
      const cart = getCart();
      updatePaymentDisplay(cart, currentPaymentType);
    });
  });
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
        alert("There was a problem submitting. Please try again or call 0741 366 218.");
        btn.textContent = "🔥 Submit Order";
        btn.disabled = false;
      }
    } catch {
      alert("Network error. Please check your connection or call 0741 366 218.");
      btn.textContent = "🔥 Submit Order";
      btn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateMpesaInfo();
  renderCart();
  initOrderForm();
  initPaymentOptions();
});
