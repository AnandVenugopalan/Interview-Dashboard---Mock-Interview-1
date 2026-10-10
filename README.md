# 🚀 PrepPulse — Interview Practice Tracker

> A responsive, high-performance web dashboard built to track weekly technical interview preparation across **Data Structures & Algorithms (DSA)**, **System Design / Technical**, **Git Version Control**, **Machine Coding Challenges**, and **CS Fundamentals**.

---

## 🌟 Overview & Features

**PrepPulse** empowers candidates to structure their weekly interview preparation with clear metrics, category breakdowns, visual progress indicators, and instant persistence.

### Key Capabilities

1. **📊 Dashboard Overview Metrics**
   - **Total Questions**: Real-time count of tracked items.
   - **Completed DSA Problems**: Dedicated tracking for LeetCode / Algorithmic questions.
   - **Completed Technical Questions**: Coverage tracking for System Design, CS Fundamentals, and Git concepts.
   - **Machine Coding Status**: Track active, in-progress, and completed frontend/full-stack machine-coding challenges.
   - **Visual Completion Percentage**: Global progress bar and customizable **Weekly Goal Target** (with celebration confetti!).

2. **📝 Question Tracker & CRUD**
   - Add new practice items with Title, Category, Difficulty (`Easy`, `Medium`, `Hard`), Status (`Pending`, `In Progress`, `Completed`), Practice URL, Notes, Tags, and Time Spent.
   - **1-Click Quick Status Cycling**: Easily cycle through `Pending ➔ In Progress ➔ Completed` directly from question cards.
   - **Notes & Key Learnings Drawer**: Expandable notes section for time/space complexity notes, edge cases, and code snippets.
   - **Star for Revision**: Bookmark questions for quick review before mock interviews.

3. **🔍 Instant Search, Filtering & Sorting**
   - **Search Bar**: Live search matching title, tags, or notes text.
   - **Category Filters**: Filter by `DSA`, `Git`, `Technical`, `Machine Coding`, or `CS Fundamentals`.
   - **Status & Difficulty Filters**: Filter by completion status or difficulty level.
   - **Starred Filter**: View only bookmarked revision questions.
   - **Sorting**: Sort by Date Added (Newest/Oldest), Difficulty (Easy to Hard / Hard to Easy), or Title (A-Z).
   - **Quick Category Pills**: One-click category filter pills with live item counts.

4. **💾 LocalStorage Persistence & Data Management**
   - **Automatic Persistence**: All questions and goal configurations automatically persist in browser `localStorage`.
   - **Pre-populated Sample Data**: Ships with realistic sample data on initial load.
   - **Export & Import JSON**: Download full backups as JSON files and restore them anytime.
   - **Reset Everything**: One-click dataset reset with double-confirmation dialog.

5. **🎨 Responsive UI & Modern Aesthetics**
   - Built with modern glassmorphism styling, clean dark-mode palette, glowing indicators, and smooth micro-animations.
   - Fully responsive desktop and mobile layout with accessible interactive controls.

6. **⚠️ Form Validation & User Experience**
   - Strict field validation (Title required with length bounds, valid URL verification).
   - Non-intrusive Toast Notifications for user actions (Success, Info, Warnings, Errors).
   - Explicit empty states and no-search-results states with quick reset actions.

---

## 🛠️ Stack & Architecture

- **Frontend**: React 18 (TypeScript)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v3 with glassmorphism utility classes & custom CSS design system
- **Icons**: Lucide React (`lucide-react`)
- **Animation / FX**: `canvas-confetti` for milestone celebrations

---

## 🚀 Quick Setup & Local Execution

### Prerequisites
- Node.js (`v18.x` or higher recommended)
- npm or yarn

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd "Interview Dashboard"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled bundle will be generated in the `dist/` directory.

---

## 💡 Assumptions & Design Decisions

1. **First-Load Experience**: When a candidate opens the dashboard for the first time without pre-existing data, the app populates 10 realistic sample questions across DSA, System Design, Git, and Machine Coding so the dashboard looks populated and functional right away.
2. **Weekly Target Goal**: Default weekly target is set to 12 completed questions, which can be modified directly via the "Set Target" modal.
3. **Category Definitions**:
   - `DSA`: Algorithmic & Data Structure problems.
   - `Git`: Version control CLI, rebase, branch workflows.
   - `Technical`: System design, web APIs, architecture.
   - `Machine Coding`: Component building, DOM manipulation, state architecture.
   - `CS Fundamentals`: Event loop, OOP, networking, database concepts.
