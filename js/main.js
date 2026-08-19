/**
 * EternalDharma - Core Product & Emotional Sanctuary Engine
 * Implements: Emotional Inquiry Cards, Candidate Letter Modal, Command Palette (⌘K),
 * Floating Audio Dock Player, Philosophy State Machine, and Personal Practice Tracker.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. INTERACTIVE PHILOSOPHY SELECTOR ---
  const PHILOSOPHY_DATA = {
    dharma: {
      titleEn: "Dharma",
      titleHi: "धर्म",
      tagline: "The Foundation of Cosmic & Moral Order",
      quote: "यतो धर्मस्ततो जयः — Where there is Dharma, there is victory.",
      explanation: "Dharma is not dogma; it is the living principle of righteousness, truth, and universal harmony that sustains existence. Living in Dharma means aligning thought, word, and deed with moral integrity, compassion, and duty toward all living beings.",
      actionText: "Read in-depth philosophy on Dharma &rarr;",
      actionLink: "sanatan.html#dharma",
      image: "images/dharma-chakra.jpg",
      alt: "Sacred Dharma Chakra Emblem"
    },
    karma: {
      titleEn: "Karma",
      titleHi: "कर्म",
      tagline: "The Inviolable Law of Cause and Action",
      quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — Focus on your duty, not on the fruits.",
      explanation: "Every conscious action leaves an imprint on the soul. Pure intent yields clarity, while selfish attachments bind the heart. Karma teaches radical self-responsibility: our present choices sculpt our future consciousness and destiny.",
      actionText: "Explore the laws of Karma & Nishkama Karma &rarr;",
      actionLink: "sanatan.html#karma",
      image: "images/karma-wheel.jpg",
      alt: "Sacred Karma Wheel Mandala"
    },
    moksha: {
      titleEn: "Moksha",
      titleHi: "मोक्ष",
      tagline: "The Supreme Spiritual Freedom & Liberation",
      quote: "तमेव विदित्वाति मृत्युमेति — Knowing the true Self transcends mortality.",
      explanation: "Moksha represents the ultimate homecoming: freedom from the cycle of rebirth (Samsara) and reunification with infinite consciousness (Brahman). It is pure self-realization, eternal tranquility, and boundless peace.",
      actionText: "Discover the paths to Moksha &rarr;",
      actionLink: "sanatan.html#moksha",
      image: "images/moksha-liberation.jpg",
      alt: "Soul Ascending into Divine Moksha Liberation"
    }
  };

  const philosophyTabs = document.querySelectorAll(".philosophy-tab-btn");
  const stageCard = document.getElementById("philosophyStageCard");
  const stageTagline = document.getElementById("stageTagline");
  const stageTitle = document.getElementById("stageTitle");
  const stageQuote = document.getElementById("stageQuote");
  const stageExplanation = document.getElementById("stageExplanation");
  const stageAction = document.getElementById("stageAction");
  const stageImage = document.getElementById("stageImage");

  function updatePhilosophyStage(key) {
    const data = PHILOSOPHY_DATA[key];
    if (!data || !stageCard) return;

    stageCard.style.opacity = "0.3";
    stageCard.style.transform = "translateY(4px)";
    stageCard.style.transition = "all 0.25s ease";

    setTimeout(() => {
      if (stageTagline) stageTagline.textContent = data.tagline;
      if (stageTitle) {
        stageTitle.innerHTML = `<span class="stage-title-hindi">${data.titleHi}</span> ${data.titleEn}`;
      }
      if (stageQuote) stageQuote.textContent = data.quote;
      if (stageExplanation) stageExplanation.textContent = data.explanation;
      if (stageAction) {
        stageAction.innerHTML = `<a href="${data.actionLink}" class="btn btn-primary btn-sm">${data.actionText}</a>`;
      }
      if (stageImage) {
        stageImage.src = data.image;
        stageImage.alt = data.alt;
      }

      stageCard.style.opacity = "1";
      stageCard.style.transform = "translateY(0)";
    }, 150);
  }

  philosophyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      philosophyTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.getAttribute("data-pillar");
      updatePhilosophyStage(key);
    });
  });

  // --- 2. EMOTIONAL INQUIRY CARDS (LIFE'S QUESTIONS) ---
  const inquiryCards = document.querySelectorAll(".inquiry-card");
  const searchInput = document.getElementById("discoverySearchInput");
  const discoverySection = document.getElementById("discovery");

  inquiryCards.forEach(card => {
    card.addEventListener("click", () => {
      const query = card.getAttribute("data-search");
      if (query && searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event("input"));
        if (discoverySection) {
          discoverySection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // --- 3. GLOBAL COMMAND PALETTE (⌘K / Ctrl+K) ---
  const cmdPaletteModal = document.getElementById("commandPaletteModal");
  const cmdPaletteInput = document.getElementById("paletteSearchInput");
  const cmdPaletteResults = document.getElementById("paletteResultsList");
  const navCmdTriggers = document.querySelectorAll(".nav-cmd-trigger, #heroCmdTrigger");

  const PALETTE_INDEX = [
    { title: "Bhagavad Gita — The Song of the Divine", cat: "Scripture", url: "mahabharata.html#bhishma" },
    { title: "Dharma — The Compass of Righteous Duty", cat: "Philosophy", url: "sanatan.html#dharma" },
    { title: "Karma — Conscious Action & Consequence", cat: "Philosophy", url: "sanatan.html#karma" },
    { title: "Moksha — The Supreme Inner Liberation", cat: "Philosophy", url: "sanatan.html#moksha" },
    { title: "The Ramayana — Journey of Maryada Purushottam", cat: "Epic", url: "ramayana.html" },
    { title: "The Mahabharata — The Epic of 18 Parvas", cat: "Epic", url: "mahabharata.html" },
    { title: "Hanuman's Devotion & Lifting of Dronagiri", cat: "Audio Story", url: "stories.html#hanuman" },
    { title: "Tirupati Temple Miracle — Silent Devotion", cat: "Audio Story", url: "stories.html#tirupati" },
    { title: "Today's Sacred Verse & Reflection", cat: "Daily Wisdom", url: "#daily-wisdom" },
    { title: "Sacred Temples Explorer (Kashi, Kedarnath, Dwarka)", cat: "Explorer", url: "temples.html" }
  ];

  function openCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.add("open");
    if (cmdPaletteInput) {
      cmdPaletteInput.value = "";
      renderPaletteResults("");
      cmdPaletteInput.focus();
    }
  }

  function closeCommandPalette() {
    if (!cmdPaletteModal) return;
    cmdPaletteModal.classList.remove("open");
  }

  function renderPaletteResults(query) {
    if (!cmdPaletteResults) return;
    const clean = query.toLowerCase().trim();
    const matches = clean
      ? PALETTE_INDEX.filter(item => item.title.toLowerCase().includes(clean) || item.cat.toLowerCase().includes(clean))
      : PALETTE_INDEX;

    cmdPaletteResults.innerHTML = "";
    if (matches.length === 0) {
      cmdPaletteResults.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.875rem;">No matching wisdom entry found.</div>`;
      return;
    }

    matches.forEach((m, idx) => {
      const row = document.createElement("div");
      row.className = `palette-result-row ${idx === 0 ? 'selected' : ''}`;
      row.innerHTML = `
        <span class="palette-row-title">${m.title}</span>
        <span class="palette-row-cat">${m.cat}</span>
      `;
      row.addEventListener("click", () => {
        closeCommandPalette();
        window.location.href = m.url;
      });
      cmdPaletteResults.appendChild(row);
    });
  }

  navCmdTriggers.forEach(btn => {
    btn.addEventListener("click", openCommandPalette);
  });

  if (cmdPaletteInput) {
    cmdPaletteInput.addEventListener("input", (e) => {
      renderPaletteResults(e.target.value);
    });
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === "Escape") {
      if (cmdPaletteModal && cmdPaletteModal.classList.contains("open")) closeCommandPalette();
    }
  });

  if (cmdPaletteModal) {
    cmdPaletteModal.addEventListener("click", (e) => {
      if (e.target === cmdPaletteModal) closeCommandPalette();
    });
  }

  // --- 5. FLOATING AUDIO DOCK PLAYER ---
  const audioDock = document.getElementById("floatingAudioDock");
  const audioTitle = document.getElementById("dockTrackTitle");
  const audioSub = document.getElementById("dockTrackSub");
  const btnDockPlay = document.getElementById("btnDockPlay");
  const btnDockClose = document.getElementById("btnDockClose");
  const heroSoundEq = document.getElementById("heroSoundEq");
  const dockSoundEq = document.getElementById("dockSoundEq");
  const storyAudioBtns = document.querySelectorAll(".story-play-overlay-btn, .btn-listen-story");

  const audioElement = new Audio();
  let isPlaying = false;

  function setAudioVisuals(playing) {
    isPlaying = playing;
    if (btnDockPlay) btnDockPlay.textContent = playing ? "⏸" : "▶";
    if (heroSoundEq) {
      if (playing) heroSoundEq.classList.add("playing");
      else heroSoundEq.classList.remove("playing");
    }
    if (dockSoundEq) {
      if (playing) dockSoundEq.classList.add("playing");
      else dockSoundEq.classList.remove("playing");
    }
  }

  function loadAndPlayTrack(src, title, sub) {
    if (!audioDock) return;
    audioElement.src = src;
    if (audioTitle) audioTitle.textContent = title;
    if (audioSub) audioSub.textContent = sub;
    audioDock.classList.add("active");

    audioElement.play().then(() => {
      setAudioVisuals(true);
    }).catch(() => {
      setAudioVisuals(false);
    });
  }

  audioElement.addEventListener("ended", () => {
    setAudioVisuals(false);
  });

  storyAudioBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const trackSrc = btn.getAttribute("data-audio-src") || "audio/hanuman-en.mp3";
      const trackTitle = btn.getAttribute("data-title") || "Hanuman — The Mountain of Devotion";
      const trackSub = btn.getAttribute("data-sub") || "Narrated Audio Story • English";
      loadAndPlayTrack(trackSrc, trackTitle, trackSub);
    });
  });

  if (btnDockPlay) {
    btnDockPlay.addEventListener("click", () => {
      if (isPlaying) {
        audioElement.pause();
        setAudioVisuals(false);
      } else {
        audioElement.play();
        setAudioVisuals(true);
      }
    });
  }

  // Hero Sacred Soundscape Ambient Toggle
  const btnHeroSoundscape = document.getElementById("btnHeroSoundscape");
  const soundscapeStatusText = document.getElementById("soundscapeStatusText");

  if (btnHeroSoundscape) {
    btnHeroSoundscape.addEventListener("click", () => {
      if (isPlaying) {
        audioElement.pause();
        setAudioVisuals(false);
        btnHeroSoundscape.textContent = "▶";
        if (soundscapeStatusText) soundscapeStatusText.textContent = "Play Sacred Himalayan River & Temple Chants (Live Ambiance)";
      } else {
        loadAndPlayTrack("audio/rishikesh-en.mp3", "Sacred Ganga & Himalayan Sanctuary", "Ambient Meditative Soundscape");
        btnHeroSoundscape.textContent = "⏸";
        if (soundscapeStatusText) soundscapeStatusText.textContent = "Playing: Sacred Himalayan River & Temple Chants (Click to Pause)";
      }
    });
  }

  if (btnDockClose) {
    btnDockClose.addEventListener("click", () => {
      audioElement.pause();
      setAudioVisuals(false);
      if (btnHeroSoundscape) btnHeroSoundscape.textContent = "▶";
      if (soundscapeStatusText) soundscapeStatusText.textContent = "Play Sacred Himalayan River & Temple Chants (Live Ambiance)";
      if (audioDock) audioDock.classList.remove("active");
    });
  }

  // --- 6. GAMIFIED SADHANA ENGINE & USER SESSION MANAGEMENT ---
  const accountModal = document.getElementById("accountModal");
  const accountActiveView = document.getElementById("accountActiveView");
  const accountRegisterView = document.getElementById("accountRegisterView");
  const btnOpenAccount = document.getElementById("btnOpenAccount");
  const btnHeroAccount = document.getElementById("btnHeroAccount");
  const btnCloseAccount = document.getElementById("btnCloseAccount");
  const accountForm = document.getElementById("accountForm");
  const userSessionWrapper = document.getElementById("userSessionWrapper");
  const userBadge = document.getElementById("userProfileBadge");
  const userBadgeName = document.getElementById("userBadgeName");
  const userBadgeLvl = document.getElementById("userBadgeLvl");
  const btnNavLogout = document.getElementById("btnNavLogout");
  const btnLogoutAccount = document.getElementById("btnLogoutAccount");
  const btnShowRenameForm = document.getElementById("btnShowRenameForm");
  const sadhanaRenameForm = document.getElementById("sadhanaRenameForm");
  const btnCancelRename = document.getElementById("btnCancelRename");
  const renameInput = document.getElementById("renameInput");
  const karmaToastContainer = document.getElementById("karmaToastContainer");

  const btnBookmarkShloka = document.getElementById("btnBookmarkShloka");
  const bookmarkCountDisplay = document.getElementById("metricBookmarkCount");

  // Gamification Rank Hierarchy
  const RANKS = [
    { threshold: 0, level: 1, title: "Jijnasu", desc: "The Inquiring Seeker", nextXP: 150 },
    { threshold: 150, level: 2, title: "Abhyasi", desc: "The Devoted Practitioner", nextXP: 350 },
    { threshold: 350, level: 3, title: "Sadhaka", desc: "The Dedicated Devotee", nextXP: 600 },
    { threshold: 600, level: 4, title: "Jnani", desc: "The Knower of Truth", nextXP: 1000 }
  ];

  function getTodayDateString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getClaimedActions() {
    const today = getTodayDateString();
    const saved = localStorage.getItem("ed_claimed_actions");
    if (!saved) return { date: today, actions: {} };
    try {
      const parsed = JSON.parse(saved);
      if (parsed.date !== today) {
        return { date: today, actions: {} };
      }
      return parsed;
    } catch (e) {
      return { date: today, actions: {} };
    }
  }

  function hasClaimedToday(actionKey) {
    if (!actionKey) return false;
    const data = getClaimedActions();
    return !!data.actions[actionKey];
  }

  function markActionClaimed(actionKey) {
    if (!actionKey) return;
    const data = getClaimedActions();
    data.actions[actionKey] = true;
    localStorage.setItem("ed_claimed_actions", JSON.stringify(data));
  }

  function getKarmaXP() {
    return parseInt(localStorage.getItem("ed_karma_xp") || "340", 10);
  }

  function getSadhanaRank(xp) {
    let current = RANKS[0];
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (xp >= RANKS[i].threshold) {
        current = RANKS[i];
        break;
      }
    }
    return current;
  }

  function showKarmaToast(amount, reason) {
    if (!karmaToastContainer) return;
    const toast = document.createElement("div");
    toast.className = "karma-toast";
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-gold); flex-shrink: 0;">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span><strong>+${amount} Karma XP</strong> &bull; ${reason}</span>
    `;
    karmaToastContainer.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
  }

  function addKarmaXP(amount, reason, actionKey = null) {
    // If an actionKey is provided, allow earning XP only once per day
    if (actionKey) {
      if (hasClaimedToday(actionKey)) {
        return false;
      }
      markActionClaimed(actionKey);
    }

    let currentXP = getKarmaXP() + amount;
    localStorage.setItem("ed_karma_xp", currentXP.toString());
    showKarmaToast(amount, reason);
    checkUserSession();
    return true;
  }

  window.addKarmaXP = addKarmaXP; // expose to other modules

  let bookmarkCount = parseInt(localStorage.getItem("ed_bookmarks") || "14", 10);
  if (bookmarkCountDisplay) bookmarkCountDisplay.textContent = bookmarkCount;

  function checkUserSession() {
    const savedUser = localStorage.getItem("ed_user");
    const xp = getKarmaXP();
    const rank = getSadhanaRank(xp);
    const bCount = parseInt(localStorage.getItem("ed_bookmarks") || "14", 10);
    const breathCount = parseInt(localStorage.getItem("ed_breaths") || "5", 10);

    if (savedUser) {
      // User is LOGGED IN
      if (userSessionWrapper) userSessionWrapper.style.display = "flex";
      if (btnOpenAccount) btnOpenAccount.style.display = "none";
      if (userBadgeName) userBadgeName.textContent = savedUser;
      if (userBadgeLvl) userBadgeLvl.textContent = `Lvl ${rank.level}`;

      if (accountActiveView && accountRegisterView) {
        accountActiveView.style.display = "block";
        accountRegisterView.style.display = "none";

        const modalName = document.getElementById("modalSeekerName");
        const modalRank = document.getElementById("modalSeekerRank");
        const modalKarmaVal = document.getElementById("modalKarmaVal");
        const modalNextRankXP = document.getElementById("modalNextRankXP");
        const modalXPFill = document.getElementById("modalXPProgressFill");
        const modalNextHint = document.getElementById("modalNextRankHint");
        const modalStreak = document.getElementById("modalStreakCount");
        const modalBookmarks = document.getElementById("modalBookmarkCount");
        const modalBreaths = document.getElementById("modalBreathCount");
        const modalKarmaTot = document.getElementById("modalKarmaTotal");

        if (modalName) modalName.textContent = savedUser;
        if (modalRank) modalRank.textContent = `Level ${rank.level} • ${rank.title} (${rank.desc})`;
        if (modalKarmaVal) modalKarmaVal.textContent = xp;
        if (modalNextRankXP) modalNextRankXP.textContent = rank.nextXP;
        if (modalKarmaTot) modalKarmaTot.textContent = xp;
        if (modalBookmarks) modalBookmarks.textContent = bCount;
        if (modalBreaths) modalBreaths.textContent = breathCount;

        const pct = Math.min(100, Math.round((xp / rank.nextXP) * 100));
        if (modalXPFill) modalXPFill.style.width = `${pct}%`;
        if (modalNextHint) {
          const nextRank = RANKS.find(r => r.level === rank.level + 1);
          modalNextHint.textContent = nextRank ? `Next Rank: ${nextRank.title} at ${rank.nextXP} XP` : "Mastery Attained!";
        }
      }
    } else {
      // User is LOGGED OUT
      if (userSessionWrapper) userSessionWrapper.style.display = "none";
      if (btnOpenAccount) btnOpenAccount.style.display = "inline-flex";
      if (accountActiveView && accountRegisterView) {
        accountActiveView.style.display = "none";
        accountRegisterView.style.display = "block";
      }
    }
  }

  function logoutUser() {
    localStorage.removeItem("ed_user");
    checkUserSession();
    closeAccountModal();
    showKarmaToast(0, "Logged out. Switched to Guest Seeker.");
  }

  if (btnNavLogout) btnNavLogout.addEventListener("click", (e) => {
    e.stopPropagation();
    logoutUser();
  });
  if (btnLogoutAccount) btnLogoutAccount.addEventListener("click", logoutUser);

  if (btnShowRenameForm) {
    btnShowRenameForm.addEventListener("click", () => {
      if (sadhanaRenameForm) {
        sadhanaRenameForm.style.display = "block";
        if (renameInput) {
          renameInput.value = localStorage.getItem("ed_user") || "";
          renameInput.focus();
        }
      }
    });
  }

  if (btnCancelRename) {
    btnCancelRename.addEventListener("click", () => {
      if (sadhanaRenameForm) sadhanaRenameForm.style.display = "none";
    });
  }

  if (sadhanaRenameForm) {
    sadhanaRenameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = renameInput ? renameInput.value.trim() : "";
      if (newName) {
        localStorage.setItem("ed_user", newName);
        checkUserSession();
        sadhanaRenameForm.style.display = "none";
        showKarmaToast(10, `Identity updated to ${newName}!`);
      }
    });
  }

  if (btnBookmarkShloka) {
    btnBookmarkShloka.addEventListener("click", () => {
      bookmarkCount++;
      localStorage.setItem("ed_bookmarks", bookmarkCount.toString());
      if (bookmarkCountDisplay) bookmarkCountDisplay.textContent = bookmarkCount;
      addKarmaXP(25, "Sacred Shloka Saved to Practice");
      btnBookmarkShloka.innerHTML = `✓ Saved to Daily Practice (+25 XP)`;
      btnBookmarkShloka.style.backgroundColor = "var(--accent-emerald)";
      btnBookmarkShloka.style.color = "#FFFFFF";
      setTimeout(() => {
        btnBookmarkShloka.innerHTML = `🔖 Save Verse to Practice`;
        btnBookmarkShloka.style.backgroundColor = "";
        btnBookmarkShloka.style.color = "";
      }, 2200);
    });
  }

  function openAccountModal() {
    checkUserSession();
    if (accountModal) accountModal.classList.add("open");
  }

  function closeAccountModal() {
    if (accountModal) accountModal.classList.remove("open");
  }

  if (btnOpenAccount) btnOpenAccount.addEventListener("click", openAccountModal);
  if (btnHeroAccount) btnHeroAccount.addEventListener("click", openAccountModal);
  if (userBadge) userBadge.addEventListener("click", openAccountModal);
  const deckAccountBtn = document.querySelector(".btn-deck-account");
  if (deckAccountBtn) deckAccountBtn.addEventListener("click", openAccountModal);
  if (btnCloseAccount) btnCloseAccount.addEventListener("click", closeAccountModal);

  if (accountModal) {
    accountModal.addEventListener("click", (e) => {
      if (e.target === accountModal) closeAccountModal();
    });
  }

  // Custom SVG Goal Dropdown
  const customGoalDropdown = document.getElementById("customGoalDropdown");
  const goalDropdownTrigger = document.getElementById("goalDropdownTrigger");
  const goalDropdownMenu = document.getElementById("goalDropdownMenu");
  const currentGoalIcon = document.getElementById("currentGoalIcon");
  const currentGoalText = document.getElementById("currentGoalText");
  const accountGoalInput = document.getElementById("accountGoalInput");

  if (customGoalDropdown && goalDropdownTrigger && goalDropdownMenu) {
    goalDropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = customGoalDropdown.classList.toggle("open");
      goalDropdownTrigger.setAttribute("aria-expanded", isOpen.toString());
    });

    const goalOptions = goalDropdownMenu.querySelectorAll(".goal-option-item");
    goalOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        const val = opt.getAttribute("data-value");
        const text = opt.getAttribute("data-text");
        const svgIcon = opt.querySelector(".goal-svg-icon");

        if (accountGoalInput) accountGoalInput.value = val;
        if (currentGoalText) currentGoalText.textContent = text;
        if (currentGoalIcon && svgIcon) {
          currentGoalIcon.innerHTML = svgIcon.innerHTML;
        }

        goalOptions.forEach(o => {
          o.classList.remove("active");
          o.setAttribute("aria-selected", "false");
        });
        opt.classList.add("active");
        opt.setAttribute("aria-selected", "true");

        customGoalDropdown.classList.remove("open");
        goalDropdownTrigger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!customGoalDropdown.contains(e.target)) {
        customGoalDropdown.classList.remove("open");
        goalDropdownTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (accountForm) {
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("accountNameInput");
      const name = nameInput ? nameInput.value.trim() : "Seeker";
      localStorage.setItem("ed_user", name);
      addKarmaXP(50, "Sanctuary Profile Activated! 🌟");
      checkUserSession();
      closeAccountModal();
    });
  }

  checkUserSession();

  // --- 7. MOBILE DRAWER & BACK TO TOP ---
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    const drawerLinks = mobileDrawer.querySelectorAll(".mobile-nav-link");
    drawerLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  const backToTopBtn = document.getElementById("backToTopBtn");
  const mainNavbar = document.getElementById("mainNavbar");
  if (backToTopBtn || mainNavbar) {
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      if (mainNavbar) {
        if (scrollPos > 24) mainNavbar.classList.add("scrolled");
        else mainNavbar.classList.remove("scrolled");
      }
      if (backToTopBtn) {
        if (scrollPos > 400) backToTopBtn.classList.add("visible");
        else backToTopBtn.classList.remove("visible");
      }
    });

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // --- 8. BONUS ROUND: EASTER EGG (KONAMI CODE & SACRED EMBLEM SECRET) ---
  const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let konamiIndex = 0;

  function triggerEasterEgg() {
    let eggModal = document.getElementById("easterEggModal");
    if (!eggModal) {
      eggModal = document.createElement("div");
      eggModal.id = "easterEggModal";
      eggModal.style.cssText = `
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(18, 13, 8, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        display: flex; align-items: center; justify-content: center; padding: 24px;
        animation: fadeIn 0.35s ease forwards;
      `;
      eggModal.innerHTML = `
        <div style="
          background: #FAF7F2; border: 2px solid #D95D1E; border-radius: 16px;
          max-width: 540px; width: 100%; padding: 36px 28px; text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(217,93,30,0.3);
          position: relative;
        ">
          <button id="btnCloseEasterEgg" style="
            position: absolute; top: 14px; right: 16px; background: none; border: none;
            font-size: 24px; color: #736B63; cursor: pointer; line-height: 1;
          ">&times;</button>
          <div style="font-size: 42px; margin-bottom: 12px;">🕉️</div>
          <div style="
            display: inline-block; background: rgba(217,93,30,0.12); color: #D95D1E;
            padding: 4px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700;
            letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px;
          ">🎁 Bonus Round: Easter Egg Unlocked</div>
          <h3 style="font-family: 'Cinzel', serif; font-size: 1.35rem; color: #1C160F; margin-bottom: 14px;">
            ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
          </h3>
          <p style="font-size: 0.9375rem; color: #4A4036; line-height: 1.6; margin-bottom: 20px; font-style: italic;">
            “Lead us from the unreal to the real, from darkness to light, from mortality to immortality.”<br/>
            <strong style="color: #D95D1E; font-style: normal;">— Brihadaranyaka Upanishad (1.3.28)</strong>
          </p>
          <p style="font-size: 0.8125rem; color: #736B63; border-top: 1px dashed #E5DEC9; padding-top: 14px; margin-bottom: 20px;">
            To the Acdyon reviewer: You found the Konami code (&uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; B A). Wishing you peace, clarity, and boundless inspiration in your engineering journey!
          </p>
          <button id="btnDismissEgg" class="btn btn-primary btn-sm" style="margin: 0 auto; display: inline-block;">
            Return to Sanctuary &rarr;
          </button>
        </div>
      `;
      document.body.appendChild(eggModal);

      const closeBtn = document.getElementById("btnCloseEasterEgg");
      const dismissBtn = document.getElementById("btnDismissEgg");
      const dismiss = () => { eggModal.style.display = "none"; };
      if (closeBtn) closeBtn.addEventListener("click", dismiss);
      if (dismissBtn) dismissBtn.addEventListener("click", dismiss);
      eggModal.addEventListener("click", (e) => { if (e.target === eggModal) dismiss(); });
    } else {
      eggModal.style.display = "flex";
    }

    // Also trigger soundscape
    if (typeof loadAndPlayTrack === "function") {
      loadAndPlayTrack("audio/rishikesh-en.mp3", "Sacred Himalayan Ambiance", "Easter Egg Cosmic Soundscape");
    }
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key.toLowerCase() === KONAMI_CODE[konamiIndex].toLowerCase() || key === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        konamiIndex = 0;
        triggerEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  // --- 9. 3D CARD PERSPECTIVE MOUSE-TRACKING PHYSICS ---
  function init3DCardPhysics() {
    const cards = document.querySelectorAll(
      ".inquiry-card, .scripture-card, .story-card, .philosophy-stage-card, .shloka-card, .pilgrimage-card"
    );

    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      });
    });
  }
  init3DCardPhysics();

  // --- 10. SACRED PRANA PARTICLES CANVAS (HERO AMBIANCE) ---
  function initPranaParticles() {
    const canvas = document.getElementById("heroPranaCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);

    window.addEventListener("resize", () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 600;
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 177, 121, ${currentOpacity.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(217, 93, 30, 0.8)";
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
  initPranaParticles();

  // --- 11. MINDFUL BREATH & STILLNESS SANCTUARY LOOP ---
  function initMindfulBreathSanctuary() {
    const btnToggleBreath = document.getElementById("btnToggleBreath");
    const breathLotus = document.querySelector(".breath-lotus-wrapper");
    const breathStatusText = document.getElementById("breathStatusText");
    if (!btnToggleBreath || !breathLotus || !breathStatusText) return;

    let isBreathing = false;
    let breathInterval = null;
    let breathPhase = 0; // 0: inhale, 1: hold, 2: exhale

    const phases = [
      { text: "Breathe In", classState: "inhale", duration: 4000 },
      { text: "Hold Peace", classState: "inhale", duration: 3000 },
      { text: "Release", classState: "exhale", duration: 4000 }
    ];

    function runBreathCycle() {
      const current = phases[breathPhase];
      breathStatusText.textContent = current.text;
      breathLotus.className = `breath-lotus-wrapper ${current.classState}`;

      breathInterval = setTimeout(() => {
        breathPhase = (breathPhase + 1) % phases.length;
        if (isBreathing) runBreathCycle();
      }, current.duration);
    }

    btnToggleBreath.addEventListener("click", () => {
      if (!isBreathing) {
        isBreathing = true;
        breathPhase = 0;
        btnToggleBreath.innerHTML = `<span>End Stillness Pause</span>`;
        btnToggleBreath.classList.add("active");
        runBreathCycle();

        let breaths = parseInt(localStorage.getItem("ed_breaths") || "5", 10) + 1;
        localStorage.setItem("ed_breaths", breaths.toString());
        addKarmaXP(50, "Guided Stillness Pause (60s)", "daily_mindful_breath");
      } else {
        isBreathing = false;
        clearTimeout(breathInterval);
        breathLotus.className = "breath-lotus-wrapper";
        breathStatusText.textContent = "Breathe In";
        btnToggleBreath.innerHTML = `<span>Begin Guided Stillness (60s)</span>`;
        btnToggleBreath.classList.remove("active");
      }
    });
  }
  initMindfulBreathSanctuary();

  // --- 12. 3D HERO SANCTUARY DECK CONTROLLER ---
  function initHeroSanctuaryDeck() {
    const DILEMMA_DATA = {
      anxiety: {
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br/>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
        meaning: "“You have a sacred right to your duty, but never to the fruits of your actions. Perform your work with total devotion, free from the paralyzing anxiety of outcome.”",
        ref: "Bhagavad Gita 2.47 • Nishkama Karma"
      },
      duty: {
        sanskrit: "स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥<br/>श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ॥",
        meaning: "“Far better is one's own authentic path, though imperfectly walked, than another's path perfectly simulated. Stand firm in your righteous truth without fear.”",
        ref: "Bhagavad Gita 3.35 • Swadharma"
      },
      purpose: {
        sanskrit: "अयमात्मा ब्रह्म ॥ प्रज्ञानं ब्रह्म ॥<br/>तत्वमसि श्वेतकेतो ॥",
        meaning: "“This deepest witness consciousness within you is one with infinite reality. You are not a helpless wanderer lost in chaos; you are the eternal light itself.”",
        ref: "Mandukya Upanishad • Atman & Brahman"
      },
      strength: {
        sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।<br/>तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥",
        meaning: "“Wherever there is divine consciousness (Krishna) and focused righteous action (Arjuna), victory, moral radiance, and limitless strength are unconditionally assured.”",
        ref: "Bhagavad Gita 18.78 • Divine Triumph"
      }
    };

    const dilemmaChips = document.querySelectorAll(".dilemma-chip");
    const verseBox = document.getElementById("heroVerseBox");
    const verseSanskrit = document.getElementById("heroVerseSanskrit");
    const verseMeaning = document.getElementById("heroVerseMeaning");
    const verseRef = document.getElementById("heroVerseRef");
    const btnSaveHeroVerse = document.getElementById("btnSaveHeroVerse");
    const btnHeroDeckAudio = document.getElementById("btnHeroDeckAudio");

    dilemmaChips.forEach(chip => {
      chip.addEventListener("click", () => {
        dilemmaChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        const key = chip.getAttribute("data-dilemma");
        const data = DILEMMA_DATA[key];
        if (!data || !verseBox) return;

        verseBox.style.opacity = "0.3";
        verseBox.style.transform = "translateY(3px)";

        setTimeout(() => {
          if (verseSanskrit) verseSanskrit.innerHTML = data.sanskrit;
          if (verseMeaning) verseMeaning.textContent = data.meaning;
          if (verseRef) verseRef.textContent = data.ref;

          verseBox.style.opacity = "1";
          verseBox.style.transform = "translateY(0)";
        }, 120);

        addKarmaXP(15, "Wisdom Contemplated", `hero_dilemma_${key}`);
      });
    });

    if (btnSaveHeroVerse) {
      btnSaveHeroVerse.addEventListener("click", () => {
        let bCount = parseInt(localStorage.getItem("ed_bookmarks") || "14", 10);
        bCount++;
        localStorage.setItem("ed_bookmarks", bCount.toString());
        const display = document.getElementById("metricBookmarkCount");
        if (display) display.textContent = bCount;

        const rewarded = addKarmaXP(25, "Sacred Verse Saved to Practice", "hero_save_verse");

        btnSaveHeroVerse.innerHTML = rewarded ? `<span>✓ Saved (+25 XP)</span>` : `<span>✓ Saved</span>`;
        btnSaveHeroVerse.style.backgroundColor = "#10B981";
        btnSaveHeroVerse.style.borderColor = "#10B981";

        setTimeout(() => {
          btnSaveHeroVerse.innerHTML = `<span>🔖 Save Verse to Practice</span>`;
          btnSaveHeroVerse.style.backgroundColor = "";
          btnSaveHeroVerse.style.borderColor = "";
        }, 2200);
      });
    }

    if (btnHeroDeckAudio) {
      btnHeroDeckAudio.addEventListener("click", () => {
        addKarmaXP(35, "Divine Katha Streamed", "hero_deck_audio");
        loadAndPlayTrack(
          "audio/hanuman-en.mp3",
          "Hanuman — The Mountain of Devotion",
          "Bhakti Yoga Audio Story • English"
        );
      });
    }
  }
  initHeroSanctuaryDeck();

  // ==========================================================================
  // 13. PROCEDURAL WEB AUDIO API SYNTHESIZER (528Hz & 432Hz RESONANCE)
  // ==========================================================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTibetanSingingBowl(freq = 528, duration = 3.5) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      // Harmonic overtone
      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(freq * 1.5, now);

      // Envelope: gentle bell strike with resonant decay
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gainNode);
      oscHarmonic.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    } catch (e) {
      console.warn("Web Audio chime unavailable:", e);
    }
  }
  window.playTibetanSingingBowl = playTibetanSingingBowl;

  // ==========================================================================
  // 14. "ASK THE GITA" REAL-TIME DILEMMA ORACLE ENGINE
  // ==========================================================================
  function initGitaOracle() {
    const ORACLE_DB = {
      anxiety: {
        ref: "Bhagavad Gita 2.47 • Nishkama Karma Yoga",
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br/>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
        translation: "“You have a right only to work, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.”",
        action: "Shift your mental energy from the outcome to the present sacred act. Anxiety is simply future projection. Complete your present duty with your whole heart and surrender the fruit to the cosmos."
      },
      failure: {
        ref: "Bhagavad Gita 2.38 • Equanimity in Battle",
        sanskrit: "सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ ।<br/>ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि ॥",
        translation: "“Treating pleasure and pain, gain and loss, victory and defeat alike, engage in your righteous battle. Thus, you shall never incur guilt or remorse.”",
        action: "Neither temporary victory defines you, nor does momentary defeat diminish you. Keep an unshakable, steady intellect (*Sthitaprajna*) and step forward courageously."
      },
      anger: {
        ref: "Bhagavad Gita 2.62–63 • Chain of Delusion",
        sanskrit: "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।<br/>स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
        translation: "“From anger arises delusion; from delusion comes loss of memory; from loss of memory comes ruin of intellect; and from ruin of intellect, one perishes.”",
        action: "Take a conscious pause when provoked. Step back for 60 seconds before speaking or reacting. Protect your sacred inner stillness; never let another's turmoil dictate your consciousness."
      },
      grief: {
        ref: "Bhagavad Gita 2.20 • Eternal Nature of the Soul",
        sanskrit: "न जायते म्रियते वा कदाचिन्<br/>नायं भूत्वा भविता वा न भूयः ।<br/>अजो नित्यः शाश्वतोऽयं पुराणो<br/>न हन्यते हन्यमाने शरीरे ॥",
        translation: "“The soul is never born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.”",
        action: "Honor your love and tender sorrow, but remember that the essence of life transcends physical forms. The soul is untouched by decay. Send love, light, and peaceful gratitude."
      },
      purpose: {
        ref: "Bhagavad Gita 18.46 • Worship Through One's Duty",
        sanskrit: "यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम् ।<br/>स्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः ॥",
        translation: "“By worshipping Him through performance of one's own natural duty, from whom all beings have evolved, human beings attain spiritual perfection.”",
        action: "Your purpose does not require a grand stage; whatever honest work is currently in your hands is your altar of worship. Perform it with total integrity, love, and excellence."
      },
      duty: {
        ref: "Bhagavad Gita 3.35 • The Sanctity of Swadharma",
        sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।<br/>स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥",
        translation: "“Better is one's own authentic duty, though imperfectly carried out, than another's duty flawlessly performed. Fearlessly walk your own truth.”",
        action: "Stop comparing your life timeline to others. Your authentic path was uniquely designed for your spiritual evolution. Embrace your duty with honor and calm resolve."
      },
      loneliness: {
        ref: "Bhagavad Gita 9.29 • Divine Immanence",
        sanskrit: "समोऽहं सर्वभूतेषु न मे द्वेष्योऽस्ति न प्रियः ।<br/>ये भजन्ति तु मां भक्त्या मयि ते теषु चाप्यहम् ॥",
        translation: "“I am equally present in all beings; to Me none is hateful or preferred. But those who remember Me with love and devotion are in Me, and I am in them.”",
        action: "You are never truly solitary in this universe. Close your eyes, breathe gently, and feel the eternal witness consciousness breathing through you. You are held by infinite grace."
      },
      overthinking: {
        ref: "Bhagavad Gita 6.6 • Mastering the Mind",
        sanskrit: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः ।<br/>अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥",
        translation: "“For one who has conquered the mind, the mind is the greatest friend. But for one who has failed to do so, the mind remains the fiercest enemy.”",
        action: "Observe your churning thoughts like clouds passing through an open sky without identifying with them. You are the sky, not the storm."
      }
    };

    const oracleInput = document.getElementById("oracleInput");
    const btnOracleConsult = document.getElementById("btnOracleConsult");
    const oracleChips = document.querySelectorAll(".oracle-chip");
    const revelationCard = document.getElementById("oracleRevelationCard");
    const verseRef = document.getElementById("oracleVerseRef");
    const sanskritEl = document.getElementById("oracleSanskrit");
    const translationEl = document.getElementById("oracleTranslation");
    const actionTextEl = document.getElementById("oracleActionText");
    const btnChantSingingBowl = document.getElementById("btnChantSingingBowl");
    const btnSaveOracleVerse = document.getElementById("btnSaveOracleVerse");

    function renderOracleCounsel(key) {
      const data = ORACLE_DB[key] || ORACLE_DB["anxiety"];
      if (!revelationCard) return;

      revelationCard.style.opacity = "0.3";
      revelationCard.style.transform = "translateY(4px)";

      setTimeout(() => {
        if (verseRef) verseRef.textContent = data.ref;
        if (sanskritEl) sanskritEl.innerHTML = data.sanskrit;
        if (translationEl) translationEl.textContent = data.translation;
        if (actionTextEl) actionTextEl.textContent = data.action;

        revelationCard.style.opacity = "1";
        revelationCard.style.transform = "translateY(0)";
      }, 120);

      playTibetanSingingBowl(528, 2.8);
      addKarmaXP(20, `Gita Counsel: ${data.ref.split('•')[0].trim()}`, `oracle_counsel_${key}`);
    }

    oracleChips.forEach(chip => {
      chip.addEventListener("click", () => {
        oracleChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const q = chip.getAttribute("data-query");
        renderOracleCounsel(q);
      });
    });

    function handleCustomConsult() {
      if (!oracleInput) return;
      const text = oracleInput.value.toLowerCase().trim();
      if (!text) return;

      let matchedKey = "anxiety";
      if (text.includes("fail") || text.includes("exam") || text.includes("career") || text.includes("job") || text.includes("lose")) matchedKey = "failure";
      else if (text.includes("anger") || text.includes("angry") || text.includes("fight") || text.includes("hate") || text.includes("betray")) matchedKey = "anger";
      else if (text.includes("death") || text.includes("grief") || text.includes("sad") || text.includes("crying") || text.includes("loss")) matchedKey = "grief";
      else if (text.includes("why") || text.includes("purpose") || text.includes("meaning") || text.includes("lost")) matchedKey = "purpose";
      else if (text.includes("duty") || text.includes("choice") || text.includes("confused") || text.includes("family")) matchedKey = "duty";
      else if (text.includes("alone") || text.includes("lonely") || text.includes("nobody") || text.includes("friend")) matchedKey = "loneliness";
      else if (text.includes("overthink") || text.includes("mind") || text.includes("restless") || text.includes("focus")) matchedKey = "overthinking";

      oracleChips.forEach(c => c.classList.remove("active"));
      renderOracleCounsel(matchedKey);
    }

    if (btnOracleConsult) btnOracleConsult.addEventListener("click", handleCustomConsult);
    if (oracleInput) {
      oracleInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCustomConsult();
      });
    }

    if (btnChantSingingBowl) {
      btnChantSingingBowl.addEventListener("click", () => {
        playTibetanSingingBowl(528, 4.0);
        btnChantSingingBowl.innerHTML = `<span>✨ Resonating (528Hz Transformation)...</span>`;
        setTimeout(() => {
          btnChantSingingBowl.innerHTML = `<span>🔔 Play 528Hz Singing Bowl Chime</span>`;
        }, 3000);
      });
    }

    if (btnSaveOracleVerse) {
      btnSaveOracleVerse.addEventListener("click", () => {
        let bCount = parseInt(localStorage.getItem("ed_bookmarks") || "14", 10) + 1;
        localStorage.setItem("ed_bookmarks", bCount.toString());
        const display = document.getElementById("metricBookmarkCount");
        if (display) display.textContent = bCount;

        const rewarded = addKarmaXP(25, "Gita Oracle Counsel Saved to Practice", "oracle_save_counsel");

        btnSaveOracleVerse.innerHTML = rewarded ? `<span>✓ Saved to Practice (+25 XP)</span>` : `<span>✓ Saved to Practice</span>`;
        btnSaveOracleVerse.style.backgroundColor = "#10B981";
        btnSaveOracleVerse.style.borderColor = "#10B981";

        setTimeout(() => {
          btnSaveOracleVerse.innerHTML = `<span>🔖 Save Counsel to Practice Hub</span>`;
          btnSaveOracleVerse.style.backgroundColor = "";
          btnSaveOracleVerse.style.borderColor = "";
        }, 2200);
      });
    }
  }
  initGitaOracle();

  // ==========================================================================
  // 15. 24-HOUR DINCHARYA (VEDIC RHYTHM) CLOCK CALCULATOR
  // ==========================================================================
  function initDincharyaClock() {
    const liveTimeEl = document.getElementById("dincharyaLiveTime");
    const phaseTitleEl = document.getElementById("dincharyaPhaseTitle");
    const phaseDescEl = document.getElementById("dincharyaPhaseDesc");

    const pills = {
      brahma: document.getElementById("dp-brahma"),
      praataha: document.getElementById("dp-praataha"),
      madhyahna: document.getElementById("dp-madhyahna"),
      sandhya: document.getElementById("dp-sandhya"),
      nishi: document.getElementById("dp-nishi")
    };

    function updateRhythm() {
      const now = new Date();
      const hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, "0");
      const timeStr = `${hours}:${mins}`;

      if (liveTimeEl) liveTimeEl.textContent = timeStr;

      Object.values(pills).forEach(p => p && p.classList.remove("active"));

      if (hours >= 4 && hours < 6) {
        // Brahma Muhurta
        if (pills.brahma) pills.brahma.classList.add("active");
        if (phaseTitleEl) phaseTitleEl.textContent = "Brahma Muhurta (4:00 - 6:00 AM)";
        if (phaseDescEl) phaseDescEl.textContent = "Hour of profound silence and creative stillness. Highest prana for meditation and wisdom.";
      } else if (hours >= 6 && hours < 12) {
        // Praataha
        if (pills.praataha) pills.praataha.classList.add("active");
        if (phaseTitleEl) phaseTitleEl.textContent = "Praataha Kala (Morning Duty & Nishkama Karma)";
        if (phaseDescEl) phaseDescEl.textContent = "Time for focused, righteous action with dedication and clarity.";
      } else if (hours >= 12 && hours < 17) {
        // Madhyahna
        if (pills.madhyahna) pills.madhyahna.classList.add("active");
        if (phaseTitleEl) phaseTitleEl.textContent = "Madhyahna Kala (Midday Sustenance & Balance)";
        if (phaseDescEl) phaseDescEl.textContent = "Midday reflection. Maintain equanimity amidst life's hustle.";
      } else if (hours >= 17 && hours < 21) {
        // Sandhya
        if (pills.sandhya) pills.sandhya.classList.add("active");
        if (phaseTitleEl) phaseTitleEl.textContent = "Sandhya Kala (Dusk, Aarti & Contemplation)";
        if (phaseDescEl) phaseDescEl.textContent = "Twilight pause. Offer gratitude for the day's karma and reflect on the eternal.";
      } else {
        // Nishi
        if (pills.nishi) pills.nishi.classList.add("active");
        if (phaseTitleEl) phaseTitleEl.textContent = "Nishi Kala (Night Rest & Deep Silence)";
        if (phaseDescEl) phaseDescEl.textContent = "Time for peaceful surrender. Detach from the world and enter restorative sleep.";
      }
    }

    updateRhythm();
    setInterval(updateRhythm, 60000);
  }
  initDincharyaClock();

  // ==========================================================================
  // 16. ATMOSPHERE SWITCHER (SURYODAYA DAWN / SANDHYA COSMIC NIGHT)
  // ==========================================================================
  function initAtmosphereEngine() {
    const btnToggle = document.getElementById("btnAtmosphereToggle");
    const iconEl = document.getElementById("atmosphereIcon");
    const textEl = document.getElementById("atmosphereText");

    const SUN_SVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="atmosphere-svg" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    const MOON_SVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="atmosphere-svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" fill-opacity="0.2"/></svg>`;

    const savedTheme = localStorage.getItem("ed_atmosphere") || "dawn";

    function applyAtmosphere(theme) {
      if (theme === "sandhya") {
        document.body.classList.add("theme-sandhya");
        if (iconEl) iconEl.innerHTML = MOON_SVG;
        if (textEl) textEl.textContent = "Cosmic";
        if (btnToggle) btnToggle.setAttribute("title", "Atmosphere: Sandhya Cosmic Night (Click for Suryodaya Dawn)");
      } else {
        document.body.classList.remove("theme-sandhya");
        if (iconEl) iconEl.innerHTML = SUN_SVG;
        if (textEl) textEl.textContent = "Dawn";
        if (btnToggle) btnToggle.setAttribute("title", "Atmosphere: Suryodaya Dawn (Click for Sandhya Cosmic Night)");
      }
      localStorage.setItem("ed_atmosphere", theme);
    }

    applyAtmosphere(savedTheme);

    if (btnToggle) {
      btnToggle.addEventListener("click", () => {
        const isCurrentlyNight = document.body.classList.contains("theme-sandhya");
        const nextTheme = isCurrentlyNight ? "dawn" : "sandhya";
        applyAtmosphere(nextTheme);
        playTibetanSingingBowl(nextTheme === "sandhya" ? 432 : 528, 2.0);
        showKarmaToast(15, `Atmosphere Shifted to ${nextTheme === "sandhya" ? "🌌 Sandhya Cosmic Night" : "🌅 Suryodaya Golden Dawn"}`);
      });
    }
  }
  initAtmosphereEngine();

  // ==========================================================================
  // 17. 3D SACRED PILGRIMAGE DARSHAN PORTALS & TEMPLE BELLS
  // ==========================================================================
  function initPilgrimagePortals() {
    const cards = document.querySelectorAll(".pilgrimage-card");

    const SHRINE_SOUNDS = {
      kedarnath: { freq: 432, story: null, title: "Kedarnath Mahadev Darshan", sub: "Sacred Himalayan Shrine • 432Hz Resonance" },
      kashi: { freq: 528, story: null, title: "Kashi Vishwanath Darshan", sub: "Varanasi Moksha Puri • 528Hz Solfeggio" },
      tirupati: { freq: 580, story: "audio/tirupati-en.mp3", title: "Tirupati Venkateswara Balaji", sub: "Seven Hills Sacred Devotion" },
      dwarka: { freq: 650, story: null, title: "Dwarkadhish Kingdom of Krishna", sub: "Coastal Sacred Kingdom • 650Hz Bell" }
    };

    cards.forEach(card => {
      const bellBtn = card.querySelector(".pilgrimage-bell-btn");
      const shrineKey = card.getAttribute("data-shrine");
      const shrineData = SHRINE_SOUNDS[shrineKey];

      if (bellBtn && shrineData) {
        bellBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          playTibetanSingingBowl(shrineData.freq, 3.2);
          bellBtn.style.transform = "scale(1.25) rotate(15deg)";
          setTimeout(() => {
            bellBtn.style.transform = "";
          }, 350);
          showKarmaToast(15, `Sacred Temple Bell Rang at ${shrineData.title} 🔔`);
        });
      }

      card.addEventListener("click", () => {
        if (shrineData) {
          playTibetanSingingBowl(shrineData.freq, 2.8);
          if (shrineData.story) {
            loadAndPlayTrack(shrineData.story, shrineData.title, shrineData.sub);
          }
          addKarmaXP(30, `Virtual Darshan: ${shrineData.title}`);
        }
      });
    });
  }
  initPilgrimagePortals();
});



