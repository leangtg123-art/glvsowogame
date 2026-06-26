// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ANIMALS, WEAPONS, SHOP_ITEMS } from "./owo_data";

export default function App() {
  const [showGame, setShowGame] = useState(false);
  
  // Game states
  const [cowoncy, setCowoncy] = useState(1000);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState([
    { ...WEAPONS[0], currentDurability: WEAPONS[0].durability }, // Starter Bronze Sword
  ]);
  const [activeWeaponIndex, setActiveWeaponIndex] = useState(0);
  const [animalsCaught, setAnimalsCaught] = useState({});
  const [crates, setCrates] = useState(2);
  const [lootboxes, setLootboxes] = useState(2);
  
  // Interface states
  const [activeChannel, setActiveChannel] = useState("owo-commands");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeWikiTab, setActiveWikiTab] = useState("animals");
  const [cooldowns, setCooldowns] = useState({ hunt: 0, battle: 0 });
  const [sysStatus, setSysStatus] = useState("CONNECTED");

  const messageEndRef = useRef(null);

  // Initialize data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("owo_sim_save");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.cowoncy !== undefined) setCowoncy(parsed.cowoncy);
        if (parsed.exp !== undefined) setExp(parsed.exp);
        if (parsed.level !== undefined) setLevel(parsed.level);
        if (parsed.inventory !== undefined) setInventory(parsed.inventory);
        if (parsed.activeWeaponIndex !== undefined) setActiveWeaponIndex(parsed.activeWeaponIndex);
        if (parsed.animalsCaught !== undefined) setAnimalsCaught(parsed.animalsCaught);
        if (parsed.crates !== undefined) setCrates(parsed.crates);
        if (parsed.lootboxes !== undefined) setLootboxes(parsed.lootboxes);
      } catch (e) {
        console.error("Failed to parse save game:", e);
      }
    }

    // Set welcome message
    setMessages([
      {
        id: "sys-1",
        author: "System",
        avatar: "⚙️",
        isBot: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        body: "Selamat datang di OwO Discord Bot Web Simulator! Ketik `/owo hunt` untuk mulai berburu hewan, atau ketik `/help` untuk bantuan perintah."
      }
    ]);
  }, []);

  // Save game automatically on state change
  useEffect(() => {
    if (showGame) {
      const stateToSave = {
        cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes
      };
      localStorage.setItem("owo_sim_save", JSON.stringify(stateToSave));
    }
  }, [cowoncy, exp, level, inventory, activeWeaponIndex, animalsCaught, crates, lootboxes, showGame]);

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

  // Scroll to bottom of chat
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    let currentExp = exp + addedExp;
    let currentLevel = level;
    const expNeeded = currentLevel * 150;
    
    if (currentExp >= expNeeded) {
      currentExp -= expNeeded;
      currentLevel += 1;
      addMessage(
        "OwO",
        "🦉",
        true,
        `🎉 **CONGRATULATIONS!** @User telah naik ke **Level ${currentLevel}**!`,
        {
          title: "Level Up! 🌟",
          description: `Selamat! Kamu naik ke level **${currentLevel}**.\nBatas Exp baru: **${currentLevel * 150}**.\nBonus +500 Cowoncy ditambahkan ke saldo Anda!`
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
    addMessage("User", "👤", false, cmdText);

    // Parse commands
    if (cleanCmd.startsWith("/owo hunt")) {
      if (cooldowns.hunt > 0) {
        addMessage(
          "OwO",
          "🦉",
          true,
          `⚠️ **Cooldown!** Harap tunggu **${cooldowns.hunt} detik** sebelum berburu lagi.`
        );
        return;
      }
      
      // Execute hunt logic
      setCooldowns(prev => ({ ...prev, hunt: 5 }));

      // Weapon durability check
      let currentWeapon = inventory[activeWeaponIndex];
      let damageBonus = 0;
      if (currentWeapon) {
        damageBonus = currentWeapon.dmg;
      }

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
      
      // Update animals count
      setAnimalsCaught(prev => ({
        ...prev,
        [animal.name]: (prev[animal.name] || 0) + 1
      }));

      // Rewards
      const cowoncyEarned = Math.floor(Math.random() * 20) + 15;
      const expEarned = animal.exp;
      setCowoncy(c => c + cowoncyEarned);
      
      // Durability reduction
      if (currentWeapon) {
        setInventory(prev => {
          const updated = [...prev];
          const weapon = { ...updated[activeWeaponIndex] };
          weapon.currentDurability -= 1;
          
          if (weapon.currentDurability <= 0) {
            addMessage("OwO", "🦉", true, `💔 Senjata **${weapon.name}** Anda telah rusak akibat pertempuran!`);
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
        "🦉",
        true,
        `🐾 **@User** pergi berburu dan menangkap seekor **${animal.emoji} ${animal.name}** (${animal.rarity})!`,
        {
          title: "Hasil Perburuan 🌲",
          description: `**Hewan**: ${animal.emoji} ${animal.name} (${animal.rarity})\n**Hadiah**: +${cowoncyEarned} Cowoncy 🪙\n**Exp**: +${expEarned} XP ⭐\n\n*Senjata Aktif: ${currentWeapon ? `${currentWeapon.name} (Durability: ${currentWeapon.currentDurability - 1}/${currentWeapon.durability})` : "Tanpa Senjata"}*`
        }
      );

      checkLevelUp(expEarned);
    } 
    else if (cleanCmd.startsWith("/owo battle")) {
      if (cooldowns.battle > 0) {
        addMessage(
          "OwO",
          "🦉",
          true,
          `⚠️ **Cooldown!** Harap tunggu **${cooldowns.battle} detik** sebelum bertarung lagi.`
        );
        return;
      }

      setCooldowns(prev => ({ ...prev, battle: 15 }));

      // Simulate a battle
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
        "🦉",
        true,
        isWin 
          ? `⚔️ **@User** memenangkan pertarungan melawan monster liar!` 
          : `⚔️ **@User** kalah dalam pertarungan melawan monster liar.`,
        {
          title: isWin ? "Victory! 🏆" : "Defeat! 💀",
          description: `**Kekuatan Anda**: ${playerRoll.toFixed(1)} DMG (Weapon: ${playerWeapon ? playerWeapon.name : "Fists"})\n**Kekuatan Monster**: ${enemyRoll.toFixed(1)} DMG\n\n**Hasil**: ${isWin ? "Menang!" : "Kalah"}\n**Hadiah**: +${cowoncyReward} Cowoncy 🪙\n**Exp**: +${expReward} XP ⭐`
        }
      );

      checkLevelUp(expReward);
    } 
    else if (cleanCmd.startsWith("/owo shop")) {
      addMessage(
        "OwO",
        "🦉",
        true,
        "🛒 **OwO Marketplace** - Ketik `/owo buy [nama_id]` untuk membeli item.",
        {
          title: "Daftar Toko Senjata & Item",
          description: SHOP_ITEMS.map(item => `• **${item.name}** (\`${item.id}\`): ${item.price} Cowoncy ${item.dmg ? `| Dmg: ${item.dmg}` : ""}`).join("\n")
        }
      );
    }
    else if (cleanCmd.startsWith("/owo buy")) {
      const parts = cleanCmd.split(" ");
      if (parts.length < 3) {
        addMessage("OwO", "🦉", true, "⚠️ Format pembelian salah! Gunakan: `/owo buy [item_id]`");
        return;
      }
      const itemId = parts[2];
      const item = SHOP_ITEMS.find(i => i.id === itemId);

      if (!item) {
        addMessage("OwO", "🦉", true, `❌ Item dengan ID \`${itemId}\` tidak ditemukan.`);
        return;
      }

      if (cowoncy < item.price) {
        addMessage("OwO", "🦉", true, `❌ Saldo Cowoncy tidak cukup! Anda butuh **${item.price}** Cowoncy.`);
        return;
      }

      setCowoncy(c => c - item.price);

      if (itemId === "crate") {
        setCrates(c => c + 1);
        addMessage("OwO", "🦉", true, `📦 Berhasil membeli **1 Animal Crate**!`);
      } else if (itemId === "lootbox") {
        setLootboxes(l => l + 1);
        addMessage("OwO", "🦉", true, `🎁 Berhasil membeli **1 Lootbox**!`);
      } else {
        // Weapon
        setInventory(prev => [
          ...prev,
          { ...item, currentDurability: item.durability }
        ]);
        addMessage("OwO", "🦉", true, `⚔️ Berhasil membeli senjata **${item.name}**!`);
      }
    }
    else if (cleanCmd.startsWith("/owo open crate")) {
      if (crates <= 0) {
        addMessage("OwO", "🦉", true, "❌ Anda tidak memiliki Animal Crate. Beli di `/owo shop`!");
        return;
      }
      setCrates(c => c - 1);

      // Unbox animal
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
        "🦉",
        true,
        `📦 **@User** membuka **Animal Crate** dan mendapatkan:`,
        {
          title: `Selamat! 🎉`,
          description: `Kamu mendapatkan **${animal.emoji} ${animal.name}** (${animal.rarity}) dari crate!`
        }
      );
    }
    else if (cleanCmd.startsWith("/owo open lootbox")) {
      if (lootboxes <= 0) {
        addMessage("OwO", "🦉", true, "❌ Anda tidak memiliki Lootbox. Beli di `/owo shop`!");
        return;
      }
      setLootboxes(l => l - 1);

      const roll = Math.random();
      if (roll < 0.4) {
        // Gain Cowoncy
        const cash = Math.floor(Math.random() * 800) + 300;
        setCowoncy(c => c + cash);
        addMessage("OwO", "🦉", true, `🎁 Kamu membuka **Lootbox** dan memenangkan **${cash} Cowoncy**!`);
      } else {
        // Gain random weapon
        const weapon = WEAPONS[Math.floor(Math.random() * WEAPONS.length)];
        setInventory(prev => [
          ...prev,
          { ...weapon, currentDurability: weapon.durability }
        ]);
        addMessage("OwO", "🦉", true, `🎁 Kamu membuka **Lootbox** dan mendapatkan senjata **${weapon.name}**!`);
      }
    }
    else if (cleanCmd.startsWith("/owo inv") || cleanCmd.startsWith("/owo inventory")) {
      addMessage(
        "OwO",
        "🦉",
        true,
        "🎒 **Ransel & Inventaris Anda**",
        {
          title: "Isi Ransel",
          description: `• **Cowoncy**: ${cowoncy} 🪙\n• **Animal Crates**: ${crates} 📦\n• **Lootboxes**: ${lootboxes} 🎁\n\n**Daftar Senjata Anda:**\n${inventory.map((w, idx) => `${idx === activeWeaponIndex ? "👉" : "•"} [${idx}] **${w.name}** (${w.currentDurability}/${w.durability} Durability) | DMG: ${w.dmg}`).join("\n")}\n\n*Ketik \`/owo equip [nomor]\` untuk mengganti senjata aktif.*`
        }
      );
    }
    else if (cleanCmd.startsWith("/owo equip")) {
      const parts = cleanCmd.split(" ");
      if (parts.length < 3) {
        addMessage("OwO", "🦉", true, "⚠️ Format salah! Gunakan: `/owo equip [indeks_senjata]`");
        return;
      }
      const index = parseInt(parts[2]);
      if (isNaN(index) || index < 0 || index >= inventory.length) {
        addMessage("OwO", "🦉", true, "❌ Indeks senjata tidak valid.");
        return;
      }
      setActiveWeaponIndex(index);
      addMessage("OwO", "🦉", true, `✅ Berhasil menggunakan senjata **${inventory[index].name}**!`);
    }
    else if (cleanCmd.startsWith("/owo zoo")) {
      const list = Object.keys(animalsCaught)
        .map(name => {
          // Find emoji from ANIMALS lists
          let emoji = "🐾";
          for (const key in ANIMALS) {
            const found = ANIMALS[key].find(a => a.name === name);
            if (found) {
              emoji = found.emoji;
              break;
            }
          }
          return `• ${emoji} **${name}** (x${animalsCaught[name]})`;
        })
        .join("\n");

      addMessage(
        "OwO",
        "🦉",
        true,
        "🦁 **Kebun Binatang Anda (Zoo)**",
        {
          title: "Koleksi Hewan Anda",
          description: list || "*Kebun binatang Anda masih kosong. Mulai berburu dengan `/owo hunt`!*"
        }
      );
    }
    else if (cleanCmd === "/help") {
      addMessage(
        "System",
        "⚙️",
        false,
        "Daftar perintah simulasi yang tersedia:\n" +
        "• `/owo hunt` - Berburu hewan liar (cooldown 5s)\n" +
        "• `/owo battle` - Melawan monster liar (cooldown 15s)\n" +
        "• `/owo inv` - Melihat isi ransel dan senjata\n" +
        "• `/owo zoo` - Menampilkan daftar hewan yang sudah ditangkap\n" +
        "• `/owo shop` - Membuka toko senjata dan item\n" +
        "• `/owo buy [item_id]` - Membeli senjata atau item\n" +
        "• `/owo equip [nomor]` - Memasang senjata pilihan\n" +
        "• `/owo open crate` - Membuka peti hewan acak\n" +
        "• `/owo open lootbox` - Membuka kotak rampasan misterius"
      );
    }
    else {
      addMessage(
        "System",
        "⚙️",
        false,
        `❌ Perintah tidak dikenal: \`${cmdText}\`. Silakan ketik \`/help\` untuk melihat daftar perintah.`
      );
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    handleCommand(inputText);
    setInputText("");
    setShowAutocomplete(false);
  };

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

  // Render total animals caught count
  const totalAnimalsCount = Object.values(animalsCaught).reduce((a, b) => a + b, 0);

  if (!showGame) {
    return (
      <div className="landing-container">
        <header className="landing-header">
          <div className="landing-logo">
            🐾 <span>OwO</span> Simulator
          </div>
          <button className="btn-secondary" onClick={() => setShowGame(true)}>
            Masuk Simulator
          </button>
        </header>

        <section className="landing-hero">
          <h1 className="landing-title">
            Mainkan Game OwO Bot <br />
            <span>Tanpa Ribet di Discord!</span>
          </h1>
          <p className="landing-subtitle">
            Simulasi game gacha & RPG teks OwO Bot terlengkap dengan antarmuka Discord obsidian yang premium, responsif, dan kaya fitur secara instan.
          </p>
          <div className="landing-buttons">
            <button className="btn-primary" onClick={() => setShowGame(true)}>
              🚀 Mulai Bermain Sekarang
            </button>
            <a href="https://github.com/leangtg123-art/owo-discord-bot-clone" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              ⭐ Buka GitHub Repository
            </a>
          </div>
        </section>

        <div className="landing-features">
          <div className="feature-card">
            <div className="feature-icon">🐾</div>
            <h3 className="feature-title">Perburuan Instan</h3>
            <p className="feature-desc">Ketik atau klik tombol `/owo hunt` untuk menangkap puluhan spesies hewan unik dari Common hingga Legendary.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚔️</div>
            <h3 className="feature-title">Pertarungan Sengit</h3>
            <p className="feature-desc">Gunakan persenjataan premium untuk meningkatkan serangan Anda dan kalahkan monster liar di `/owo battle`.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3 className="feature-title">Toko & Koleksi</h3>
            <p className="feature-desc">Beli berbagai tingkatan senjata, unbox peti misterius, dan pamerkan seluruh tangkapan Anda di `/owo zoo`.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-simulator">
      {/* Column 1: Left Channels Sidebar */}
      <div className="panel-left">
        <div className="panel-header">
          🏢 Server Simulator OwO
        </div>
        
        <div className="channel-list">
          <div className="channel-category">Informasi</div>
          <div 
            className={`channel-item ${activeChannel === "tutorial" ? "active" : ""}`}
            onClick={() => setActiveChannel("tutorial")}
          >
            <span className="channel-icon">📢</span> #tutorial-dan-panduan
          </div>
          <div 
            className={`channel-item ${activeChannel === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveChannel("leaderboard")}
          >
            <span className="channel-icon">🏆</span> #papan-peringkat
          </div>

          <div className="channel-category">Simulasi Chat</div>
          <div 
            className={`channel-item ${activeChannel === "owo-commands" ? "active" : ""}`}
            onClick={() => setActiveChannel("owo-commands")}
          >
            <span className="channel-icon">💬</span> #owo-commands
          </div>
        </div>

        <div className="user-footer">
          <div className="user-profile">
            <div className="avatar">U</div>
            <div className="user-details">
              <span className="user-name">Player123</span>
              <span className="user-tag">Level {level}</span>
            </div>
          </div>
          <button 
            style={{background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "var(--ink-muted)"}}
            onClick={() => setShowGame(false)}
          >
            🏠 Keluar
          </button>
        </div>
      </div>

      {/* Column 2: Center Active Chat Area */}
      <div className="chat-area">
        <div className="panel-header">
          <span className="channel-icon">#</span>
          {activeChannel === "owo-commands" ? "owo-commands" : activeChannel === "tutorial" ? "tutorial-dan-panduan" : "papan-peringkat"}
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
                        <div className="embed-footer">OwO Engine v4.9 • {msg.time}</div>
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
              <h2>📖 Cara Bermain OwO Simulator</h2>
              <br />
              <p>Simulasi ini meniru cara kerja bot Discord **OwO** secara persis. Berikut langkah-langkah memulainya:</p>
              <br />
              <ul>
                <li>🤖 Ketik `/owo hunt` di kolom chat di bawah untuk berburu hewan. Setiap perburuan berdurasi cooldown 5 detik.</li>
                <li>⚔️ Ketik `/owo battle` untuk bertarung dan mendapatkan hadiah koin & EXP yang lebih besar.</li>
                <li>🎒 Ketik `/owo inv` untuk mengecek item, senjata, dan kotak box Anda.</li>
                <li>🛒 Buka `/owo shop` untuk berbelanja senjata agar serangan Anda di battle semakin mematikan.</li>
                <li>📦 Jika Anda memiliki **Crate** atau **Lootbox**, ketik `/owo open crate` atau `/owo open lootbox` untuk membukanya.</li>
              </ul>
            </div>
          )}

          {activeChannel === "leaderboard" && (
            <div style={{color: "var(--ink-regular)", padding: "1rem"}}>
              <h2>🏆 Papan Peringkat Global (Top Players)</h2>
              <br />
              <div className="profile-stats" style={{maxWidth: "400px"}}>
                <div className="stat-row" style={{borderBottom: "1px solid var(--border)", padding: "0.5rem 0"}}>
                  <span>🥇 **1. owo_king**</span>
                  <span>Lv. 92 (1,490,200 Cowoncy)</span>
                </div>
                <div className="stat-row" style={{borderBottom: "1px solid var(--border)", padding: "0.5rem 0"}}>
                  <span>🥈 **2. gacha_lord**</span>
                  <span>Lv. 78 (920,500 Cowoncy)</span>
                </div>
                <div className="stat-row" style={{borderBottom: "1px solid var(--border)", padding: "0.5rem 0"}}>
                  <span>🥉 **3. Anda (Player123)**</span>
                  <span>Lv. {level} ({cowoncy} Cowoncy)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {activeChannel === "owo-commands" && (
          <div className="input-area">
            {/* Quick Actions Panel above Input */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo hunt")}>
                🐾 /owo hunt {cooldowns.hunt > 0 && `(${cooldowns.hunt}s)`}
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo battle")}>
                ⚔️ /owo battle {cooldowns.battle > 0 && `(${cooldowns.battle}s)`}
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo inv")}>
                🎒 /owo inv
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo zoo")}>
                🦁 /owo zoo
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo shop")}>
                🛒 /owo shop
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo open crate")}>
                📦 Buka Crate ({crates})
              </button>
              <button className="btn-secondary" style={{padding: "0.4rem 0.8rem", fontSize: "0.85rem"}} onClick={() => handleCommand("/owo open lootbox")}>
                🎁 Buka Lootbox ({lootboxes})
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
                  <span className="autocomplete-desc">Tarung melawan monster liar menggunakan senjata aktif</span>
                </div>
                <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo inv")}>
                  <span className="autocomplete-command">/owo inv</span>
                  <span className="autocomplete-desc">Lihat ransel, koin, peti, dan senjata yang dimiliki</span>
                </div>
                <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo zoo")}>
                  <span className="autocomplete-command">/owo zoo</span>
                  <span className="autocomplete-desc">Tampilkan koleksi hewan yang Anda tangkap</span>
                </div>
                <div className="autocomplete-item" onClick={() => handleAutocompleteClick("/owo shop")}>
                  <span className="autocomplete-command">/owo shop</span>
                  <span className="autocomplete-desc">Buka toko senjata dan unboxing crates</span>
                </div>
              </div>
            )}

            <form onSubmit={handleInputSubmit} className="input-container">
              <input
                type="text"
                className="input-field"
                placeholder="Ketik perintah di sini (contoh: /owo hunt)..."
                value={inputText}
                onChange={handleInputChange}
              />
              <button type="submit" className="send-btn">➡️</button>
            </form>
          </div>
        )}
      </div>

      {/* Column 3: Right Database & Profile Info Panel */}
      <div className="panel-right">
        <div className="panel-right-title">📊 Status & Encyclopedia</div>
        
        {/* User Stats Section */}
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
              <div 
                className="progress-fill" 
                style={{ width: `${(exp / (level * 150)) * 100}%` }}
              />
            </div>

            <div className="stat-row" style={{marginTop: "0.5rem"}}>
              <span className="stat-lbl">Cowoncy:</span>
              <span className="stat-val">🪙 {cowoncy}</span>
            </div>
            <div className="stat-row">
              <span className="stat-lbl">Hewan Ditangkap:</span>
              <span className="stat-val">🐾 {totalAnimalsCount} ekor</span>
            </div>
            <div className="stat-row">
              <span className="stat-lbl">Senjata Aktif:</span>
              <span className="stat-val" style={{color: "var(--green)"}}>
                {inventory[activeWeaponIndex] ? inventory[activeWeaponIndex].name : "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Wiki Tabs */}
        <div style={{display: "flex", borderBottom: "1px solid var(--border)"}}>
          <button 
            style={{
              flex: 1, padding: "0.6rem", border: "none", cursor: "pointer",
              background: activeWikiTab === "animals" ? "var(--bg-hover)" : "transparent",
              color: activeWikiTab === "animals" ? "var(--ink-bright)" : "var(--ink-muted)",
              fontWeight: 600
            }}
            onClick={() => setActiveWikiTab("animals")}
          >
            🦁 Hewan
          </button>
          <button 
            style={{
              flex: 1, padding: "0.6rem", border: "none", cursor: "pointer",
              background: activeWikiTab === "weapons" ? "var(--bg-hover)" : "transparent",
              color: activeWikiTab === "weapons" ? "var(--ink-bright)" : "var(--ink-muted)",
              fontWeight: 600
            }}
            onClick={() => setActiveWikiTab("weapons")}
          >
            ⚔️ Senjata
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{padding: "1rem"}}>
          {activeWikiTab === "animals" && (
            <div className="wiki-list">
              <div style={{fontSize: "0.75rem", color: "var(--ink-muted)", marginBottom: "0.5rem"}}>
                Daftar semua hewan yang bisa ditangkap dari perburuan:
              </div>
              {Object.keys(ANIMALS).map(rarity => 
                ANIMALS[rarity].map(ani => (
                  <div className="wiki-item" key={ani.name}>
                    <span className="wiki-name">
                      {ani.emoji} {ani.name}
                    </span>
                    <span className={`wiki-rarity rarity-${ani.rarity}`}>
                      {ani.rarity}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeWikiTab === "weapons" && (
            <div className="wiki-list">
              <div style={{fontSize: "0.75rem", color: "var(--ink-muted)", marginBottom: "0.5rem"}}>
                Gunakan koin di `/owo shop` untuk membeli senjata:
              </div>
              {WEAPONS.map(w => (
                <div className="wiki-item" key={w.id} style={{flexDirection: "column", alignItems: "flex-start", gap: "0.2rem"}}>
                  <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <span className="wiki-name">⚔️ {w.name}</span>
                    <span className={`wiki-rarity rarity-${w.tier}`}>{w.tier}</span>
                  </div>
                  <div style={{fontSize: "0.8rem", color: "var(--ink-muted)"}}>
                    DMG: **{w.dmg}** | Price: **{w.price}** 🪙 | Durability: **{w.durability}**
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
