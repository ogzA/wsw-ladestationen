# WSW Ladestationen - Electric Vehicle Charging Station Map

A modern web application that displays electric vehicle charging stations in Wuppertal, Germany. This project was developed as a demonstration of React development skills and modern web technologies.

## 🚀 Features

- Interactive map interface showing charging station locations
- Real-time filtering of charging stations by:
  - Connection type (AC/DC)
  - Minimum number of plugs
  - Location search (address or postal code)
- Responsive design for both desktop and mobile devices
- User location detection
- Station clustering for better map performance
- Detailed station information in popups
- Modern, accessible UI with smooth animations

## 🛠️ Technologies Used

### Frontend Framework

- **React 18** - For building a modern, component-based UI
- **TypeScript** - For type safety and better developer experience
- **Vite** - For fast development and optimized production builds

### UI/UX

- **Tailwind CSS** - For utility-first styling and rapid development
- **DaisyUI** - For pre-built components and consistent design
- **Lucide React** - For beautiful, consistent icons
- **React Hot Toast** - For non-intrusive notifications

### Map Integration

- **Leaflet** - For the interactive map functionality
- **React Leaflet** - React components for Leaflet
- **Leaflet.MarkerCluster** - For efficient marker clustering

### Development Tools

- **ESLint** - For code quality and consistency
- **TypeScript** - For static type checking
- **PostCSS** - For CSS processing
- **Autoprefixer** - For cross-browser compatibility

## 💡 Technical Decisions

### Why React + TypeScript?

- TypeScript provides type safety and better IDE support
- React's component-based architecture enables reusable, maintainable code
- Modern React features (hooks, context) for efficient state management

### Why Vite?

- Significantly faster development server compared to Create React App
- Optimized production builds
- Native ESM support
- Better developer experience with instant hot module replacement

### Why Tailwind CSS?

- Utility-first approach for rapid UI development
- No need to switch between files for styling
- Smaller bundle size through PurgeCSS
- Consistent design system
- Easy responsive design implementation

### Why Leaflet?

- Lightweight and performant
- Extensive plugin ecosystem
- Better performance than Google Maps for this use case
- Free to use with OpenStreetMap tiles

## 🚀 Getting Started

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile devices

## 🔒 Accessibility

The application follows accessibility best practices:

- Semantic HTML structure
- ARIA labels where necessary
- Keyboard navigation support
- Sufficient color contrast
- Screen reader friendly

## 🎯 Future Improvements

Potential areas for enhancement:

- Real-time station availability
- User authentication for favorite stations
- Route planning to charging stations
- Station rating and review system
- Integration with car navigation systems

## 📄 License

This project is open source and available under the MIT License.
