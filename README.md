# 🪁 Kite Festival - An Interactive Experience

A beautiful, immersive web experience celebrating the festival of kites with stunning visual effects, smooth animations, and an engaging narrative journey.

## ✨ Features

- **Interactive Scene Navigation**: Explore multiple scenes including Opening, Lohri, Sankranti, Future, and Reflection
- **Particle Effects**: Mesmerizing ember particles and cloud layers for atmospheric depth
- **Smooth Transitions**: Seamless scene transitions with engaging animations
- **Responsive Design**: Optimized for all screen sizes and devices
- **Modern UI**: Built with Shadcn UI components for a polished interface
- **Performance Optimized**: Fast loading and smooth 60fps animations

## 🎨 Scene Breakdown

- **Opening**: Welcome to the festival experience
- **Lohri**: The winter harvest celebration
- **Sankranti**: The kite flying festival
- **Future**: Envision what's ahead
- **Reflection**: Contemplate the experience
- **Transition**: Smooth scene transitions

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Shadcn UI
- **Package Manager**: Bun
- **Linting**: ESLint

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- npm, yarn, or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/Ashurai84/Kite-festival.git
cd Kite-festival

# Install dependencies
bun install
# or
npm install
```

## 🎯 Development

```bash
# Start development server
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

```bash
# Build for production
bun run build
# or
npm run build

# Preview production build
bun run preview
# or
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── CloudLayer.tsx          # Cloud background effect
│   ├── EmberParticles.tsx       # Particle system
│   ├── FestivalExperience.tsx   # Main experience component
│   ├── NavLink.tsx              # Navigation component
│   └── scenes/                  # Individual scene components
│       ├── SceneOpening.tsx
│       ├── SceneLohri.tsx
│       ├── SceneSankranti.tsx
│       ├── SceneFuture.tsx
│       ├── SceneReflection.tsx
│       └── SceneTransition.tsx
├── hooks/                       # Custom React hooks
│   ├── useScrollProgress.ts
│   └── use-toast.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx                      # Root component
```

## 🎮 Usage

Simply navigate through the different scenes using the navigation menu. Each scene offers unique visual experiences and storytelling elements celebrating the kite festival tradition.

## 🌐 Deployment

This project can be easily deployed to:
- **Vercel**: Zero-config deployment for Vite projects
- **Netlify**: Drag and drop or Git integration
- **GitHub Pages**: Static hosting option

## 📝 Configuration

- **Tailwind Config**: [tailwind.config.ts](tailwind.config.ts)
- **Vite Config**: [vite.config.ts](vite.config.ts)
- **TypeScript Config**: [tsconfig.json](tsconfig.json)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests to help improve the experience.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ashutosh Rai** - [@Ashurai84](https://github.com/Ashurai84)

---

**Made with ❤️ to celebrate the joy of kites and festivals**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
