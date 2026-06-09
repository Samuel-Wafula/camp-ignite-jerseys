# 🔥 CampIgnite Jerseys — East Assembly KAG Church

A fundraiser jersey shop for CampIgnite 2025 annual camp.

---

## 🚀 STEP 1: Set Your M-Pesa Details

Open `data.js` and update these two lines at the top:

```js
const PAYMENT_INFO = {
  tillNumber: "XXXXXXX",       // ← your Lipa Na M-Pesa Till Number
  phoneNumber: "07XX XXX XXX", // ← your personal M-Pesa number
  accountName: "East Assembly KAG",
  ...
};
```

---

## 🌐 STEP 2: Deploy to Netlify (Free)

### Option A — Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com) and sign up/log in
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the entire `campignite-jerseys` folder into the upload box
4. Your site goes live instantly with a URL like `campignite-jerseys.netlify.app`
5. (Optional) Change site name under Site Settings → Site details

### Option B — GitHub (Recommended for updates)
1. Push this folder to a GitHub repo
2. In Netlify: **"Add new site"** → **"Import from Git"** → connect GitHub
3. Set build command: *(leave empty)*  
   Set publish directory: `.`
4. Click Deploy. Any future `git push` auto-deploys!

### Custom Domain (Optional)
- In Netlify → Site Settings → Domain Management → Add custom domain
- e.g. `campignite.eastassembly.church`

---

## 📋 How Order Notifications Work (Netlify Forms)

Netlify automatically captures all form submissions. To receive them:
1. In Netlify dashboard → **Forms** tab → you'll see all orders & donations
2. Go to **Forms → Settings → Form notifications** → Add email notification
3. Enter your email — you'll get emailed for every order and donation!

No backend or database needed. All free.

---

## 🔧 Customization

### Add/Remove Jerseys
Edit the `JERSEYS` array in `data.js`. Each jersey needs:
- `id` — unique number
- `category` — `"epl"` or `"worldcup"`  
- `team`, `league`, `type`, `season`, `price`
- `emoji`, `colors` — array of 2 hex colors for the card background
- `badge` — optional tag (e.g. `"🔥 Hot Pick"`) or `""`
- `description` — short blurb

### Change Prices
Edit the `price` field (in KES) for each jersey in `data.js`.

### Change Camp Name / Church Name
Search-replace `CampIgnite` and `East Assembly KAG` across the HTML files.

---

## 📦 File Structure

```
campignite-jerseys/
├── index.html      — Shop homepage
├── cart.html       — Cart + M-Pesa checkout
├── donate.html     — Donation page
├── style.css       — All styles
├── data.js         — 🔑 Jersey catalog + M-Pesa details (EDIT THIS)
├── app.js          — Shared cart logic
├── cart.js         — Cart page logic
├── donate.js       — Donate page logic
├── netlify.toml    — Netlify config
└── README.md       — This file
```

---

## 💡 Optional: Supabase Backend (Advanced)

If you want to store orders in a database (useful for tracking inventory):

1. Sign up free at [supabase.com](https://supabase.com)
2. Create a project → create a table `orders` with columns:
   - `id`, `name`, `phone`, `items`, `total`, `mpesa_code`, `created_at`
3. Use Supabase JS SDK to save orders on form submit
4. View all orders from the Supabase dashboard

This is **optional** — Netlify Forms is sufficient for most use cases.

---

Made with ❤️ for CampIgnite 2025 · God bless!
