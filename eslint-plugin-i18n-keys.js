const noSpecialCharactersInKeysRule = require("./no-special-characters-in-keys");
const recommendedConfig = require("./configs/recommended");

const plugin = {
  rules: {
    "no-special-characters-in-keys": noSpecialCharactersInKeysRule,
  },
  configs: {
    recommended: recommendedConfig
  }
};
module.exports = plugin; 