# Turborepo starter

This Turborepo starter.

- [x] Backend Setup
- [x] Frontend Setup
- [x] Make FE repo able to test API calling locally using Firebase Emulator if I  run npm run build && firebase emulators:start --only functions on BE repo
- [x] Monorepo setup via Turborepo https://turbo.build/
- [x] Firebase Sort using composite index

[Preview video](https://drive.google.com/file/d/11DhBPrdNe7wb740Knqp8FAfdrew7P9-k/view?usp=drive_link)


## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `frontend`: a [Next.js](https://nextjs.org/) app
- `backend`:  a [Express.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `frontend` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```
