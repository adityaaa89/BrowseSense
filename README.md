# BrowseSense ⚡

BrowseSense is a beautifully designed, privacy-first Chrome Extension that provides deep, actionable analytics on your browsing habits. Built with modern web technologies, it runs entirely locally on your machine—ensuring your data never leaves your browser.

## 🌟 Features

- **Intelligent Categorization:** Automatically groups your visited websites into smart categories like Productivity, Entertainment, Shopping, Learning, Finance, and more using an advanced heuristic engine.
- **Productivity Scoring:** Analyzes your habits and assigns a real-time Productivity Score out of 100 based on the time you spend on productive vs. distracting sites.
- **Comprehensive Dashboard:** A stunning, responsive dashboard built with CSS Grid, featuring a beautiful pastel color palette, micro-animations, and seamless navigation.
- **Detailed Insights:** View hourly timelines, top 10 websites, category distributions, and daily peaks.
- **Daily History Modal:** View a complete, scrollable timeline of your entire day's browsing activity.
- **PDF Export:** Generate and download colorful, highly-structured PDF reports of your browsing analytics with a single click.
- **100% Private:** No external servers, no tracking, no data collection. Everything is processed and stored locally via the Chrome History API.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Custom Pastel Palette)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **PDF Generation:** jsPDF + jsPDF-AutoTable
- **Build Tooling:** Node.js

## 🚀 Installation & Setup

Because this is a Chrome Extension built with Vite, you will need to build the project before loading it into your browser.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Clone the repository, open the terminal in the project directory, and run:
```bash
npm install
```

### 3. Build the Extension
To compile the React app and prepare the extension assets, run:
```bash
npm run build
```
*This command bundles the application and outputs it to the `dist/` folder.*

### 4. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Turn on **Developer mode** using the toggle switch in the top right corner.
3. Click the **Load unpacked** button.
4. Select the `dist/` folder inside your BrowseSense project directory.

🎉 **That's it!** The BrowseSense extension is now installed. Click on the extension icon in your toolbar to open your personal dashboard.

## 💻 Local Development

If you want to modify the dashboard UI and preview your changes without reloading the extension in Chrome, you can run the local development server:

```bash
npm run dev
```

This will spin up a local Vite server. Note: The Chrome History API is not available outside of an extension context, so the local server will use mock data for the dashboard layout.

## 🎨 Color Palette Reference

BrowseSense utilizes a custom pastel-themed palette for a modern, sleek look:
- **Primary / Accents:** `#9FA1FF` (Soft Purple/Blue)
- **Secondary / Hover States:** `#B5BAFF` (Light Purple/Blue)
- **Background Tints:** `#AEE2FF` (Sky Blue) & `#D9F9DF` (Mint Green)
- **Text Defaults:** `#2F3A44` (Dark Slate) & `#6D7B87` (Muted Slate)

## 📝 License

This project is licensed under the MIT License.
