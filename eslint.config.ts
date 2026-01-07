// @ts-ignore
import js from "@eslint/js";
// @ts-ignore
import globals from "globals";
import tseslint from "typescript-eslint";
// @ts-ignore
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
// @ts-ignore
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
]);
