import { onClickOutside, rgbToHex } from "./components.js";
import * as storage from "./storageManager.js";

const settingsBar = document.querySelector(".settings-bar");
const landing = document.querySelector(".landing");

// apply website settings
let savedSettings = storage.getSettings();
if (savedSettings == null) {
  savedSettings = saveDefaultSettings();
}

function saveDefaultSettings() {
  let settings = getDefaultSettings();
  storage.saveSettings(settings);
  return settings;
}

function getDefaultSettings() {
  let settings = {};

  settings["color"] = rgbToHex(settingsBar.querySelector(".color ul li").style.backgroundColor);

  settings["background"] = {};
  settings["background"]["image"] = "";
  settings["background"]["isRandom"] = true;

  settings["isShowBullets"] = true;

  return settings;
}

applySettings(savedSettings);

function applySettings(settings) {
  let colorHex = settings["color"];
  applyColor(colorHex);
  let colorElem = getColorSettingElement(colorHex);
  activateColorSettingElement(colorElem);

  let background = settings["background"];
  applyBackground(background);
  let backgroundElem = getBackgroundSettingElement(background);
  activateBackgroundSettingElement(backgroundElem);

  let showBullets = settings["isShowBullets"];
  applyShowBullets(showBullets);
  let showBulletsElem = getShowBulletsSettingElement(showBullets);
  activateShowBulletsSettingElement(showBulletsElem);
}

function applyColor(colorHex) {
  document.querySelector(":root").style.setProperty("--active-color", colorHex);
}

function getColorSettingElement(colorHex) {
  let colors = settingsBar.querySelectorAll(".color ul li");
  let colorElem = [...colors].filter((c) => rgbToHex(c.style.backgroundColor) == colorHex);
  return colorElem[0];
}

function activateColorSettingElement(colorElem) {
  settingsBar.querySelector(".color li.active").classList.remove("active");
  colorElem.classList.add("active");
}

var intervalId;
function applyBackground(background) {
  const bgImages = ["../img/01.jpg", "../img/02.jpg", "../img/03.jpg", "../img/04.jpg"];
  if (background.isRandom) {
    intervalId = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * 100) % bgImages.length;
      landing.style.backgroundImage = `url(${bgImages[randomIndex]})`;
    }, 5000);
  } else {
    clearInterval(intervalId);
    landing.style.backgroundImage = background.image;
  }
}

function getBackgroundSettingElement(background) {
  let backgroundCheckboxes = Array.from(settingsBar.querySelectorAll(".backgrounds input"));
  if (background.isRandom) {
    return backgroundCheckboxes.filter((i) => i.value === "true")[0];
  } else {
    return backgroundCheckboxes.filter((i) => i.value === "false")[0];
  }
}

function activateBackgroundSettingElement(backgroundElem) {
  backgroundElem.checked = true;
}

function applyShowBullets(isShowBullets) {
  document.querySelector(".bullets").style.display = isShowBullets ? "block" : "none";
}

function getShowBulletsSettingElement(isShowBullets) {
  let showBulletsCheckboxes = Array.from(settingsBar.querySelectorAll(".show-bullets input"));
  if (isShowBullets) {
    return showBulletsCheckboxes.filter((i) => i.value === "true")[0];
  } else {
    return showBulletsCheckboxes.filter((i) => i.value === "false")[0];
  }
}

function activateShowBulletsSettingElement(showBulletsElem) {
  showBulletsElem.checked = true;
}

/* start settings bar */
let visibilityBtn = settingsBar.querySelector(".visibility-btn");
let gear = visibilityBtn.querySelector("i");
visibilityBtn.onclick = () => {
  let isVisible = settingsBar.classList.contains("visible");
  if (isVisible) {
    hideSettingsBar();
  } else {
    showSettingsBar();
  }
};

function hideSettingsBar() {
  settingsBar.classList.remove("visible");
  gear.classList.remove("active");
}

function showSettingsBar() {
  settingsBar.classList.add("visible");
  gear.classList.add("active");
}

onClickOutside(settingsBar, () => {
  let isVisible = settingsBar.classList.contains("visible");
  if (isVisible) {
    hideSettingsBar();
  }
});

let colors = settingsBar.querySelectorAll(".color ul li");
colors.forEach((color) => {
  color.onclick = () => {
    let colorHex = rgbToHex(color.style.backgroundColor);
    applyColor(colorHex);
    activateColorSettingElement(color);
    storage.saveSetting("color", colorHex);
  };
});

settingsBar.querySelectorAll(".backgrounds input").forEach((checkBox) => {
  checkBox.onclick = () => {
    let background = {};
    background.isRandom = checkBox.value === "true";
    background.image = background.isRandom ? "" : landing.style.backgroundImage;

    applyBackground(background);
    storage.saveSetting("background", background);
  };
});

settingsBar.querySelectorAll(".show-bullets input").forEach((check) => {
  check.onclick = () => {
    let isShowBullets = check.value === "true";

    applyShowBullets(isShowBullets);
    storage.saveSetting("isShowBullets", isShowBullets);
  };
});

settingsBar.querySelector(".reset-btn").onclick = () => {
  storage.saveSettings(getDefaultSettings());
  location.reload();
};
/* end side bar */

/* start landing section */
// handle nav bar events
let navIcon = landing.querySelector(".nav .nav-icon");
let ul = landing.querySelector(".nav ul");
navIcon.onclick = () => {
  ul.style.zIndex == 1 ? hideList(ul) : showList(ul);
};

function hideList(ul) {
  ul.style.zIndex = -1;
}

function showList(ul) {
  ul.style.zIndex = 1;
}

let li = document.querySelectorAll(".nav ul li");
li.forEach((li) => {
  li.onclick = () => hideList(ul);
});

onClickOutside(ul, (event) => {
  if (event.target !== navIcon) {
    hideList(ul);
  }
});
/* end landing section */

/* start skills section */

window.onscroll = () => {
  const { bottom } = document.querySelector(".skills").getBoundingClientRect();
  if (window.scrollY >= bottom) {
    document.querySelector(".skills .skill.html .progress-value").style.width = "40%";
    document.querySelector(".skills .skill.css .progress-value").style.width = "70%";
    document.querySelector(".skills .skill.js .progress-value").style.width = "90%";
    document.querySelector(".skills .skill.py .progress-value").style.width = "80%";
    document.querySelector(".skills .skill.php .progress-value").style.width = "10%";
    document.querySelector(".skills .skill.mysql .progress-value").style.width = "70%";
  }
};

/* end skills section */
