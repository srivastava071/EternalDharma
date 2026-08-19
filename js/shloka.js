/**
 * EternalDharma - Daily Shloka & Soul Reflection Sanctuary
 * Dynamically presents daily Sanskrit verses with English translations,
 * source citations, and heartfelt actionable daily reflections.
 */

document.addEventListener("DOMContentLoaded", () => {
  const SHLOKAS = [
    {
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      meaning: "You have a sacred right to perform your duty, but you are not entitled to the fruits of action. Never let anxiety for results paralyze you, and never surrender to inaction.",
      reflection: "When you pour your entire heart into your craft without burning yourself out over the outcome, peace becomes your natural state. Give your best today; let the universe handle the fruits.",
      source: "Bhagavad Gita 2.47"
    },
    {
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
      meaning: "Whenever righteousness declines and darkness rises in the world, the divine consciousness manifests to restore truth and balance.",
      reflection: "Even in moments of deep uncertainty or personal hardship, truth always finds its way back. Stand firm in your honesty; goodness is never truly lost.",
      source: "Bhagavad Gita 4.7"
    },
    {
      sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत् ॥",
      meaning: "May all living beings be filled with joy. May all be free from illness and suffering. May all perceive auspiciousness everywhere. May no heart suffer.",
      reflection: "Begin your morning with a quiet wish of goodwill for every person you meet today — friends, strangers, and even those who challenge your patience.",
      source: "Brihadaranyaka Upanishad"
    },
    {
      sanskrit: "अहिंसा परमो धर्मः धर्महिंसा तथैव च ।\nसत्यमेव जयते नानृतम् ॥",
      meaning: "Compassion is the supreme virtue, and defending righteousness is equally sacred. Truth alone triumphs, never falsehood.",
      reflection: "Gentleness is not weakness. Speak the truth with compassion, stand up for what is right, and let your actions reflect unwavering quiet courage.",
      source: "Mahabharata / Mundaka Upanishad"
    },
    {
      sanskrit: "विद्या ददाति विनयं विनयाद् याति पात्रताम् ।\nपात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुखम् ॥",
      meaning: "True knowledge bestows deep humility; humility grants worthiness; worthiness allows one to uphold Dharma and find authentic inner fulfillment.",
      reflection: "The greatest masters remain eternal students. Approach today’s challenges with quiet curiosity, humility, and an open heart.",
      source: "Hitopadesha"
    },
    {
      sanskrit: "धर्मो रक्षति रक्षितः ।\nतस्माद् धर्मो न हन्तव्यो मा नो धर्मो हतोऽवधीत् ॥",
      meaning: "Dharma protects those who uphold and protect it. When we live with integrity, that very integrity becomes our shield.",
      reflection: "Doing the right thing is rarely easy, but it grants a quiet conscience that no worldly praise can buy. Choose righteousness in small moments today.",
      source: "Manusmriti 8.15"
    }
  ];

  let currentIndex = new Date().getDay() % SHLOKAS.length;

  const shlokaSanskrit = document.getElementById("shlokaSanskrit");
  const shlokaTranslation = document.getElementById("shlokaTranslation");
  const shlokaReflection = document.getElementById("shlokaReflectionText");
  const shlokaSource = document.getElementById("shlokaSource");
  const btnPrevShloka = document.getElementById("btnPrevShloka");
  const btnNextShloka = document.getElementById("btnNextShloka");

  function renderShloka(index) {
    if (!shlokaSanskrit || !shlokaTranslation) return;
    const item = SHLOKAS[index];

    // Smooth subtle fade
    shlokaSanskrit.style.opacity = "0.2";
    shlokaTranslation.style.opacity = "0.2";
    if (shlokaReflection) shlokaReflection.style.opacity = "0.2";

    setTimeout(() => {
      shlokaSanskrit.textContent = item.sanskrit;
      shlokaTranslation.textContent = `“${item.meaning}”`;
      if (shlokaReflection) shlokaReflection.textContent = item.reflection;
      if (shlokaSource) shlokaSource.textContent = `— ${item.source}`;
      
      shlokaSanskrit.style.opacity = "1";
      shlokaTranslation.style.opacity = "1";
      if (shlokaReflection) shlokaReflection.style.opacity = "1";
    }, 150);
  }

  if (btnPrevShloka) {
    btnPrevShloka.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + SHLOKAS.length) % SHLOKAS.length;
      renderShloka(currentIndex);
    });
  }

  if (btnNextShloka) {
    btnNextShloka.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % SHLOKAS.length;
      renderShloka(currentIndex);
    });
  }

  // Initial display
  renderShloka(currentIndex);
});
