// Imports
import SettingStyles from './modules/setting-styles.js';

const settingStyles = new SettingStyles(
  '[data-setting="config"]',
  '[data-setting="listBreeds"]',
  '[data-setting="dogName"]',
  '[data-setting="dogImage"]',
  '[data-setting="saveConfig"]',
  '[data-setting="contentResult"]'
);
settingStyles.init();
