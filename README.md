# 🫀 Human Body Educational App

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![NPM](https://img.shields.io/badge/npm-%3E%3D9.0.0-red.svg)

**An interactive 3D educational application for exploring the human body**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Target Audience](#-target-audience)
- [Platforms](#-platforms)
- [Quick Start](#-quick-start)
- [Phase 2 Test Environment](#-phase-2-test-environment)
- [Documentation](#-documentation)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Development Roadmap](#-development-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)
- [Star History](#-star-history)

---

## 🌟 About

The Human Body Educational App is an interactive 3D application designed to make learning about human anatomy engaging and accessible. Built with modern web technologies, it provides an immersive experience for exploring organs, body systems, and anatomical structures through intuitive 3D visualization.

### Project Vision

To create the most engaging, accessible, and comprehensive interactive anatomy learning tool for people of all ages and backgrounds.

---

## ✨ Features

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| **3D Body Viewer** | Interactive 3D human body model with full camera controls | ✅ Phase 1 |
| **Organ Interaction** | Clickable organs with visual highlighting and hover effects | ✅ Phase 1 |
| **Body System Layers** | Toggle visibility of different body systems | ✅ Phase 2 |
| **Focus Mode** | Camera focused on selected organ with smooth transitions | ✅ Phase 1 |
| **Isolation Modes** | Isolate individual systems or organs for detailed study | ✅ Phase 2 |
| **Information Panels** | Detailed organ information with system associations | ✅ Phase 1 |
| **Search Functionality** | Search by organ name, system, or function | 🚧 Planned |
| **Multi-Scale Exploration** | Macro (body/organs), Micro (cells/tissues), Nano (neurons/atoms) | 🚧 Planned |

### Phase 2 Features (Complete & Stable)

- ✅ **7 Body Systems**: Skeletal, Muscular, Nervous, Circulatory, Digestive, Respiratory, Urinary
- ✅ **System Groups**: Each system has its own THREE.Group for organized scene structure
- ✅ **Organ Mapping**: All organs mapped to their respective systems
- ✅ **Visibility Control**: Toggle systems on/off with checkboxes or keyboard shortcuts (1-7)
- ✅ **Interaction Modes**: Normal, Focus, Isolate System, Isolate Organ
- ✅ **Enhanced Raycasting**: Visibility filtering for accurate organ selection
- ✅ **Visual Feedback**: Hover, selected, and isolated states with emissive glow effects
- ✅ **Keyboard Controls**: F (Focus), D (Reset), I (Isolate), 1-7 (System Toggle), Esc (Cancel)

### Premium Features (Future)

- 📚 Detailed medical information
- 🎬 3D animations of organ functions
- 🔪 Virtual dissection mode
- 📝 Quiz and assessment tools
- 📊 Progress tracking and learning paths
- 🔖 Bookmarking and note-taking
- 📤 Export/share functionality
- 🌐 Multi-language support
- 🥽 AR/VR mode support

---

## 👥 Target Audience

**Primary Audience:** Everyone seeking knowledge about the human body

| User Group | Needs | Features |
|------------|-------|----------|
| **Students** | Educational content for learning | Interactive 3D models, detailed info |
| **Teachers** | Teaching tools for classrooms | Visual demonstrations, quiz tools |
| **Healthcare Enthusiasts** | Detailed anatomical knowledge | Advanced medical information |
| **Curious Adults** | General knowledge about the body | Accessible interface, engaging visuals |
| **Medical Students** | Professional-grade reference | Detailed pathology, surgical procedures |

---

## 📱 Platforms

| Platform | Status | Description |
|----------|--------|-------------|
| **Web** | ✅ Available | Responsive web application with PWA capabilities |
| **Mobile (iOS)** | 🚧 Planned | Native iOS app with touch gestures |
| **Mobile (Android)** | 🚧 Planned | Native Android app with touch gestures |

### Web Platform

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive Web App (PWA) capabilities
- Touch-friendly for mobile browsers
- Optimized for desktop and tablet viewing

### Mobile Platforms

- Native iOS and Android applications
- Optimized for different screen sizes
- Touch gestures for 3D navigation
- Offline mode support

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/anassbenfares7/human-body-app.git
cd human-body-app

# Install dependencies
npm install

# Start development servers
npm run dev
```

### Running the Application

```bash
# Run all packages in parallel
npm run dev

# Or run specific platforms
cd packages/web && npm run dev
cd packages/mobile && npm run dev
```

### Building for Production

```bash
# Build all packages
npm run build

# Build specific platform
cd packages/web && npm run build
cd packages/mobile && npm run build
```

---

## 🧪 Phase 2 Test Environment

### Quick Start

1. Navigate to the Phase 2 test directory:
   ```bash
   cd phase2-test
   ```

2. Open `index.html` in a web browser:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```

3. Open your browser to `http://localhost:8000`

### Features Implemented

| Feature | Description |
|---------|-------------|
| **Body Systems** | 7 body systems (Skeletal, Muscular, Nervous, Circulatory, Digestive, Respiratory, Urinary) |
| **System Groups** | Each system organized in THREE.Group for clean scene structure |
| **Organ Mapping** | All organs mapped to their respective body systems |
| **Visibility Control** | Toggle systems on/off via UI checkboxes or keyboard |
| **Focus Mode** | Camera focuses on selected organ with smooth transitions |
| **Isolation Modes** | Isolate individual systems or organs for detailed study |
| **Enhanced Raycasting** | Visibility filtering for accurate organ selection |
| **Visual Feedback** | Hover, selected, and isolated states with emissive glow |

### Interaction Modes

| Mode | Description | Behavior |
|------|-------------|----------|
| **Normal** | Default viewing mode | All visible systems shown, normal selection |
| **Focus** | Camera focused on selected organ | Camera locked to organ, smooth transitions |
| **Isolate System** | Only one system visible | All other systems hidden, selected system highlighted |
| **Isolate Organ** | Only one organ visible | All other organs hidden, selected organ highlighted |

### Keyboard Controls

| Key | Action | Description |
|-----|--------|-------------|
| **F** | Toggle Focus Mode | Focus camera on selected organ |
| **D** | Reset to Default | Reset camera and clear selection |
| **I** | Toggle Isolation Mode | Cycle: none → system → organ → none |
| **1-7** | Quick Toggle System | Toggle specific system visibility |
| **Esc** | Cancel Selection | Cancel current action/selection |

### Quick System Toggle Keys

| Key | System | Color |
|-----|--------|-------|
| 1 | Skeletal | #e0e0e0 |
| 2 | Muscular | #ff6b6b |
| 3 | Nervous | #ffd93d |
| 4 | Circulatory | #ff4757 |
| 5 | Digestive | #ffa502 |
| 6 | Respiratory | #2ed573 |
| 7 | Urinary | #00cec9 |

### Mouse Controls

| Action | Behavior |
|--------|----------|
| **Left Click + Drag** | Rotate camera |
| **Right Click + Drag** | Pan camera |
| **Scroll** | Zoom in/out |
| **Left Click on Organ** | Select organ (respects current mode) |
| **Hover on Organ** | Show hover feedback with tooltip |

### Visual Feedback System

| State | Scale | Emissive | Opacity |
|-------|-------|----------|---------|
| **Normal** | 1.0x | 0x000000 | 1.0 |
| **Hovered** | 1.05x | 0.2 | 1.0 |
| **Selected** | 1.1x | 0.4 | 1.0 |
| **Isolated** | 1.05x | 0.3 | 1.0 |
| **Hidden** | 1.0x | - | 0.0 |

### Architecture

```
InteractionManager (Coordinator)
├── SystemManager (Scene & Visibility)
│   └── Manages: SystemGroups, OrganMeshes, Visibility, Opacity
└── SelectionManager (Selection & Highlight)
    └── Manages: Selection, Hover, Highlight Effects
```

### Testing Checklist

- [ ] System toggling works correctly (checkboxes and keyboard)
- [ ] Organ selection highlights properly
- [ ] Focus mode transitions smoothly
- [ ] Isolation modes (system/organ) work correctly
- [ ] Hover feedback is responsive
- [ ] Reset (D key) clears all states
- [ ] Visual feedback matches specifications

---

## 📚 Documentation

| Document | Description | Link |
|----------|-------------|------|
| **Product Specification** | Complete product requirements and features | [`docs/01-PRODUCT-SPECIFICATION.md`](docs/01-PRODUCT-SPECIFICATION.md) |
| **Technology Stack** | Technical architecture and tools | [`docs/02-TECHNOLOGY-STACK.md`](docs/02-TECHNOLOGY-STACK.md) |
| **Setup Guide** | Installation and configuration instructions | [`docs/03-SETUP-GUIDE.md`](docs/03-SETUP-GUIDE.md) |
| **Development Guide** | Coding standards and contribution guidelines | [`docs/04-DEVELOPMENT-GUIDE.md`](docs/04-DEVELOPMENT-GUIDE.md) |

### Phase Documentation

| Phase | Description | Link |
|-------|-------------|------|
| **Phase 2** | Anatomy Interaction Layer (Complete) | [`plans/phase2-anatomy-interaction-layer.md`](plans/phase2-anatomy-interaction-layer.md) |
| **Implementation** | Overall implementation plan | [`plans/implementation-plan.md`](plans/implementation-plan.md) |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.x | UI framework |
| **TypeScript** | ^5.x | Type safety |
| **Three.js** | ^0.160.x | 3D rendering |
| **Vite** | ^5.x | Build tool |
| **Tailwind CSS** | ^3.x | Styling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | >=18.0.0 | Runtime |
| **Express** | ^4.x | API framework |
| **TypeScript** | ^5.x | Type safety |

### Mobile

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | ^0.73.x | Mobile framework |
| **Expo** | ^50.x | Development platform |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Turbo** | Monorepo build system |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Git** | Version control |

---

## 📁 Project Structure

```
human-body-app/
├── packages/
│   ├── web/                 # Web application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── 3d/     # Three.js components
│   │   │   │   └── ui/     # UI components
│   │   │   └── store/      # State management
│   │   └── public/
│   │       └── models/     # 3D models
│   ├── mobile/              # Mobile application
│   │   ├── screens/        # React Native screens
│   │   └── store/          # State management
│   ├── backend/             # Backend API
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   └── .env.example
│   └── shared/              # Shared code
│       └── src/
│           ├── types/      # TypeScript types
│           ├── constants/  # Shared constants
│           └── data/       # Shared data
├── phase1-test/             # Phase 1 test environment
├── phase2-test/             # Phase 2 test environment
│   ├── src/
│   │   ├── managers/       # Interaction managers
│   │   ├── utils/          # Utilities
│   │   └── data/           # Test data
│   └── README.md
├── plans/                   # Project plans
├── docs/                    # Documentation
├── turbo.json               # Turbo configuration
├── package.json             # Root package.json
└── README.md                # This file
```

---

## 🗺️ Development Roadmap

### Phase 1: Foundation ✅ Complete
- [x] Set up development environment
- [x] Create basic 3D viewer
- [x] Implement camera controls (rotate, zoom, pan)
- [x] Add basic UI framework
- [x] Implement organ selection and highlighting
- [x] Add focus mode

### Phase 2: Anatomy Interaction Layer ✅ Complete & Stable
- [x] Introduce body systems (7 systems)
- [x] Organ-to-system mapping
- [x] System visibility toggling
- [x] Organ grouping and isolation logic
- [x] Clear interaction rules (select, focus, isolate)
- [x] Hover feedback improvements
- [x] Scene structure cleanup
- [x] 3-manager architecture (SystemManager, SelectionManager, InteractionManager)

### Phase 3: Advanced Interactions 🚧 In Progress
- [ ] Multi-organ selection
- [ ] System relationships visualization
- [ ] Advanced camera behaviors
- [ ] Enhanced search functionality
- [ ] User accounts and authentication

### Phase 4: Content Expansion 📋 Planned
- [ ] More organs and detailed models
- [ ] Additional body systems (Endocrine, Lymphatic, Reproductive)
- [ ] Detailed organ information
- [ ] Medical content expansion
- [ ] Disease and pathology information

### Phase 5: UI Polish & Premium Features 📋 Planned
- [ ] Better visual design
- [ ] Smooth animations
- [ ] Responsive design improvements
- [ ] Quiz and assessment tools
- [ ] Progress tracking
- [ ] Bookmarking and note-taking
- [ ] AR/VR support

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Write clear, concise comments
- Run `npm run format` before committing
- Run `npm run lint` to check for errors

### Commit Messages

- Use conventional commit format
- Examples: `feat: add system isolation mode`, `fix: camera focus animation`, `docs: update README`

### Reporting Issues

- Use the GitHub issue tracker
- Provide detailed description of the problem
- Include steps to reproduce
- Add screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Anass Benfares

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Three.js** - For the amazing 3D library
- **React** - For the powerful UI framework
- **Vite** - For the fast build tool
- **Turbo** - For the efficient monorepo system
- **The Open Source Community** - For all the amazing tools and libraries

### Special Thanks

- All contributors who have helped improve this project
- Medical professionals who provide anatomical accuracy
- The educational community for feedback and suggestions

---

## 📞 Contact

**Author:** Anass Benfares

**Email:** anassbenfares7@gmail.com

**GitHub:** [@anassbenfares7](https://github.com/anassbenfares7)

**Project URL:** https://github.com/anassbenfares7/human-body-app

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=anassbenfares7/human-body-app&type=Date)](https://star-history.com/#anassbenfares7/human-body-app&Date)

---

<div align="center">

**Made with ❤️ by Anass Benfares**

[⬆ Back to Top](#-human-body-educational-app)

</div>
