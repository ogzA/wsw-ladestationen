import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useChargingStations } from "../context/ChargingStationContext";
import StationMarkers from "./StationMarkers";
import InfoBox from "./InfoBox";
import { Search, Locate } from "lucide-react";
import toast from "react-hot-toast";

// Leaflet icon fix for webpack
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Wuppertal coordinates
const WUPPERTAL_CENTER = [51.2562, 7.1509];
const DEFAULT_ZOOM = 13;

interface MapControlsProps {
  onLocate: () => void;
}

// Custom component for map controls
const MapControls: React.FC<MapControlsProps> = ({ onLocate }) => {
  const map = useMap();

  const handleResetView = () => {
    map.setView(WUPPERTAL_CENTER, DEFAULT_ZOOM);
    toast.success("Karte auf Wuppertal zentriert");
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={handleResetView}
        className="bg-white rounded-md p-2 shadow-md hover:bg-gray-100 transition-colors"
        title="Auf Wuppertal zentrieren"
      >
        <Search className="h-5 w-5 text-primary-600" />
      </button>
      <button
        onClick={onLocate}
        className="bg-white rounded-md p-2 shadow-md hover:bg-gray-100 transition-colors"
        title="Meinen Standort finden"
      >
        <Locate className="h-5 w-5 text-primary-600" />
      </button>
    </div>
  );
};

const MapView: React.FC = () => {
  const { stations, loading, error } = useChargingStations();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      toast.loading("Standort wird ermittelt...", { id: "location" });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          toast.success("Standort gefunden", { id: "location" });
        },
        () => {
          toast.error("Standort konnte nicht ermittelt werden", {
            id: "location",
          });
        }
      );
    } else {
      toast.error("Geolocation wird von Ihrem Browser nicht unterstützt");
    }
  };

  // Display loading or error state
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Lade Stationen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Fehler beim Laden der Daten
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 btn btn-primary"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={WUPPERTAL_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
        <MapControls onLocate={handleLocateUser} />
        <StationMarkers stations={stations} userLocation={userLocation} />
        <InfoBox />
      </MapContainer>
    </div>
  );
};

export default MapView;
