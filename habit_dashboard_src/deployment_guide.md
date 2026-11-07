# Deployment & Usage Guide

## 1. Hosting (Free Option)
The best free option to host this site is **GitHub Pages**.

1.  Create a new repository on GitHub (e.g., `habit-tracker`).
2.  Upload `index.html`, `styles.css`, `app.js`, and the image assets (`header_day.png`, `header_night.png`).
3.  Go to **Settings** > **Pages**.
4.  Select the `main` branch as the source.
5.  Click **Save**. Your site will be live at `https://your-username.github.io/habit-tracker`.

## 2. Using on Mobile
This application is fully responsive. To use it like a native app:

1.  Open the website in Chrome (Android) or Safari (iOS).
2.  Tap the **Share** button (iOS) or **Menu** button (Android).
3.  Select **"Add to Home Screen"**.
4.  It will appear as an app icon on your phone!

## 3. Lifelong Tracking & Data
**"What about next month?"**
*   The app automatically detects the current month from your device's date.
*   On the 1st of next month, the "Consistency Matrix" will automatically update to show the new days.
*   Your past data is safe in the browser's storage.

**Backing Up Data**
*   I have added an **"Export Data"** button in "The Archive" section.
*   Click it to download a `.csv` file of all your history.
*   Do this once a month to keep a permanent backup of your file-long progress!

## 4. Multi-User Questions
**"Can multiple people use it if I deploy to GitHub?"**
*   **Yes, but separately.**
*   The data is stored in **Local Storage** (on the user's specific device/browser).
*   If you share the link with 10 friends, **each friend will see their OWN data**. They will not see your data, and you will not see theirs.
*   It works like a private app for everyone who opens the link.
