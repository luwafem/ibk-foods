export const menu = [
  {
    id: "shawarma",
    name: "Shawarma",
    icon: "🌯",
    variants: [
      { id: "chicken", name: "Chicken Shawarma", price: 2500 },
      { id: "turkey", name: "Turkey Shawarma", price: 3000 }
    ],
    addons: [
      { id: "extra_sausage", name: "Extra Sausage", price: 500 },
      { id: "extra_cheese", name: "Extra Cheese", price: 400 }
    ]
  },
  {
    id: "pepper_soup",
    name: "Pepper Soup",
    icon: "🍲",
    variants: [
      { id: "goat", name: "Goat Meat", price: 3500 },
      { id: "catfish", name: "Catfish", price: 4000 }
    ]
  },
  {
    id: "noodles",
    name: "Noodles",
    icon: "🍜",
    variants: [
      { id: "egg", name: "With Egg", price: 1500 },
      { id: "special", name: "Special", price: 2000 }
    ],
    addons: [{ id: "extra_egg", name: "Extra Egg", price: 300 }]
  },
  // 🍨 NEW PARFAIT OPTION 🍨
  {
    id: "parfait",
    name: "Parfait",
    icon: "🍨",
    variants: [
      { id: "medium", name: "Medium Size", price: 2800 },
      { id: "large", name: "Large Size", price: 3500 }
    ],
    addons: [
      { id: "granola", name: "Extra Granola", price: 400 },
      { id: "honey", name: "Extra Honey Drizzle", price: 300 },
      { id: "fruit_mix", name: "Exotic Fruit Mix", price: 600 }
    ]
  }
];