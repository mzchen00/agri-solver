# AgriSolver: Smart Farming Assistant

## Problem Statement

Access to concise, actionable farming information is difficult, especially in resource-limited settings or areas with intermittent internet connectivity. 

Farmers need readily available guidance on crop cultivation and quick identification of potential plant health issues to maximize yield and prevent losses.

## Solution Overview

AgriSolver is a lightweight web application designed to provide farmers with essential agricultural information. It combines AI-powered summarization for grow/plant instructions, offering offline capabilities for core information retrieval.

## Features

1.  **Plant Instruction Summarization:**
    *   Input a plant name (e.g., "tomato", "eggplant").
    *   Leverages the Perplexity AI API <mcreference link="https://docs.perplexity.ai/api-reference/chat-completions" index="0">0</mcreference> to generate concise growing/planting instructions.
    *   Caches search results in a local SQLite database, allowing access to previously searched information even without an internet connection.

2.  **Australian good agriculture example:**
    *  Use Australia blueberry 40 year history to inspire farming decisions.

## Tech Stack

*   **Frontend:** React (Vite)
*   **Backend:** Node.js, Express.js
*   **Database:** SQLite
*   **AI Services:**
    *   Perplexity AI API (for summarization)

### Prerequisites

*   Node.js and npm installed
*   API Keys for Perplexity AI and Google Gemini (Store in `backend/.env`)

### Backend Setup

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install` (this will now include `axios`)
3.  Create a `.env` file in the `backend` directory and add your API keys:
    ```dotenv
    PERPLEXITY_API_KEY=your_perplexity_api_key
    ```
4.  Start the backend server for development: `npm run dev`. This will automatically create the `agrisolver.db` file if it doesn't exist.
5.  Start the backend server for production: `npm start`

### Frontend Setup

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the frontend development server: `npm run dev`
4.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## API Keys

Ensure you have obtained API keys from Perplexity AI and Google Cloud (for Gemini API). Store these securely in the `.env` file in the backend directory. **Do not commit the `.env` file to version control.**

## Future Considerations

*   **Deployment:** Containerize using Docker for easy deployment.
*   **Scalability:** Evaluate database alternatives for larger scale (e.g., PostgreSQL).
*   **Offline Enhancements:** Explore ways to make the image recognition model available offline (potentially using smaller, on-device models if feasible).
*   **User Management:** Add user accounts to save preferences and plans.