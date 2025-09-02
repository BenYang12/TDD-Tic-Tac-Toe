import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    env: { node: true, jest: true },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
]);
