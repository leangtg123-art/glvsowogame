// src/owo_data.js

export const ANIMALS = {
  common: [
    { name: "Mouse", emoji: "🐭", exp: 10, value: 5, rarity: "Common" },
    { name: "Rabbit", emoji: "🐰", exp: 12, value: 6, rarity: "Common" },
    { name: "Duck", emoji: "🦆", exp: 15, value: 8, rarity: "Common" },
    { name: "Chicken", emoji: "🐔", exp: 15, value: 8, rarity: "Common" },
    { name: "Pig", emoji: "🐷", exp: 18, value: 10, rarity: "Common" }
  ],
  uncommon: [
    { name: "Fox", emoji: "🦊", exp: 25, value: 20, rarity: "Uncommon" },
    { name: "Deer", emoji: "🦌", exp: 30, value: 25, rarity: "Uncommon" },
    { name: "Raccoon", emoji: "🦝", exp: 35, value: 30, rarity: "Uncommon" },
    { name: "Squirrel", emoji: "🐿️", exp: 35, value: 30, rarity: "Uncommon" },
    { name: "Owl", emoji: "🦉", exp: 40, value: 35, rarity: "Uncommon" }
  ],
  rare: [
    { name: "Lion", emoji: "🦁", exp: 60, value: 75, rarity: "Rare" },
    { name: "Tiger", emoji: "🐯", exp: 65, value: 80, rarity: "Rare" },
    { name: "Leopard", emoji: "🐆", exp: 70, value: 85, rarity: "Rare" },
    { name: "Cheetah", emoji: "🐆", exp: 75, value: 90, rarity: "Rare" },
    { name: "Jaguar", emoji: "🐈", exp: 80, value: 100, rarity: "Rare" }
  ],
  epic: [
    { name: "Dragon", emoji: "🐉", exp: 150, value: 250, rarity: "Epic" },
    { name: "Unicorn", emoji: "🦄", exp: 160, value: 280, rarity: "Epic" },
    { name: "Phoenix", emoji: "🐦", exp: 180, value: 300, rarity: "Epic" },
    { name: "Griffin", emoji: "🦅", exp: 190, value: 320, rarity: "Epic" },
    { name: "Chimera", emoji: "🦁", exp: 200, value: 350, rarity: "Epic" }
  ],
  mythic: [
    { name: "Pegasus", emoji: "🦄", exp: 400, value: 800, rarity: "Mythic" },
    { name: "Kraken", emoji: "🦑", exp: 450, value: 900, rarity: "Mythic" },
    { name: "Leviathan", emoji: "🐉", exp: 500, value: 1000, rarity: "Mythic" },
    { name: "Bahamut", emoji: "🐲", exp: 550, value: 1100, rarity: "Mythic" },
    { name: "Tiamat", emoji: "🐉", exp: 600, value: 1200, rarity: "Mythic" }
  ],
  legendary: [
    { name: "Arceus", emoji: "🌟", exp: 1000, value: 2500, rarity: "Legendary" },
    { name: "Mewtwo", emoji: "🔮", exp: 1100, value: 2700, rarity: "Legendary" },
    { name: "Kyogre", emoji: "🐳", exp: 1200, value: 3000, rarity: "Legendary" },
    { name: "Groudon", emoji: "🌋", exp: 1300, value: 3200, rarity: "Legendary" },
    { name: "Rayquaza", emoji: "🐉", exp: 1500, value: 4000, rarity: "Legendary" }
  ],
  special: [
    { name: "Halloween Ghost", emoji: "👻", exp: 800, value: 2000, rarity: "Special" },
    { name: "Christmas Reindeer", emoji: "🦌", exp: 850, value: 2100, rarity: "Special" },
    { name: "Cupid Angel", emoji: "👼", exp: 900, value: 2200, rarity: "Special" },
    { name: "Easter Egg", emoji: "🥚", exp: 950, value: 2300, rarity: "Special" }
  ]
};

export const WEAPONS = [
  { id: "bronze_sword", name: "Bronze Sword", tier: "Bronze", price: 100, dmg: 10, accuracy: 0.85, durability: 20 },
  { id: "iron_dagger", name: "Iron Dagger", tier: "Iron", price: 250, dmg: 22, accuracy: 0.90, durability: 35 },
  { id: "steel_axe", name: "Steel Axe", tier: "Steel", price: 500, dmg: 45, accuracy: 0.75, durability: 50 },
  { id: "silver_spear", name: "Silver Spear", tier: "Silver", price: 1200, dmg: 90, accuracy: 0.88, durability: 80 },
  { id: "gold_halberd", name: "Gold Halberd", tier: "Gold", price: 3000, dmg: 200, accuracy: 0.82, durability: 120 },
  { id: "ruby_claymore", name: "Ruby Claymore", tier: "Ruby", price: 8000, dmg: 480, accuracy: 0.80, durability: 200 },
  { id: "mythic_calibur", name: "Mythic Calibur", tier: "Mythic", price: 25000, dmg: 1200, accuracy: 0.95, durability: 500 }
];

export const SHOP_ITEMS = [
  ...WEAPONS,
  { id: "lootbox", name: "Lootbox 🎁", tier: "Item", price: 150, description: "Berisi senjata acak atau cowoncy dalam jumlah besar!" },
  { id: "crate", name: "Animal Crate 📦", tier: "Item", price: 200, description: "Berisi hewan acak (berpeluang mendapatkan Epic/Mythic!)" }
];
