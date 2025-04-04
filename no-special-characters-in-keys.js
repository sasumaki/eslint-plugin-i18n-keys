/**
 * @fileoverview Rule to prevent special characters in i18n translation keys
 * @author
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow special characters in i18n translation keys",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [], // no options
    messages: {
      noSpecialCharacters: "Translation key should not contain special characters like '.', ':', '@', etc.",
    },
  },

  create(context) {
    // Special characters to check for
    const specialCharacters = /[.:@]/;

    /**
     * Check if a string literal contains special characters
     * @param {ASTNode} node - The string literal node
     * @returns {boolean} True if the string contains special characters
     */
    function hasSpecialCharacters(node) {
      return specialCharacters.test(node.value);
    }

    /**
     * Check if a node is a translation function call
     * @param {ASTNode} node - The call expression node
     * @returns {boolean} True if the node is a translation function call
     */
    function isTranslationCall(node) {
      // Check if it's a function call
      if (node.type !== "CallExpression") {
        return false;
      }

      // Check if the callee is an identifier (e.g., t, translate, i18n)
      if (node.callee.type === "Identifier") {
        const functionName = node.callee.name;
        return ["t", "translate", "i18n"].includes(functionName);
      }

      // Check if the callee is a member expression (e.g., i18n.t)
      if (node.callee.type === "MemberExpression") {
        const propertyName = node.callee.property.name;
        return ["t", "translate"].includes(propertyName);
      }

      return false;
    }

    return {
      CallExpression(node) {
        if (!isTranslationCall(node)) {
          return;
        }

        const firstArg = node.arguments[0];
        if (firstArg && firstArg.type === "Literal" && typeof firstArg.value === "string") {
          if (hasSpecialCharacters(firstArg)) {
            context.report({
              node: firstArg,
              messageId: "noSpecialCharacters",
            });
          }
        }
      },
    };
  },
};
