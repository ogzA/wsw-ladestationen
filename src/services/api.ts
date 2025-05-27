import { ChargingStation } from "../types/ChargingStation";

// This is the Overpass API query to get charging stations in Wuppertal
const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";
const WUPPERTAL_BOUNDING_BOX = "51.18,7.02,51.33,7.28"; // Approximation of Wuppertal area

const wuppertalQuery = `
[out:json];
(
  node["amenity"="charging_station"]["operator"~"WSW|Wuppertaler Stadtwerke|Wuppertaler Stadtwerke Mobilität"](${WUPPERTAL_BOUNDING_BOX});
  way["amenity"="charging_station"]["operator"~"WSW|Wuppertaler Stadtwerke|Wuppertaler Stadtwerke Mobilität"](${WUPPERTAL_BOUNDING_BOX});
  relation["amenity"="charging_station"]["operator"~"WSW|Wuppertaler Stadtwerke|Wuppertaler Stadtwerke Mobilität"](${WUPPERTAL_BOUNDING_BOX});
);
out body;
>;
out skel qt;
`;

// Fallback mock data if API fails
const mockChargingStations: ChargingStation[] = [
  {
    id: "1",
    name: "WSW Ladestation Hauptbahnhof",
    address: "Döppersberg 1, 42103 Wuppertal",
    lat: 51.2565,
    lon: 7.1496,
    connectionType: "AC",
    plugs: 4,
    operationalStatus: "active",
    powerOutput: "22 kW",
  },
  {
    id: "2",
    name: "WSW Schnellladestation Elberfeld",
    address: "Neumarkt 10, 42103 Wuppertal",
    lat: 51.2599,
    lon: 7.1465,
    connectionType: "DC",
    plugs: 2,
    operationalStatus: "active",
    powerOutput: "50 kW",
  },
  {
    id: "3",
    name: "WSW Ladestation Barmen",
    address: "Alter Markt, 42275 Wuppertal",
    lat: 51.2671,
    lon: 7.1932,
    connectionType: "AC",
    plugs: 2,
    operationalStatus: "active",
    powerOutput: "11 kW",
  },
  {
    id: "4",
    name: "WSW Ladestation Zoo",
    address: "Hubertusallee 30, 42117 Wuppertal",
    lat: 51.2443,
    lon: 7.1066,
    connectionType: "AC",
    plugs: 4,
    operationalStatus: "active",
    powerOutput: "22 kW",
  },
  {
    id: "5",
    name: "WSW Schnellladestation Schwebebahn Depot",
    address: "Oberbarmer Bahnhof, 42277 Wuppertal",
    lat: 51.2723,
    lon: 7.2218,
    connectionType: "DC",
    plugs: 2,
    operationalStatus: "active",
    powerOutput: "150 kW",
  },
];

// Convert OpenStreetMap data to our ChargingStation format
const convertOsmDataToStations = (osmData: any): ChargingStation[] => {
  const stations: ChargingStation[] = [];

  if (!osmData || !osmData.elements || !Array.isArray(osmData.elements)) {
    console.error("Invalid OSM data format:", osmData);
    return mockChargingStations; // Fallback to mock data
  }

  osmData.elements.forEach((element: any) => {
    // Only process nodes (points on the map)
    if (element.type !== "node" || !element.tags) return;

    // Check if this is a charging station
    if (element.tags.amenity !== "charging_station") return;

    // Check if operated by WSW
    const operator = element.tags.operator || "";
    if (
      !operator.includes("WSW") &&
      !operator.includes("Wuppertaler Stadtwerke")
    )
      return;

    // Determine connection type based on tags
    let connectionType: "AC" | "DC" = "AC"; // Default to AC
    if (element.tags.socket_ccs) connectionType = "DC";
    if (element.tags.socket_chademo) connectionType = "DC";
    if (element.tags.socket_type && element.tags.socket_type.includes("fast"))
      connectionType = "DC";
    if (
      element.tags.charging_levels &&
      parseInt(element.tags.charging_levels) > 2
    )
      connectionType = "DC";

    // Count plugs
    const plugs =
      parseInt(element.tags.socket_count || element.tags.capacity || "2") || 2;

    // Format address from available tags
    const street = element.tags["addr:street"] || "";
    const houseNumber = element.tags["addr:housenumber"] || "";
    const postcode = element.tags["addr:postcode"] || "";
    const city = element.tags["addr:city"] || "Wuppertal";

    let address = "";
    if (street && houseNumber) {
      address = `${street} ${houseNumber}, ${postcode} ${city}`.trim();
    } else if (element.tags.address) {
      address = element.tags.address;
    } else if (element.tags.description) {
      address = element.tags.description;
    } else {
      address = "Wuppertal";
    }

    // Create station object
    const station: ChargingStation = {
      id: element.id.toString(),
      name: element.tags.name || `WSW Ladestation ${connectionType}`,
      address,
      lat: element.lat,
      lon: element.lon,
      connectionType,
      plugs,
      operationalStatus:
        element.tags.operational_status === "closed" ? "inactive" : "active",
      powerOutput:
        element.tags.maxpower || (connectionType === "AC" ? "22 kW" : "50 kW"),
    };

    stations.push(station);
  });

  // If no stations found, use mock data
  return stations.length > 0 ? stations : mockChargingStations;
};

export const fetchChargingStations = async (): Promise<ChargingStation[]> => {
  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(wuppertalQuery)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return convertOsmDataToStations(data);
  } catch (error) {
    console.error(
      "Error fetching charging stations from OpenStreetMap:",
      error
    );
    return mockChargingStations; // Fallback to mock data on error
  }
};
