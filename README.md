# React + TypeScript + Vite Fork

This is a fork of the original **React + TypeScript + Vite** template. I’m using this repository to follow along with a Next.js/React course, making incremental commits for each lesson.

## Learning Goals

- Implement concepts from each lesson with separate commits.
- Gain hands-on experience with React, TypeScript, and Vite in a structured way.
- Experiment with ESLint configurations and best practices for production-ready applications.

## How to Run

1. Clone the repository:

```sh
   git clone https://github.com/V-HLLA/starter-rmtdev.git
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
 npm run dev
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
