# Notes-Maker
**Live Link:** [http://notes-maker-sand-beta.vercel.app/](http://notes-maker-sand-beta.vercel.app/)

A simple, fast, and responsive full-stack note-taking application built with the MERN stack.
## Technology Stack
**Frontend:**
- React (via Vite)
- React Router DOM (Routing)
- Axios (HTTP requests)
- Pure CSS for styling
**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & ORM)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Project Setup Instructions
Follow these steps to get the project running locally on your machine.
### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### 1. Setup the Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add the variables
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:5000`*

### 2. Setup the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

## Features & Assumptions

### Features Implemented
- **User Authentication:** Secure registration and login flow using JWT tokens and password hashing.
- **Private Notes:** Users can only view, edit, and delete notes that they have created themselves.
- **Responsive UI:** The frontend is styled cleanly with plain CSS and works across desktop and mobile views.
### Assumptions
- **Database:** It is assumed that the provided MongoDB URI in the `.env` file is valid and accessible.
- **Environment Context:** The frontend currently makes API calls to `http://localhost:5000` by default. For a production deployment, these endpoint URLs would need to be updated.
