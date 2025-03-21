# RealEstate Web App

This is a full-stack real estate web application similar to Booking.com, allowing users to browse, search, and book properties. The project is divided into two main parts: the API (backend) and the Client (frontend).


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16.x or later)
- npm (v7.x or later)
- PostgreSQL (for Prisma ORM)

## Installation

### Set Up the Backend (API)
Navigate to the api directory and install the necessary dependencies:
```
cd api
npm install @prisma/client bcrypt body-parser cors dotenv express jsonwebtoken mongodb nodemon prisma
```
### Start the Backend Server:
```
npm run dev
```

### Set Up the Frontend (Client):
Next, move to the client directory and install the frontend dependencies
```
cd ..
cd client
npm install axios dompurify leaflet react-leaflet react-quill react-router-dom sass socket.io socket.io-client timeago.js @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh vite
```
### Start the Frontend Development Server
```
npm run dev
```








