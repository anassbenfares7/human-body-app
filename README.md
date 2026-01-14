# 🫀 Human Body Educational App

An interactive 3D educational application that allows users to explore the human body in an engaging, non-boring way. Perfect for students, educators, and anyone curious about human anatomy.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile%20%7C%20desktop-lightgrey.svg)

## ✨ Features

### Core Features (Free Tier)

- 🎮 **Interactive 3D Body Viewer** - Explore male and female bodies with full camera controls
- 🫀 **Clickable Organs** - Select any organ to view detailed information
- 🦴 **Body System Layers** - Toggle visibility of skeletal, muscular, nervous, and other systems
- 🔬 **Multi-Scale Exploration** - Zoom from organs to cells to neurons to atoms
- 🔍 **Search Functionality** - Find organs quickly with smart search
- 🌓 **Dark/Light Mode** - Choose your preferred theme
- 📱 **Cross-Platform** - Works on web, mobile, and desktop

### Premium Features (Coming Soon)

- 📚 **Advanced Medical Content** - Detailed information for medical students
- 🎬 **3D Animations** - Watch organs in action
- 🔪 **Virtual Dissection** - Learn anatomy through dissection
- 📝 **Quiz Mode** - Test your knowledge
- 📊 **Progress Tracking** - Monitor your learning journey
- 📑 **Bookmarking** - Save organs for later study
- 🔌 **Offline Mode** - Access content without internet
- 🌍 **Multi-Language** - Learn in your native language
- 🥽 **AR/VR Support** - Immersive learning experience

## 🎯 Target Audience

This app is designed for **everyone** seeking knowledge about the human body:

- Students (middle school, high school, college)
- Curious adults
- Healthcare enthusiasts
- Teachers and educators
- Medical students and professionals

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Git
- VS Code (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/anassbenfares7/human-body-app.git
cd human-body-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start

```bash
# Web App
cd packages/web
npm run dev

# Mobile App
cd packages/mobile
npm start

# Desktop App
cd packages/desktop
npm run dev

# Backend API
cd packages/backend
npm run dev
```

For detailed setup instructions, see [`docs/03-SETUP-GUIDE.md`](./docs/03-SETUP-GUIDE.md).

## 📚 Documentation

- [📋 Product Specification](./docs/01-PRODUCT-SPECIFICATION.md) - Detailed product requirements
- [🛠️ Technology Stack](./docs/02-TECHNOLOGY-STACK.md) - Technologies and architecture
- [🚀 Setup Guide](./docs/03-SETUP-GUIDE.md) - Installation and configuration
- [📖 Development Guide](./docs/04-DEVELOPMENT-GUIDE.md) - Development workflow and best practices

## 🏗️ Project Structure

```
human-body-app/
├── packages/
│   ├── web/                 # Web application (React + Three.js)
│   ├── mobile/              # Mobile application (React Native)
│   ├── desktop/             # Desktop application (Electron)
│   ├── shared/              # Shared code and types
│   └── backend/             # Backend API (Node.js + Express)
├── docs/                    # Documentation
├── public/                  # Static assets
└── README.md
```

## 🛠️ Technology Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **React Three Fiber** - React integration for Three.js
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Redis** - Caching
- **JWT** - Authentication

### Platforms

- **Web** - React + Vite
- **Mobile** - React Native + Expo
- **Desktop** - Electron

## 🎨 Screenshots

_(Coming soon)_

## 🗺️ Roadmap

### Phase 1: Foundation (Months 1-3)

- [x] Product specification
- [x] Technology stack selection
- [ ] Basic 3D viewer
- [ ] Male/female body toggle
- [ ] Camera controls

### Phase 2: Core Features (Months 4-6)

- [ ] Organ selection and highlighting
- [ ] Body system layers
- [ ] Information panels
- [ ] Search functionality
- [ ] Multi-scale exploration

### Phase 3: Platform Expansion (Months 7-9)

- [ ] Mobile apps (iOS/Android)
- [ ] Desktop application
- [ ] User accounts
- [ ] Performance optimization

### Phase 4: Premium Features (Months 10-12)

- [ ] Advanced medical content
- [ ] Quiz system
- [ ] Progress tracking
- [ ] Payment integration
- [ ] Premium tier launch

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [`docs/04-DEVELOPMENT-GUIDE.md`](./docs/04-DEVELOPMENT-GUIDE.md) for detailed contribution guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js community for the amazing 3D library
- React Three Fiber for React integration
- All contributors and supporters

## 📧 Contact

- **GitHub:** [@anassbenfares7](https://github.com/anassbenfares7)
- **Issues:** [GitHub Issues](https://github.com/anassbenfares7/human-body-app/issues)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=anassbenfares7/human-body-app&type=Date)](https://star-history.com/#anassbenfares7/human-body-app&Date)

---

Made with ❤️ by [Anass Benfares](https://github.com/anassbenfares7)
