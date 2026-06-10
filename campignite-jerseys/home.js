// ── Register Modal ───────────────────────────────────────────
document.getElementById("open-register-btn").addEventListener("click", () => {
  document.getElementById("register-modal").classList.remove("hidden");
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("register-submit-btn");
  btn.textContent = "Registering…";
  btn.disabled = true;

  const data = new FormData(e.target);
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });
    document.getElementById("register-modal").classList.add("hidden");
    document.getElementById("register-success-modal").classList.remove("hidden");
    e.target.reset();
  } catch {
    alert("Network error. Please try again.");
  }
  btn.textContent = "🔥 Register for Camp Ignite 2026";
  btn.disabled = false;
});

// ── Suggest a Jersey Form ────────────────────────────────────
document.getElementById("suggest-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("suggest-submit");
  btn.textContent = "Sending…";
  btn.disabled = true;

  const data = new FormData(e.target);
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });
    document.getElementById("suggest-success-modal").classList.remove("hidden");
    e.target.reset();
  } catch {
    alert("Network error. Please try again.");
  }
  btn.textContent = "Send Suggestion";
  btn.disabled = false;
});

// Close modals on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
});
