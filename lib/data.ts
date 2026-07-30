export const clinic = {
  name: "Dr Adidx Glow & Smile Clinic",
  doctor: "Dr. Aditya Bhange",
  phone: "086688 54063",
  phoneHref: "tel:+918668854063",
  address:
    "Shop No 4, Avantika Apt, MSEB Road, Buddhadev Nagar, Masoli, Dahanu, Maharashtra 401602",
  mapsQuery:
    "Dr+Adidx+Glow+%26+Smile+Clinic+Avantika+Apt+MSEB+Road+Buddhadev+Nagar+Masoli+Dahanu+Maharashtra+401602",
  rating: 4.9,
  reviewCount: 54,
  hoursToday: "Open · Closes 8 pm",
  hours: [
    { day: "Monday – Saturday", time: "10:00 am – 8:00 pm" },
    { day: "Sunday", time: "10:00 am – 2:00 pm" },
  ],
};

export const services = [
  {
    id: "dental",
    tag: "Dental Care",
    accent: "ink",
    title: "Restorative & general dentistry",
    description:
      "From routine check-ups to root canals, crowns, and whitening — precise, painless dentistry delivered with a gentle chairside manner.",
    items: [
      "Cleaning & cavity treatment",
      "Root canal therapy",
      "Crowns, bridges & dentures",
      "Teeth whitening & smile design",
      "Braces & clear aligners",
      "Painless tooth extraction",
    ],
    imageAlt:
      "Placeholder: bright, modern dental operatory chair with natural light",
  },
  {
    id: "hair",
    tag: "Hair Treatment",
    accent: "sage",
    title: "Hair fall & scalp restoration",
    description:
      "Evidence-based treatment plans for hair thinning, dandruff, and scalp health — tailored to your hair type and lifestyle.",
    items: [
      "Hair fall diagnosis & PRP therapy",
      "Dandruff & scalp infection care",
      "Anti-hairfall treatment plans",
      "Post-partum hair recovery",
      "Nutritional & topical guidance",
    ],
    imageAlt: "Placeholder: close-up of healthy scalp consultation",
  },
  {
    id: "skin",
    tag: "Skin & Cosmetic",
    accent: "bloom",
    title: "Skin concerns & aesthetic care",
    description:
      "Clinical skincare for acne, pigmentation, and ageing skin, plus cosmetic enhancements — always explained clearly before you decide.",
    items: [
      "Acne & acne-scar treatment",
      "Pigmentation & tan removal",
      "Anti-ageing & skin brightening",
      "Chemical peels & facials",
      "Cosmetic consultations",
    ],
    imageAlt: "Placeholder: minimalist skincare treatment room",
  },
];

export const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    text: "Dr. Aditya explained every step before he did anything — no jargon, just clarity. Felt zero anxiety walking out.",
  },
  {
    name: "Farhan K.",
    rating: 5,
    text: "Most gentle hand for a root canal I've ever experienced. He checks in constantly and actually listens.",
  },
  {
    name: "Meera J.",
    rating: 5,
    text: "As a trans woman, I was nervous about how I'd be received. The whole clinic was warm and respectful from minute one.",
  },
  {
    name: "Rohit T.",
    rating: 5,
    text: "Clean, modern set-up and honest advice — he told me a cheaper option would work just as well. Rare to find that.",
  },
  {
    name: "Sana A.",
    rating: 5,
    text: "My scalp treatment plan actually worked because he took time to understand my routine instead of a generic prescription.",
  },
  {
    name: "Vikram D.",
    rating: 5,
    text: "Humble, patient, and precise. My daughter was terrified of dentists and now asks to go back.",
  },
];

export const trustSignals = [
  {
    title: "Hospital-grade sterilisation",
    description:
      "Every instrument is autoclaved between patients, with single-use disposables wherever possible.",
  },
  {
    title: "LGBTQ+ friendly clinic",
    description:
      "A respectful, judgement-free space for every patient, every identity — always.",
  },
  {
    title: "Modern diagnostic equipment",
    description:
      "Digital imaging and up-to-date tools for accurate, minimally invasive treatment planning.",
  },
  {
    title: "Transparent, upfront pricing",
    description:
      "Clear cost discussions before treatment begins — no surprises on your bill.",
  },
];
