import js from "@eslint/js";
import nextPlugin from "eslint-config-next";
import prettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import { configs as tseslintConfigs } from "typescript-eslint";

const eslintConfig = [
  js.configs.recommended,
  ...tseslintConfigs.recommended,
  ...nextPlugin,
  perfectionist.configs["recommended-natural"],
  prettier,

  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
    rules: {
      "perfectionist/sort-imports": ["warn"]
    }
  }
];

export default eslintConfig;
