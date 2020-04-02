// Imports
import "core-js/stable";
import 'whatwg-fetch';
import SettingStyles from './modules/setting-styles.js';

const settingStyles = new SettingStyles(
  '[data-setting="config"]',
  '[data-setting="listBreeds"]',
  '[data-setting="listColors"]',
  '[data-setting="listFontFamily"]',
  '[data-setting="resultDogName"]',
  '[data-setting="resultDogImage"]',
  '[data-setting="saveConfig"]',
);
settingStyles.init();
