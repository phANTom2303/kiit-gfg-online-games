# 🎮 GFG Online Games Website

<div align="center">

<img src="client/public/images/online%20game%20logo.png" alt="GFG Online Games Website" width="256" />


**A collection of classic multiplayer games built for the web**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Powered by Node.js](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io)](https://socket.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)

</div>

## 🌟 Overview

Welcome to the **GFG Online Games Website** - a modern, interactive gaming platform that brings classic games to the digital world! Built by the GeeksforGeeks Student Chapter at KIIT, this project offers both multiplayer online gameplay and local "pass-and-play" functionality for a variety of beloved games.

## 🎯 Features

### 🎲 Game Collection

- **🎯 Tic Tac Toe** - Classic 3x3 grid strategy game (2 players, ~1 min)
- **🔴 Connect 4** - Drop discs and connect four in a row (2 players, ~15 min)
- **🐍 Snakes & Ladders** - Board game with dice rolling mechanics (up to 6 players, ~30 min)
- **⚡ Chain Reaction** - Strategic chain reaction game (up to 4 players, ~15 min)
- **🎪 Hangman** - Word guessing game with visual feedback (1 player, ~2 min)

### 🚀 Key Features

- **⌚ Real-time Multiplayer** - Play with friends online using Socket.IO
- **👥 Local Multiplayer** - Pass-and-play on the same device
- **🔊 Sound Effects** - Immersive audio experience with mute/unmute controls
- **📱 Responsive Design** - Optimized for desktop and mobile devices
- **🎨 Modern UI** - Beautiful animations and smooth interactions
- **ℹ️ Game Instructions** - Built-in tutorials for each game
- **🔄 Game Reset** - Quick restart functionality

## 🛠️ Tech Stack

### Frontend

- **⚛️ React 18** - Modern UI library with hooks
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎭 Framer Motion** - Smooth animations and transitions
- **🧩 NextUI** - Beautiful React component library
- **📦 Vite** - Fast build tool and development server
- **🎵 Web Audio API** - Sound effects management

### Backend

- **🟢 Node.js** - JavaScript runtime environment
- **⚡ Express.js** - Fast web application framework
- **🔌 Socket.IO** - Real-time bidirectional communication
- **🔐 OTP Generator** - Secure room code generation
- **🌐 CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/phANTom2303/kiit-gfg-online-games.git
   cd kiit-gfg-online-games
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Start the development servers**

   ```bash
   # From the root directory
   npm start
   ```

   This will start both the client (on port 5173) and server (on port 3000) concurrently.

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

## 🎮 How to Play

1. **Select a Game** - Choose from our collection of classic games
2. **Create or Join Room** - Start a new game or join existing multiplayer sessions
3. **Invite Friends** - Share room codes for multiplayer games
4. **Enjoy Gaming** - Play with intuitive controls and beautiful interfaces

## 📁 Project Structure

```
📦 kiit-gfg-online-games
├── 📁 client/                 # Frontend React application
│   ├── 📁 public/            # Static assets
│   │   ├── 📁 images/        # Game images and banners
│   │   ├── 📁 sound-effects/ # Audio files
│   │   └── 📁 info-images/   # Game instruction images
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI components
│   │   ├── 📁 pages/         # Game pages and components
│   │   └── App.jsx           # Main application component
│   └── package.json
├── 📁 server/                # Backend Node.js application
│   ├── 📁 routes/           # API routes for different games
│   ├── server.js            # Main server file
│   └── package.json
└── package.json             # Root package configuration
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 👥 Development Team

This project was created with ❤️ by the GeeksforGeeks Student Chapter at KIIT:

<div align="center">

| Developer       | GitHub Profile                                                                                                                          | Role                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **phANTom2303** | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/phANTom2303) | Lead Developer       |
| **VanXodus305** | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VanXodus305) | Full Stack Developer |
| **hritika2409** | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hritika2409) | Backend Developer    |
| **ashish-xt**   | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ashish-xt)   | Backend Developer    |
| **sakettt25**   | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sakettt25)   | Frontend Developer   |

</div>

## 📝 License

This project is developed for educational purposes by the GeeksforGeeks Student Chapter at KIIT University.

---

<div align="center">

**Built with 💻 and ☕ by GFG KIIT Student Chapter**

[![Visit our GitHub](https://img.shields.io/badge/Visit%20our-GitHub-black?style=for-the-badge&logo=github)](https://github.com/GFG-KIIT)

</div>
