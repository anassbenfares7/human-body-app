# Human Body 3D Visualization

**An interactive 3D educational application for exploring human anatomy**

> **Status:** Phase 1-2 Complete | Phase 3 Planned
> **Current:** 5 organs with placeholder geometry | 6 body systems
> **Planned:** 38 organs with GLB models | 10 body systems

---

## Quick Start

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

---

## Implemented Features (Phase 1-2)

### Core Features

| Feature | Status | Description |
|---------|--------|-------------|
| **3D Body Viewer** | Complete | Interactive 3D scene with OrbitControls |
| **Organ Interaction** | Complete | Click organs with visual highlighting |
| **Body System Layers** | Complete | Toggle visibility of 6 body systems |
| **Focus Mode** | Complete | Camera focuses on selected organ |
| **Isolation Modes** | Complete | Isolate systems or organs for detailed study |
| **Information Panels** | Complete | Display organ details with system associations |

### Implemented Organs (5)

| ID | Name | System | Geometry |
|----|------|--------|----------|
| brain | Brain | Nervous | Sphere placeholder |
| lungs | Lungs | Respiratory | Cylinder placeholder |
| heart | Heart | Circulatory | Sphere placeholder |
| liver | Liver | Digestive | Box placeholder |
| stomach | Stomach | Digestive | Sphere placeholder |

**Note:** Current geometry uses placeholder primitives (spheres, cylinders, boxes). Realistic GLB models are planned for Phase 4.

### Implemented Body Systems (6)

| Key | System | Color | Description |
|-----|--------|-------|-------------|
| 1 | Skeletal | #e0e0e0 | Structure and support |
| 2 | Muscular | #ff6b6b | Movement and posture |
| 3 | Nervous | #ffd93d | Controls body activities |
| 4 | Circulatory | #ff4757 | Transports blood |
| 5 | Digestive | #ffa502 | Breaks down food |
| 6 | Respiratory | #2ed573 | Gas exchange |

---

## Controls Reference

### Mouse Controls

| Action | Behavior |
|--------|----------|
| Left Click + Drag | Rotate camera |
| Right Click + Drag | Pan camera |
| Scroll Wheel | Zoom in/out |
| Click Organ | Select organ |
| Hover Organ | Show highlight and tooltip |

### Keyboard Controls

| Key | Action |
|-----|--------|
| **F** | Toggle Focus Mode |
| **D** | Reset camera and selection |
| **I** | Cycle isolation mode (none -> system -> organ -> none) |
| **1-6** | Toggle system visibility |
| **Esc** | Cancel selection |

### Visual Feedback States

| State | Scale | Emissive | Opacity |
|-------|-------|----------|---------|
| Normal | 1.0x | 0.0 | 1.0 |
| Hovered | 1.05x | 0.2 | 1.0 |
| Selected | 1.1x | 0.4 | 1.0 |
| Isolated | 1.05x | 0.3 | 1.0 |
| Hidden | 1.0x | - | 0.0 |

---

## Architecture

### Monorepo Structure

```
human-body-app/
├── packages/
│   ├── web/          # React web app (Vite)
│   ├── mobile/       # React Native/Expo app
│   ├── desktop/      # Electron desktop app
│   ├── backend/      # Express API server
│   └── shared/       # Shared types and data
├── docs/             # Documentation
├── plans/            # Project plans
└── turbo.json        # Monorepo build config
```

### 3D Architecture

```
BodyViewer (Main 3D Component)
├── BodyModel (Scene container)
│   ├── SystemLayer (per body system)
│   │   └── OrganMesh (individual organs)
│   └── Lights & Camera
└── OrbitControls (user interaction)
```

### State Management

- **Web:** Zustand store (`useAppStore.ts`)
- **Mobile:** Zustand store
- **Shared:** TypeScript types and constants

---

## Planned Expansion (Phase 3+)

### Phase 3: Advanced Interactions
- Multi-organ selection with Shift+Click
- System relationships visualization
- Advanced camera behaviors
- Enhanced search functionality

### Phase 4: Content Expansion
- Replace placeholder geometry with real GLB models
- Expand to 38 organs total
- Add 4 more systems (Endocrine, Lymphatic, Urinary, Reproductive)
- Detailed organ information

### Phase 5: UI & UX Polish
- Modern UI design improvements
- Smooth animations
- Responsive design improvements
- Quiz and assessment tools

**Full organ list (38 total):**
brain, lungs, heart, liver, stomach, kidneys, intestines, pancreas, spleen, gallbladder, arteries, veins, capillaries, spinal-cord, nerves, trachea, bronchi, diaphragm, pituitary, thyroid, adrenal, lymph-nodes, thymus, bladder, ureters, urethra, skull, spine, ribs, arms, legs, pelvis, biceps, triceps, quadriceps, hamstrings, abdominals, testes, ovaries, uterus, prostate

**Full system list (10 total):**
Skeletal, Muscular, Nervous, Circulatory, Digestive, Respiratory, Endocrine, Lymphatic, Urinary, Reproductive

---

## Development

### NPM Scripts

```bash
npm run dev      # Run all packages in parallel
npm run build    # Build all packages
npm run test     # Run all tests
npm run lint     # Lint all packages
npm run format   # Format all code
```

### Building for Production

```bash
# Build all packages
npm run build

# Build specific platform
cd packages/web && npm run build
```

---

## Technology Stack

### Frontend
- React 18.x
- TypeScript 5.x
- Three.js 0.160.x
- React Three Fiber
- Vite 5.x
- Tailwind CSS 3.x
- Zustand (state management)

### Backend
- Node.js >= 18.0.0
- Express 4.x
- TypeScript 5.x

### Mobile
- React Native 0.73.x
- Expo 50.x

### Development Tools
- Turbo (monorepo build system)
- ESLint / Prettier

---

## Project Documentation

| Document | Link |
|----------|------|
| Product Specification | [`docs/01-PRODUCT-SPECIFICATION.md`](docs/01-PRODUCT-SPECIFICATION.md) |
| Technology Stack | [`docs/02-TECHNOLOGY-STACK.md`](docs/02-TECHNOLOGY-STACK.md) |
| Setup Guide | [`docs/03-SETUP-GUIDE.md`](docs/03-SETUP-GUIDE.md) |
| Development Guide | [`docs/04-DEVELOPMENT-GUIDE.md`](docs/04-DEVELOPMENT-GUIDE.md) |

---

## Contributing

### Code Style
- Follow existing code style
- Use meaningful variable and function names
- Run `npm run format` before committing
- Run `npm run lint` to check for errors

### Commit Messages
- Use conventional commit format
- Examples: `feat: add system isolation mode`, `fix: camera focus animation`, `docs: update README`

---

## License

MIT License - see [`LICENSE`](LICENSE) file for details.

---

## Contact

**Author:** Anass Benfares
**Email:** anassbenfares7@gmail.com
**GitHub:** [@anassbenfares7](https://github.com/anassbenfares7)
**Project:** https://github.com/anassbenfares7/human-body-app
