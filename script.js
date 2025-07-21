// --- Dynamic Greetings, Personalization, PWA, and Rolling Backgrounds ---
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(mode) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode);
    localStorage.setItem('theme', mode);
    themeToggle.innerText = mode === 'dark-mode' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-pressed', mode === 'dark-mode' ? 'true' : 'false');
  }
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'dark-mode';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light-mode' : 'dark-mode');
  });
});
const greetings = {
  morning: {
    title: ["Good Morning 🌞", "Rise and Shine! 🌅", "Morning, Sunshine!"],
    message: [
      "Start your day with purpose and kindness.",
      "You are resilient and capable.",
      "May today bring you joy and clarity.",
      "Your energy inspires the world around you."
    ]
  },
  afternoon: {
    title: ["Good Afternoon 🌤️", "Hello, Beautiful Afternoon!", "Keep Going!"],
    message: [
      "Pause and breathe. Your presence is enough.",
      "Keep moving forward with grace.",
      "Every effort counts — you’re doing great.",
      "Let your spirit stay bright as the sun."
    ]
  },
  evening: {
    title: ["Good Evening 🌇", "Evening Reflections 🌠", "Unwind and Recharge"],
    message: [
      "Reflect on your day with compassion.",
      "Rest is a powerful form of resilience.",
      "You’ve earned this moment of peace.",
      "Let gratitude fill your evening."
    ]
  },
  night: {
    title: ["Hello Night Owl 🌙", "Peaceful Night ✨", "Rest Well"],
    message: [
      "Take a moment for self-care. You’ve made it through today.",
      "You are not alone.",
      "Let tomorrow wait — tonight is for you.",
      "Dream big, sleep deeply, and know you are enough."
    ]
  }
};

const compliments = [
  "You are awesome! 🚀",
  "Keep shining!",
  "Your smile is contagious 😊",
  "Believe in yourself!",
  "You make a difference every day.",
  "Your kindness lights up the world.",
  "You bring out the best in others.",
  "You radiate positivity!",
  "Your courage inspires me.",
  "You are a force for good."
];

const holidays = {
  "01-01": "Happy New Year! 🎉 Wishing you a year of joy and growth.",
  "12-25": "Merry Christmas! 🎄 May your heart be light and your days bright.",
  "07-04": "Happy Independence Day! 🇺🇸 Celebrate freedom and unity."
};

function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function getHolidayMessage(date) {
  const md = String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  return holidays[md] || null;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setDynamicBackground(timeOfDay, date) {
  // No-op: replaced by rolling background
}

function getUserName() {
  return localStorage.getItem("greetUserName") || "";
}

function setUserName(name) {
  localStorage.setItem("greetUserName", name);
}

function askForName() {
  document.getElementById("usernameForm").style.display = "flex";
}

function hideNameForm() {
  document.getElementById("usernameForm").style.display = "none";
}

function updateGreeting(randomize = true) {
  const now = new Date();
  const hour = now.getHours();
  const timeOfDay = getTimeOfDay(hour);

  // setDynamicBackground(timeOfDay, now); // Not needed with rolling backgrounds

  const greetingEl = document.getElementById("greeting");
  const messageEl = document.getElementById("message");
  let userName = getUserName();
  let holidayMsg = getHolidayMessage(now);

  // Animate out
  greetingEl.classList.remove('fade-in');
  messageEl.classList.remove('fade-in');

  setTimeout(() => {
    // Prefer holiday
    if (holidayMsg) {
      greetingEl.innerText = (userName ? `Hi ${userName}, ` : "") + "Special Greetings!";
      messageEl.innerText = holidayMsg + " " + randomFrom(compliments);
    }
    // Weekend
    else if (isWeekend(now)) {
      greetingEl.innerText = (userName ? `Happy Weekend, ${userName}! 🎉` : "Happy Weekend! 🎉");
      messageEl.innerText = "Take time for yourself. You deserve joy and relaxation. " + randomFrom(compliments);
    }
    // Weekday/Time-based
    else {
      const gTitle = randomize ? randomFrom(greetings[timeOfDay].title) : greetings[timeOfDay].title[0];
      const gMsg = randomize ? randomFrom(greetings[timeOfDay].message) : greetings[timeOfDay].message[0];
      greetingEl.innerText = (userName ? `${gTitle}, ${userName}!` : gTitle);
      messageEl.innerText = gMsg + " " + randomFrom(compliments);
    }
    // Animate in
    greetingEl.classList.add('fade-in');
    messageEl.classList.add('fade-in');
  }, 100);
}

// --- Rolling Background Images Logic ---
const rollingBackgrounds = [
  "var(--morning-bg-img)",
  "var(--afternoon-bg-img)",
  "var(--evening-bg-img)",
  "var(--night-bg-img)"
];
let bgIndex = 0;
function setRollingBackground() {
  document.body.style.backgroundImage = getComputedStyle(document.documentElement).getPropertyValue(rollingBackgrounds[bgIndex]);
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  bgIndex = (bgIndex + 1) % rollingBackgrounds.length;
}
function setGreetingBackground() {
  const hour = new Date().getHours();
  let bgVar;

  if (hour >= 5 && hour < 12) {
    // Morning
    bgVar = 'var(--morning-bg-img)';
  } else if (hour >= 12 && hour < 17) {
    // Afternoon
    bgVar = 'var(--afternoon-bg-img)';
  } else if (hour >= 17 && hour < 20) {
    // Evening
    bgVar = 'var(--evening-bg-img)';
  } else {
    // Night
    bgVar = 'var(--night-bg-img)';
  }

  document.body.style.backgroundImage = bgVar;
}

setGreetingBackground();
// --- DOM Ready Logic ---
document.addEventListener('DOMContentLoaded', function() {
  // other code...

  // Place this call here:
  setGreetingBackground();
});
document.addEventListener("DOMContentLoaded", () => {
  const usernameForm = document.getElementById("usernameForm");
  if (usernameForm) {
    usernameForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("usernameInput").value.trim();
      if (name) {
        setUserName(name);
        hideNameForm();
        updateGreeting();
      }
    });
  }

  // Show name prompt if needed
  if (!getUserName()) {
    askForName();
  } else {
    updateGreeting();
  }

  // Interactive: another message button
  const anotherBtn = document.getElementById("anotherMessage");
  if (anotherBtn) {
    anotherBtn.onclick = () => updateGreeting(true);
    anotherBtn.addEventListener("keyup", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        updateGreeting(true);
      }
    });
  }

  // Start rolling background
  setRollingBackground();
  setInterval(setRollingBackground, 5000);

  // PWA: Service Worker registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js').catch(function (error) {
        // Service worker failed (optional: log to analytics)
      });
    });
  }
});
