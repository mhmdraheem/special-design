let intervalId;
const settingsBar = document.querySelector(".settings-bar");
const landing = document.querySelector(".landing");

// apply website settings
let savedSettings = getSettings();
if (savedSettings == null) {
  savedSettings = saveDefaultSettings();
}

function saveDefaultSettings() {
  let settings = getDefaultSettings();
  saveSettings(settings);
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

function applyBackground(background) {
  let bgImages;
  if (window.location.href.includes("github")) {
    // images included in a github issue
    bgImages = [
      "https://i.ibb.co/LhgMVbq/01.jpg",
      "https://i.ibb.co/tH96gj6/02.jpg",
      "https://i.ibb.co/0tsv5LD/03.jpg",
      "https://i.ibb.co/tcQffnV/04.jpg",
    ];
  } else {
    bgImages = ["../img/01.jpg", "../img/02.jpg", "../img/03.jpg", "../img/04.jpg"];
  }

  if (background.isRandom) {
    landing.style.backgroundImage = `url(${bgImages[3]})`;
    intervalId = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * 100) % bgImages.length;
      landing.style.backgroundImage = `url(${bgImages[randomIndex]})`;
    }, 1000);
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
  settingsBar.classList.toggle("visible");
  gear.classList.toggle("fa-spin");
};

onClickOutside(settingsBar, () => {
  if (settingsBar.classList.contains("visible")) {
    hideSettingsBar();
  }
});

function hideSettingsBar() {
  settingsBar.classList.remove("visible");
  gear.classList.remove("fa-spin");
}

let colors = settingsBar.querySelectorAll(".color ul li");
colors.forEach((color) => {
  color.onclick = () => {
    let colorHex = rgbToHex(color.style.backgroundColor);
    applyColor(colorHex);
    activateColorSettingElement(color);
    saveSetting("color", colorHex);
  };
});

settingsBar.querySelectorAll(".backgrounds input").forEach((checkBox) => {
  checkBox.onclick = () => {
    let background = {};
    background.isRandom = checkBox.value === "true";
    background.image = background.isRandom ? "" : landing.style.backgroundImage;

    applyBackground(background);
    saveSetting("background", background);
  };
});

settingsBar.querySelectorAll(".show-bullets input").forEach((check) => {
  check.onclick = () => {
    let isShowBullets = check.value === "true";

    applyShowBullets(isShowBullets);
    saveSetting("isShowBullets", isShowBullets);
  };
});

settingsBar.querySelector(".reset-btn").onclick = () => {
  saveSettings(getDefaultSettings());
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
  let skills = document.querySelector(".skills");
  if (window.scrollY > skills.offsetTop + skills.offsetHeight - window.innerHeight) {
    document.querySelector(".skills .skill.html .progress-value").style.width = "40%";
    document.querySelector(".skills .skill.css .progress-value").style.width = "70%";
    document.querySelector(".skills .skill.js .progress-value").style.width = "90%";
    document.querySelector(".skills .skill.py .progress-value").style.width = "80%";
    document.querySelector(".skills .skill.php .progress-value").style.width = "10%";
    document.querySelector(".skills .skill.mysql .progress-value").style.width = "70%";
  }
};
/* end skills section */

/* start of gallery section */
let items = document.querySelectorAll(".gallery .items img");
items.forEach((item) => {
  item.onclick = (event) => {
    swal({
      content: createDialogContent(event),
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: false,
    });
  };
});

function createDialogContent(event) {
  let content = document.createElement("div");
  content.classList = "alert-content";

  let title = document.createElement("h3");
  title.innerText = event.target.alt;
  title.classList = "alert-head";

  let img = document.createElement("img");
  img.src = event.target.currentSrc;
  img.classList = "alert-img";

  let cancel = document.createElement("button");
  cancel.classList = "alert-button";
  cancel.onclick = () => swal.close();

  content.append(cancel, title, img);

  return content;
}
/* end of gallery section */

/* start of utility functions */
function saveSetting(settingName, settingValue) {
  let settings = getSettings();
  settings[settingName] = settingValue;

  saveSettings(settings);
}

function saveSettings(settings) {
  window.localStorage.settings = JSON.stringify(settings);
}

function getSettings() {
  let settings = window.localStorage.settings;
  return settings ? JSON.parse(window.localStorage.settings) : null;
}

function onClickOutside(element, callback) {
  window.addEventListener("click", (event) => {
    if (!element.contains(event.target)) {
      callback(event);
    }
  });
}

function rgbToHex(rgb) {
  rgb = rgb.slice(4, -1).split(",");
  let r = +rgb[0];
  let g = +rgb[1];
  let b = +rgb[2];

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
/* end of utility functions */
