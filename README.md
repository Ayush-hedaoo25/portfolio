# 🚀 Ayush Hedaoo | DevOps & Cloud Engineer Portfolio

A **creative, full-stack MERN portfolio website** designed to capture the attention of recruiters — with a dark cyberpunk/terminal theme, matrix rain animations, glassmorphism cards, and smooth motion effects.

## 🎨 Design Philosophy

> **Not generic. Genuinely creative.**

- 🖥️ **Terminal-style Hero** — Matrix rain canvas, animated typewriter role rotation, and a live terminal window
- 🌑 **Dark Cyberpunk Theme** — Deep dark background with neon cyan/green/purple accents
- ✨ **Framer Motion animations** — Staggered reveals, hover effects, floating icons, page transitions
- 🃏 **Glassmorphism cards** — Frosted glass effect with glowing neon borders
- 📊 **Animated skill progress bars** — Color-coded by category with live fill animation
- 🔄 **Interactive filtering** — Project and skills filtering with animated tab switching

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 | UI Framework |
| Framer Motion | Animations |
| react-scroll | Smooth navigation |
| react-type-animation | Terminal typewriter |
| react-icons | Icon library |
| Axios 1.13.5 | HTTP client (patched) |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| CORS | Cross-origin config |
| dotenv | Environment config |

## 📁 Project Structure

```
portfolio/
├── backend/
│   ├── server.js            # Express server + routes + security
│   ├── models/
│   │   ├── Contact.js       # Contact form submissions
│   │   └── Project.js       # Portfolio projects
│   ├── routes/
│   │   ├── contact.js       # POST/GET contact messages
│   │   └── projects.js      # GET projects (with seeding)
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html       # Meta tags, OG tags
    └── src/
        ├── components/
        │   ├── Navbar.js    # Sticky nav with blur + mobile menu
        │   ├── Hero.js      # Matrix rain, terminal window, CTA
        │   ├── About.js     # Bio, stats, glassmorphism highlights
        │   ├── Skills.js    # Category tabs, animated skill bars
        │   ├── Projects.js  # Filterable project cards
        │   ├── Contact.js   # Form with API + social links
        │   └── Footer.js    # Navigation + stack + social
        ├── utils/api.js     # Axios API client
        ├── App.js
        ├── index.js
        └── index.css        # CSS variables, animations, utilities
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm run dev   # development with nodemon
# npm start   # production
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start
```

### Full Stack (both terminals)
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

App runs at: **http://localhost:3000**
API runs at: **http://localhost:5000/api**

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/skills` | All skills by category |
| GET | `/api/projects` | All projects (auto-seeded) |
| GET | `/api/projects?category=DevOps` | Filter by category |
| GET | `/api/projects?featured=true` | Featured projects only |
| POST | `/api/contact` | Submit contact form |

## ✨ Features

- 🎬 **Matrix Rain Animation** — Canvas-based falling character effect in hero
- 🖥️ **Live Terminal Window** — Rotating commands showcasing skills
- 🏷️ **Skill Categories** — Cloud, DevOps, DevSecOps, Infrastructure, Security, Monitoring, Automation
- 📈 **Animated Progress Bars** — Fill animation with neon glow effects
- 🗂️ **Project Filtering** — Filter by category with smooth transitions
- 📧 **Contact Form** — Validates and stores in MongoDB with rate limiting
- 🔐 **Security** — Helmet headers, rate limiting, input validation, CORS
- 📱 **Responsive** — Mobile-first design with hamburger navigation

## 🌐 Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend
npm run build
# Deploy the /build folder
```

### Backend → Railway / Render / Fly.io
```bash
# Set environment variables:
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 👤 Author

**Ayush Hedaoo** — Cloud & DevOps Engineer  
🔗 [GitHub](https://github.com/Ayush-hedaoo25)
