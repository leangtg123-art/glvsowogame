// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ANIMALS, WEAPONS, SHOP_ITEMS } from "./owo_data";

// Custom SVG Icons
const PawIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
    <path d="M7 9c.83 0 1.5-.67 1.5-1.5S7.83 6 7 6s-1.5.67-1.5 1.5S6.17 9 7 9z" />
    <path d="M17 9c.83 0 1.5-.67 1.5-1.5S17.83 6 17 6s-1.5.67-1.5 1.5S16.17 9 17 9z" />
    <path d="M4 13c.83 0 1.5-.67 1.5-1.5S4.83 10 4 10s-1.5.67-1.5 1.5S3.17 13 4 13z" />
    <path d="M20 13c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
  </svg>
);

const SwordsIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <polyline points="9.5 17.5 21 6 21 3 18 3 6.5 14.5" />
    <line x1="11" y1="19" x2="5" y2="13" />
  </svg>
);

const BagIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
    <path d="M9 6V4a3 3 0 0 1 6 0v2" />
    <line x1="4" y1="11" x2="20" y2="11" />
  </svg>
);

const ShopIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CrateIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const LootboxIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12v10H4V12" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const CoinsIcon = () => (
  <svg className="wiki-name-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "#ffd60a"}}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M9.5 10h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SystemIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const BookIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="wiki-name-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export default function App() {
  // Navigation & Auth Mode
  const [showGame, setShowGame] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Mobile selected tab: 'chat' | 'wiki' | 'profile' | 'admin'
  const [mobileTab, setMobileTab] = useState("chat");

  // Game states
  const [cowoncy, setCowoncy] = useState(1000);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState([
    { ...WEAPONS[0], currentDurability: WEAPONS[0].durability },
  ]);
  const [activeWeaponIndex, setActiveWeaponIndex] = useState(0);
  const [animalsCaught, setAnimalsCaught] = useState({});
  const [crates, setCrates] = useState(2);
  const [lootboxes, setLootboxes] = useState(2);

  // Admin and Cheat Settings
  const [infiniteDurability, setInfiniteDurability] = useState(false);
  const [xpMultiplier, setXpMultiplier] = useState(1);
  const [networkDelay, setNetworkDelay] = useState(false);
  const [toxicMode, setToxicMode] = useState(false);

  // Interface states
  const [activeChannel, setActiveChannel] = useState("owo-commands");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeWikiTab, setActiveWikiTab] = useState("animals");
  const [cooldowns, setCooldowns] = useState({ hunt: 0, battle: 0 });

  const messageEndRef = useRef(null);

  // Load registered users or seed admin
  const getUsersDb = () => {
    const db = localStorage.getItem("owo_users_db");
    if (!db) {
      const initialDb = [{ username: "admin", password: "gacor", isAdmin: true, state: {} }];
      localStorage.setItem("owo_users_db", JSON.stringify(initialDb));
      return initialDb;
    }
    return JSON.parse(db);
  };

  const saveUserDb = (updatedDb) => {
    localStorage.setItem("owo_users_db", JSON.stringify(updatedDb));
  };

  // Sync state to current logged-in user profile
  useEffect(() => {
    if (currentUser) {
      const db = getUsersDb();
      const userIndex = db.findIndex(u => u.username === currentUser.username);
      if (userIndex !== -1) {
        db[userIndex].state = {
          cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes
        };
        saveUserDb(db);
      }
    }
  }, [cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, currentUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cooldown timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCooldowns(prev => ({
        hunt: prev.hunt > 0 ? prev.hunt - 1 : 0,
        battle: prev.battle > 0 ? prev.battle - 1 : 0
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addMessage = (author, avatar, isBot, body, embed = null) => {
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        author,
        avatar,
        isBot,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        body,
        embed
      }
    ]);
  };

  const checkLevelUp = (addedExp) => {
    const actualAdded = addedExp * xpMultiplier;
    let currentExp = exp + actualAdded;
    let currentLevel = level;
    const expNeeded = currentLevel * 150;
    
    if (currentExp >= expNeeded) {
      currentExp -= expNeeded;
      currentLevel += 1;
      addMessage(
        "OwO",
        <PawIcon />,
        true,
        `[LEVEL UP] @User telah naik ke Level ${currentLevel}!`,
        {
          title: "Level Up! 🌟",
          description: `Selamat! Kamu naik ke level ${currentLevel}.\nBatas Exp baru: ${currentLevel * 150}.\nBonus +500 Cowoncy ditambahkan ke saldo Anda!`
        }
      );
      setCowoncy(c => c + 500);
    }
    setExp(currentExp);
    setLevel(currentLevel);
  };

  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    
    // Echo user's message
    addMessage(currentUser ? currentUser.username : "User", <UserIcon />, false, cmdText);

    const executeAction = () => {
      if (cleanCmd.startsWith("/owo hunt")) {
        if (cooldowns.hunt > 0) {
          addMessage(
            "OwO",
            <PawIcon />,
            true,
            toxicMode 
              ? `[COOLDOWN] Sabar kelinci! Cooldown sisa ${cooldowns.hunt} detik lagi!`
              : `[COOLDOWN] Harap tunggu ${cooldowns.hunt} detik sebelum berburu lagi.`
          );
          return;
        }
        
        setCooldowns(prev => ({ ...prev, hunt: 5 }));

        let currentWeapon = inventory[activeWeaponIndex];

        // Rarity Roll
        const rand = Math.random() * 100;
        let rarity = "common";
        if (rand < 0.1) rarity = "special";
        else if (rand < 1.0) rarity = "legendary";
        else if (rand < 4.0) rarity = "mythic";
        else if (rand < 10.0) rarity = "epic";
        else if (rand < 25.0) rarity = "rare";
        else if (rand < 50.0) rarity = "uncommon";

        const arr = ANIMALS[rarity];
        const animal = arr[Math.floor(Math.random() * arr.length)];
        
        setAnimalsCaught(prev => ({
          ...prev,
          [animal.name]: (prev[animal.name] || 0) + 1
        }));

        const cowoncyEarned = Math.floor(Math.random() * 20) + 15;
        const expEarned = animal.exp;
        setCowoncy(c => c + cowoncyEarned);
        
        // Durability
        if (currentWeapon && !infiniteDurability) {
          setInventory(prev => {
            const updated = [...prev];
            const weapon = { ...updated[activeWeaponIndex] };
            weapon.currentDurability -= 1;
            
            if (weapon.currentDurability <= 0) {
              addMessage("OwO", <PawIcon />, true, `[BROKEN] Senjata ${weapon.name} Anda telah rusak!`);
              updated.splice(activeWeaponIndex, 1);
              setActiveWeaponIndex(0);
            } else {
              updated[activeWeaponIndex] = weapon;
            }
            return updated;
          });
        }

        addMessage(
          "OwO",
          <PawIcon />,
          true,
          toxicMode 
            ? `[HUNT] Hebat! Lu dapet ${animal.name} (${animal.rarity})!`
            : `[HUNT] @User pergi berburu dan menangkap seekor ${animal.name} (${animal.rarity})!`,
          {
            title: "Hasil Perburuan 🌲",
            description: `Hewan: ${animal.name} (${animal.rarity})\nHadiah: +${cowoncyEarned} Cowoncy\nExp: +${expEarned * xpMultiplier} XP\n\nSenjata Aktif: ${currentWeapon ? `${currentWeapon.name} (Durability: ${infiniteDurability ? "Infinity" : `${currentWeapon.currentDurability - 1}/${currentWeapon.durability}`})` : "Tanpa Senjata"}`
          }
        );

        checkLevelUp(expEarned);
      } 
      else if (cleanCmd.startsWith("/owo battle")) {
        if (cooldowns.battle > 0) {
          addMessage(
            "OwO",
            <PawIcon />,
            true,
            `[COOLDOWN] Harap tunggu ${cooldowns.battle} detik sebelum bertarung lagi.`
          );
          return;
        }

        setCooldowns(prev => ({ ...prev, battle: 15 }));

        const playerWeapon = inventory[activeWeaponIndex];
        const playerPower = playerWeapon ? playerWeapon.dmg : 5;
        const enemyPower = Math.floor(Math.random() * 40) + 15;

        const playerRoll = playerPower * (Math.random() * 0.4 + 0.8);
        const enemyRoll = enemyPower * (Math.random() * 0.4 + 0.8);

        const isWin = playerRoll >= enemyRoll;
        
        const cowoncyReward = isWin ? Math.floor(Math.random() * 60) + 50 : Math.floor(Math.random() * 15) + 10;
        const expReward = isWin ? 50 : 15;

        setCowoncy(c => c + cowoncyReward);

        addMessage(
          "OwO",
          <PawIcon />,
          true,
          isWin 
            ? `[BATTLE] @User memenangkan pertarungan melawan monster liar!` 
            : `[BATTLE] @User kalah dalam pertarungan melawan monster liar.`,
          {
            title: isWin ? "Victory! 🏆" : "Defeat! 💀",
            description: `Kekuatan Anda: ${playerRoll.toFixed(1)} DMG\nKekuatan Monster: ${enemyRoll.toFixed(1)} DMG\n\nHasil: ${isWin ? "Menang!" : "Kalah"}\nHadiah: +${cowoncyReward} Cowoncy\nExp: +${expReward * xpMultiplier} XP`
          }
        );

        checkLevelUp(expReward);
      } 
      else if (cleanCmd.startsWith("/owo shop")) {
        addMessage(
          "OwO",
          <PawIcon />,
          true,
          "Shop Marketplace - Ketik /owo buy [nama_id] untuk membeli.",
          {
            title: "Daftar Toko Senjata & Item",
            description: SHOP_ITEMS.map(item => `• ${item.name} (${item.id}): ${item.price} Cowoncy ${item.dmg ? `| Dmg: ${item.dmg}` : ""}`).join("\n")
          }
        );
      }
      else if (cleanCmd.startsWith("/owo buy")) {
        const parts = cleanCmd.split(" ");
        if (parts.length < 3) {
          addMessage("OwO", <PawIcon />, true, "Format pembelian salah! Gunakan: /owo buy [item_id]");
          return;
        }
        const itemId = parts[2];
        const item = SHOP_ITEMS.find(i => i.id === itemId);

        if (!item) {
          addMessage("OwO", <PawIcon />, true, `Item dengan ID ${itemId} tidak ditemukan.`);
          return;
        }

        if (cowoncy < item.price) {
          addMessage("OwO", <PawIcon />, true, `Saldo Cowoncy tidak cukup! Anda butuh ${item.price} Cowoncy.`);
          return;
        }

        setCowoncy(c => c - item.price);

        if (itemId === "crate") {
          setCrates(c => c + 1);
          addMessage("OwO", <PawIcon />, true, `Berhasil membeli 1 Animal Crate!`);
        } else if (itemId === "lootbox") {
          setLootboxes(l => l + 1);
          addMessage("OwO", <PawIcon />, true, `Berhasil membeli 1 Lootbox!`);
        } else {
          setInventory(prev => [
            ...prev,
            { ...item, currentDurability: item.durability }
          ]);
          addMessage("OwO", <PawIcon />, true, `Berhasil membeli senjata ${item.name}!`);
        }
      }
      else if (cleanCmd.startsWith("/owo open crate")) {
        if (crates <= 0) {
          addMessage("OwO", <PawIcon />, true, "Anda tidak memiliki Animal Crate. Beli di /owo shop!");
          return;
        }
        setCrates(c => c - 1);

        const roll = Math.random() * 100;
        let rarity = "rare";
        if (roll < 5) rarity = "legendary";
        else if (roll < 15) rarity = "mythic";
        else if (roll < 45) rarity = "epic";

        const arr = ANIMALS[rarity];
        const animal = arr[Math.floor(Math.random() * arr.length)];

        setAnimalsCaught(prev => ({
          ...prev,
          [animal.name]: (prev[animal.name] || 0) + 1
        }));

        addMessage(
          "OwO",
          <PawIcon />,
          true,
          `[CRATE] @User membuka Animal Crate dan mendapatkan:`,
          {
            title: `Selamat! 🎉`,
            description: `Kamu mendapatkan ${animal.name} (${animal.rarity}) dari crate!`
          }
        );
      }
      else if (cleanCmd.startsWith("/owo open lootbox")) {
        if (lootboxes <= 0) {
          addMessage("OwO", <PawIcon />, true, "Anda tidak memiliki Lootbox. Beli di /owo shop!");
          return;
        }
        setLootboxes(l => l - 1);

        const roll = Math.random();
        if (roll < 0.4) {
          const cash = Math.floor(Math.random() * 800) + 300;
          setCowoncy(c => c + cash);
          addMessage("OwO", <PawIcon />, true, `[LOOTBOX] Kamu membuka Lootbox dan memenangkan ${cash} Cowoncy!`);
        } else {
          const weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
          setInventory(prev => [
            ...prev,
            { ...weapon, currentDurability: weapon.durability }
          ]);
          addMessage("OwO", <PawIcon />, true, `[LOOTBOX] Kamu membuka Lootbox dan mendapatkan senjata ${weapon.name}!`);
        }
      }
      else if (cleanCmd.startsWith("/owo inv") || cleanCmd.startsWith("/owo inventory")) {
        addMessage(
          "OwO",
          <PawIcon />,
          true,
          "Ransel & Inventaris Anda",
          {
            title: "Isi Ransel",
            description: `Cowoncy: ${cowoncy}\nAnimal Crates: ${crates}\nLootboxes: ${lootboxes}\n\nDaftar Senjata Anda:\n${inventory.map((w, idx) => `${idx === activeWeaponIndex ? ">> " : "• "} [${idx}] ${w.name} (${w.currentDurability}/${w.durability} Durability) | DMG: ${w.dmg}`).join("\n")}\n\nKetik /owo equip [nomor] untuk mengganti senjata aktif.`
          }
        );
      }
      else if (cleanCmd.startsWith("/owo equip")) {
        const parts = cleanCmd.split(" ");
        if (parts.length < 3) {
          addMessage("OwO", <PawIcon />, true, "Format salah! Gunakan: /owo equip [indeks_senjata]");
          return;
        }
        const index = parseInt(parts[2]);
        if (isNaN(index) || index < 0 || index >= inventory.length) {
          addMessage("OwO", <PawIcon />, true, "Indeks senjata tidak valid.");
          return;
        }
        setActiveWeaponIndex(index);
        addMessage("OwO", <PawIcon />, true, `Berhasil menggunakan senjata ${inventory[index].name}!`);
      }
      else if (cleanCmd.startsWith("/owo zoo")) {
        const list = Object.keys(animalsCaught)
          .map(name => `• ${name} (x${animalsCaught[name]})`)
          .join("\n");

        addMessage(
          "OwO",
          <PawIcon />,
          true,
          "Kebun Binatang Anda (Zoo)",
          {
            title: "Koleksi Hewan Anda",
            description: list || "Kebun binatang Anda masih kosong. Mulai berburu dengan /owo hunt!"
          }
        );
      }
      else if (cleanCmd === "/help") {
        addMessage(
          "System",
          <SystemIcon />,
          false,
          "Daftar perintah simulasi yang tersedia:\n" +
          "• /owo hunt - Berburu hewan liar (cooldown 5s)\n" +
          "• /owo battle - Melawan monster liar (cooldown 15s)\n" +
          "• /owo inv - Melihat isi ransel dan senjata\n" +
          "• /owo zoo - Menampilkan daftar hewan yang sudah ditangkap\n" +
          "• /owo shop - Membuka toko senjata dan item\n" +
          "• /owo buy [item_id] - Membeli senjata atau item\n" +
          "• /owo equip [nomor] - Memasang senjata pilihan\n" +
          "• /owo open crate - Membuka peti hewan acak\n" +
          "• /owo open lootbox - Membuka kotak rampasan misterius"
        );
      }
      else {
        addMessage(
          "System",
          <SystemIcon />,
          false,
          `Perintah tidak dikenal: ${cmdText}. Silakan ketik /help untuk melihat daftar perintah.`
        );
      }
    };

    if (networkDelay) {
      setTimeout(executeAction, 1500);
    } else {
      executeAction();
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleCommand(inputText);
    setInputText("");
    setShowAutocomplete(false);
  };

  // Auth Submit Handlers
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!usernameInput || !passwordInput) {
      setAuthError("Harap isi semua kolom input.");
      return;
    }

    const db = getUsersDb();

    if (authTab === "login") {
      const user = db.find(u => u.username === usernameInput && u.password === passwordInput);
      if (!user) {
        setAuthError("Username atau password salah.");
        return;
      }
      // Load user state
      setCurrentUser(user);
      if (user.state && user.state.cowoncy !== undefined) {
        setCowoncy(user.state.cowoncy);
        setExp(user.state.exp);
        setLevel(user.state.level);
        setInventory(user.state.inventory);
        setActiveWeaponIndex(user.state.activeWeaponIndex);
        setAnimalsCaught(user.state.animalsCaught);
        setCrates(user.state.crates);
        setLootboxes(user.state.lootboxes);
      } else {
        // Reset to default for fresh user
        setCowoncy(1000);
        setExp(0);
        setLevel(1);
        setInventory([{ ...WEAPONS[0], currentDurability: WEAPONS[0].durability }]);
        setActiveWeaponIndex(0);
        setAnimalsCaught({});
        setCrates(2);
        setLootboxes(2);
      }

      setAuthSuccess(`Selamat datang kembali, ${user.username}!`);
      setTimeout(() => {
        setShowGame(true);
        setShowAuth(false);
      }, 1000);
    } else {
      // Register
      const exists = db.some(u => u.username === usernameInput);
      if (exists) {
        setAuthError("Username sudah terdaftar.");
        return;
      }
      const newUser = {
        username: usernameInput,
        password: passwordInput,
        isAdmin: usernameInput.toLowerCase() === "admin" && passwordInput === "gacor",
        state: {}
      };
      db.push(newUser);
      saveUserDb(db);
      setAuthSuccess("Pendaftaran berhasil! Silakan login.");
      setAuthTab("login");
    }
  };

  // --- 20 INTERACTIVE ADMIN FEATURES ---
  const adminFeatures = [
    {
      id: 1,
      title: "Tambah 10k Koin",
      desc: "Menambahkan 10.000 saldo Cowoncy ke saldo utama.",
      action: () => { setCowoncy(c => c + 10000); alert("Ditambahkan 10,000 Cowoncy!"); }
    },
    {
      id: 2,
      title: "Tambah 100k Koin",
      desc: "Menambahkan 100.000 saldo Cowoncy ke saldo utama.",
      action: () => { setCowoncy(c => c + 100000); alert("Ditambahkan 100,000 Cowoncy!"); }
    },
    {
      id: 3,
      title: "Level ke-50",
      desc: "Memaksa level karakter langsung lompat ke Level 50.",
      action: () => { setLevel(50); setExp(0); alert("Level diset ke 50!"); }
    },
    {
      id: 4,
      title: "Level ke-100",
      desc: "Memaksa level karakter langsung lompat ke Level 100.",
      action: () => { setLevel(100); setExp(0); alert("Level diset ke 100!"); }
    },
    {
      id: 5,
      title: "Beri Semua Senjata",
      desc: "Mengisi inventaris dengan semua senjata dari database.",
      action: () => {
        setInventory(prev => [
          ...prev,
          ...WEAPONS.map(w => ({ ...w, currentDurability: w.durability }))
        ]);
        alert("Semua senjata ditambahkan!");
      }
    },
    {
      id: 6,
      title: "Beri 99 Crates",
      desc: "Menambahkan 99 buah Animal Crate ke inventaris.",
      action: () => { setCrates(c => c + 99); alert("Ditambahkan 99 Crates!"); }
    },
    {
      id: 7,
      title: "Beri 99 Lootboxes",
      desc: "Menambahkan 99 buah Kotak Misteri Lootbox.",
      action: () => { setLootboxes(l => l + 99); alert("Ditambahkan 99 Lootboxes!"); }
    },
    {
      id: 8,
      title: "Hapus Cooldowns",
      desc: "Mereset timer cooldown Hunt & Battle menjadi instan.",
      action: () => { setCooldowns({ hunt: 0, battle: 0 }); alert("Cooldown direset!"); }
    },
    {
      id: 9,
      title: "Simulasi Level Up",
      desc: "Memicu level up buatan secara langsung dengan reward koin.",
      action: () => { checkLevelUp(level * 150); }
    },
    {
      id: 10,
      title: "Dapatkan Semua Hewan",
      desc: "Mengisi kebun binatang dengan 10 ekor untuk tiap hewan.",
      action: () => {
        const allObj = {};
        Object.keys(ANIMALS).forEach(rarity => {
          ANIMALS[rarity].forEach(ani => {
            allObj[ani.name] = 10;
          });
        });
        setAnimalsCaught(allObj);
        alert("Kebun Binatang Anda penuh!");
      }
    },
    {
      id: 11,
      title: "Durabilitas Abadi: " + (infiniteDurability ? "ON" : "OFF"),
      desc: "Mencegah durabilitas senjata berkurang saat hunt.",
      action: () => { setInfiniteDurability(!infiniteDurability); }
    },
    {
      id: 12,
      title: "XP Multiplier: " + (xpMultiplier > 1 ? "10x" : "1x"),
      desc: "Mengalikan EXP hasil hunt dan battle sebesar 10x lipat.",
      action: () => { setXpMultiplier(prev => (prev === 1 ? 10 : 1)); }
    },
    {
      id: 13,
      title: "Spawn Arceus (Legendary)",
      desc: "Menangkap Arceus secara paksa tanpa gacha.",
      action: () => {
        setAnimalsCaught(prev => ({ ...prev, "Arceus": (prev["Arceus"] || 0) + 1 }));
        addMessage("System", <SystemIcon />, false, "Spawn Event: Arceus ditambahkan ke Kebun Binatang!");
      }
    },
    {
      id: 14,
      title: "Spawn Rayquaza (Legendary)",
      desc: "Menangkap Rayquaza secara paksa tanpa gacha.",
      action: () => {
        setAnimalsCaught(prev => ({ ...prev, "Rayquaza": (prev["Rayquaza"] || 0) + 1 }));
        addMessage("System", <SystemIcon />, false, "Spawn Event: Rayquaza ditambahkan ke Kebun Binatang!");
      }
    },
    {
      id: 15,
      title: "Hapus Log Chat",
      desc: "Membersihkan seluruh layar chat owo simulator.",
      action: () => { setMessages([]); }
    },
    {
      id: 16,
      title: "Kirim Siaran Server",
      desc: "Mengirim pesan siaran pengumuman admin global.",
      action: () => {
        addMessage("Admin Broadcast", <SystemIcon />, true, "PENGUMUMAN SERVER: Pemeliharaan database berkala selesai.", {
          title: "Status Server: Lancar 🚀",
          description: "Semua server simulasi berjalan optimal."
        });
      }
    },
    {
      id: 17,
      title: "Tampilkan JSON State",
      desc: "Mencetak isi database mentah saat ini ke dalam chat.",
      action: () => {
        const rawJson = JSON.stringify({ cowoncy, exp, level, inventory, animalsCaught, crates, lootboxes }, null, 2);
        addMessage("Admin Inspector", <SystemIcon />, false, `JSON State:\n\`\`\`json\n${rawJson}\n\`\`\``);
      }
    },
    {
      id: 18,
      title: "Delay Jaringan (Simulasi): " + (networkDelay ? "ON" : "OFF"),
      desc: "Menambahkan delay buatan 1.5 detik untuk setiap aksi.",
      action: () => { setNetworkDelay(!networkDelay); }
    },
    {
      id: 19,
      title: "Mode Toxic: " + (toxicMode ? "ON" : "OFF"),
      desc: "Bot merespon menggunakan bahasa gaul kasar/toxic.",
      action: () => { setToxicMode(!toxicMode); }
    },
    {
      id: 20,
      title: "Reset Seluruh DB",
      desc: "Menghapus semua akun dan reset setelan pabrik.",
      action: () => {
        if (confirm("Reset seluruh data database & logout?")) {
          localStorage.clear();
          window.location.reload();
        }
      }
    }
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    setShowGame(false);
  };

  // Render components based on screen selection (Mobile Tab vs Desktop Layout)
  const renderMobileView = () => {
    switch (mobileTab) {
      case "chat":
        return (
          <div className="chat-area">
            <div className="panel-header">
              <span className="channel-icon">#</span> owo-commands
            </div>
            
            <div className="message-list">
              {messages.map(msg => (
                <div className="message-wrapper" key={msg.id}>
                  <div className="msg-avatar">{msg.avatar}</div>
                  <div className="msg-content-wrapper">
                    <div className="msg-header">
                      <span className="msg-author">{msg.author}</span>
                      {msg.isBot && <span className="bot-tag">BOT</span>}
                      <span className="msg-time">{msg.time}</span>
                    </div>
                    <div className="msg-body">{msg.body}</div>
                    {msg.embed && (
                      <div className="discord-embed">
                        {msg.embed.title && <div className="embed-title">{msg.embed.title}</div>}
                        {msg.embed.description && <div className="embed-desc">{msg.embed.description}</div>}
                        <div className="embed-footer">GLVS Engine v4.9 • {msg.time}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <div className="input-area">
              <div className="quick-action-bar">
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo hunt")}>
                  <PawIcon /> Hunt {cooldowns.hunt > 0 && `(${cooldowns.hunt}s)`}
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo battle")}>
                  <SwordsIcon /> Battle {cooldowns.battle > 0 && `(${cooldowns.battle}s)`}
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo inv")}>
                  <BagIcon /> Inventory
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo zoo")}>
                  <PawIcon /> Zoo
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo shop")}>
                  <ShopIcon /> Shop
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo open crate")}>
                  <CrateIcon /> Crate ({crates})
                </button>
                <button className="btn-action-mobile" onClick={() => handleCommand("/owo open lootbox")}>
                  <LootboxIcon /> Box ({lootboxes})
                </button>
              </div>

              {showAutocomplete && (
                <div className="autocomplete-container">
                  <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo hunt")}>
                    <span className="autocomplete-command">/owo hunt</span>
                    <span className="autocomplete-desc">Berburu hewan liar</span>
                  </div>
                  <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo battle")}>
                    <span className="autocomplete-command">/owo battle</span>
                    <span className="autocomplete-desc">Melawan monster</span>
                  </div>
                  <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo inv")}>
                    <span className="autocomplete-command">/owo inv</span>
                    <span className="autocomplete-desc">Cek isi ransel</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleInputSubmit} className="input-container">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ketik perintah..."
                  value={inputText}
                  onChange={handleInputChange}
                />
                <button type="submit" className="send-btn"><ArrowRightIcon /></button>
              </form>
            </div>
          </div>
        );

      case "wiki":
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1rem" }}>
            <h2 style={{ color: "#ff3b3b", marginBottom: "1rem" }}>Ensiklopedia Game</h2>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <button 
                className={`wiki-tab-btn ${activeWikiTab === "animals" ? "active" : ""}`}
                onClick={() => setActiveWikiTab("animals")}
              >
                Hewan
              </button>
              <button 
                className={`wiki-tab-btn ${activeWikiTab === "weapons" ? "active" : ""}`}
                onClick={() => setActiveWikiTab("weapons")}
              >
                Senjata
              </button>
            </div>
            <div className="wiki-list">
              {activeWikiTab === "animals" ? (
                Object.keys(ANIMALS).map(rarity => 
                  ANIMALS[rarity].map(ani => (
                    <div className="wiki-item" key={ani.name}>
                      <span className="wiki-name"><PawIcon /> {ani.name}</span>
                      <span className={`wiki-rarity rarity-${ani.rarity}`}>{ani.rarity}</span>
                    </div>
                  ))
                )
              ) : (
                WEAPONS.map(w => (
                  <div className="wiki-item" key={w.id} style={{flexDirection: "column", alignItems: "flex-start", gap: "0.2rem"}}>
                    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                      <span className="wiki-name"><SwordsIcon /> {w.name}</span>
                      <span className={`wiki-rarity rarity-${w.tier}`}>{w.tier}</span>
                    </div>
                    <div style={{fontSize: "0.8rem", color: "#c9b1b1"}}>
                      DMG: {w.dmg} | Price: {w.price} | Durability: {w.durability}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1.5rem" }}>
            <h2 style={{ color: "#ff3b3b", marginBottom: "1rem" }}>Status & Profil</h2>
            <div className="profile-stats" style={{ background: "#0e0202", padding: "1.5rem", borderRadius: "8px", border: "1px solid #330d0d" }}>
              <div className="stat-row">
                <span className="stat-lbl">Username:</span>
                <span className="stat-val">{currentUser ? currentUser.username : "Player123"}</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Level:</span>
                <span className="stat-val">{level}</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Exp:</span>
                <span className="stat-val">{exp} / {level * 150}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(exp / (level * 150)) * 100}%` }} />
              </div>
              <div className="stat-row" style={{ marginTop: "1rem" }}>
                <span className="stat-lbl">Cowoncy:</span>
                <span className="stat-val"><CoinsIcon /> {cowoncy}</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Hewan Ditangkap:</span>
                <span className="stat-val">{totalAnimalsCount} ekor</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Senjata Aktif:</span>
                <span className="stat-val" style={{color: "#32d74b"}}>
                  {inventory[activeWeaponIndex] ? inventory[activeWeaponIndex].name : "None"}
                </span>
              </div>
              <button className="btn-secondary" style={{ marginTop: "1.5rem", width: "100%" }} onClick={handleLogout}>
                Keluar Sesi
              </button>
            </div>
          </div>
        );

      case "admin":
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1.5rem" }}>
            <h2 style={{ color: "#ff3b3b", marginBottom: "0.2rem" }}>Admin Dashboard</h2>
            <p style={{ fontSize: "0.85rem", color: "#c9b1b1", marginBottom: "1.2rem" }}>
              {currentUser?.isAdmin ? "Akses Terverifikasi: 20 Fitur Cheat Simulator Aktif." : "Silakan Login sebagai Admin."}
            </p>
            
            {currentUser?.isAdmin ? (
              <div className="admin-grid">
                {adminFeatures.map(f => (
                  <div className="admin-card" key={f.id}>
                    <div>
                      <div className="admin-card-title">{f.id}. {f.title}</div>
                      <div className="admin-card-desc">{f.desc}</div>
                    </div>
                    <button className="admin-btn" onClick={f.action}>Eksekusi</button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "#ff3b30", fontWeight: "700" }}>Akses ditolak. Fitur ini hanya untuk pengguna Administrator.</div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!showGame) {
    return (
      <div className="landing-container">
        <header className="landing-header">
          <div className="landing-logo">
            <span>GLVS</span> OWOGAME
          </div>
          {currentUser ? (
            <button className="btn-secondary" onClick={() => setShowGame(true)}>
              Masuk Terminal
            </button>
          ) : (
            <button className="btn-secondary" onClick={() => { setShowAuth(true); setAuthError(""); setAuthSuccess(""); }}>
              Login / Daftar
            </button>
          )}
        </header>

        {!showAuth ? (
          <>
            <section className="landing-hero">
              <h1 className="landing-title">
                Gothic Crimson <br />
                <span>OwO Bot Web Simulator</span>
              </h1>
              <p className="landing-subtitle">
                Rasakan simulasi RPG teks & gacha OwO Bot dalam tema anime gelap eksklusif. Dibangun dengan layout responsif khusus layar ponsel pintar.
              </p>
              <div className="landing-buttons">
                {currentUser ? (
                  <button className="btn-primary" onClick={() => setShowGame(true)}>
                    Mulai Petualangan <ArrowRightIcon />
                  </button>
                ) : (
                  <button className="btn-primary" onClick={() => { setShowAuth(true); setAuthError(""); setAuthSuccess(""); }}>
                    Masuk Akun / Main <ArrowRightIcon />
                  </button>
                )}
              </div>
            </section>

            <div className="landing-features">
              <div className="feature-card">
                <div className="feature-icon-wrapper"><PawIcon /></div>
                <h3 className="feature-title">Perburuan Senyap</h3>
                <p className="feature-desc">Kumpulkan puluhan spesies hewan unik di database perburuan owo tanpa batasan rumit Discord.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper"><SwordsIcon /></div>
                <h3 className="feature-title">Pertarungan Arena</h3>
                <p className="feature-desc">Gunakan koleksi persenjataan Anda untuk mengalahkan monster liar dan raih level tertinggi.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper"><ShopIcon /></div>
                <h3 className="feature-title">Pasar gelap</h3>
                <p className="feature-desc">Beli persenjataan tajam, buka peti misterius, dan kelola ransel inventaris Anda.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="auth-panel">
            <div className="auth-tabs">
              <button 
                className={`auth-tab-btn ${authTab === "login" ? "active" : ""}`}
                onClick={() => { setAuthTab("login"); setAuthError(""); setAuthSuccess(""); }}
              >
                Masuk
              </button>
              <button 
                className={`auth-tab-btn ${authTab === "register" ? "active" : ""}`}
                onClick={() => { setAuthTab("register"); setAuthError(""); setAuthSuccess(""); }}
              >
                Daftar
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="auth-form">
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Masukkan username..." 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Masukkan password..." 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}

              <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                {authTab === "login" ? "Masuk ke Game" : "Buat Akun"}
              </button>

              <button type="button" className="btn-secondary" style={{ width: "100%" }} onClick={() => setShowAuth(false)}>
                Kembali
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* desktop UI layout */}
      <div className="app-simulator">
        {/* Column 1: Left Channels Sidebar */}
        <div className="panel-left">
          <div className="panel-header">
            🏛️ GLVS OWOGAME
          </div>
          
          <div className="channel-list">
            <div className="channel-category">Panduan</div>
            <div 
              className={`channel-item ${activeChannel === "tutorial" ? "active" : ""}`}
              onClick={() => setActiveChannel("tutorial")}
            >
              <span className="channel-icon"><BookIcon /></span> #tutorial
            </div>
            <div 
              className={`channel-item ${activeChannel === "leaderboard" ? "active" : ""}`}
              onClick={() => setActiveChannel("leaderboard")}
            >
              <span className="channel-icon"><TrophyIcon /></span> #leaderboard
            </div>

            <div className="channel-category">Simulasi Chat</div>
            <div 
              className={`channel-item ${activeChannel === "owo-commands" ? "active" : ""}`}
              onClick={() => setActiveChannel("owo-commands")}
            >
              <span className="channel-icon"><PawIcon /></span> #owo-commands
            </div>

            {currentUser?.isAdmin && (
              <>
                <div className="channel-category">Administrator</div>
                <div 
                  className={`channel-item ${activeChannel === "admin-console" ? "active" : ""}`}
                  onClick={() => setActiveChannel("admin-console")}
                >
                  <span className="channel-icon"><KeyIcon /></span> #admin-console
                </div>
              </>
            )}
          </div>

          <div className="user-footer">
            <div className="user-profile">
              <div className="avatar">{currentUser ? currentUser.username[0].toUpperCase() : "P"}</div>
              <div className="user-details">
                <span className="user-name">{currentUser ? currentUser.username : "Player123"}</span>
                <span className="user-tag">{currentUser?.isAdmin ? "Administrator" : `Level ${level}`}</span>
              </div>
            </div>
            <button 
              style={{background: "none", border: "none", cursor: "pointer", display: "inline-flex", padding: "0.5rem", color: "#a81111"}}
              onClick={handleLogout}
            >
              <HomeIcon />
            </button>
          </div>
        </div>

        {/* Column 2: Center Active Chat Area or Admin Desktop Area */}
        {activeChannel === "admin-console" && currentUser?.isAdmin ? (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1.5rem" }}>
            <div className="panel-header">
              <span className="channel-icon"><KeyIcon /></span> admin-console
            </div>
            <h2 style={{ color: "#ff3b3b", marginTop: "1rem", marginBottom: "0.2rem" }}>Console Administrator (20 Fitur)</h2>
            <p style={{ fontSize: "0.85rem", color: "#c9b1b1", marginBottom: "1.2rem" }}>Picu event, tambah koin, spawn hewan legendary, atau simulasikan lag server secara langsung.</p>
            <div className="admin-grid">
              {adminFeatures.map(f => (
                <div className="admin-card" key={f.id}>
                  <div>
                    <div className="admin-card-title">{f.id}. {f.title}</div>
                    <div className="admin-card-desc">{f.desc}</div>
                  </div>
                  <button className="admin-btn" onClick={f.action}>Eksekusi</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="chat-area">
            <div className="panel-header">
              <span className="channel-icon">#</span>
              {activeChannel}
            </div>

            <div className="message-list">
              {activeChannel === "owo-commands" && (
                <>
                  {messages.map(msg => (
                    <div className="message-wrapper" key={msg.id}>
                      <div className="msg-avatar">{msg.avatar}</div>
                      <div className="msg-content-wrapper">
                        <div className="msg-header">
                          <span className="msg-author">{msg.author}</span>
                          {msg.isBot && <span className="bot-tag">BOT</span>}
                          <span className="msg-time">{msg.time}</span>
                        </div>
                        <div className="msg-body">{msg.body}</div>
                        
                        {msg.embed && (
                          <div className="discord-embed">
                            {msg.embed.title && <div className="embed-title">{msg.embed.title}</div>}
                            {msg.embed.description && <div className="embed-desc">{msg.embed.description}</div>}
                            <div className="embed-footer">GLVS Engine v4.9 • {msg.time}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </>
              )}

              {activeChannel === "tutorial" && (
                <div style={{color: "var(--ink-regular)", padding: "1rem"}}>
                  <h2>Buku Panduan OwO Simulator</h2>
                  <br />
                  <p>Gunakan tombol aksi cepat di bawah untuk berburu atau bertarung secara praktis di ponsel pintar Anda:</p>
                  <br />
                  <ul>
                    <li>• Jalankan /owo hunt untuk mencari hewan liar.</li>
                    <li>• Jalankan /owo battle untuk bertarung dan menaikkan level.</li>
                    <li>• Belanjakan koin Cowoncy Anda di /owo shop untuk meningkatkan senjata.</li>
                  </ul>
                </div>
              )}

              {activeChannel === "leaderboard" && (
                <div style={{color: "var(--ink-regular)", padding: "1rem"}}>
                  <h2>Papan Peringkat Global</h2>
                  <br />
                  <div className="profile-stats" style={{maxWidth: "400px"}}>
                    <div className="stat-row" style={{borderBottom: "1px solid #330d0d", padding: "0.6rem 0"}}>
                      <span>[1] owo_king</span>
                      <span>Lv. 92 (1,490,200)</span>
                    </div>
                    <div className="stat-row" style={{borderBottom: "1px solid #330d0d", padding: "0.6rem 0"}}>
                      <span>[2] gacha_lord</span>
                      <span>Lv. 78 (920,500)</span>
                    </div>
                    <div className="stat-row" style={{borderBottom: "1px solid #330d0d", padding: "0.6rem 0"}}>
                      <span>[3] Anda (Player123)</span>
                      <span>Lv. {level} ({cowoncy})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {activeChannel === "owo-commands" && (
              <div className="input-area">
                <div className="quick-action-bar">
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo hunt")}>
                    <PawIcon /> Hunt {cooldowns.hunt > 0 && `(${cooldowns.hunt}s)`}
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo battle")}>
                    <SwordsIcon /> Battle {cooldowns.battle > 0 && `(${cooldowns.battle}s)`}
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo inv")}>
                    <BagIcon /> Inv
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo zoo")}>
                    <PawIcon /> Zoo
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo shop")}>
                    <ShopIcon /> Shop
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo open crate")}>
                    <CrateIcon /> Crate ({crates})
                  </button>
                  <button className="btn-action-mobile" onClick={() => handleCommand("/owo open lootbox")}>
                    <LootboxIcon /> Box ({lootboxes})
                  </button>
                </div>

                {showAutocomplete && (
                  <div className="autocomplete-container">
                    <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo hunt")}>
                      <span className="autocomplete-command">/owo hunt</span>
                      <span className="autocomplete-desc">Berburu hewan dan dapatkan XP/Cowoncy</span>
                    </div>
                    <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo battle")}>
                      <span className="autocomplete-command">/owo battle</span>
                      <span className="autocomplete-desc">Tarung melawan monster menggunakan senjata aktif</span>
                    </div>
                    <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo inv")}>
                      <span className="autocomplete-command">/owo inv</span>
                      <span className="autocomplete-desc">Lihat isi ransel dan koin Anda</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleInputSubmit} className="input-container">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ketik perintah di sini..."
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="send-btn"><ArrowRightIcon /></button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Column 3: Right Database & Profile Info Panel */}
        <div className="panel-right">
          <div className="panel-right-title">Status & Ensiklopedia</div>
          
          <div className="right-section">
            <div className="right-section-title">Profil Anda</div>
            <div className="profile-stats">
              <div className="stat-row">
                <span className="stat-lbl">Level:</span>
                <span className="stat-val">{level}</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Exp:</span>
                <span className="stat-val">{exp} / {level * 150}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(exp / (level * 150)) * 100}%` }} />
              </div>
              <div className="stat-row" style={{marginTop: "0.5rem"}}>
                <span className="stat-lbl">Cowoncy:</span>
                <span className="stat-val"><CoinsIcon /> {cowoncy}</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Koleksi Hewan:</span>
                <span className="stat-val">{totalAnimalsCount} ekor</span>
              </div>
              <div className="stat-row">
                <span className="stat-lbl">Senjata Aktif:</span>
                <span className="stat-val" style={{color: "#32d74b"}}>
                  {inventory[activeWeaponIndex] ? inventory[activeWeaponIndex].name : "None"}
                </span>
              </div>
            </div>
          </div>

          <div style={{display: "flex", borderBottom: "1px solid #330d0d"}}>
            <button 
              className={`wiki-tab-btn ${activeWikiTab === "animals" ? "active" : ""}`}
              onClick={() => setActiveWikiTab("animals")}
            >
              Hewan
            </button>
            <button 
              className={`wiki-tab-btn ${activeWikiTab === "weapons" ? "active" : ""}`}
              onClick={() => setActiveWikiTab("weapons")}
            >
              Senjata
            </button>
          </div>

          <div style={{padding: "1rem"}}>
            {activeWikiTab === "animals" ? (
              <div className="wiki-list">
                {Object.keys(ANIMALS).map(rarity => 
                  ANIMALS[rarity].map(ani => (
                    <div className="wiki-item" key={ani.name}>
                      <span className="wiki-name"><PawIcon /> {ani.name}</span>
                      <span className={`wiki-rarity rarity-${ani.rarity}`}>{ani.rarity}</span>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="wiki-list">
                {WEAPONS.map(w => (
                  <div className="wiki-item" key={w.id} style={{flexDirection: "column", alignItems: "flex-start", gap: "0.2rem"}}>
                    <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                      <span className="wiki-name"><SwordsIcon /> {w.name}</span>
                      <span className={`wiki-rarity rarity-${w.tier}`}>{w.tier}</span>
                    </div>
                    <div style={{fontSize: "0.8rem", color: "#c9b1b1"}}>
                      DMG: {w.dmg} | Price: {w.price} | Durability: {w.durability}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render Mobile Portrait Tab View */}
      {renderMobileView()}

      {/* Mobile Portrait Bottom Navigation Bar */}
      <nav className="mobile-nav-bar">
        <button className={`mobile-nav-btn ${mobileTab === "chat" ? "active" : ""}`} onClick={() => setMobileTab("chat")}>
          <PawIcon />
          <span>Chat</span>
        </button>
        <button className={`mobile-nav-btn ${mobileTab === "wiki" ? "active" : ""}`} onClick={() => setMobileTab("wiki")}>
          <BookIcon />
          <span>Wiki</span>
        </button>
        <button className={`mobile-nav-btn ${mobileTab === "profile" ? "active" : ""}`} onClick={() => setMobileTab("profile")}>
          <UserIcon />
          <span>Profil</span>
        </button>
        {currentUser?.isAdmin && (
          <button className={`mobile-nav-btn ${mobileTab === "admin" ? "active" : ""}`} onClick={() => setMobileTab("admin")}>
            <KeyIcon />
            <span>Admin</span>
          </button>
        )}
      </nav>
    </div>
  );
}
