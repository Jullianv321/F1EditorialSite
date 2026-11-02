// F1 2026 Editorial Dataset
// Drivers, Constructors, Cars, Sponsors & Season Metrics
// All data reflects the projected 2026 regulation era grid.

export type TeamId =
  | "mclaren"
  | "ferrari"
  | "redbull"
  | "mercedes"
  | "astonmartin"
  | "alpine"
  | "williams"
  | "racingbulls"
  | "sauber"
  | "haas";

export interface Team {
  id: TeamId;
  name: string;
  fullName: string;
  short: string; // 3-letter code
  base: string;
  principal: string;
  powerUnit: string;
  accent: string; // hex team accent
  accentSoft: string; // translucent accent
  chassis: string;
  founded: number;
  titles: number; // constructor titles
  livery: string; // livery description
}

export interface Driver {
  id: string;
  name: string;
  number: number;
  team: TeamId;
  country: string;
  countryCode: string; // ISO-ish for flag
  engine: string;
  role: "lead" | "support";
  stats: {
    wins: number;
    podiums: number;
    poles: number;
    titles: number;
    seasons: number;
  };
  brand: {
    motto: string;
    helmet: string; // helmet / personal logo descriptor
    ventures: string[]; // merchandise, fashion, esports, etc.
    sponsors: string[];
  };
}

export interface CarSpec {
  team: TeamId;
  chassis: string;
  powerUnit: string;
  puConfig: string;
  electricPower: number; // kW
  combustionPower: number; // hp
  totalPower: number; // hp
  weight: number; // kg
  topSpeed: number; // km/h
  fuel: string;
  aero: string;
  gearbox: string;
  ersBattery: number; // kWh
}

export type SponsorSector =
  | "Tech"
  | "Crypto"
  | "Luxury Watches"
  | "Automotive"
  | "Apparel"
  | "Energy"
  | "Financial";

export interface Sponsor {
  id: string;
  name: string;
  sector: SponsorSector;
  tier: "Title" | "Principal" | "Technical" | "Official" | "Regional";
  teams: TeamId[];
  origin: string;
  founded: number;
  note: string;
}

export interface StandingRow {
  pos: number;
  driver: string;
  team: TeamId;
  pts: number;
}

