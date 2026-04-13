# Dating App

## Type of application

- Mobile app (Expo React Native)
- Backend API server (Node.js + Express)

## Technology stack

- Front-end: React Native, Expo, JavaScript, react-navigation, reanimated
- Backend: Node.js, Express, Supabase (auth + PostgREST), CORS
- Storage: Supabase database and secure local storage via `expo-secure-store`
- Android companion: Native Android folder for Expo build

## What currently works

- Login
- Tab navigation layout with `Home`, `Matches`, `Profile` in `app/(tabs)`
- Matches screen with profile viewing modal
- Contact information display with copy-to-clipboard functionality
- Auth flow with Bearer token middleware (`requireAuth`) on protected endpoints
- Client login/signup/logout via `DatingApp/util/api.js` and session in local storage
- Contact data management via server API
- Profile Creation input screen + backend
- Statistics page

## In progress



## Dependencies to install

- Frontend: `npm install` in `DatingApp/` (includes expo-clipboard for contact copying)
- Backend: `npm install` in `server/`

## Starting the application

1. **Frontend (Expo app)**:

   ```
   cd DatingApp
   npm run start
   ```

2. **Backend (Node.js server)**:

   ```
   cd server
   npm run watch
   ```

3. Run on Android/iOS/Web as needed via Expo CLI prompt options
