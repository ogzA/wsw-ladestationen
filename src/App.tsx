import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import Footer from "./components/Footer";
import { ChargingStationProvider } from "./context/ChargingStationContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the app resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-primary-50">
        <div className="animate-pulse-slow text-primary-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1"></path>
            <path d="M14 15h1"></path>
            <path d="M17 15h2"></path>
            <path d="M21 15h1"></path>
            <path d="M22 19h-8a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2z"></path>
            <path d="m9 14-3-3 3-3"></path>
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-primary-800 mb-2">
          WSW Ladestationen
        </h1>
        <div className="text-sm text-gray-500">Wuppertaler Stadtwerke</div>
        <div className="mt-4 w-48 h-1 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-primary-500 animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <ChargingStationProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow relative">
          <MapView />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </ChargingStationProvider>
  );
}

export default App;
