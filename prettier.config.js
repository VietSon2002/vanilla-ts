// Configuration document: https://prettier.io/

/** @type {import('prettier').Config} */
export default {
  // Maximum width per line, beyond line breaks
  printWidth: 100,
  // Number of spaces per indent level
  tabWidth: 2,
  // Use semicolon at the end of statements
  semi: true,
  // Trailing comma
  trailingComma: "all",
  // Spaces between brackets in object literals { foo: bar }
  bracketSpacing: true,
  // Put > of multi-line HTML (HTML, JSX) elements at the end of the last line instead of on their own on the next line
  bracketSameLine: false,
  // Include brackets around the only arrow function parameter (avoid: omit brackets, always: do not omit brackets)
  arrowParens: "avoid",
  // Use lf for line breaks Optional values ​​auto|lf|crlf|cr
  endOfLine: "lf",
  // Indent lines with tabs instead of spaces
  useTabs: false,
  // Use single quotes instead of double quotes in JSX
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-attributes",
    "prettier-plugin-organize-imports",
  ],
};
