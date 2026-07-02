# BrowseSense Technical Documentation

This document provides a comprehensive technical overview of the BrowseSense Chrome Extension, detailing its architecture, data flow, directory structure, and the purpose of each file within the codebase.

## 1. System Architecture & Overview

BrowseSense is a privacy-first Chrome Extension built with React, Vite, and Tailwind CSS. It operates entirely locally without any external servers. The architecture consists of three main parts:
1. **Background Service Worker (`extension/background.js`)**: Runs in the background, interacts with the Chrome History API, and stores normalized browsing data in local storage.
2. **Dashboard UI (`src/dashboard/`)**: A full-page React application providing deep analytics, visualizations (via Recharts), and reporting (via jsPDF).
3. **Popup UI (`src/popup/`)**: A lightweight React application that appears when clicking the extension icon, providing quick summaries and a link to the full dashboard.

## 2. Data Flow

1. **Data Collection**: 
   - Upon installation or on-demand, `background.js` uses `chrome.history.search` to fetch the user's browsing history from the last 14 days.
   - It normalizes the data (filtering missing URLs/titles, formatting timestamps).
2. **Storage**: 
   - The normalized data is saved to `chrome.storage.local` under the key `browsesense-history`.
3. **Data Retrieval (UI)**: 
   - React hooks (`src/hooks/useHistoryAnalytics.js`) call `src/services/historyService.js`.
   - The service fetches the cached data from `chrome.storage.local` or requests a refresh from the background worker via `chrome.runtime.sendMessage`.
4. **Data Processing**: 
   - The raw history array is passed through various utility functions in `src/utils/` (like `analytics.js`, `categoryEngine.js`, `score.js`) to aggregate metrics, classify websites into categories (Productivity, Entertainment, etc.), and calculate a productivity score.
5. **Presentation**: 
   - The processed insights are fed into React components (Cards, Charts) and rendered in the Dashboard or Popup UI.

## 3. Directory Structure

```text
BrowseSense/
├── extension/          # Chrome extension specific scripts (background worker)
├── icons/              # Extension icons (16x16, 48x48, 128x128)
├── scripts/            # Build and preparation scripts for Vite
├── src/                # React source code
│   ├── constants/      # Static configuration and definitions
│   ├── dashboard/      # Full-page dashboard React app
│   │   └── components/ # Reusable UI components for the dashboard
│   ├── hooks/          # Custom React hooks for state and data fetching
│   ├── popup/          # Extension popup React app
│   ├── services/       # Services interacting with Chrome APIs
│   └── utils/          # Business logic, data processing, and categorization
├── dashboard.html      # Entry HTML for the dashboard
├── index.html          # Entry HTML for the popup
├── manifest.json       # Chrome Extension manifest (V3)
├── package.json        # NPM dependencies and scripts
└── vite.config.js      # Vite build configuration
```

## 4. File-by-File Breakdown

### Project Root Files
- **`manifest.json`**: The Chrome Extension Manifest V3 file. Defines permissions (`history`, `storage`), the background service worker, icons, and the default popup (`index.html`).
- **`package.json`**: Contains the project metadata, scripts (`dev`, `build`), and dependencies (React, Recharts, jsPDF, Tailwind CSS, Vite).
- **`vite.config.js`**: Configuration for Vite, defining plugins (React) and build outputs.
- **`tailwind.config.js` & `postcss.config.js`**: Configuration for Tailwind CSS styling.
- **`dashboard.html`**: The HTML entry point for the full-page dashboard UI, loading `/src/dashboard/main.jsx`.
- **`index.html`**: The HTML entry point for the extension popup UI, loading `/src/popup/main.jsx`.
- **`README.md`**: Project documentation, features, tech stack, and setup instructions.

### Extension Scripts (`extension/`)
- **`background.js`**: The service worker. Contains `collectHistory()` which fetches up to 14 days of Chrome history, normalizes it, and saves it to `chrome.storage.local`. It listens for messages (`refresh-history`, `get-history`) from the UI to serve or refresh data.

### Build Scripts (`scripts/`)
- **`prepare-extension.js`**: A Node.js script executed after the Vite build process to correctly format the `dist` folder for the Chrome Web Store (e.g., copying manifest, icons, etc.).

### Source Code (`src/`)

#### 1. Constants (`src/constants/`)
- **`categories.js`**: Defines the static mappings of domain names to specific categories (e.g., `github.com` -> `Learning`, `netflix.com` -> `Entertainment`).

#### 2. Services (`src/services/`)
- **`historyService.js`**: Provides an abstraction layer over Chrome APIs. Contains functions like `loadHistoryFromStorage()` and `refreshHistory()` to fetch data for the React frontend.

#### 3. Utilities (`src/utils/`)
- **`analytics.js`**: Contains functions to process raw history data into actionable insights (e.g., calculating top sites, time spent).
- **`categoryEngine.js`**: The heuristic engine that matches a given URL/domain to a category defined in `categories.js`.
- **`score.js`**: Algorithm to calculate the user's Productivity Score out of 100 based on the ratio of productive vs. distracting websites visited.
- **`insights.js`**: Aggregates processed data to generate summary text or specific data points for the dashboard cards.
- **`youtubeClassifier.js`**: Specialized logic to categorize specific YouTube URLs (e.g., distinguishing between educational videos and entertainment based on URL patterns or titles).
- **`urlUtils.js`**: Helper functions to parse URLs, extract domains, and format links safely.
- **`exporters.js`**: Logic utilizing `jsPDF` and `jsPDF-AutoTable` to generate and download the PDF reports of the user's browsing activity.

#### 4. Custom Hooks (`src/hooks/`)
- **`useHistoryAnalytics.js`**: The primary hook that fetches history data via `historyService.js`, passes it through the utility functions, and exposes the processed data (score, categories, top sites) to React components.
- **`useAnalytics.js`**: A secondary or wrapper hook managing local UI state related to the analytics data (loading states, error handling).

#### 5. Dashboard App (`src/dashboard/`)
- **`main.jsx`**: The React entry point for the Dashboard. Mounts `DashboardApp` to the DOM.
- **`DashboardApp.jsx`**: The main layout component for the dashboard. Orchestrates the grid layout and renders the various cards using data from `useHistoryAnalytics`.
- **`components/layout/`**: Contains structural components (e.g., `DashboardSection.jsx`) to organize the dashboard grid.
- **`components/cards/`**: Contains individual visual widgets:
  - `ActivityCard.jsx`: Shows high-level activity metrics.
  - `TimelineCard.jsx`: Renders the Recharts timeline/hourly distribution graph.
- **`components/ui/`**: Reusable atomic UI elements (e.g., `Button.jsx`, Inputs, Modals).

#### 6. Popup App (`src/popup/`)
- **`main.jsx`**: The React entry point for the Popup. Mounts `PopupApp` to the DOM.
- **`PopupApp.jsx`**: The main component for the popup window. Displays a condensed view of the day's stats, the productivity score, and a button to open the full dashboard.

#### 7. Styles
- **`index.css`**: The main stylesheet importing Tailwind directives and defining global CSS variables (including the custom pastel color palette mentioned in the README).

## 5. Technology Stack Summary
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Custom Pastel Palette)
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: jsPDF + jsPDF-AutoTable
- **Environment**: Chrome Extension APIs (`chrome.history`, `chrome.storage`, `chrome.runtime`)
