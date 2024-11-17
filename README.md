# README: Running the Expo App and Backend Locally

This repository contains two folders:

1. **`my-app`**: The frontend Expo project.
2. **`backend`**: The backend Node.js project.

Follow these steps to set up and run both the Expo app and the backend locally.

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Expo CLI**: Install globally using `npm install -g expo-cli`
- **Xcode** (for iOS builds): Ensure you have Xcode and the iOS Simulator installed.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

#### For the Expo App (`my-app`)

```bash
cd my-app
npm install
```

#### For the Backend (`backend`)

```bash
cd ../backend
npm install
```

---

## Running the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Start the backend in development mode:
   ```bash
   npm run dev
   ```
3. The backend should now be running on the specified port (check the `backend` configuration, e.g., `http://localhost:3000`).

---

## Running the Expo App

1. Navigate to the `my-app` folder:
   ```bash
   cd my-app
   ```
2. Build the app:
   ```bash
   npx expo prebuild --clean
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
3. Choose the platform:
   - **iOS**: Press `i` to launch the iOS Simulator (requires Xcode).
   - **Android**: Press `a` to launch on an Android emulator (requires Android Studio).
   - **Web**: Press `w` to open in a web browser.

4. Ensure the app is running in **development mode**

---