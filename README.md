# WSW Ladestationen - Electric Vehicle Charging Station Map

Eine moderne Webanwendung, die Elektrofahrzeug-Ladestationen in Wuppertal, Deutschland anzeigt. Dieses Projekt wurde als Demonstration von React-Entwicklungskompetenzen und modernen Webtechnologien entwickelt.

## 🚀 Funktionen

- Interaktive Kartenoberfläche zur Anzeige von Ladestationsstandorten
- Echtzeit-Filterung von Ladestationen nach:
  - Verbindungstyp (AC/DC)
  - Mindestanzahl der Stecker
  - Standortsuche (Adresse oder Postleitzahl)
- Responsive Design für Desktop- und Mobilgeräte
- Benutzerstandort-Erkennung
- Station-Clustering für bessere Kartenperformance
- Detaillierte Stationsinformationen in Popups
- Moderne, barrierefreie Benutzeroberfläche mit flüssigen Animationen

## 🛠️ Verwendete Technologien

### Frontend Framework

- **React 18** - Für den Aufbau einer modernen, komponentenbasierten Benutzeroberfläche
- **TypeScript** - Für Typsicherheit und bessere Entwicklererfahrung
- **Vite** - Für schnelle Entwicklung und optimierte Produktions-Builds

### UI/UX

- **Tailwind CSS** - Für Utility-First-Styling und schnelle Entwicklung
- **DaisyUI** - Für vorgefertigte Komponenten und konsistentes Design
- **Lucide React** - Für schöne, konsistente Icons
- **React Hot Toast** - Für unaufdringliche Benachrichtigungen

### Karten-Integration

- **Leaflet** - Für die interaktive Kartenfunktionalität
- **React Leaflet** - React-Komponenten für Leaflet
- **Leaflet.MarkerCluster** - Für effizientes Marker-Clustering

### Entwicklungstools

- **ESLint** - Für Codequalität und Konsistenz
- **TypeScript** - Für statische Typprüfung
- **PostCSS** - Für CSS-Verarbeitung
- **Autoprefixer** - Für browserübergreifende Kompatibilität

## 💡 Technische Entscheidungen

### Warum React + TypeScript?

- TypeScript bietet Typsicherheit und bessere IDE-Unterstützung
- Reacts komponentenbasierte Architektur ermöglicht wiederverwendbaren, wartbaren Code
- Moderne React-Features (Hooks, Context) für effizientes State-Management

### Warum Vite?

- Deutlich schnellerer Entwicklungsserver im Vergleich zu Create React App
- Optimierte Produktions-Builds
- Native ESM-Unterstützung
- Bessere Entwicklererfahrung mit sofortigem Hot Module Replacement

### Warum Tailwind CSS?

- Utility-First-Ansatz für schnelle UI-Entwicklung
- Kein Wechsel zwischen Dateien für Styling erforderlich
- Kleinere Bundle-Größe durch PurgeCSS
- Konsistentes Design-System
- Einfache responsive Design-Implementierung

### Warum Leaflet?

- Leichtgewichtig und performant
- Umfangreiches Plugin-Ökosystem
- Bessere Performance als Google Maps für diesen Anwendungsfall
- Kostenlos nutzbar mit OpenStreetMap-Tiles

## 🚀 Erste Schritte

1. Repository klonen

```bash
git clone [repository-url]
```

2. Abhängigkeiten installieren

```bash
npm install
```

3. Entwicklungsserver starten

```bash
npm run dev
```

4. Für Produktion erstellen

```bash
npm run build
```

## 📱 Responsive Design

Die Anwendung ist vollständig responsive und funktioniert nahtlos auf:

- Desktop-Computern
- Tablets
- Mobilgeräten

## 🔒 Barrierefreiheit

Die Anwendung folgt bewährten Praktiken der Barrierefreiheit:

- Semantische HTML-Struktur
- ARIA-Labels wo erforderlich
- Tastaturnavigation-Unterstützung
- Ausreichender Farbkontrast
- Screenreader-freundlich

## 🎯 Zukünftige Verbesserungen

Potenzielle Bereiche für Erweiterungen:

- Echtzeit-Verfügbarkeit der Stationen
- Benutzerauthentifizierung für Lieblingsstationen
- Routenplanung zu Ladestationen
- Bewertungs- und Rezensionssystem für Stationen
- Integration mit Auto-Navigationssystemen

## 📄 Lizenz

Dieses Projekt ist Open Source und unter der MIT-Lizenz verfügbar.
