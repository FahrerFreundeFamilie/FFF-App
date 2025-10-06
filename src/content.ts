// ==============================
// FFF-App – Inhalte (News, Events, Partner)
// Ersetze deine src/content.ts komplett mit diesem Inhalt.
// ==============================

export type NewsItem = {
  id: string;
  title: string;
  date: string;        // ISO-Format: YYYY-MM-DD
  body: string;        // Markdown/Plaintext
  tags?: string[];
};

export type EventItem = {
  id: string;
  title: string;
  startDate: string;   // ISO: 2025-11-08T10:00:00+01:00
  endDate?: string;    // optional
  location?: {
    name?: string;
    city?: string;
    country?: string;
  };
  description?: string; // Markdown/Plaintext
  tags?: string[];
};

export type PartnerItem = {
  id: string;
  name: string;
  contributions?: string[]; // Leistungen
  notes?: string;
};

// Falls du den Preis in der Anmeldung zeigen willst:
export const DRIVER_FEE_EUR = 37.50;

// ----------------------------------
// NEWS
// ----------------------------------
export const NEWS: NewsItem[] = [
  {
    id: "t4k-ankuendigung",
    title: "Trucks4Kids • Benefiz-Festival am 08.–09. November 2025",
    date: "2025-09-30",
    tags: ["Festival", "Benefiz", "Marburg"],
    body:
      "Wir laden zum **Trucks4Kids Benefiz-Festival** auf dem **Messeplatz Marburg** ein – am **08. und 09. November 2025**. " +
      "Freut euch auf LKW-Show, Familienprogramm, Tombola & mehr. Wir sammeln für **Strahlemännchen e. V.** " +
      "und zeigen, wofür unsere Community steht."
  },
  {
    id: "edeka-showtruck",
    title: "Bestätigt: EDEKA Promotion Truck kommt!",
    date: "2025-10-01",
    tags: ["Highlight", "Showtruck"],
    body:
      "Der **EDEKA Promotion Truck** ist beim Festival **an einem der beiden Tage** vor Ort. " +
      "Den genauen Tag/Uhrzeit geben wir noch bekannt – folgt unseren Updates!"
  }
];

// ----------------------------------
// EVENTS
// ----------------------------------
export const EVENTS: EventItem[] = [
  {
    id: "t4k-2025",
    title: "Trucks4Kids Benefiz-Festival",
    startDate: "2025-11-08T10:00:00+01:00",
    endDate: "2025-11-09T18:00:00+01:00",
    location: {
      name: "Messeplatz Marburg",
      city: "Marburg",
      country: "DE"
    },
    tags: ["Festival", "Familie", "Charity"],
    description:
      "Treffen, Touren & das große Benefiz-Festival in Marburg. LKW-Show, Familienprogramm, Tombola/Versteigerung " +
      "und Partner-Stände. Erlöse zugunsten **Strahlemännchen e. V.**"
  }
];

// ----------------------------------
// PARTNER & UNTERSTÜTZER
// ----------------------------------
export const PARTNERS: PartnerItem[] = [
  {
    id: "anastasia-pohlmann",
    name: "Anastasia Pohlmann & Mutter",
    contributions: ["Hüpfburg", "Kindereisenbahn", "Verpflegung"],
    notes: "Organisation & Betreuung vor Ort."
  }
];
