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

// --- Online Realtime Database (Firebase REST API) ---
const DB_URL = "https://glvsowogame-default-rtdb.asia-southeast1.firebasedatabase.app";

const OnlineDB = {
  async getUsers() {
    try {
      const res = await fetch(`${DB_URL}/users.json`);
      if (!res.ok) return [];
      const data = await res.json();
      return data ? Object.values(data) : [];
    } catch (e) {
      console.error("Firebase load users error:", e);
      return [];
    }
  },
  async saveUser(username, userData) {
    try {
      await fetch(`${DB_URL}/users/${username}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...userData })
      });
    } catch (e) {
      console.error("Firebase save user error:", e);
    }
  },
  async getComments() {
    try {
      const res = await fetch(`${DB_URL}/comments.json`);
      if (!res.ok) return [];
      const data = await res.json();
      return data ? Object.values(data).reverse() : [];
    } catch (e) {
      console.error("Firebase load comments error:", e);
      return [];
    }
  },
  async addComment(commentObj) {
    try {
      await fetch(`${DB_URL}/comments.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj)
      });
    } catch (e) {
      console.error("Firebase add comment error:", e);
    }
  },
  async deleteComment(commentId) {
    try {
      // Find comment by ID to delete
      const res = await fetch(`${DB_URL}/comments.json`);
      const data = await res.json();
      if (data) {
        const key = Object.keys(data).find(k => data[k].id === commentId);
        if (key) {
          await fetch(`${DB_URL}/comments/${key}.json`, { method: "DELETE" });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};

// --- Resilient IndexedDB Backup Storage ---
const initIndexedDB = () => {
  return new Promise((resolve) => {
    const request = indexedDB.open("GLVSOwoDB", 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("state")) {
        db.createObjectStore("state", { keyPath: "key" });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = () => resolve(null);
  });
};

const saveLocalBackup = async (key, val) => {
  try {
    const db = await initIndexedDB();
    if (!db) return;
    const tx = db.transaction("state", "readwrite");
    const store = tx.objectStore("state");
    store.put({ key, value: val });
  } catch (e) {
    console.error(e);
  }
};

const getLocalBackup = async (key) => {
  try {
    const db = await initIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction("state", "readonly");
      const store = tx.objectStore("state");
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

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
  const [equippedAnimal, setEquippedAnimal] = useState(null);
  const [shopPageTab, setShopPageTab] = useState(0);
  const [zooPageTab, setZooPageTab] = useState("common");
  const [animalLevels, setAnimalLevels] = useState({});
  const [animalExp, setAnimalExp] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [caughtAnimalEffect, setCaughtAnimalEffect] = useState(null);
  const [equippedTitle, setEquippedTitle] = useState("Novice Hunter");
  const [battlesCount, setBattlesCount] = useState(0);
  const [inspectingUser, setInspectingUser] = useState(null);

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalAnimalsCount = Object.values(animalsCaught).reduce((a, b) => a + b, 0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputText(val);
    if (val.startsWith("/")) {
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleAutocompleteClick = (cmd) => {
    setInputText(cmd);
    setShowAutocomplete(false);
  };


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
      const stateObj = {
        cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, equippedAnimal, animalLevels, animalExp, equippedTitle, battlesCount
      };
      
      // 1. Sync to localStorage database
      const db = getUsersDb();
      const userIndex = db.findIndex(u => u.username === currentUser.username);
      if (userIndex !== -1) {
        db[userIndex].state = stateObj;
        saveUserDb(db);
      }

      // 2. Backup to resilient client-side IndexedDB
      saveLocalBackup(`owo_user_${currentUser.username}`, stateObj);
      saveLocalBackup("owo_users_db_backup", db);

      // 3. Push and sync online to Firebase Cloud Database
      OnlineDB.saveUser(currentUser.username, {
        password: currentUser.password,
        isAdmin: currentUser.isAdmin || false,
        state: stateObj
      });
    }
  }, [cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, equippedAnimal, animalLevels, animalExp, equippedTitle, battlesCount, currentUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Title & 50 Achievements Definition ---
  const TITLES_LIST = [
    "Novice Hunter", "Amateur Trapper", "Predator", "Beast Master", "Zoo Keeper",
    "Gacha Addict", "Cowoncy Tycoon", "Crimson Knight", "Dark Summoner", "Kraken Slayer",
    "Arceus Chosen", "Dragon Rider", "Monster Executioner", "Soul Collector", "Grandmaster",
    "Apex Ranger", "Golden Hoarder", "Gothic Warlord", "Gladiator", "Obsidian Champion"
  ];

  const ACHIEVEMENTS_LIST = [
    { id: 1, name: "First Blood", desc: "Berhasil login pertama kali di game.", condition: (s) => true },
    { id: 2, name: "Baby Steps", desc: "Mencapai Level 2.", condition: (s) => (s.level >= 2) },
    { id: 3, name: "Novice Gladiator", desc: "Menang battle sebanyak 5 kali.", condition: (s) => (s.battlesCount >= 5) },
    { id: 4, name: "Zoo Starter", desc: "Tangkap minimal 5 ekor hewan total.", condition: (s) => (s.totalAnimals >= 5) },
    { id: 5, name: "Bronze Buyer", desc: "Beli minimal 1 senjata Bronze.", condition: (s) => s.inventory?.some(w => w.tier === "Bronze") },
    { id: 6, name: "Penny Pincher", desc: "Miliki 2,000 Cowoncy.", condition: (s) => (s.cowoncy >= 2000) },
    { id: 7, name: "Animal Lover", desc: "Miliki 1 hewan Epic.", condition: (s) => s.animals?.some(a => a.rarity === "Epic") },
    { id: 8, name: "Iron Will", desc: "Beli minimal 1 senjata Iron.", condition: (s) => s.inventory?.some(w => w.tier === "Iron") },
    { id: 9, name: "Veteran Hunter", desc: "Mencapai Level 10.", condition: (s) => (s.level >= 10) },
    { id: 10, name: "Gacha Fanatic", desc: "Buka minimal 10 crates.", condition: (s) => (s.totalAnimals >= 10) },
    { id: 11, name: "Capitalist", desc: "Miliki 10,000 Cowoncy.", condition: (s) => (s.cowoncy >= 10000) },
    { id: 12, name: "Elite Battler", desc: "Menang battle sebanyak 25 kali.", condition: (s) => (s.battlesCount >= 25) },
    { id: 13, name: "Zoo Enthusiast", desc: "Kumpulkan 30 ekor hewan.", condition: (s) => (s.totalAnimals >= 30) },
    { id: 14, name: "Silver Slasher", desc: "Miliki senjata Silver.", condition: (s) => s.inventory?.some(w => w.tier === "Silver") },
    { id: 15, name: "Mythical Encounter", desc: "Tangkap minimal 1 hewan Mythic.", condition: (s) => s.animals?.some(a => a.rarity === "Mythic") },
    { id: 16, name: "Gold Standard", desc: "Miliki senjata Gold.", condition: (s) => s.inventory?.some(w => w.tier === "Gold") },
    { id: 17, name: "Ascendant", desc: "Mencapai Level 20.", condition: (s) => (s.level >= 20) },
    { id: 18, name: "Zoo Director", desc: "Kumpulkan 60 ekor hewan.", condition: (s) => (s.totalAnimals >= 60) },
    { id: 19, name: "Champion Gladiator", desc: "Menang battle 50 kali.", condition: (s) => (s.battlesCount >= 50) },
    { id: 20, name: "Lord of Legend", desc: "Tangkap minimal 1 hewan Legendary.", condition: (s) => s.animals?.some(a => a.rarity === "Legendary") },
    { id: 21, name: "Hoarder", desc: "Miliki 25,000 Cowoncy.", condition: (s) => (s.cowoncy >= 25000) },
    { id: 22, name: "Diamond Hands", desc: "Miliki senjata Diamond.", condition: (s) => s.inventory?.some(w => w.tier === "Diamond") },
    { id: 23, name: "Animal Whispering", desc: "Dapatkan salah satu hewan setidaknya Level 5.", condition: (s) => Object.values(s.animalLevels || {}).some(lvl => lvl >= 5) },
    { id: 24, name: "Super Rich", desc: "Miliki 50,000 Cowoncy.", condition: (s) => (s.cowoncy >= 50000) },
    { id: 25, name: "Overlord", desc: "Mencapai Level 30.", condition: (s) => (s.level >= 30) },
    { id: 26, name: "Crimson Conqueror", desc: "Kumpulkan 100 ekor hewan.", condition: (s) => (s.totalAnimals >= 100) },
    { id: 27, name: "Colosseum Star", desc: "Menang battle 100 kali.", condition: (s) => (s.battlesCount >= 100) },
    { id: 28, name: "Weapon Collector", desc: "Miliki minimal 5 senjata di tas.", condition: (s) => (s.inventory?.length >= 5) },
    { id: 29, name: "Obsidian Slayer", desc: "Miliki senjata Obsidian.", condition: (s) => s.inventory?.some(w => w.tier === "Obsidian") },
    { id: 30, name: "Mythic Master", desc: "Miliki 3 hewan Mythic.", condition: (s) => (s.animals?.filter(a => a.rarity === "Mythic").length >= 3) },
    { id: 31, name: "Half Century", desc: "Mencapai Level 50.", condition: (s) => (s.level >= 50) },
    { id: 32, name: "Gacha King", desc: "Miliki total 150 ekor hewan.", condition: (s) => (s.totalAnimals >= 150) },
    { id: 33, name: "God of War", desc: "Menang battle 200 kali.", condition: (s) => (s.battlesCount >= 200) },
    { id: 34, name: "Cosmic Voyager", desc: "Miliki senjata Cosmic.", condition: (s) => s.inventory?.some(w => w.tier === "Cosmic") },
    { id: 35, name: "Legendary Trainer", desc: "Miliki 2 hewan Legendary.", condition: (s) => (s.animals?.filter(a => a.rarity === "Legendary").length >= 2) },
    { id: 36, name: "Zoo Emperor", desc: "Miliki total 200 ekor hewan.", condition: (s) => (s.totalAnimals >= 200) },
    { id: 37, name: "Immortal", desc: "Mencapai Level 75.", condition: (s) => (s.level >= 75) },
    { id: 38, name: "Milionare", desc: "Miliki 100,000 Cowoncy.", condition: (s) => (s.cowoncy >= 100000) },
    { id: 39, name: "Apex Predator", desc: "Dapatkan salah satu hewan aktif Level 10.", condition: (s) => Object.values(s.animalLevels || {}).some(lvl => lvl >= 10) },
    { id: 40, name: "Unstoppable", desc: "Menang battle 300 kali.", condition: (s) => (s.battlesCount >= 300) },
    { id: 41, name: "Cosmic Hoarder", desc: "Miliki 3 senjata Cosmic.", condition: (s) => (s.inventory?.filter(w => w.tier === "Cosmic").length >= 3) },
    { id: 42, name: "Animal Sanctuary", desc: "Miliki 300 ekor hewan.", condition: (s) => (s.totalAnimals >= 300) },
    { id: 43, name: "Mythic Legend", desc: "Buka minimal 5 hewan Mythic.", condition: (s) => (s.animals?.filter(a => a.rarity === "Mythic").length >= 5) },
    { id: 44, name: "Centurion", desc: "Mencapai Level 100.", condition: (s) => (s.level >= 100) },
    { id: 45, name: "Billionaire Dream", desc: "Miliki 500,000 Cowoncy.", condition: (s) => (s.cowoncy >= 500000) },
    { id: 46, name: "Lord of Arena", desc: "Menang battle 500 kali.", condition: (s) => (s.battlesCount >= 500) },
    { id: 47, name: "God Breeder", desc: "Dapatkan salah satu hewan Level 20.", condition: (s) => Object.values(s.animalLevels || {}).some(lvl => lvl >= 20) },
    { id: 48, name: "Divine Collector", desc: "Miliki 5 hewan Legendary.", condition: (s) => (s.animals?.filter(a => a.rarity === "Legendary").length >= 5) },
    { id: 49, name: "Collector Emperor", desc: "Koleksi minimal 500 ekor hewan.", condition: (s) => (s.totalAnimals >= 500) },
    { id: 50, name: "Absolute Deity", desc: "Mencapai Level 150 & miliki 1,000,000 Cowoncy.", condition: (s) => (s.level >= 150 && s.cowoncy >= 1000000) }
  ];

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

  // Sync state to current logged-in user profile
  useEffect(() => {
    if (currentUser) {
      const stateObj = {
        cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, equippedAnimal, animalLevels, animalExp, equippedTitle, battlesCount
      };
      
      // 1. Sync to localStorage database
      const db = getUsersDb();
      const userIndex = db.findIndex(u => u.username === currentUser.username);
      if (userIndex !== -1) {
        db[userIndex].state = stateObj;
        saveUserDb(db);
      }

      // 2. Backup to resilient client-side IndexedDB
      saveLocalBackup(`owo_user_${currentUser.username}`, stateObj);
      saveLocalBackup("owo_users_db_backup", db);

      // 3. Push and sync online to Firebase Cloud Database
      OnlineDB.saveUser(currentUser.username, {
        password: currentUser.password,
        isAdmin: currentUser.isAdmin || false,
        state: stateObj
      });
    }
  }, [cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, equippedAnimal, animalLevels, animalExp, equippedTitle, battlesCount, currentUser]);

  const [renameInput, setRenameInput] = useState("");
  const [renameError, setRenameError] = useState("");

  const handleRenameUser = async () => {
    setRenameError("");
    const newName = renameInput.trim();
    if (!newName) {
      setRenameError("Nama baru tidak boleh kosong.");
      return;
    }
    if (newName === currentUser.username) {
      setRenameError("Nama baru harus berbeda dengan nama lama.");
      return;
    }
    if (newName.length < 3 || newName.length > 15) {
      setRenameError("Panjang username harus antara 3 - 15 karakter.");
      return;
    }
    if (cowoncy < 25000) {
      setRenameError("Saldo Cowoncy Anda tidak cukup! Butuh 25,000 🪙.");
      return;
    }

    const db = getUsersDb();
    const isExist = db.some(u => u.username.toLowerCase() === newName.toLowerCase());
    if (isExist) {
      setRenameError("Username sudah terpakai oleh pemain lain.");
      return;
    }

    if (confirm(`Ubah username dari ${currentUser.username} ke ${newName} seharga 25,000 Cowoncy?`)) {
      const oldUsername = currentUser.username;
      const updatedUser = {
        ...currentUser,
        username: newName,
        state: {
          ...currentUser.state,
          cowoncy: cowoncy - 25000,
          exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, equippedAnimal, animalLevels, animalExp, equippedTitle, battlesCount
        }
      };

      // Update in Local Storage DB list
      const updatedDb = db.map(u => {
        if (u.username === oldUsername) {
          return updatedUser;
        }
        return u;
      });
      saveUserDb(updatedDb);

      // Remove old user from Cloud & Set new user
      try {
        await fetch(`${DB_URL}/users/${oldUsername}.json`, { method: "DELETE" });
      } catch(e) { console.error(e); }

      await OnlineDB.saveUser(newName, updatedUser);
      saveLocalBackup(`owo_user_${newName}`, updatedUser.state);
      saveLocalBackup("owo_users_db_backup", updatedDb);

      setCowoncy(c => c - 25000);
      setCurrentUser(updatedUser);
      setRenameInput("");
      alert("Selamat! Nama berhasil diubah.");
    }
  };

  // Load/Merge database from Firebase & Local backups when app starts or game loads
  useEffect(() => {
    const syncCloudDb = async () => {
      // 1. Fetch from Firebase
      const cloudUsers = await OnlineDB.getUsers();
      
      // 2. Fetch from local backups
      const localDb = getUsersDb();
      
      // Merge users
      const mergedDb = [...localDb];
      cloudUsers.forEach(cu => {
        const matchIdx = mergedDb.findIndex(u => u.username === cu.username);
        if (matchIdx !== -1) {
          mergedDb[matchIdx] = cu;
        } else {
          mergedDb.push(cu);
        }
      });
      
      saveUserDb(mergedDb);
      saveLocalBackup("owo_users_db_backup", mergedDb);
    };
    
    syncCloudDb();
    
    // Fetch comments and leaderboard online initially
    const loadSharedContent = async () => {
      const comms = await OnlineDB.getComments();
      setComments(comms);
      
      const allUsrs = await OnlineDB.getUsers();
      setAllUsers(allUsrs);
      // Sort users by level (descending) and cowoncy (descending) to build a global leaderboard
      const sortedLeaderboard = [...allUsrs].sort((a, b) => {
        const lvlA = a.state?.level || 1;
        const lvlB = b.state?.level || 1;
        if (lvlB !== lvlA) return lvlB - lvlA;
        const cowA = a.state?.cowoncy || 0;
        const cowB = b.state?.cowoncy || 0;
        return cowB - cowA;
      }).slice(0, 10);
      setLeaderboard(sortedLeaderboard);
    };

    loadSharedContent();
    
    // Set interval to poll comments & leaderboard every 10 seconds for real-time feel
    const interval = setInterval(loadSharedContent, 10000);
    return () => clearInterval(interval);
  }, [showGame]);

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
          title: "Level Up!",
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
        let bonusXp = 0;
        if (equippedAnimal) {
          const rarityLower = equippedAnimal.rarity.toLowerCase();
          if (rarityLower === "common") bonusXp = 1;
          else if (rarityLower === "uncommon") bonusXp = 3;
          else if (rarityLower === "rare") bonusXp = 5;
          else if (rarityLower === "epic") bonusXp = 10;
          else if (rarityLower === "mythic") bonusXp = 20;
          else if (rarityLower === "legendary") bonusXp = 50;
        }
        const expEarned = animal.exp + bonusXp;
        setCowoncy(c => c + cowoncyEarned);
        
        // Trigger Special Caught Visual Overlay Effect
        setCaughtAnimalEffect({
          name: animal.name,
          rarity: animal.rarity,
          exp: animal.exp
        });

        // Add leveling progress to the equipped animal
        if (equippedAnimal) {
          const eqName = equippedAnimal.name;
          const currentLvl = animalLevels[eqName] || 1;
          const currentXp = (animalExp[eqName] || 0) + 15;
          const xpNeeded = currentLvl * 100;
          if (currentXp >= xpNeeded) {
            setAnimalLevels(prev => ({ ...prev, [eqName]: currentLvl + 1 }));
            setAnimalExp(prev => ({ ...prev, [eqName]: currentXp - xpNeeded }));
            addMessage("System", <SystemIcon />, false, `🐾 [ANIMAL LEVEL UP] Hewan aktif Anda, ${eqName}, naik ke Level ${currentLvl + 1}!`);
          } else {
            setAnimalExp(prev => ({ ...prev, [eqName]: currentXp }));
          }
        }

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
            title: "Hasil Perburuan",
            description: `Hewan: ${animal.name} (${animal.rarity})\nHadiah: +${cowoncyEarned} Cowoncy\nExp: +${expEarned * xpMultiplier} XP ${bonusXp > 0 ? `(+${bonusXp} Animal Bonus)` : ""}\n\nSenjata Aktif: ${currentWeapon ? `${currentWeapon.name} (Durability: ${infiniteDurability ? "Infinity" : `${currentWeapon.currentDurability - 1}/${currentWeapon.durability}`})` : "Tanpa Senjata"}`
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
        setBattlesCount(b => b + 1);

        const playerWeapon = inventory[activeWeaponIndex];
        const animalLevelBonus = equippedAnimal ? (animalLevels[equippedAnimal.name] || 1) * 15 : 0;
        const playerPower = (playerWeapon ? playerWeapon.dmg : 5) + animalLevelBonus;
        // Balance: Enemy power scales with player level, making it fair at start and scaling up
        const enemyPower = Math.floor(Math.random() * (10 + level * 5)) + (5 + level * 2);

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
            title: isWin ? "Victory!" : "Defeat!",
            description: `Kekuatan Anda: ${playerRoll.toFixed(1)} DMG ${equippedAnimal ? `(+${animalLevelBonus} Animal Lv.${animalLevels[equippedAnimal.name] || 1} Boost)` : ""}\nKekuatan Monster: ${enemyRoll.toFixed(1)} DMG\n\nHasil: ${isWin ? "Menang!" : "Kalah"}\nHadiah: +${cowoncyReward} Cowoncy\nExp: +${expReward * xpMultiplier} XP`
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
            title: "Selamat!",
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
        setAnimalsCaught(user.state.animalsCaught || {});
        setCrates(user.state.crates);
        setLootboxes(user.state.lootboxes);
        setEquippedAnimal(user.state.equippedAnimal || null);
        setAnimalLevels(user.state.animalLevels || {});
        setAnimalExp(user.state.animalExp || {});
        setEquippedTitle(user.state.equippedTitle || "Novice Hunter");
        setBattlesCount(user.state.battlesCount || 0);
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
        setEquippedAnimal(null);
        setAnimalLevels({});
        setAnimalExp({});
        setEquippedTitle("Novice Hunter");
        setBattlesCount(0);
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
          title: "Status Server: Lancar",
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

  const handleBuyItem = (item) => {
    if (cowoncy < item.price) {
      alert(`Saldo Cowoncy Anda tidak cukup! Kurang ${item.price - cowoncy} Cowoncy.`);
      return;
    }
    setCowoncy(c => c - item.price);
    
    if (item.id === "crate") {
      setCrates(c => c + 1);
    } else if (item.id === "lootbox") {
      setLootboxes(l => l + 1);
    } else {
      setInventory(prev => [
        ...prev,
        { ...item, currentDurability: item.durability || 1 }
      ]);
    }
    alert(`Berhasil membeli ${item.name}!`);
  };

  const getAnimalPassiveDesc = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "common": return "+1 EXP per hunt";
      case "uncommon": return "+3 EXP per hunt";
      case "rare": return "+5 EXP per hunt";
      case "epic": return "+10 EXP per hunt";
      case "mythic": return "+20 EXP per hunt";
      case "legendary": return "+50 EXP per hunt";
      default: return "+0 EXP";
    }
  };

  const handleEquipAnimal = (animal) => {
    if (equippedAnimal && equippedAnimal.name === animal.name) {
      setEquippedAnimal(null);
      alert(`Berhasil melepaskan ${animal.name} dari tim.`);
    } else {
      setEquippedAnimal(animal);
      alert(`Berhasil memasang ${animal.name} sebagai hewan aktif! Anda mendapatkan bonus passive: ${getAnimalPassiveDesc(animal.rarity)}.`);
    }
  };

  const getShopTabs = () => {
    const t1 = WEAPONS.filter(w => ["Bronze", "Iron", "Steel"].includes(w.tier)).slice(0, 8);
    const t2 = WEAPONS.filter(w => ["Silver", "Gold"].includes(w.tier)).slice(0, 8);
    const t3 = WEAPONS.filter(w => ["Emerald", "Diamond"].includes(w.tier)).slice(0, 8);
    const t4 = WEAPONS.filter(w => ["Obsidian", "Mythic", "Cosmic"].includes(w.tier)).slice(0, 8);
    const t5 = SHOP_ITEMS.filter(i => !i.dmg).slice(0, 8);
    const t6 = SHOP_ITEMS.filter(i => !i.dmg).slice(8, 16);

    return [
      { name: "Weapons I", items: t1 },
      { name: "Weapons II", items: t2 },
      { name: "Weapons III", items: t3 },
      { name: "Weapons IV", items: t4 },
      { name: "Chests & Crates", items: t5 },
      { name: "Potions & Buffs", items: t6 }
    ];
  };

  // Render components based on screen selection (Mobile Tab vs Desktop Layout)
  const renderMobileView = () => {
    switch (mobileTab) {
      case "shop": {
        const tabs = getShopTabs();
        const activeTabObj = tabs[shopPageTab] || tabs[0];
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ color: "#ff3b3b", margin: 0 }}>Toko & Senjata</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "1rem", fontWeight: "700", color: "#ffd60a" }}>
                <CoinsIcon /> {cowoncy}
              </div>
            </div>
            
            {/* Shop Sub-tabs */}
            <div className="shop-tabs-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem", marginBottom: "1rem" }}>
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  className={`shop-tab-btn ${shopPageTab === idx ? "active" : ""}`}
                  style={{
                    padding: "0.6rem 0.2rem",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    border: "1px solid #701c1c",
                    borderRadius: "8px",
                    background: shopPageTab === idx ? "linear-gradient(135deg, #ff3b3b 0%, #a81111 100%)" : "rgba(20, 2, 2, 0.6)",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={() => setShopPageTab(idx)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Shop Grid (Exactly up to 8 items in 1 page box) */}
            <div className="shop-items-grid" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {activeTabObj.items.map(item => (
                <div 
                  key={item.id} 
                  className="shop-item-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.9rem",
                    background: "rgba(30, 2, 2, 0.5)",
                    border: "1px solid #3d0d0d",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", textAlign: "left" }}>
                    <span style={{ fontWeight: "700", color: "#fff", fontSize: "0.95rem" }}>{item.name}</span>
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <span className={`wiki-rarity rarity-${item.tier}`} style={{ fontSize: "0.65rem", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>
                        {item.tier}
                      </span>
                      {item.dmg && (
                        <span style={{ fontSize: "0.75rem", color: "#ff8282" }}>
                          DMG: {item.dmg}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <span style={{ fontSize: "0.75rem", color: "#c9b1b1" }}>
                        {item.description}
                      </span>
                    )}
                  </div>
                  <button 
                    className="btn-primary" 
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", borderRadius: "8px", flexShrink: 0 }}
                    onClick={() => handleBuyItem(item)}
                  >
                    Beli ({item.price} 🪙)
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "team": {
        const rarities = ["common", "uncommon", "rare", "epic", "mythic", "legendary"];
        const currentRarityAnimals = ANIMALS[zooPageTab] || ANIMALS.common;
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ color: "#ff3b3b", margin: 0 }}>Tim & Kebun Binatang</h2>
              {equippedAnimal && (
                <div style={{ fontSize: "0.8rem", color: "#32d74b", background: "rgba(50, 215, 75, 0.1)", padding: "0.3rem 0.6rem", borderRadius: "6px", border: "1px solid rgba(50, 215, 75, 0.2)" }}>
                  Aktif: {equippedAnimal.name}
                </div>
              )}
            </div>

            {/* Rarity Tabs */}
            <div className="shop-tabs-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem", marginBottom: "1rem" }}>
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  className={`shop-tab-btn ${zooPageTab === rarity ? "active" : ""}`}
                  style={{
                    padding: "0.6rem 0.2rem",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    border: "1px solid #701c1c",
                    borderRadius: "8px",
                    background: zooPageTab === rarity ? "linear-gradient(135deg, #ff3b3b 0%, #a81111 100%)" : "rgba(20, 2, 2, 0.6)",
                    color: "#fff",
                    cursor: "pointer",
                    textTransform: "capitalize"
                  }}
                  onClick={() => setZooPageTab(rarity)}
                >
                  {rarity}
                </button>
              ))}
            </div>

            {/* Animal List with Stats on Left, Equip Button on Right */}
            <div className="shop-items-grid" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {currentRarityAnimals.map(ani => {
                const count = animalsCaught[ani.name] || 0;
                const isEquipped = equippedAnimal && equippedAnimal.name === ani.name;
                const passiveDesc = getAnimalPassiveDesc(ani.rarity);
                return (
                  <div 
                    key={ani.name} 
                    className="shop-item-row"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.9rem",
                      background: isEquipped ? "rgba(50, 215, 75, 0.08)" : "rgba(30, 2, 2, 0.5)",
                      border: isEquipped ? "1px solid #32d74b" : "1px solid #3d0d0d",
                      borderRadius: "12px",
                      opacity: count > 0 ? 1 : 0.5,
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", textAlign: "left" }}>
                      <span style={{ fontWeight: "700", color: "#fff", fontSize: "0.95rem" }}>
                        <PawIcon /> {ani.name}
                      </span>
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        <span className={`wiki-rarity rarity-${ani.rarity}`} style={{ fontSize: "0.65rem", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>
                          {ani.rarity}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#ffd60a" }}>
                          Dimiliki: {count}
                        </span>
                      </div>
                      {count > 0 && (
                        <div style={{ fontSize: "0.75rem", color: "#64d2ff", fontWeight: "600" }}>
                          Lv. {animalLevels[ani.name] || 1} ({animalExp[ani.name] || 0} / {(animalLevels[ani.name] || 1) * 100} XP)
                        </div>
                      )}
                      <span style={{ fontSize: "0.75rem", color: "#32d74b", fontWeight: "600" }}>
                        Boost: {passiveDesc}
                      </span>
                    </div>

                    {count > 0 ? (
                      <button 
                        className="btn-primary" 
                        style={{ 
                          padding: "0.5rem 1rem", 
                          fontSize: "0.8rem", 
                          borderRadius: "8px", 
                          flexShrink: 0,
                          background: isEquipped ? "linear-gradient(135deg, #30d158 0%, #1c7c35 100%)" : undefined,
                          borderColor: isEquipped ? "#30d158" : undefined,
                          boxShadow: isEquipped ? "0 0 15px rgba(48, 209, 88, 0.3)" : undefined
                        }}
                        onClick={() => handleEquipAnimal(ani)}
                      >
                        {isEquipped ? "Lepas" : "Pasang"}
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#8e8e93", paddingRight: "0.5rem", fontWeight: "600" }}>
                        Locked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      case "chat":
        return (
          <div className="chat-area">
            <div className="panel-header">
              <span className="channel-icon">#</span> owo-commands
            </div>
            
            <div className="message-list">
              {messages.map(msg => (
                <div className={`message-wrapper ${msg.isBot ? "bot-response" : "user-response"}`} key={msg.id}>
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

      case "comments": {
        const handleSendComment = async (e) => {
          e.preventDefault();
          if (!newCommentText.trim()) return;
          const comm = {
            id: Math.random().toString(),
            username: currentUser ? currentUser.username : "Anonymous",
            body: newCommentText,
            time: new Date().toLocaleString()
          };
          await OnlineDB.addComment(comm);
          setNewCommentText("");
          const updated = await OnlineDB.getComments();
          setComments(updated);
        };

        const handleDeleteComment = async (id) => {
          if (confirm("Hapus komentar ini?")) {
            await OnlineDB.deleteComment(id);
            const updated = await OnlineDB.getComments();
            setComments(updated);
          }
        };

        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1rem" }}>
            <h2 style={{ color: "#ff3b3b", marginBottom: "1rem" }}>Kolom Komentar Global</h2>
            
            <form onSubmit={handleSendComment} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input
                type="text"
                className="form-input"
                style={{ flexGrow: 1 }}
                placeholder="Tulis ulasan/komentar tentang game ini..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}>Kirim</button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {comments.map(c => (
                <div 
                  key={c.id} 
                  style={{
                    background: "rgba(30, 2, 2, 0.5)",
                    border: "1px solid #3d0d0d",
                    borderRadius: "12px",
                    padding: "0.9rem",
                    textAlign: "left",
                    position: "relative"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: "700", color: "#ff3b3b" }}>{c.username}</span>
                    <span style={{ fontSize: "0.7rem", color: "#8e8e93" }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#fff", margin: 0 }}>{c.body}</p>
                  
                  {currentUser?.isAdmin && (
                    <button 
                      style={{
                        position: "absolute",
                        right: "0.9rem",
                        bottom: "0.9rem",
                        background: "#ff3b30",
                        border: "none",
                        color: "#fff",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        cursor: "pointer"
                      }}
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "info":
        return (
          <div className="chat-area" style={{ overflowY: "auto", padding: "1rem" }}>
            <h2 style={{ color: "#ff3b3b", marginBottom: "1rem" }}>Info & Ensiklopedia</h2>
            <div style={{ display: "flex", marginBottom: "1rem", gap: "0.3rem" }}>
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
              <button 
                className={`wiki-tab-btn ${activeWikiTab === "leaderboard" ? "active" : ""}`}
                onClick={() => setActiveWikiTab("leaderboard")}
              >
                Leaderboard
              </button>
            </div>
            
            {activeWikiTab === "leaderboard" ? (
              <div className="profile-stats" style={{ background: "#0e0202", padding: "1.2rem", borderRadius: "12px", border: "1px solid #330d0d" }}>
                <div style={{ fontWeight: "800", color: "#ffd60a", marginBottom: "0.8rem", fontSize: "0.95rem" }}>Top 10 Pemain Global (Klik untuk Inspect)</div>
                {leaderboard.map((usr, idx) => (
                  <div 
                    key={usr.username} 
                    className="stat-row clickable" 
                    style={{ borderBottom: "1px solid #330d0d", padding: "0.6rem 0", cursor: "pointer" }}
                    onClick={() => setInspectingUser(usr)}
                  >
                    <span style={{ color: idx < 3 ? "#ff3b3b" : "#fff", fontWeight: "700" }}>
                      [{idx + 1}] {usr.username} {usr.isAdmin && "👑"}
                    </span>
                    <span style={{ color: "#c9b1b1" }}>
                      Lv. {usr.state?.level || 1} ({usr.state?.cowoncy || 0} 🪙)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="wiki-list">
                {activeWikiTab === "animals" ? (
                  <>
                    <div style={{ padding: "0.5rem", background: "rgba(255, 59, 59, 0.08)", border: "1px solid rgba(255, 59, 59, 0.2)", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.8rem", color: "#c9b1b1", textAlign: "left" }}>
                      <strong>RNG HUNT RATES (WIKI):</strong><br />
                      • Common: 50.0%<br />
                      • Uncommon: 25.0%<br />
                      • Rare: 15.0%<br />
                      • Epic: 6.0%<br />
                      • Mythic: 3.0%<br />
                      • Legendary: 0.9%<br />
                      • Special Event: 0.1%
                    </div>
                    {Object.keys(ANIMALS).map(rarity => 
                      ANIMALS[rarity].map(ani => (
                        <div className="wiki-item" key={ani.name}>
                          <span className="wiki-name"><PawIcon /> {ani.name}</span>
                          <span className={`wiki-rarity rarity-${ani.rarity}`}>{ani.rarity}</span>
                        </div>
                      ))
                    )}
                  </>
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
            )}
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
                <span className="stat-lbl">Gelar (Title):</span>
                <select 
                  value={equippedTitle} 
                  onChange={(e) => setEquippedTitle(e.target.value)}
                  style={{ background: "#1c0505", border: "1px solid #541414", color: "#fff", padding: "0.2rem", borderRadius: "4px" }}
                >
                  {TITLES_LIST.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
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
              
              {/* Change Username Input Form */}
              <div style={{ marginTop: "1.5rem", borderTop: "1px solid #330d0d", paddingTop: "1rem", textAlign: "left" }}>
                <span style={{ fontSize: "0.85rem", color: "#ffd60a", fontWeight: "700" }}>GANTI USERNAME (Biaya: 25,000 🪙)</span>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ flexGrow: 1, padding: "0.5rem", fontSize: "0.85rem" }}
                    placeholder="Username baru..."
                    value={renameInput}
                    onChange={(e) => setRenameInput(e.target.value)}
                  />
                  <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }} onClick={handleRenameUser}>
                    Ubah
                  </button>
                </div>
                {renameError && <div style={{ color: "#ff453a", fontSize: "0.75rem", marginTop: "0.3rem" }}>{renameError}</div>}
              </div>

              <button className="btn-secondary" style={{ marginTop: "1.5rem", width: "100%" }} onClick={handleLogout}>
                Keluar Sesi
              </button>
            </div>

            {/* Achievements List Display */}
            <div style={{ marginTop: "2rem", textAlign: "left" }}>
              <h3 style={{ color: "#ff3b3b", fontSize: "1.2rem", borderBottom: "1px solid #330d0d", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                Pencapaian & Achievements (50 Tantangan)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: "300px", overflowY: "auto", paddingRight: "0.3rem" }}>
                {ACHIEVEMENTS_LIST.map(ach => {
                  const unlocked = ach.condition({
                    level,
                    battlesCount,
                    cowoncy,
                    totalAnimals: totalAnimalsCount,
                    inventory,
                    animals: Object.keys(animalsCaught).map(name => {
                      const matchRarities = Object.keys(ANIMALS).find(rar => ANIMALS[rar].some(a => a.name === name));
                      return { name, rarity: matchRarities };
                    }),
                    animalLevels
                  });
                  return (
                    <div 
                      key={ach.id} 
                      style={{
                        background: unlocked ? "rgba(48, 209, 88, 0.08)" : "rgba(30, 2, 2, 0.4)",
                        border: unlocked ? "1px solid #30d158" : "1px solid #3d0d0d",
                        borderRadius: "8px",
                        padding: "0.8rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", color: unlocked ? "#30d158" : "#fff", fontSize: "0.85rem" }}>
                          {ach.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#c9b1b1", marginTop: "0.1rem" }}>
                          {ach.desc}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", color: unlocked ? "#30d158" : "#8e8e93" }}>
                        {unlocked ? "TERBUKA" : "TERKUNCI"}
                      </span>
                    </div>
                  );
                })}
              </div>
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
              <>
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

                {/* Secret Monitor Dashboard */}
                <div style={{ marginTop: "2rem", borderTop: "1px solid #330d0d", paddingTop: "1.5rem" }}>
                  <h3 style={{ color: "#ffd60a", marginBottom: "0.8rem", fontSize: "1.1rem" }}>
                    Monitor Dashboard (Akun Terdaftar: {allUsers.length})
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {allUsers.map(usr => (
                      <div 
                        key={usr.username} 
                        style={{
                          background: "rgba(20, 2, 2, 0.7)",
                          border: "1px solid #541414",
                          borderRadius: "12px",
                          padding: "0.9rem",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                          <span style={{ fontWeight: "700", color: "#ff3b3b" }}>{usr.username} {usr.isAdmin && "👑"}</span>
                          <span style={{ fontSize: "0.75rem", color: "#32d74b", fontWeight: "700" }}>Level {usr.state?.level || 1}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#c9b1b1" }}>
                          Saldo: {usr.state?.cowoncy || 0} Cowoncy | Crate: {usr.state?.crates || 0} | Box: {usr.state?.lootboxes || 0}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#8e8e93", marginTop: "0.2rem" }}>
                          Hewan Aktif: {usr.state?.equippedAnimal?.name || "None"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
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
          <div className="auth-panel gothic-login">
            {/* Warning Banner */}
            <div style={{ background: "rgba(255, 59, 58, 0.15)", border: "1px solid #ff453a", borderRadius: "10px", padding: "0.8rem", marginBottom: "1.2rem", fontSize: "0.8rem", color: "#ff453a", textAlign: "left", lineHeight: "1.4" }}>
              <strong>⚠️ PERINGATAN KEAMANAN:</strong><br />
              Jangan gunakan password / kata sandi atau data akun asli Anda yang sama dengan platform Discord / game lainnya. Akun ini hanya untuk game simulator web.
            </div>
            <div className="auth-anime-logo">
              <div className="auth-brand">GLVS // RUN</div>
              <div className="auth-sub-brand">OwO Bot Gothic Crimson Simulator</div>
              <div className="auth-gasp-accent"></div>
            </div>

            <div className="auth-tabs">
              <button 
                className={`auth-tab-btn ${authTab === "login" ? "active" : ""}`}
                onClick={() => { setAuthTab("login"); setAuthError(""); setAuthSuccess(""); }}
              >
                MASUK TERMINAL
              </button>
              <button 
                className={`auth-tab-btn ${authTab === "register" ? "active" : ""}`}
                onClick={() => { setAuthTab("register"); setAuthError(""); setAuthSuccess(""); }}
              >
                REGISTRASI
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="auth-form">
              <div className="form-group">
                <label>ID USERNAME</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="ID Username Anda..." 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>KODE AKSES (PASSWORD)</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Kode Akses Rahasia..." 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              {authError && <div className="auth-error">{authError}</div>}
              {authSuccess && <div className="auth-success">{authSuccess}</div>}

              <button type="submit" className="btn-primary auth-submit-btn" style={{ width: "100%", marginTop: "0.5rem" }}>
                {authTab === "login" ? "KONEKSIKAN TERMINAL" : "DAFTAR ANGGOTA BARU"}
              </button>

              <button type="button" className="btn-secondary auth-back-btn" style={{ width: "100%" }} onClick={() => setShowAuth(false)}>
                KEMBALI KE BERANDA
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="app-root mobile-mode">
        {/* Render Mobile Portrait Tab View */}
        {renderMobileView()}

        {/* Mobile Portrait Bottom Navigation Bar */}
        <nav className="mobile-nav-bar" style={{ display: "grid", gridTemplateColumns: currentUser?.isAdmin ? "repeat(7, 1fr)" : "repeat(6, 1fr)", height: "64px" }}>
          <button className={`mobile-nav-btn ${mobileTab === "chat" ? "active" : ""}`} onClick={() => setMobileTab("chat")}>
            <PawIcon />
            <span>Chat</span>
          </button>
          <button className={`mobile-nav-btn ${mobileTab === "shop" ? "active" : ""}`} onClick={() => setMobileTab("shop")}>
            <ShopIcon />
            <span>Toko</span>
          </button>
          <button className={`mobile-nav-btn ${mobileTab === "team" ? "active" : ""}`} onClick={() => setMobileTab("team")}>
            <TrophyIcon />
            <span>Tim</span>
          </button>
          <button className={`mobile-nav-btn ${mobileTab === "comments" ? "active" : ""}`} onClick={() => setMobileTab("comments")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Komen</span>
          </button>
          <button className={`mobile-nav-btn ${mobileTab === "info" ? "active" : ""}`} onClick={() => setMobileTab("info")}>
            <BookIcon />
            <span>Info</span>
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

        {/* Caught Animal Splash Overlay Screen */}
        {caughtAnimalEffect && (
          <div 
            className="caught-overlay-container" 
            onClick={() => setCaughtAnimalEffect(null)}
          >
            <div className="caught-card-body gothic-card glow-crimson animate-splash">
              <h3 className="caught-sub">HEWAN BARU TERTANGKAP!</h3>
              <div className="caught-gasp animate-pulse">
                🐾 {caughtAnimalEffect.name}
              </div>
              <div className={`caught-badge rarity-${caughtAnimalEffect.rarity}`}>
                {caughtAnimalEffect.rarity}
              </div>
              <div className="caught-stats">
                Nilai EXP: +{caughtAnimalEffect.exp} XP
              </div>
              <p className="caught-tip">Klik di mana saja untuk menutup</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-root desktop-mode">
      {/* desktop UI layout */}
      <div className="app-simulator">
        {/* Column 1: Left Channels Sidebar */}
        <div className="panel-left">
          <div className="panel-header">
            GLVS OWOGAME
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
                    <div className={`message-wrapper ${msg.isBot ? "bot-response" : "user-response"}`} key={msg.id}>
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
                  <h2>Papan Peringkat Global (Klik Pemain untuk Inspect)</h2>
                  <br />
                  <div className="profile-stats" style={{maxWidth: "500px"}}>
                    {leaderboard.map((usr, idx) => (
                      <div 
                        key={usr.username} 
                        className="stat-row clickable" 
                        style={{borderBottom: "1px solid #330d0d", padding: "0.6rem 0", cursor: "pointer"}}
                        onClick={() => setInspectingUser(usr)}
                      >
                        <span style={{ color: idx < 3 ? "#ff3b3b" : "#fff", fontWeight: "700" }}>
                          [{idx + 1}] {usr.username} {usr.isAdmin && "👑"}
                        </span>
                        <span>Lv. {usr.state?.level || 1} ({usr.state?.cowoncy || 0} 🪙)</span>
                      </div>
                    ))}
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
                <span className="stat-lbl">Gelar:</span>
                <span className="stat-val" style={{ color: "#ffd60a", fontWeight: "700" }}>{equippedTitle}</span>
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
                <div style={{ padding: "0.5rem", background: "rgba(255, 59, 59, 0.08)", border: "1px solid rgba(255, 59, 59, 0.2)", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.8rem", color: "#c9b1b1", textAlign: "left" }}>
                  <strong>RNG HUNT RATES (WIKI):</strong><br />
                  • Common: 50.0%<br />
                  • Uncommon: 25.0%<br />
                  • Rare: 15.0%<br />
                  • Epic: 6.0%<br />
                  • Mythic: 3.0%<br />
                  • Legendary: 0.9%<br />
                  • Special Event: 0.1%
                </div>
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

      {/* Caught Animal Splash Overlay Screen */}
      {caughtAnimalEffect && (
        <div 
          className="caught-overlay-container" 
          onClick={() => setCaughtAnimalEffect(null)}
        >
          <div className="caught-card-body gothic-card glow-crimson animate-splash">
            <h3 className="caught-sub">HEWAN BARU TERTANGKAP!</h3>
            <div className="caught-gasp animate-pulse">
              🐾 {caughtAnimalEffect.name}
            </div>
            <div className={`caught-badge rarity-${caughtAnimalEffect.rarity}`}>
              {caughtAnimalEffect.rarity}
            </div>
            <div className="caught-stats">
              Nilai EXP: +{caughtAnimalEffect.exp} XP
            </div>
            <p className="caught-tip">Klik di mana saja untuk menutup</p>
          </div>
        </div>
      )}

      {/* Inspect Profile Overlay Modal */}
      {inspectingUser && (
        <div className="caught-overlay-container" onClick={() => setInspectingUser(null)}>
          <div className="caught-card-body gothic-card glow-crimson animate-splash" style={{ maxWidth: "420px", textAlign: "left" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="caught-sub" style={{ textAlign: "center", borderBottom: "1px solid #541414", paddingBottom: "0.5rem" }}>INSPEKSI PLAYER</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem" }}>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Username:</strong> <span style={{ color: "#fff", fontWeight: "700" }}>{inspectingUser.username}</span>
              </div>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Gelar:</strong> <span style={{ color: "#ffd60a", fontWeight: "700" }}>{inspectingUser.state?.equippedTitle || "Novice Hunter"}</span>
              </div>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Level Pemain:</strong> <span style={{ color: "#fff" }}>{inspectingUser.state?.level || 1}</span>
              </div>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Koin Cowoncy:</strong> <span style={{ color: "#ffd60a" }}>{inspectingUser.state?.cowoncy || 0} 🪙</span>
              </div>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Peti Gacha (Crates):</strong> <span style={{ color: "#fff" }}>{inspectingUser.state?.crates || 0}</span>
              </div>
              <div>
                <strong style={{ color: "#ff3b3b" }}>Hewan Aktif:</strong> <span style={{ color: "#32d74b" }}>{inspectingUser.state?.equippedAnimal?.name ? `${inspectingUser.state.equippedAnimal.emoji} ${inspectingUser.state.equippedAnimal.name} (${inspectingUser.state.equippedAnimal.rarity})` : "None"}</span>
              </div>
              
              <div style={{ borderTop: "1px solid #541414", paddingTop: "0.8rem", marginTop: "0.5rem" }}>
                <strong style={{ color: "#ff3b3b", fontSize: "0.85rem" }}>DAFTAR HEWAN TERBAIK (ZOO):</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem", maxHeight: "100px", overflowY: "auto" }}>
                  {inspectingUser.state?.animalsCaught && Object.keys(inspectingUser.state.animalsCaught).length > 0 ? (
                    Object.keys(inspectingUser.state.animalsCaught).map(aniName => (
                      <span key={aniName} style={{ background: "rgba(255, 59, 59, 0.15)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", border: "1px solid rgba(255, 59, 59, 0.3)" }}>
                        {aniName} (x{inspectingUser.state.animalsCaught[aniName]})
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "#8e8e93" }}>Belum mengoleksi hewan.</span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #541414", paddingTop: "0.8rem" }}>
                <strong style={{ color: "#ff3b3b", fontSize: "0.85rem" }}>SENJATA DI TAS:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem", maxHeight: "100px", overflowY: "auto" }}>
                  {inspectingUser.state?.inventory && inspectingUser.state.inventory.length > 0 ? (
                    inspectingUser.state.inventory.map((w, idx) => (
                      <span key={idx} style={{ background: "rgba(255, 255, 255, 0.05)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                        {w.name} (DMG: {w.dmg})
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "#8e8e93" }}>Tas kosong.</span>
                  )}
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: "100%", marginTop: "1.5rem", padding: "0.6rem" }} onClick={() => setInspectingUser(null)}>
              Tutup Inspeksi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
