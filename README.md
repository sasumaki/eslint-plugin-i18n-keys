# eslint-plugin-i18n-keys

ESLint plugin for internationalization (i18n) best practices, focusing on translation key conventions.

## Installation

```bash
npm install eslint-plugin-i18n-keys --save-dev
```

## Usage

Add `i18n-keys` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["i18n-keys"]
}
```

Then configure the rules you want to use under the rules section:

```json
{
  "rules": {
    "i18n-keys/no-special-characters-in-keys": "error"
  }
}
```

### Using Recommended Configuration

You can use the recommended configuration which includes all the best practices:

```json
{
  "extends": ["plugin:i18n-keys/recommended"]
}
```

## Rules

### no-special-characters-in-keys

This rule prevents the use of special characters in i18n translation keys. Special characters like periods, quotes, colons, commas, and at symbols can cause issues with various i18n libraries and make keys harder to work with.

#### Examples

**Incorrect**:

```javascript
t("this.is.a.bad.key");
t("key:with:colon");
t("key,with,comma");
t("key@with@at");
t('key with "quotes"');
```

**Correct**:

```javascript
t("this_is_a_good_key");
t("key with spaces");
t("key-with-dashes");
```

#### Options

This rule has no options.

## License

MIT
