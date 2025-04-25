# AgriSolver: Smart Farming Assistant

## Hackathon Context

This project is developed for the hackathon focused on building agriculture-related products. We are embracing the 'On-theme' prompt by taking a humanitarian angle, aiming to create an easily deployable and scalable app suitable for regions facing food scarcity, assisting local populations, relief workers, and other relevant parties.

## Problem Statement

Access to concise, actionable farming information and timely disease diagnosis can be challenging, especially in resource-limited settings or areas with intermittent internet connectivity. Farmers need readily available guidance on crop cultivation and quick identification of potential plant health issues to maximize yield and prevent losses.

## Solution Overview

AgriSolver is a lightweight web application designed to provide farmers with essential agricultural information. It combines AI-powered summarization for crop instructions with image recognition for plant disease detection, offering offline capabilities for core information retrieval.

## Features

1.  **Plant Instruction Summarization:**
    *   Input a plant name (e.g., "tomato", "eggplant").
    *   Leverages the Perplexity AI API <mcreference link="https://docs.perplexity.ai/api-reference/chat-completions" index="0">0</mcreference> to generate concise growing/planting instructions.
    *   Caches search results in a local SQLite database, allowing access to previously searched information even without an internet connection.

2.  **Unhealthy Plant Recognition & Planning:**
    *   Upload an image of a potentially unhealthy plant.
    *   Utilizes the Google Gemini API for image recognition to identify possible diseases or issues.
    *   If a problem is detected, the API generates a suggested monthly action plan for treatment.
    *   The frontend stores and displays this plan. (Requires internet connectivity).

## Tech Stack

*   **Frontend:** React (Vite)
*   **Backend:** Node.js, Express.js
*   **Database:** SQLite
*   **AI Services:**
    *   Perplexity AI API (for summarization)
    *   Google Gemini API (for image recognition and planning)

## Project Status (as of [Current Date/Time])

*   **DONE:** Basic README outlining project goals and tech stack.
*   **DONE:** Set up basic API endpoint structure in the backend (`/api/instructions/:plantName`, `/api/diagnose`).
*   **DONE:** Added CORS and dotenv to backend.
*   **DONE:** Created frontend project structure (React/Vite).
*   **DONE:** Implemented basic UI in frontend (<mcfile name="App.jsx" path="/Users/minzhe/Desktop/work-React/agri-solver/frontend/src/App.jsx"></mcfile>) for instruction search and diagnosis placeholder.
*   **DONE:** Added basic light theme styling (<mcfile name="App.css" path="/Users/minzhe/Desktop/work-React/agri-solver/frontend/src/App.css"></mcfile>).
*   **DONE:** Initialized SQLite database (<mcfile name="agrisolver.db" path="/Users/minzhe/Desktop/work-React/agri-solver/backend/agrisolver.db"></mcfile>) and created `instructions` table schema (<mcfile name="database.js" path="/Users/minzhe/Desktop/work-React/agri-solver/backend/database.js"></mcfile>).
*   **DONE:** Updated `/api/instructions` endpoint in <mcfile name="server.js" path="/Users/minzhe/Desktop/work-React/agri-solver/backend/server.js"></mcfile> to check the database cache first.
*   **DONE:** Implemented Perplexity API call in backend (<mcfile name="server.js" path="/Users/minzhe/Desktop/work-React/agri-solver/backend/server.js"></mcfile>) using `axios` when instructions are not cached.
*   **DONE:** Implemented caching of fetched Perplexity results into the SQLite database.
*   **DONE:** Updated frontend (<mcfile name="App.jsx" path="/Users/minzhe/Desktop/work-React/agri-solver/frontend/src/App.jsx"></mcfile>) to handle and display instructions from the backend API response.
*   **NEXT:** Implement file upload handling in the frontend for the diagnosis feature.
*   **NEXT:** Implement backend logic for receiving file uploads for the `/api/diagnose` endpoint (using middleware like `multer`).
*   **NEXT:** Implement backend logic for Google Gemini API integration for the `/api/diagnose` endpoint.

## Setup and Installation

### Prerequisites

*   Node.js and npm installed
*   API Keys for Perplexity AI and Google Gemini (Store in `backend/.env`)

### Backend Setup

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install` (this will now include `axios`)
3.  Create a `.env` file in the `backend` directory and add your API keys:
    ```dotenv
    PERPLEXITY_API_KEY=your_perplexity_api_key
    GEMINI_API_KEY=your_gemini_api_key
    PORT=3001 # Optional: specify a port
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