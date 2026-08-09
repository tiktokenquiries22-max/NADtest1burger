export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  frameCount?: number;
  themeColor: string;
  gradient: string;
  accentColor: string;
  badge: string;
  detailImage: string;
  videoSrc?: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: {
    title: string;
    description: string;
    imageAlt: string;
  };
  freshnessSection: {
    title: string;
    description: string;
  };
  buyNowSection: {
    price: string;
    unit: string;
    processingParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
}

export const products: Product[] = [
  {
    id: "signature",
    name: "The Signature Firestack",
    subName: "Big. Smashed. Unapologetic.",
    price: "£14.95",
    description: "Double smash-seared beef • Molten American cheese • Secret house sauce • Toasted brioche",
    folderPath: "/images/signature",
    frameCount: 251,
    themeColor: "#EA580C",
    accentColor: "#F97316",
    gradient: "linear-gradient(135deg, #1C1917 0%, #451A03 50%, #0C0A09 100%)",
    badge: "HOUSE FLAGSHIP",
    detailImage: "/images/details/flex-burger.jpg",
    videoSrc: "/videos/burger-assembly-1.mp4",
    features: [
      "100% Aged British Angus beef",
      "Double crispy smash patties",
      "Signature oak-smoked house sauce",
      "Artisan slow-fermented brioche"
    ],
    stats: [
      { label: "Smash Patties", val: "2x" },
      { label: "Aged Beef", val: "28-Day" },
      { label: "Cheese Layer", val: "Molten 2x" },
      { label: "Seared Crust", val: "100%" }
    ],
    section1: {
      title: "The Ultimate Burger Experience.",
      subtitle: "Big. Smashed. Unapologetic."
    },
    section2: {
      title: "Smashed onto a screaming-hot iron grill.",
      subtitle: "Two 28-day dry-aged beef patties pressed hard for lace-like caramelised edges, draped in double molten American cheese."
    },
    section3: {
      title: "Built for the first bite explosion.",
      subtitle: "Crispy charred crust. Dripping juicy core. Tangy house pickles and our oak-smoked secret sauce stacked inside golden brioche."
    },
    section4: {
      title: "No shortcuts. No boring bites.",
      subtitle: "Every layer is engineered to hit your palate with relentless intensity."
    },
    detailsSection: {
      title: "Stacked With Purpose",
      description: "Our beef is custom-blended using prime chuck, brisket, and short rib. Smashed hard on our 450°F cast iron surface to lock in intense umami, then crowned with house sauce, slow-cooked caramelised onions, and hand-cut dill pickles.",
      imageAlt: "Signature Firestack Burger Details"
    },
    freshnessSection: {
      title: "Made To Order. Zero Holding.",
      description: "We never heat-lamp or pre-smash. The moment your order arrives, fresh chilled beef hits the grill, buns are buttered and toasted to order, and assembly happens in under 90 seconds. Hot, juicy, and peak crunch."
    },
    buyNowSection: {
      price: "£14.95",
      unit: "per burger set",
      processingParams: [
        "Fresh Smash-Seared",
        "450°F Cast Iron Grill",
        "Hand-Assembled"
      ],
      deliveryPromise: "Delivered in thermal lock boxes within 25 minutes. Guaranteed piping hot.",
      returnPolicy: "Not completely blown away? We'll remake it instantly or refund every penny."
    }
  }
];