export const TEAMS: Team[] = [
  {
    id: "mclaren",
    name: "McLaren",
    fullName: "McLaren Formula 1 Team",
    short: "MCL",
    base: "Woking, United Kingdom",
    principal: "Andrea Stella",
    powerUnit: "Mercedes",
    accent: "#FF8000",
    accentSoft: "rgba(255,128,0,0.14)",
    chassis: "MCL40",
    founded: 1963,
    titles: 9,
    livery: "Papaya orange over matte carbon, anthracite sidepods.",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    fullName: "Scuderia Ferrari HP",
    short: "FER",
    base: "Maranello, Italy",
    principal: "Frédéric Vasseur",
    powerUnit: "Ferrari 068",
    accent: "#E10600",
    accentSoft: "rgba(225,6,0,0.16)",
    chassis: "678",
    founded: 1929,
    titles: 16,
    livery: "Rosso Scuderia with HP cyan accents on engine cover.",
  },
  {
    id: "redbull",
    name: "Red Bull",
    fullName: "Oracle Red Bull Racing",
    short: "RBR",
    base: "Milton Keynes, United Kingdom",
    principal: "Christian Horner",
    powerUnit: "Honda RBPT / Ford",
    accent: "#FF1E1E",
    accentSoft: "rgba(255,30,30,0.14)",
    chassis: "RB22",
    founded: 2005,
    titles: 6,
    livery: "Midnight navy with red & yellow nose trim.",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    fullName: "Mercedes-AMG Petronas F1 Team",
    short: "MER",
    base: "Brackley, United Kingdom",
    principal: "Toto Wolff",
    powerUnit: "Mercedes M16",
    accent: "#00D7B6",
    accentSoft: "rgba(0,215,182,0.14)",
    chassis: "W17",
    founded: 1954,
    titles: 8,
    livery: "Silver Arrows with Petronas teal & ING black.",
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    fullName: "Aston Martin Aramco F1 Team",
    short: "AMR",
    base: "Silverstone, United Kingdom",
    principal: "Andy Cowell",
    powerUnit: "Honda",
    accent: "#00665E",
    accentSoft: "rgba(0,102,94,0.18)",
    chassis: "AMR26",
    founded: 2021,
    titles: 0,
    livery: "Aston Martin Racing Green with lime dab.",
  },
  {
    id: "alpine",
    name: "Alpine",
    fullName: "BWT Alpine F1 Team",
    short: "ALP",
    base: "Enstone, United Kingdom",
    principal: "Oliver Oakes",
    powerUnit: "Mercedes",
    accent: "#22C2D6",
    accentSoft: "rgba(34,194,214,0.16)",
    chassis: "A526",
    founded: 1981,
    titles: 2,
    livery: "BWT pink & French blue split livery.",
  },
  {
    id: "williams",
    name: "Williams",
    fullName: "Atlassian Williams Racing",
    short: "WIL",
    base: "Grove, United Kingdom",
    principal: "James Vowles",
    powerUnit: "Mercedes",
    accent: "#1868DB",
    accentSoft: "rgba(24,104,219,0.16)",
    chassis: "FW48",
    founded: 1977,
    titles: 9,
    livery: "Williams racing blue with Atlassian cyan.",
  },
  {
    id: "racingbulls",
    name: "Racing Bulls",
    fullName: "Visa Cash App RB F1 Team",
    short: "RB",
    base: "Faenza, Italy",
    principal: "Laurent Mekies",
    powerUnit: "Honda RBPT",
    accent: "#7B2FF7",
    accentSoft: "rgba(123,47,247,0.16)",
    chassis: "VCARB 02",
    founded: 2006,
    titles: 0,
    livery: "Indigo & navy with Visa / Cash App red.",
  },
  {
    id: "sauber",
    name: "Sauber / Audi",
    fullName: "Audi F1 Team",
    short: "AUD",
    base: "Hinwil, Switzerland",
    principal: "Mattia Binotto",
    powerUnit: "Audi (in-house)",
    accent: "#BB0A30",
    accentSoft: "rgba(187,10,48,0.16)",
    chassis: "C46",
    founded: 1993,
    titles: 0,
    livery: "Audi crimson silver, transitional 2026 works entry.",
  },
  {
    id: "haas",
    name: "Haas",
    fullName: "MoneyGram Haas F1 Team",
    short: "HAS",
    base: "Kannapolis, USA",
    principal: "Ayao Komatsu",
    powerUnit: "Ferrari",
    accent: "#B60046",
    accentSoft: "rgba(182,0,70,0.16)",
    chassis: "VF-26",
    founded: 2016,
    titles: 0,
    livery: "White with MoneyGram red & Toyota GR dark accents.",
  },
];

