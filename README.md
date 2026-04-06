# Dating App

## Type of application

- Mobile app (Expo React Native)
- Backend API server (Node.js + Express)

## Technology stack

- Front-end: React Native, Expo, JavaScript, react-navigation, reanimated
- Backend: Node.js, Express, Supabase (auth + PostgREST), CORS
- Storage: Supabase database and secure local storage via `expo-secure-store`
- Android companion: Native Android folder for Expo build

## What currently works (code submission checkpoint)

- UI for login, Nav-bar

- API routes implemented: `/helloworld`, `/interests`, `/sign_up`, `/login`, `/logout`, `/user_data`
- Auth flow with Bearer token middleware (`requireAuth`) on protected endpoints
- Client login/signup/logout via `DatingApp/util/api.js` and session in local storage
- Tab navigation layout with `Home`, `Matches`, `Profile` in `app/(tabs)`

## In progress

- Profile Creation input screen + backend
- Matches screen + backend

## Additional comments

- Starting the program and server.
- ```
    cd DatingApp
    npm run start
  ```
  ```
    cd server
    npm run watch
  ```
