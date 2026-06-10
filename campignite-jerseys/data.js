// ============================================================
// JERSEY CATALOG — Camp Ignite 2026 · East Assembly KAG Church
// ============================================================

const PAYMENT_INFO = {
  tillNumber: "3171352",
  phoneNumber: "0741366218",
  accountName: "JOAN NJAU",
  instructions: "Go to M-Pesa → Lipa na M-Pesa → Buy Goods → Enter Till Number, OR Send Money to the phone number above. Then paste your confirmation message in the form.",
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const DEPOSIT_AMOUNT = 800;
const INSTALLMENTS = 2;

const JERSEYS = [
  // ── EPL JERSEYS ──────────────────────────────────────────
  {
    id: 1,
    category: "epl",
    team: "Arsenal",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "🔴",
    crest: "arsenal",
    colors: ["#EF0107", "#FFFFFF"],
    badge: "🏆 Most Popular",
    description: "Iconic red & white home kit. The Gunners' classic look.",
  },
  {
    id: 2,
    category: "epl",
    team: "Manchester City",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "🔵",
    crest: "mancity",
    colors: ["#6CABDD", "#FFFFFF"],
    badge: "",
    description: "Sky blue home jersey of the reigning champions.",
  },
  {
    id: 3,
    category: "epl",
    team: "Liverpool",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "🟥",
    crest: "liverpool",
    colors: ["#C8102E", "#FFFFFF"],
    badge: "🔥 Hot Pick",
    description: "You'll Never Walk Alone. The Reds' famous home strip.",
  },
  {
    id: 4,
    category: "epl",
    team: "Chelsea",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "💙",
    crest: "chelsea",
    colors: ["#034694", "#FFFFFF"],
    badge: "",
    description: "Chelsea's royal blue home kit. Stamford Bridge faithful.",
  },
  {
    id: 5,
    category: "epl",
    team: "Manchester United",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "🔴",
    crest: "manutd",
    colors: ["#DA291C", "#FFE500"],
    badge: "",
    description: "The Theatre of Dreams. United's iconic red home jersey.",
  },
  {
    id: 6,
    category: "epl",
    team: "Tottenham Hotspur",
    league: "Premier League",
    type: "Home",
    season: "2024/25",
    price: 1500,
    emoji: "⚪",
    crest: "spurs",
    colors: ["#FFFFFF", "#132257"],
    badge: "",
    description: "Spurs' crisp white home kit. Glory glory Tottenham.",
  },
  // ── WORLD CUP JERSEYS ────────────────────────────────────
  {
    id: 7,
    category: "worldcup",
    team: "Brazil",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇧🇷",
    crest: null,
    colors: ["#009C3B", "#FFDF00"],
    badge: "⭐ 5× Champions",
    description: "The iconic Seleção yellow & green. Most decorated national team.",
  },
  {
    id: 8,
    category: "worldcup",
    team: "Argentina",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇦🇷",
    crest: null,
    colors: ["#74ACDF", "#FFFFFF"],
    badge: "🏆 Defending Champions",
    description: "Messi's Argentina. The light blue & white stripes of glory.",
  },
  {
    id: 9,
    category: "worldcup",
    team: "France",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇫🇷",
    crest: null,
    colors: ["#002395", "#FFFFFF"],
    badge: "",
    description: "Les Bleus — deep navy blue powerhouse from Paris.",
  },
  {
    id: 10,
    category: "worldcup",
    team: "Spain",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇪🇸",
    crest: null,
    colors: ["#AA151B", "#F1BF00"],
    badge: "",
    description: "La Roja's passionate red. Tiki-taka style and substance.",
  },
  {
    id: 11,
    category: "worldcup",
    team: "Germany",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇩🇪",
    crest: null,
    colors: ["#FFFFFF", "#000000"],
    badge: "",
    description: "Die Mannschaft's classic white. German precision and power.",
  },
  {
    id: 12,
    category: "worldcup",
    team: "Kenya 🦁",
    league: "World Cup 2026",
    type: "Home",
    season: "2026",
    price: 1500,
    emoji: "🇰🇪",
    crest: null,
    colors: ["#006600", "#CC0001"],
    badge: "🏠 Support Home!",
    description: "Harambee Stars. Represent Kenya — the pride of our nation!",
  },
];

// EPL crest SVGs (inline, no external images needed)
const EPL_CRESTS = {
  arsenal: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <polygon points="30,2 58,18 58,52 30,68 2,52 2,18" fill="#EF0107" stroke="#white" stroke-width="1"/>
    <polygon points="30,8 52,22 52,48 30,62 8,48 8,22" fill="#9B0000"/>
    <text x="30" y="32" text-anchor="middle" fill="white" font-size="7" font-weight="bold" font-family="Arial">ARSENAL</text>
    <text x="30" y="44" text-anchor="middle" fill="#FFD700" font-size="5" font-family="Arial">FC</text>
    <circle cx="30" cy="20" r="6" fill="#FFD700"/>
    <text x="30" y="23" text-anchor="middle" fill="#9B0000" font-size="8">⚡</text>
  </svg>`,
  liverpool: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="35" rx="28" ry="33" fill="#C8102E"/>
    <ellipse cx="30" cy="35" rx="22" ry="27" fill="#00B2A9"/>
    <ellipse cx="30" cy="35" rx="16" ry="21" fill="#C8102E"/>
    <text x="30" y="32" text-anchor="middle" fill="white" font-size="6" font-weight="bold" font-family="Arial">LFC</text>
    <text x="30" y="42" text-anchor="middle" fill="#FFD700" font-size="5" font-family="Arial">EST 1892</text>
    <text x="30" y="20" text-anchor="middle" fill="#FFD700" font-size="10">🔱</text>
  </svg>`,
  chelsea: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="56" height="66" rx="8" fill="#034694"/>
    <rect x="8" y="8" width="44" height="54" rx="5" fill="#034694" stroke="#FFD700" stroke-width="2"/>
    <text x="30" y="28" text-anchor="middle" fill="#FFD700" font-size="16">🦁</text>
    <text x="30" y="44" text-anchor="middle" fill="white" font-size="6" font-weight="bold" font-family="Arial">CHELSEA</text>
    <text x="30" y="54" text-anchor="middle" fill="#FFD700" font-size="5" font-family="Arial">FC</text>
  </svg>`,
  mancity: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="35" r="28" fill="#6CABDD"/>
    <circle cx="30" cy="35" r="22" fill="#1C2C5B"/>
    <circle cx="30" cy="35" r="16" fill="#6CABDD"/>
    <text x="30" y="32" text-anchor="middle" fill="white" font-size="6" font-weight="bold" font-family="Arial">MCFC</text>
    <text x="30" y="42" text-anchor="middle" fill="#FFD700" font-size="9">⭐</text>
    <rect x="12" y="8" width="36" height="6" rx="2" fill="#FFD700"/>
  </svg>`,
  manutd: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,2 L58,15 L58,45 Q58,65 30,68 Q2,65 2,45 L2,15 Z" fill="#DA291C"/>
    <path d="M30,10 L50,20 L50,44 Q50,60 30,62 Q10,60 10,44 L10,20 Z" fill="#FFE500" opacity="0.15"/>
    <text x="30" y="30" text-anchor="middle" fill="white" font-size="7" font-weight="bold" font-family="Arial">MUFC</text>
    <text x="30" y="44" text-anchor="middle" fill="#FFE500" font-size="11">⚽</text>
  </svg>`,
  spurs: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="56" height="66" rx="6" fill="#132257"/>
    <rect x="8" y="8" width="44" height="54" rx="4" fill="#132257" stroke="white" stroke-width="1.5"/>
    <text x="30" y="28" text-anchor="middle" fill="white" font-size="18">🐓</text>
    <text x="30" y="46" text-anchor="middle" fill="white" font-size="6" font-weight="bold" font-family="Arial">SPURS</text>
    <text x="30" y="56" text-anchor="middle" fill="#FFD700" font-size="5" font-family="Arial">THFC</text>
  </svg>`,
};
