import React from "react";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Battery, BatteryFull, MapPin } from "lucide-react";
import { ChargingStation } from "../types/ChargingStation";

interface StationMarkersProps {
  stations: ChargingStation[];
  userLocation: [number, number] | null;
}

// Custom icons for different station types
const createCustomIcon = (type: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-battery">
      ${
        type === "AC"
          ? '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line><line x1="5" y1="10" x2="15" y2="10"></line><line x1="5" y1="14" x2="15" y2="14"></line>'
          : '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line><line x1="5" y1="10" x2="19" y2="10"></line>'
      }
    </svg>
  `;

  const iconUrl = "data:image/svg+xml;base64," + btoa(svg);

  return L.divIcon({
    html: `
      <div style="background-color: ${
        type === "AC" ? "#066eab" : "#e63900"
      }; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 0 2px white, 0 0 0 4px rgba(0,0,0,0.1);">
        ${
          type === "AC"
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line><line x1="5" y1="10" x2="19" y2="10"></line></svg>'
        }
      </div>
    `,
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// Icon for user location
const userLocationIcon = L.divIcon({
  html: `
    <div style="background-color: #3CB371; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px rgba(0,0,0,0.2);">
    </div>
  `,
  className: "user-location-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const StationMarkers: React.FC<StationMarkersProps> = ({
  stations,
  userLocation,
}) => {
  return (
    <MarkerClusterGroup
      chunkedLoading
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={false}
      zoomToBoundsOnClick={true}
      maxClusterRadius={75}
    >
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lon]}
          icon={createCustomIcon(station.connectionType)}
        >
          <Popup className="station-popup">
            <div className="p-1">
              <h3 className="font-bold text-lg text-primary-600 mb-2">
                {station.name}
              </h3>

              <div className="flex mb-3 items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">{station.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center">
                  <div
                    className={`p-1 rounded-full mr-2 ${
                      station.connectionType === "AC"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {station.connectionType === "AC" ? (
                      <Battery className="h-4 w-4" />
                    ) : (
                      <BatteryFull className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {station.connectionType}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-1 rounded-full mr-2 text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    {station.plugs} Stecker
                  </span>
                </div>
              </div>

              {station.operationalStatus && (
                <div
                  className={`text-sm px-2 py-1 rounded ${
                    station.operationalStatus === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } mb-2`}
                >
                  {station.operationalStatus === "active"
                    ? "In Betrieb"
                    : "Außer Betrieb"}
                </div>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline btn-primary hover:bg-primary-500 hover:text-white hover:border-primary-500 w-full mt-2"
              >
                Navigation starten
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={userLocation} icon={userLocationIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-medium text-sm">Ihr Standort</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MarkerClusterGroup>
  );
};

export default StationMarkers;
