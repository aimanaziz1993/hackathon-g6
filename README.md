# VECTOR AI | Wealth Architecture Engine

![Vector AI Banner](https://placehold.co/1200x400/050505/10B981?text=VECTOR+AI)

> **"Don't just track your spending. Architect your wealth."**

**Vector AI** is an intelligent financial strategist designed for the Malaysian market. It moves beyond simple budgeting apps by acting as a **Senior Certified Financial Planner (CFP)** in your pocket. 

Powered by **Google Gemini**, it analyzes your messy financial data (credit cards, loans, salary) and constructs a mathematically precise, 10-year roadmap to achieve your goals—whether that's buying a house, killing debt, or retiring early.

---

## 🚀 Key Features

### 🧠 Context-Aware AI Analysis
Vector doesn't just do math; it understands **psychology**. It diagnoses behavioral traps like "Lifestyle Creep" or "Sandwich Generation" pressure and offers "Tough Love" advice.

### 🇲🇾 Localized for Malaysia
Vector speaks your language—literally and financially.
*   **Dual Language:** Seamless switching between **English** and **Bahasa Melayu**.
*   **Cultural Context:** Understands EPF, SOCSO, ASB, Tabung Haji, and OPR rates.
*   **Local Personas:**
    *   *The High Earner* (Elit Metropolitan)
    *   *Fresh Grad* (Perintis Aspirasi)
    *   *Family Man* (Nakhoda Legasi)

### 🎙️ "Brain Dump" Voice Input
Hate filling out forms? Just click the microphone and **vent**.
> *"I earn RM5k but I have 3 credit cards maxed out and I want to get married next year."*
Vector parses your voice into structured data instantly.

### 📊 Dynamic Visual Roadmaps
Automatically generates **Gantt Charts** (via Mermaid.js) to visualize your 5-10 year timeline for debt clearance and asset acquisition.

### 🛡️ Privacy First
*   **Stealth Mode:** One-click blur for sensitive numbers (safe for use in public).
*   **Client-Side Processing:** Your voice and text are sent directly to Gemini via API; we do not store your personal data on our servers.

---

## 🛠️ Tech Stack

*   **Frontend:** React + Vite
*   **AI Engine:** Google Gemini API (`gemini-1.5-flash`, `gemini-1.5-pro`)
*   **Styling:** Tailwind CSS + Custom Animations
*   **Visualization:** Mermaid.js
*   **Icons:** Lucide React
*   **Speech:** Web Speech API (Native Browser Support)

---

## ⚡ Getting Started

### Prerequisites
1.  **Node.js** (v16 or higher)
2.  A **Google Gemini API Key** (Get it free [here](https://aistudio.google.com/app/apikey))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/vector-ai.git
    cd vector-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory:
    ```bash
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the App**
    ```bash
    npm run dev
    ```
    Open your browser at `http://localhost:5173`.

---

## 📖 How to Use

1.  **Select a Persona (Optional):** Click on a preset like "The High Earner" to load a demo scenario instantly.
2.  **Input Your Data:**
    *   Type or Speak into the "Brain Dump" area.
    *   Add Context Tags (e.g., "Wedding Soon", "Bad Debt").
3.  **Choose Your Goal:** Select from Property Wealth, Debt Clearance, or FIRE.
4.  **Click Analyze:** Watch as Vector AI parses your data, runs DSR simulations, and builds your roadmap.
5.  **View Strategy:**
    *   Check the **Executive Summary** for immediate insights.
    *   Review the **Action Plan** (Critical, Warning, Info).
    *   Scroll through the **Strategic Timeline** to see your future milestones.

---

## 🌍 Localization (English / Bahasa Melayu)

Click the **ENG / BM** toggle in the header.
Vector adapts its personality:
*   **English:** Acts as a corporate Financial Strategist.
*   **Malay:** Acts as a trusted *Perancang Kewangan*, using terms like *"Wang Kecemasan"* and *"Hutang Jahat"* naturally.

---

## ⚠️ Disclaimer

**Vector AI is a prototype financial simulation tool.**
While it uses professional financial logic (DSR, Liquidity Ratios), the advice generated is based on AI interpretation and should not be considered binding financial advice. Always consult with a licensed financial planner before making major investment decisions.

---

### Hackathon Group G6
*Project created for the 2026 Innovation Hackathon.*