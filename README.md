# BrandCraft — Local Development Guide

This repository is a Vite + React + TypeScript app for generating brand identities. It includes a local/mock AI client so features still work in development without external AI keys.

Quick start (Windows PowerShell)

1. Install Node.js (>=18) and dependencies:

```powershell
# from repository root
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Open http://localhost:8082/ (Vite may pick a different port).

Features to test
- Click "Get Started" in the navbar to open the AI Brand Generator.
- Enter a brand idea and select an industry from the dropdown.
- Optionally pick preferred colors (color swatches show and friendly color names are displayed).
- Click "Generate Brand Identity" and view generated names, tagline, mission, color palette (friendly names + hex), logo concepts, and elevator pitch.

Enabling real AI generation
- To call the server-side Supabase Edge Function `generate-brand`, set the following env vars in your local environment or deploy the Supabase function with the appropriate environment:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_PUBLISHABLE_KEY
  - (On the Supabase function) BRANDCRAFT_API_KEY to enable third-party AI

Feedback & email
- To enable real email sending from the `send-feedback` function, set `SENDGRID_API_KEY` and `TO_EMAIL` in the function's environment.

Useful commands
- Build for production: `npm run build`
- Run tests: `npm run test` (vitest)

Preparing for GitHub
- Ensure `node_modules/` is in `.gitignore` (default). Commit the repository root including source and `README.md`.
- Before pushing, run `npm run build` to verify the production build completes.

If you want, I can create a sample GitHub Actions workflow to run `npm ci && npm run build && npm run test` on push to `main`.
# Welcome to your BrandCraft project

## Project info

**URL**: Replace with your BrandCraft deployment URL or local dev URL

## How can I edit this code?

There are several ways of editing your application.

You can edit and iterate on this project locally or deploy to your preferred host.

Changes made locally can be pushed to your remote repository or deployed via your chosen platform.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will be reflected in your repository or deployment pipeline.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Build the production assets and deploy the `dist` folder to any static host.

Example (build & preview locally):

```powershell
npm run build
npm run preview -- --port 5173
```

## Custom domain and hosting

You can deploy to Vercel, Netlify, or any static hosting that serves the built `dist` folder.

## Serverless functions / API keys

This project includes Supabase Edge Functions used to power AI generation and feedback emailing.

Environment variables you should set for production (Supabase function settings or your host):

- `BRANDCRAFT_API_KEY` — API key used by the AI gateway (set this to the provider key you use).
- `SENDGRID_API_KEY` — (optional) SendGrid API key used by the `send-feedback` function to deliver emails.
- `TO_EMAIL` — email address that should receive feedback (defaults to `narasimhanaidu2728@gmail.com`, but you can override via this env var).

Notes:
- The `generate-brand` function expects `BRANDCRAFT_API_KEY` to be set. If you use a different AI gateway, update the function accordingly.
- The `send-feedback` function uses the SendGrid Web API. If you prefer another email provider, replace the implementation in `supabase/functions/send-feedback/index.ts`.
