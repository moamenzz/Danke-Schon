# Spotify Clone

<div align="center">
<img src="/client/assets/readme-cover.png" alt="Demo Screenshot">
  
  <!-- Tech Stack -->
  
  <div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="cloudinary" />
    <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" alt="zod" />
  </div>
</div>

<br />
<br />

[![Status](https://img.shields.io/badge/Status-InProgress-yellow)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://danke-schon319.vercel.app)

---

## 📖 Description

Danke Schön is a full-stack real estate platform that allows users to discover, list, and interact with property listings for sale or rent. Users can search for available properties based on filters like location, type, and price, while also having the ability to create and manage their own property listings.

The platform integrates Leaflet Maps to display precise property locations, giving potential buyers and renters clear geographic context before making a decision. Each listing includes detailed information, images, and a direct contact option, allowing users to easily connect with property owners or agents.

Whether you're looking for your next home or advertising one, Danke Schön offers a streamlined and intuitive experience for navigating the real estate market.

---

## 🚀 Features

- 🔒 Authentication & OAuth
- 📦 Full-Stack Application with Property Upload & Management Options
- 🌐 Fully responsive UI
- 🗺️ Leaflet Maps
- ⚙️ Deployment via Render + Vercel

Features In Progress:

- 🧔 Creating Property Form Implementation
- 🔔 UI/UX Complete Overhaul

---

## 🧠 What I Learned

This project challenged and taught me:

- ✅ Usage of Leaflet Maps

---

## 🔧 Technologies Used

| Frontend | Backend              | Database           | Other                              |
| -------- | -------------------- | ------------------ | ---------------------------------- |
| React    | Node.js (Express.js) | MongoDB (Mongoose) | JWT, Axios, Vite, Cloudinary, etc. |

---

## 🖥️ Live Demo

🌐 [Click here to view the app](https://danke-schon319.vercel.app)

---

## 🧪 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/moamenzz/Danke-Schon.git

# Navigate to project folder
cd Danke-Schon

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Add .env files in both folders as per .env.example

# Run the project
npm run dev
```

## 🤫 .env.example

client .env:

```
VITE_BACKEND_API=
```

server .env:

```
NODE_ENV=
CLIENT_URL=
PORT=
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
RESEND_SECRET=
SENDER_DOMAIN=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

# ©️ Credits

Some Front-end Elements like the maps and parts of the UI are inspired by Lamadev on YouTube
