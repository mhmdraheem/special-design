export function saveSetting(settingName, settingValue) {
  let settings = getSettings();
  settings[settingName] = settingValue;

  saveSettings(settings);
}

export function saveSettings(settings) {
  window.localStorage.settings = JSON.stringify(settings);
}

export function getSettings() {
  let settings = window.localStorage.settings;
  return settings ? JSON.parse(window.localStorage.settings) : null;
}
