// ============================================================
// Donate Page Logic
// ============================================================

function populateDonateMpesa() {
  const el = document.getElementById("donate-mpesa-numbers");
  if (!el) return;
  el.innerHTML = `
    <div class="mpesa-number-card">
      <div class="mpesa-label">📲 Phone Number (Send Money)</div>
      <div class="mpesa-val" onclick="copyDonateText('${PAYMENT_INFO.phoneNumber}', this)">${PAYMENT_INFO.phoneNumber} <span class="copy-hint">tap to copy</span></div>
    </div>
    <div class="mpesa-number-card">
      <div class="mpesa-label">🏪 Till Number (Buy Goods)</div>
      <div class="mpesa-val" onclick="copyDonateText('${PAYMENT_INFO.tillNumber}', this)">${PAYMENT_INFO.tillNumber} <span class="copy-hint">tap to copy</span></div>
    </div>
    <div class="mpesa-account-name">Account: <strong>${PAYMENT_INFO.accountName}</strong></div>
  `;
}

function copyDonateText(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    el.querySelector(".copy-hint").textContent = "✅ Copied!";
    setTimeout(() => el.querySelector(".copy-hint").textContent = "tap to copy", 2000);
  });
}

function initAmountButtons() {
  let selected = null;
  document.querySelectorAll(".amount-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const customWrap = document.getElementById("custom-input-wrap");
      const amountField = document.getElementById("amount-sent-field");
      const hiddenField = document.getElementById("hidden-donation-amount");

      if (btn.dataset.amount === "custom") {
        customWrap.classList.remove("hidden");
        amountField.value = "";
        const customIn = document.getElementById("custom-amount");
        customIn.addEventListener("input", () => {
          amountField.value = customIn.value;
          if (hiddenField) hiddenField.value = `KES ${customIn.value}`;
        });
      } else {
        customWrap.classList.add("hidden");
        const amt = btn.dataset.amount;
        amountField.value = amt;
        if (hiddenField) hiddenField.value = `KES ${parseInt(amt).toLocaleString()}`;
        selected = amt;
      }
    });
  });
}

function initDonateForm() {
  const form = document.getElementById("donate-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("donate-submit-btn");
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
        document.getElementById("donate-success-modal").classList.remove("hidden");
      } else {
        alert("Could not submit donation form. Please try again.");
        btn.textContent = "❤️ Confirm Donation";
        btn.disabled = false;
      }
    } catch {
      alert("Network error. Check your connection and try again.");
      btn.textContent = "❤️ Confirm Donation";
      btn.disabled = false;
    }
  });
}

function closeDonateModal() {
  document.getElementById("donate-success-modal").classList.add("hidden");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  populateDonateMpesa();
  initAmountButtons();
  initDonateForm();
});
