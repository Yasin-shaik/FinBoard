# FinBoard - Customizable Financial Dashboard

![FinBoard Banner](./finboard/public/Dashboard.png)

> **FinBoard** is a dynamic, highly customizable financial dashboard builder. It allows users to fetch real-time data from any public API, visualize it using Cards, Tables, or Charts, and organize their workspace with a drag-and-drop grid system.

## 🚀 Live Demo & Links

-   **🌐 Live Deployment:** *[Groww_Finboard](https://fin-board-cyan.vercel.app/)*
-   **🎥 Demo Video:** *[Groww_Finboard_Demo](https://drive.google.com/file/d/1HjZI8xliY78f8lTzwlFtUMBF3CSZ6p6t/view?usp=sharing)*

---

## ✨ Key Features

### 1. 🏗️ Dynamic Widget Layout
-   **Drag & Drop:** Powered by `react-grid-layout`, widgets can be moved and resized freely.
-   **Responsive:** Automatically switches to a vertical stack on mobile devices.
-   **Persistence:** Layouts and configurations are saved to `localStorage`, restoring your workspace exactly as you left it upon refresh.

### 2. 🔌 Universal API Integration
-   **Any JSON API:** Connect to any public REST API (e.g., CoinGecko, Binance, Weather API).
-   **JSON Explorer:** A recursive tree-view explorer allows you to inspect raw API responses and "click-to-select" specific data fields without writing code.
-   **Auto-Refresh:** Configurable refresh intervals per widget (e.g., update price every 10 seconds).

### 3. 📊 Versatile Visualization
-   **Cards:** Display single metrics (e.g., Bitcoin Price) with trend indicators (📈/📉).
-   **Data Tables:** Render arrays of data with built-in client-side **search**, **sorting**, and **pagination**.
-   **Charts:** Visualize historical data using Line or Bar charts with `recharts`. Features automatic date formatting and auto-scaling Y-axes.

### 4. ⚙️ robust Configuration
-   **Edit Mode:** modify existing widgets without losing their position.
-   **Export/Import:** Backup your entire dashboard configuration to a `.json` file and restore it on another device.
-   **Error Handling:** Graceful handling of API errors (like 429 Rate Limits) with toast notifications.

### 5. 🎨 UI/UX Polish
-   **Dark Mode:** Built-in theme toggle (Light/Dark) using `next-themes` and Tailwind CSS.
-   **Responsive Sidebar:** Collapsible navigation with quick access to configuration tools.
-   **Modern Design:** Clean, accessible UI built with Tailwind CSS and Lucide Icons.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Grid System:** [React-Grid-Layout](https://github.com/react-grid-layout/react-grid-layout)
-   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
-   **Charts:** [Recharts](https://recharts.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## ⚡ Getting Started

Follow these instructions to run the project locally.

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone "https://github.com/Yasin-shaik/FinBoard"
    cd finboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:3000` to see the application.

---

## 📖 Usage Guide

### Adding a Widget
1.  Click the **"Add Widget"** button in the sidebar or top header.
2.  **Name** your widget (e.g., "BTC Price").
3.  Enter a valid **API Endpoint** (e.g., `https://api.coingecko.com/api/v3/coins/bitcoin`).
4.  Click **"Test"** to fetch the data.
5.  Use the **Response Explorer** to select data:
    -   *For Cards:* Click a value (e.g., `current_price.usd`).
    -   *For Tables:* Click the "Select" button next to an array (e.g., `tickers`).
    -   *For Charts:* Click the timestamp field first, then the value field.
6.  Choose a **Display Mode** (Card, Table, or Chart).
7.  Click **Save**.

### Managing the Grid
-   **Move:** Click and hold the header of any widget to drag it.
-   **Resize:** Grab the bottom-right corner of a widget to resize it.
-   **Edit:** Click the Pencil icon ✏️ on a widget to change its API or settings.
-   **Delete:** Click the Trash icon 🗑️ to remove it.

### Backup & Restore
1.  Go to the Sidebar.
2.  Click **"Export Config"** to download your current setup as `finboard-backup.json`.
3.  To restore, click **"Import Config"** and select your backup file.

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── dashboard/        # Widget specific components (Grid, Card, Table, Chart)
├── hooks/                # Custom hooks (useFetchData)
├── store/                # Redux slices and middleware
├── types/                # TypeScript interfaces
└── utils/                # Helpers (api.ts, backup.ts, processChartData.ts)
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any features or bug fixes.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---


*Built with ❤️ for the Groww Financial Dashboard Assignment.*