export const DRIVERS: Driver[] = [
  {
    id: "norris",
    name: "Lando Norris",
    number: 4,
    team: "mclaren",
    country: "United Kingdom",
    countryCode: "GB",
    engine: "Mercedes",
    role: "lead",
    stats: { wins: 7, podiums: 28, poles: 11, titles: 0, seasons: 7 },
    brand: {
      motto: "Stay sharp. Have fun.",
      helmet: "Quartered zig-zag, Union Jack chrome overlay.",
      ventures: ["Quadrant esports", "LN4 apparel", "Minter Collection"],
      sponsors: ["Centine", "Bell Helmets", "Crypto.com"],
    },
  },
  {
    id: "piastri",
    name: "Oscar Piastri",
    number: 81,
    team: "mclaren",
    country: "Australia",
    countryCode: "AU",
    engine: "Mercedes",
    role: "support",
    stats: { wins: 5, podiums: 18, poles: 6, titles: 0, seasons: 3 },
    brand: {
      motto: "Ice over fire.",
      helmet: "Sleek matte black, pink lightning spine.",
      ventures: ["OP81 karting program", "Melbourne academy"],
      sponsors: ["Castore", "Rolex"],
    },
  },
  {
    id: "leclerc",
    name: "Charles Leclerc",
    number: 16,
    team: "ferrari",
    country: "Monaco",
    countryCode: "MC",
    engine: "Ferrari 068",
    role: "lead",
    stats: { wins: 8, podiums: 41, poles: 27, titles: 0, seasons: 8 },
    brand: {
      motto: "From Monaco, for Maranello.",
      helmet: "Monégasque red & white, ceramic lion crest.",
      ventures: ["No.16 ice cream", "CL16 capsule", "Lec esports"],
      sponsors: ["Richard Mille", "Puma", "Red Bull (legacy)"],
    },
  },
  {
    id: "hamilton",
    name: "Lewis Hamilton",
    number: 44,
    team: "ferrari",
    country: "United Kingdom",
    countryCode: "GB",
    engine: "Ferrari 068",
    role: "support",
    stats: { wins: 105, podiums: 202, poles: 104, titles: 7, seasons: 19 },
    brand: {
      motto: "Still I rise.",
      helmet: "Black & chrome, prancing horse + 44 cypher.",
      ventures: ["+44 capsule", "Mission 44 foundation", "Neat Burger"],
      sponsors: ["Monster", "Police eyewear", "Tommy Hilfiger"],
    },
  },
  {
    id: "verstappen",
    name: "Max Verstappen",
    number: 1,
    team: "redbull",
    country: "Netherlands",
    countryCode: "NL",
    engine: "Honda RBPT",
    role: "lead",
    stats: { wins: 64, podiums: 116, poles: 40, titles: 4, seasons: 11 },
    brand: {
      motto: "Simply lovely.",
      helmet: "Orange-red lion, three stars stacked.",
      ventures: ["Verstappen.com Racing", "Team Redline esports"],
      sponsors: ["Bybit", "Red Bull", "CarNext"],
    },
  },
  {
    id: "tsunoda",
    name: "Yuki Tsunoda",
    number: 22,
    team: "redbull",
    country: "Japan",
    countryCode: "JP",
    engine: "Honda RBPT",
    role: "support",
    stats: { wins: 0, podiums: 1, poles: 0, titles: 0, seasons: 6 },
    brand: {
      motto: "Move with intent.",
      helmet: "Rising-sun gradient, neon orange stripe.",
      ventures: ["Honda talent program", "JL partnership"],
      sponsors: ["Honda", "Castrol"],
    },
  },
  {
    id: "russell",
    name: "George Russell",
    number: 63,
    team: "mercedes",
    country: "United Kingdom",
    countryCode: "GB",
    engine: "Mercedes M16",
    role: "lead",
    stats: { wins: 4, podiums: 24, poles: 6, titles: 0, seasons: 7 },
    brand: {
      motto: "Mr. Saturday.",
      helmet: "Petronas teal chevrons, GR monogram.",
      ventures: ["GR6 merchandise", "Bristol Motorsport Trust"],
      sponsors: ["Boss", "IWC Schaffhausen"],
    },
  },
  {
    id: "antonelli",
    name: "Andrea Kimi Antonelli",
    number: 12,
    team: "mercedes",
    country: "Italy",
    countryCode: "IT",
    engine: "Mercedes M16",
    role: "support",
    stats: { wins: 0, podiums: 2, poles: 1, titles: 0, seasons: 1 },
    brand: {
      motto: "Bologna-built.",
      helmet: "Italian tricolor spine, silver star crown.",
      ventures: ["Kimi Karting Academy"],
      sponsors: ["Puma", "Mercedes-AMG"],
    },
  },
  {
    id: "alonso",
    name: "Fernando Alonso",
    number: 14,
    team: "astonmartin",
    country: "Spain",
    countryCode: "ES",
    engine: "Honda",
    role: "lead",
    stats: { wins: 32, podiums: 106, poles: 22, titles: 2, seasons: 23 },
    brand: {
      motto: "El Plan. Siempre.",
      helmet: "Asturian blue & yellow, samurai side panel.",
      ventures: ["Kimoa fashion", "Alonso esports", "No.14 museum"],
      sponsors: ["Boss", "Castrol", "Bang & Olufsen"],
    },
  },
  {
    id: "stroll",
    name: "Lance Stroll",
    number: 18,
    team: "astonmartin",
    country: "Canada",
    countryCode: "CA",
    engine: "Honda",
    role: "support",
    stats: { wins: 0, podiums: 5, poles: 1, titles: 0, seasons: 9 },
    brand: {
      motto: "Quiet, then quick.",
      helmet: "Canadian maple leaf on green base.",
      ventures: ["Stroll performance line"],
      sponsors: ["Hackett", "Bombardier"],
    },
  },
  {
    id: "gasly",
    name: "Pierre Gasly",
    number: 10,
    team: "alpine",
    country: "France",
    countryCode: "FR",
    engine: "Mercedes",
    role: "lead",
    stats: { wins: 1, podiums: 5, poles: 1, titles: 0, seasons: 8 },
    brand: {
      motto: "Toujours en avance.",
      helmet: "French tricolor fade, tiger emblem.",
      ventures: ["PG10 apparel", "Le Mans karting"],
      sponsors: ["Kappa", "Red Bull (legacy)"],
    },
  },
  {
    id: "colapinto",
    name: "Franco Colapinto",
    number: 43,
    team: "alpine",
    country: "Argentina",
    countryCode: "AR",
    engine: "Mercedes",
    role: "support",
    stats: { wins: 0, podiums: 0, poles: 0, titles: 0, seasons: 2 },
    brand: {
      motto: "De Buenos Aires al mundo.",
      helmet: "Sky-blue & white, condor silhouette.",
      ventures: ["FC43 fan club", "Argentina karting fund"],
      sponsors: ["Mercado Libre", "Globant"],
    },
  },
  {
    id: "albon",
    name: "Alexander Albon",
    number: 23,
    team: "williams",
    country: "Thailand",
    countryCode: "TH",
    engine: "Mercedes",
    role: "lead",
    stats: { wins: 0, podiums: 2, poles: 0, titles: 0, seasons: 6 },
    brand: {
      motto: "Smooth is fast.",
      helmet: "Thai flag band, electric blue gloss.",
      ventures: ["AA23 karting", "Bangkok esports"],
      sponsors: ["Castore", "Lavazza"],
    },
  },
  {
    id: "sainz",
    name: "Carlos Sainz",
    number: 55,
    team: "williams",
    country: "Spain",
    countryCode: "ES",
    engine: "Mercedes",
    role: "support",
    stats: { wins: 4, podiums: 27, poles: 6, titles: 0, seasons: 11 },
    brand: {
      motto: "Smooth operator.",
      helmet: "Matador red, two-star nose, banana accent.",
      ventures: ["CS55 capsule", "Madrid junior cup"],
      sponsors: ["Estrella Galicia", "PlayStation"],
    },
  },
  {
    id: "hadjar",
    name: "Isack Hadjar",
    number: 6,
    team: "racingbulls",
    country: "France",
    countryCode: "FR",
    engine: "Honda RBPT",
    role: "lead",
    stats: { wins: 0, podiums: 1, poles: 0, titles: 0, seasons: 1 },
    brand: {
      motto: "Next-gen pace.",
      helmet: "Tricolor swoosh on graphite shell.",
      ventures: ["IH6 academy"],
      sponsors: ["Red Bull", "Puma"],
    },
  },
  {
    id: "lawson",
    name: "Liam Lawson",
    number: 30,
    team: "racingbulls",
    country: "New Zealand",
    countryCode: "NZ",
    engine: "Honda RBPT",
    role: "support",
    stats: { wins: 0, podiums: 0, poles: 0, titles: 0, seasons: 2 },
    brand: {
      motto: "Quiet storm.",
      helmet: "Silver fern over indigo, LL30 mark.",
      ventures: ["LL30 karting NZ"],
      sponsors: ["Red Bull", "Puma"],
    },
  },
  {
    id: "hulkenberg",
    name: "Nico Hülkenberg",
    number: 27,
    team: "sauber",
    country: "Germany",
    countryCode: "DE",
    engine: "Audi",
    role: "lead",
    stats: { wins: 0, podiums: 2, poles: 1, titles: 0, seasons: 15 },
    brand: {
      motto: "Der Hülk.",
      helmet: "German black-red-gold, crossed flags crest.",
      ventures: ["NH27 karting"],
      sponsors: ["Audi", "Boss"],
    },
  },
  {
    id: "bortoleto",
    name: "Gabriel Bortoleto",
    number: 5,
    team: "sauber",
    country: "Brazil",
    countryCode: "BR",
    engine: "Audi",
    role: "support",
    stats: { wins: 0, podiums: 0, poles: 0, titles: 0, seasons: 1 },
    brand: {
      motto: "Brazil returns.",
      helmet: "Green-yellow samba stripe, GB5 monogram.",
      ventures: ["BRT karting São Paulo"],
      sponsors: ["Audi", "Energisa"],
    },
  },
  {
    id: "ocon",
    name: "Esteban Ocon",
    number: 31,
    team: "haas",
    country: "France",
    countryCode: "FR",
    engine: "Ferrari",
    role: "lead",
    stats: { wins: 1, podiums: 4, poles: 0, titles: 0, seasons: 9 },
    brand: {
      motto: "Never give up.",
      helmet: "Tricolor slash, EO31 star field.",
      ventures: ["EO31 merchandise"],
      sponsors: ["Bell Helmets", "Richard Mille"],
    },
  },
  {
    id: "bearman",
    name: "Oliver Bearman",
    number: 87,
    team: "haas",
    country: "United Kingdom",
    countryCode: "GB",
    engine: "Ferrari",
    role: "support",
    stats: { wins: 0, podiums: 0, poles: 0, titles: 0, seasons: 1 },
    brand: {
      motto: "Essex-built.",
      helmet: "Union Jack cutout, OB87 lion mark.",
      ventures: ["OB87 apparel", "Ferrari Driver Academy"],
      sponsors: ["Ferrari", "Puma"],
    },
  },
];

