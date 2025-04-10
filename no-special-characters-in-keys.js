/**
 * @fileoverview Rule to prevent trailing/leading dots or dots with whitespace in i18n translation keys
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
      description: "Disallow trailing/leading dots or dots with whitespace in i18n translation keys",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [], // no options
    messages: {
      noSpecialCharacters: "Translation key should not contain trailing/leading dots or dots with whitespace.",
    },
  },

  create(context) {
    /**
     * Check if a string literal contains trailing/leading dots or dots with whitespace
     * @param {ASTNode} node - The string literal node
     * @returns {boolean} True if the string contains trailing/leading dots or dots with whitespace
     */
    function hasInvalidCharacters(node) {
      const value = node.value;
      
      // Check for trailing/leading dots
      if (value.startsWith('.') || value.endsWith('.')) {
        return true;
      }
      
      // Check for dots with trailing/leading whitespace
      if (/\s+\.|\.\s+/.test(value)) {
        return true;
      }
      
      return false;
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
          if (hasInvalidCharacters(firstArg)) {
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
