# Wazzupp

Wazzupp is a lightweight chat application built with React and Vite, using Firebase for authentication and Firestore for real‑time messaging. Styling is powered by Tailwind CSS.

## Features

- Email/password authentication (Firebase Auth)
- Real‑time chats backed by Firestore
- Chat list, message thread, and basic navigation
- Image or text messages supported by the message schema
- Responsive UI with Tailwind CSS

## Tech Stack

- React 19 + Vite 6
- Firebase 11 (Auth, Firestore)
- Tailwind CSS 4
- React Router 7
- React Icons

## Requirements

- Node.js 18+ and npm
- A Firebase project (Auth + Firestore enabled)

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create environment variables

Create a file named `.env.local` in the project root and add your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

These are read in `src/firebase/config.js` via `import.meta.env`.

3. Run the app

```bash
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start the Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

## Project Structure

```text
wazzupp/
  src/
    components/
      ChatBox.jsx
      ChatList.jsx
      Navbar.jsx
      NavLinks.jsx
      SearchModal.jsx
    pages/
      Login-2.jsx   # Sign-in
      Register.jsx  # Sign-up
    firebase/
      config.js     # Firebase init, helpers (listen/send)
    utils/
      formatTimeStamp.jsx
    assets/
    App.jsx
    main.jsx
    index.css
  public/
  index.html
  vite.config.js
  eslint.config.js
```

## Firebase Notes

- Enable Email/Password provider in Firebase Authentication.
- Create a Cloud Firestore database. The app expects collections:
  - `users`: basic user profile documents keyed by UID.
  - `chats/{chatId}/messages`: message subcollection per chat.
- The helper `sendMessage` and listeners are defined in `src/firebase/config.js`.

Example minimal Firestore rules for development (do not use in production as‑is):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## License

MIT © 2025
