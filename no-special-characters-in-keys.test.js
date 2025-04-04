/**
 * @fileoverview Tests for no-special-characters-in-keys rule
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("./no-special-characters-in-keys");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
});

ruleTester.run("no-special-characters-in-keys", rule, {
  valid: [
    // Simple valid cases
    "t('valid key')",
    "t('another valid key')",
    "t('key with spaces')",
    "t('key_with_underscores')",
    "t('key-with-dashes')",
    
    // Different translation function names
    "translate('valid key')",
    "i18n('valid key')",
    "i18n.t('valid key')",
    
    // Non-string arguments should not trigger the rule
    "t(someVariable)",
    "t(123)",
    "t(true)",
    
    // Non-translation function calls should not trigger the rule
    "someOtherFunction('with.special.characters')",
    "console.log('with.special.characters')",
  ],
  invalid: [
    // Period in key
    {
      code: "t('key.with.period')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    
    // Colon in key
    {
      code: "t('key:with:colon')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    // At symbol in key
    {
      code: "t('key@with@at')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    // Different translation function names with special characters
    {
      code: "translate('key.with.period')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
      code: "i18n('key.with.period')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
      code: "i18n.t('key.with.period')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
  ],
});
