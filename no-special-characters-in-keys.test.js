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
    "t('valid key')",
    "t('another valid key')",
    "t('key with spaces')",
    "t('key_with_underscores')",
    "t('key-with-dashes')",
    
    "t('key.with.period')",
    "t('key:with:colon')",
    "t('key@with@at')",
    
    "translate('valid key')",
    "i18n('valid key')",
    "i18n.t('valid key')",
    
    "t(someVariable)",
    "t(123)",
    "t(true)",
    
    // Non-translation function calls should not trigger the rule
    "someOtherFunction('with.special.characters')",
    "console.log('with.special.characters')",
  ],
  invalid: [
    {
      code: "t('.key')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    {
      code: "t('key.')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    {
      code: "t(',key')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    {
      code: "t('key,')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    {
      code: "t('key , with space')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
        code: "t('key . with space')",
        errors: [{ messageId: "noSpecialCharacters" }],
      },
    {
      code: "t('key, with space')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
      code: "t('key ,with space')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    
    {
      code: "translate('.key')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
      code: "i18n('key,')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
      code: "i18n.t('key , with space')",
      errors: [{ messageId: "noSpecialCharacters" }],
    },
    {
        code: "i18n.t('key . with space')",
        errors: [{ messageId: "noSpecialCharacters" }],
      },
  ],
});
