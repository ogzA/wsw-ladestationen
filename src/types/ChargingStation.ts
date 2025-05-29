export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  connectionType: "AC" | "DC";
  plugs: number;
  operationalStatus?: "active" | "inactive";
  powerOutput?: string;
  operator?: string;
}

export interface ChargingStationFilters {
  searchTerm?: string;
  connectionType?: string;
  minPlugs?: number;
}
