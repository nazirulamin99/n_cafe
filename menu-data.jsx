// Menu data for N's Cafe
const MENU = [
  {
    category: "Espresso",
    blurb: "Pulled on a Linea Mini. Single origin from Onyx & Tandem rotates weekly.",
    items: [
      { name: "Espresso",            desc: "Double shot. Honey, stone fruit, cocoa.",        price: 4.00, tag: null },
      { name: "Macchiato",           desc: "Espresso, dollop of steamed milk.",              price: 4.50, tag: null },
      { name: "Cortado",             desc: "Equal parts espresso and silken milk.",          price: 4.75, tag: null },
      { name: "Cappuccino",          desc: "Wet foam, served in 5oz ceramic.",               price: 5.00, tag: null },
      { name: "Latte",               desc: "House blend, 8oz or 12oz.",                      price: 5.50, tag: null },
      { name: "Flat White",          desc: "Microfoam, ristretto base.",                     price: 5.25, tag: "staff pick" },
      { name: "Mocha",               desc: "Valrhona ganache, whole milk, espresso.",        price: 6.00, tag: null },
      { name: "Americano",           desc: "Long pull over hot water.",                      price: 4.25, tag: null },
    ],
  },
  {
    category: "Slow Brew",
    blurb: "Single-origin filter, ground to order. Ask the bar what's on today.",
    items: [
      { name: "Pour Over",           desc: "Kalita Wave, 14g in, 240g out.",                 price: 6.50, tag: null },
      { name: "Aeropress",           desc: "Inverted, 2 minute steep.",                      price: 6.00, tag: null },
      { name: "Cold Brew",           desc: "18-hour steep, Ethiopian Yirgacheffe.",          price: 5.50, tag: null },
      { name: "Nitro",               desc: "Cold brew on tap, cascading head.",              price: 6.25, tag: "new" },
      { name: "Drip",                desc: "Batch brew, refilled every 40 minutes.",         price: 4.00, tag: null },
    ],
  },
  {
    category: "Not Coffee",
    blurb: "For the non-believers and the after-three-pm crowd.",
    items: [
      { name: "Matcha Latte",        desc: "Ceremonial grade Uji matcha, oat milk.",         price: 6.50, tag: null },
      { name: "Hojicha",             desc: "Roasted green tea, lightly sweetened.",          price: 5.50, tag: null },
      { name: "Hot Chocolate",       desc: "70% dark, whole milk, sea salt.",                price: 5.75, tag: null },
      { name: "Chai",                desc: "House masala, brewed with milk.",                price: 5.75, tag: null },
      { name: "Loose Leaf Tea",      desc: "Earl Grey, Genmaicha, Peppermint, English Bk.",  price: 4.50, tag: null },
      { name: "Sparkling Yuzu",      desc: "Yuzu, honey, soda.",                             price: 5.00, tag: "staff pick" },
    ],
  },
  {
    category: "Pastry",
    blurb: "Baked at 4 a.m. by Mira. When they're gone, they're gone.",
    items: [
      { name: "Croissant",           desc: "European butter, 81 layers.",                    price: 4.50, tag: null },
      { name: "Pain au Chocolat",    desc: "Two batons of Valrhona dark.",                   price: 5.00, tag: null },
      { name: "Almond Croissant",    desc: "Twice baked, frangipane.",                       price: 5.50, tag: "staff pick" },
      { name: "Morning Bun",         desc: "Croissant dough, orange zest, cinnamon sugar.",  price: 5.25, tag: null },
      { name: "Banana Bread",        desc: "Brown butter, walnuts. Toasted on request.",     price: 4.25, tag: null },
      { name: "Sourdough Cookie",    desc: "Tangy, dense, sea salt on top.",                 price: 3.75, tag: null },
      { name: "Canelé",              desc: "Friday & Saturday only.",                        price: 4.50, tag: null },
    ],
  },
  {
    category: "Kitchen",
    blurb: "Served until 2 p.m. Bread from Tartine, eggs from Petaluma.",
    items: [
      { name: "Soft Scramble Toast", desc: "Cultured butter, chives, sourdough.",            price: 12.00, tag: null },
      { name: "Avocado Toast",       desc: "Smashed avocado, lemon, urfa, soft egg +$2.",    price: 13.50, tag: null },
      { name: "Ricotta Toast",       desc: "Whipped ricotta, honey, thyme.",                 price: 11.00, tag: null },
      { name: "Breakfast Sandwich",  desc: "Egg, gruyère, chili crisp, brioche.",            price: 11.50, tag: "staff pick" },
      { name: "Granola Bowl",        desc: "House granola, yogurt, seasonal fruit.",         price: 10.00, tag: null },
      { name: "Soup of the Day",     desc: "Ask the counter. Comes with bread.",             price: 9.00, tag: null },
    ],
  },
];

window.MENU = MENU;
