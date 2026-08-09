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
      title: "The Signature Firestack.",
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
  },
  {
    id: "truffle",
    name: "The Smoked Truffle Beast",
    subName: "Decadence between brioche.",
    price: "£16.50",
    description: "Smoked Gouda • Black truffle aioli • Wild garlic mushrooms • Crispy shallots",
    folderPath: "/images/truffle",
    frameCount: 251,
    themeColor: "#D97706",
    accentColor: "#F59E0B",
    gradient: "linear-gradient(135deg, #18181B 0%, #78350F 50%, #09090B 100%)",
    badge: "CHEF'S SPECIAL",
    detailImage: "/images/details/cheeseburger-editorial.webp",
    videoSrc: "/videos/burger-assembly-2.mp4",
    features: [
      "Perigord black truffle aioli",
      "Aged smoked Dutch Gouda",
      "Sautéed wild forest mushrooms",
      "Crispy fried garlic shallots"
    ],
    stats: [
      { label: "Truffle Intensity", val: "Rich" },
      { label: "Gouda Age", val: "18-Mo" },
      { label: "Patties", val: "Double" },
      { label: "Umami Rating", val: "10/10" }
    ],
    section1: {
      title: "The Smoked Truffle Beast.",
      subtitle: "Pure liquid umami."
    },
    section2: {
      title: "Earthiness meets high-flame sear.",
      subtitle: "Sautéed wild mushrooms and rich black truffle cream folded over twin Angus patties with melted smoked Gouda."
    },
    section3: {
      title: "Velvety, rich, and unforgettable.",
      subtitle: "Crispy shallots bring a satisfying crunch that contrasts perfectly with smooth truffle aioli and buttery toasted brioche."
    },
    section4: {
      title: "The pinnacle of burger craftsmanship.",
      subtitle: "A gourmet masterpiece created for true flavor seekers."
    },
    detailsSection: {
      title: "Earthy. Rich. Unrivaled.",
      description: "Infused with genuine French black truffle oil and freshly whipped garlic aioli. We combine aged smoked Gouda with sautéed wild chanterelles and king oyster mushrooms for a complex, velvety finish.",
      imageAlt: "Smoked Truffle Beast Burger Details"
    },
    freshnessSection: {
      title: "Crafted With Precision",
      description: "Each truffle burger uses freshly whipped aioli made daily in small batches. Mushrooms are flamed to order in brown butter and thyme, ensuring rich aromatics when you open the box."
    },
    buyNowSection: {
      price: "£16.50",
      unit: "per gourmet set",
      processingParams: [
        "Real Black Truffle",
        "Brown Butter Mushrooms",
        "Smoked Gouda Melt"
      ],
      deliveryPromise: "Insulated luxury box packaging preserves temperature and crispness.",
      returnPolicy: "100% Gourmet Satisfaction Guarantee."
    }
  },
  {
    id: "inferno",
    name: "The Inferno Diablo",
    subName: "Crispy crunch. High heat.",
    price: "£15.95",
    description: "Habanero bacon • Crispy jalapeno crunch • Spicy pepperjack melt • Hot honey drizzle",
    folderPath: "/images/inferno",
    frameCount: 251,
    themeColor: "#DC2626",
    accentColor: "#EF4444",
    gradient: "linear-gradient(135deg, #0F172A 0%, #881337 50%, #030712 100%)",
    badge: "HOT & CRISPY",
    detailImage: "/images/details/hero-burger.jpg",
    videoSrc: "/videos/burger-assembly-1.mp4",
    features: [
      "Applewood habanero bacon",
      "Flash-fried crispy jalapenos",
      "Molten spicy pepperjack cheese",
      "Habenero hot honey drizzle"
    ],
    stats: [
      { label: "Heat Level", val: "🌶️🌶️🌶️" },
      { label: "Crispy Bacon", val: "3 Strips" },
      { label: "Cheese Melt", val: "Pepperjack" },
      { label: "Flavor Profile", val: "Sweet & Spicy" }
    ],
    section1: {
      title: "The Inferno Diablo.",
      subtitle: "Crispy crunch. High heat."
    },
    section2: {
      title: "A fiery bite that commands attention.",
      subtitle: "Thick-cut habanero glazed bacon layered over two beef smash patties with molten pepperjack and flash-fried jalapenos."
    },
    section3: {
      title: "Balanced with sweet habanero hot honey.",
      subtitle: "The scorching heat of fresh peppers meets the silky sweetness of wild wildflower hot honey for a addictive finish."
    },
    section4: {
      title: "Not for the faint-hearted.",
      subtitle: "Crispy texture, juicy beef, and relentless heat."
    },
    detailsSection: {
      title: "Fiery Precision Crafting",
      description: "We cure our bacon in-house with smoked cayenne and habanero before double-crisping. Flash-fried jalapeno coins add instant crunch, while our custom hot honey balances the fire with nectar sweetness.",
      imageAlt: "Inferno Diablo Burger Details"
    },
    freshnessSection: {
      title: "Fire From The Grill",
      description: "Our habanero bacon is crisped right on the flat top beside your burger patties. The hot honey is warmed gently to drizzle smoothly over the molten cheese at the final second."
    },
    buyNowSection: {
      price: "£15.95",
      unit: "per spicy set",
      processingParams: [
        "Habanero Glazed",
        "Double Crisped Bacon",
        "Hot Honey Drizzle"
      ],
      deliveryPromise: "Piping hot delivery with cooling dipping sauce included on the side.",
      returnPolicy: "Too hot or not hot enough? We'll tailor your next order to perfection."
    }
  }
];