export const CAR_SPECS: CarSpec[] = [
  {
    team: "mclaren",
    chassis: "MCL40",
    powerUnit: "Mercedes M16",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 650,
    totalPower: 1010,
    weight: 768,
    topSpeed: 352,
    fuel: "100% sustainable e-fuel",
    aero: "Active front/rear wing, Z-mode low-drag",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "ferrari",
    chassis: "678",
    powerUnit: "Ferrari 068",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 645,
    totalPower: 995,
    weight: 770,
    topSpeed: 350,
    fuel: "100% sustainable bio-fuel",
    aero: "Active aero, ground-effect diffuser v3",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "redbull",
    chassis: "RB22",
    powerUnit: "Honda RBPT / Ford",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 660,
    totalPower: 1020,
    weight: 768,
    topSpeed: 354,
    fuel: "100% sustainable e-fuel",
    aero: "Pulled-rod front, active rear wing",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "mercedes",
    chassis: "W17",
    powerUnit: "Mercedes M16",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 655,
    totalPower: 1005,
    weight: 769,
    topSpeed: 351,
    fuel: "100% sustainable bio-fuel",
    aero: "Zero-pod v2, active sidepod aero",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "astonmartin",
    chassis: "AMR26",
    powerUnit: "Honda",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 658,
    totalPower: 1008,
    weight: 771,
    topSpeed: 349,
    fuel: "100% sustainable e-fuel",
    aero: "Silverstone-tuned sidepods, active wing",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "alpine",
    chassis: "A526",
    powerUnit: "Mercedes M16",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 655,
    totalPower: 1005,
    weight: 772,
    topSpeed: 348,
    fuel: "100% sustainable bio-fuel",
    aero: "Downwash sidepods, pull-rod front",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "williams",
    chassis: "FW48",
    powerUnit: "Mercedes M16",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 655,
    totalPower: 1005,
    weight: 769,
    topSpeed: 350,
    fuel: "100% sustainable e-fuel",
    aero: "Compact rear end, active DRS wing",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "racingbulls",
    chassis: "VCARB 02",
    powerUnit: "Honda RBPT",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 658,
    totalPower: 1008,
    weight: 770,
    topSpeed: 349,
    fuel: "100% sustainable e-fuel",
    aero: "Red Bull-derived floor, active aero",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "sauber",
    chassis: "C46",
    powerUnit: "Audi (in-house)",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 652,
    totalPower: 1002,
    weight: 771,
    topSpeed: 348,
    fuel: "100% sustainable e-fuel",
    aero: "Audi debut aero philosophy, active wing",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
  {
    team: "haas",
    chassis: "VF-26",
    powerUnit: "Ferrari 068",
    puConfig: "1.6L V6 Turbo + 350kW ERS",
    electricPower: 350,
    combustionPower: 645,
    totalPower: 995,
    weight: 772,
    topSpeed: 347,
    fuel: "100% sustainable bio-fuel",
    aero: "Toyota-co developed floor, active wing",
    gearbox: "8-speed sequential carbon",
    ersBattery: 4.0,
  },
];

export const SPONSORS: Sponsor[] = [
  { id: "oracle", name: "Oracle", sector: "Tech", tier: "Title", teams: ["redbull"], origin: "USA", founded: 1977, note: "Title partner of Red Bull Racing cloud infra." },
  { id: "hp", name: "HP", sector: "Tech", tier: "Title", teams: ["ferrari"], origin: "USA", founded: 1939, note: "Title partner of Scuderia Ferrari HP." },
  { id: "atlassian", name: "Atlassian", sector: "Tech", tier: "Title", teams: ["williams"], origin: "Australia", founded: 2002, note: "Title partner of Williams Racing." },
  { id: "moneygram", name: "MoneyGram", sector: "Financial", tier: "Title", teams: ["haas"], origin: "USA", founded: 1940, note: "Title sponsor of Haas F1 Team." },
  { id: "visa", name: "Visa", sector: "Financial", tier: "Title", teams: ["racingbulls"], origin: "USA", founded: 1958, note: "Co-title partner of Visa Cash App RB." },
  { id: "crypto-com", name: "Crypto.com", sector: "Crypto", tier: "Principal", teams: ["ferrari", "astonmartin"], origin: "Singapore", founded: 2016, note: "Global partner & crypto exchange." },
  { id: "bybit", name: "Bybit", sector: "Crypto", tier: "Principal", teams: ["redbull"], origin: "UAE", founded: 2018, note: "Crypto exchange principal partner." },
  { id: "okx", name: "OKX", sector: "Crypto", tier: "Principal", teams: ["mclaren"], origin: "Seychelles", founded: 2017, note: "McLaren principal crypto partner." },
  { id: "rolex", name: "Rolex", sector: "Luxury Watches", tier: "Official", teams: ["ferrari", "mclaren", "williams"], origin: "Switzerland", founded: 1905, note: "Official timekeeper & global partner." },
  { id: "tagheuer", name: "TAG Heuer", sector: "Luxury Watches", tier: "Principal", teams: ["redbull"], origin: "Switzerland", founded: 1860, note: "Red Bull timekeeping partner." },
  { id: "richardmille", name: "Richard Mille", sector: "Luxury Watches", tier: "Principal", teams: ["ferrari", "haas"], origin: "France", founded: 2001, note: "Hauteur horlogerie, Leclerc personal." },
  { id: "iwc", name: "IWC Schaffhausen", sector: "Luxury Watches", tier: "Principal", teams: ["mercedes"], origin: "Switzerland", founded: 1868, note: "Mercedes-AMG engineering partner." },
  { id: "mercedes-amg", name: "Mercedes-AMG", sector: "Automotive", tier: "Technical", teams: ["mercedes"], origin: "Germany", founded: 1967, note: "Performance brand & engine supplier." },
  { id: "honda", name: "Honda", sector: "Automotive", tier: "Technical", teams: ["redbull", "racingbulls", "astonmartin"], origin: "Japan", founded: 1948, note: "PU supplier via Honda RBPT." },
  { id: "ford", name: "Ford", sector: "Automotive", tier: "Technical", teams: ["redbull"], origin: "USA", founded: 1903, note: "Red Bull PU alliance from 2026." },
  { id: "toyota", name: "Toyota Gazoo Racing", sector: "Automotive", tier: "Technical", teams: ["haas"], origin: "Japan", founded: 1937, note: "Haas technical & engineering partner." },
  { id: "audi", name: "Audi Sport", sector: "Automotive", tier: "Title", teams: ["sauber"], origin: "Germany", founded: 1909, note: "Works PU entry via Sauber 2026." },
  { id: "puma", name: "Puma", sector: "Apparel", tier: "Official", teams: ["ferrari", "racingbulls", "haas"], origin: "Germany", founded: 1948, note: "Team kit & fan apparel partner." },
  { id: "castore", name: "Castore", sector: "Apparel", tier: "Principal", teams: ["mclaren", "williams", "redbull"], origin: "United Kingdom", founded: 2015, note: "Performance teamwear supplier." },
  { id: "adidas", name: "Adidas", sector: "Apparel", tier: "Official", teams: ["mercedes"], origin: "Germany", founded: 1949, note: "Mercedes fan merchandise partner." },
  { id: "boss", name: "Hugo Boss", sector: "Apparel", tier: "Principal", teams: ["astonmartin", "mercedes"], origin: "Germany", founded: 1924, note: "Travel & formal teamwear." },
  { id: "aramco", name: "Saudi Aramco", sector: "Energy", tier: "Principal", teams: ["astonmartin", "ferrari"], origin: "Saudi Arabia", founded: 1933, note: "Sustainable fuels partner." },
  { id: "petronas", name: "Petronas", sector: "Energy", tier: "Principal", teams: ["mercedes"], origin: "Malaysia", founded: 1974, note: "Fluids, lubricants & e-fuels." },
  { id: "redbull-energy", name: "Red Bull (Energy)", sector: "Energy", tier: "Title", teams: ["redbull", "racingbulls"], origin: "Austria", founded: 1987, note: "Founding title & energy brand." },
  { id: "aws", name: "AWS", sector: "Tech", tier: "Official", teams: ["mclaren", "mercedes"], origin: "USA", founded: 2006, note: "Cloud, data & telemetry partner." },
  { id: "google", name: "Google Cloud", sector: "Tech", tier: "Official", teams: ["mclaren"], origin: "USA", founded: 1998, note: "McLaren applied AI partner." },
  { id: "microsoft", name: "Microsoft", sector: "Tech", tier: "Official", teams: ["astonmartin"], origin: "USA", founded: 1975, note: "Cloud & productivity suite partner." },
  { id: "teamviewer", name: "TeamViewer", sector: "Tech", tier: "Principal", teams: ["sauber"], origin: "Germany", founded: 2005, note: "Remote connectivity partner." },
  { id: "dexcom", name: "Dexcom", sector: "Tech", tier: "Principal", teams: ["sauber"], origin: "USA", founded: 1999, note: "Glucose biosensor tech partner." },
  { id: "citi", name: "Citi", sector: "Financial", tier: "Official", teams: ["ferrari"], origin: "USA", founded: 1812, note: "Ferrari financial services partner." },
  { id: "santander", name: "Santander", sector: "Financial", tier: "Official", teams: ["ferrari", "astonmartin"], origin: "Spain", founded: 1857, note: "Global banking partner." },
];

// Projected 2026 Drivers' Championship snapshot (illustrative)
export const STANDINGS: StandingRow[] = [
  { pos: 1, driver: "L. Norris", team: "mclaren", pts: 421 },
  { pos: 2, driver: "M. Verstappen", team: "redbull", pts: 389 },
  { pos: 3, driver: "C. Leclerc", team: "ferrari", pts: 356 },
  { pos: 4, driver: "O. Piastri", team: "mclaren", pts: 348 },
  { pos: 5, driver: "L. Hamilton", team: "ferrari", pts: 312 },
  { pos: 6, driver: "G. Russell", team: "mercedes", pts: 295 },
  { pos: 7, driver: "C. Sainz", team: "williams", pts: 241 },
  { pos: 8, driver: "F. Alonso", team: "astonmartin", pts: 218 },
  { pos: 9, driver: "A. Albon", team: "williams", pts: 187 },
  { pos: 10, driver: "A. K. Antonelli", team: "mercedes", pts: 162 },
];

// Season calendar (projected 2026 round list - first 6 for countdown)
export const SEASON: { round: number; name: string; circuit: string; date: string }[] = [
  { round: 1, name: "Australian GP", circuit: "Albert Park", date: "2026-03-08" },
  { round: 2, name: "Chinese GP", circuit: "Shanghai", date: "2026-03-22" },
  { round: 3, name: "Japanese GP", circuit: "Suzuka", date: "2026-04-05" },
  { round: 4, name: "Bahrain GP", circuit: "Sakhir", date: "2026-04-12" },
  { round: 5, name: "Saudi Arabian GP", circuit: "Jeddah", date: "2026-04-19" },
  { round: 6, name: "Miami GP", circuit: "Miami Intl.", date: "2026-05-03" },
];

export const SEASON_STATS = {
  season: 2026,
  teams: TEAMS.length,
  drivers: DRIVERS.length,
  races: 24,
  sprintRaces: 6,
  regulations: "2026 Power Unit Era",
  fuel: "100% Sustainable",
  electricSplit: "≈ 50 / 50",
};

// Lookup helpers
export const teamById = (id: TeamId): Team => TEAMS.find((t) => t.id === id)!;
export const driversByTeam = (id: TeamId): Driver[] => DRIVERS.filter((d) => d.team === id);
export const specByTeam = (id: TeamId): CarSpec => CAR_SPECS.find((c) => c.team === id)!;
