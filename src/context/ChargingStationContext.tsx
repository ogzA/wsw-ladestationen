import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ChargingStation } from "../types/ChargingStation";
import { fetchChargingStations } from "../services/api";

interface ChargingStationContextType {
  stations: ChargingStation[];
  filteredStations: ChargingStation[];
  loading: boolean;
  error: string | null;
  filterStations: (
    filters: Partial<{
      searchTerm: string;
      connectionType: string;
      minPlugs: number;
    }>
  ) => void;
}

const ChargingStationContext = createContext<
  ChargingStationContextType | undefined
>(undefined);

export const useChargingStations = () => {
  const context = useContext(ChargingStationContext);
  if (!context) {
    throw new Error(
      "useChargingStations must be used within a ChargingStationProvider"
    );
  }
  return context;
};

interface ChargingStationProviderProps {
  children: ReactNode;
}

export const ChargingStationProvider: React.FC<
  ChargingStationProviderProps
> = ({ children }) => {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [filteredStations, setFilteredStations] = useState<ChargingStation[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStations = async () => {
      try {
        setLoading(true);
        const data = await fetchChargingStations();
        setStations(data);
        setFilteredStations(data);
      } catch (err) {
        console.error("Error fetching charging stations:", err);
        setError(
          "Fehler beim Laden der Ladestationen. Bitte versuchen Sie es später erneut."
        );
      } finally {
        setLoading(false);
      }
    };

    getStations();
  }, []);

  const filterStations = (
    filters: Partial<{
      searchTerm: string;
      connectionType: string;
      minPlugs: number;
    }>
  ) => {
    let result = [...stations];

    // Filter by search term (address or postal code)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (station) =>
          station.address.toLowerCase().includes(searchLower) ||
          station.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by connection type
    if (filters.connectionType) {
      result = result.filter(
        (station) => station.connectionType === filters.connectionType
      );
    }

    // Filter by minimum number of plugs
    if (filters.minPlugs && filters.minPlugs > 0) {
      result = result.filter((station) => station.plugs >= filters.minPlugs);
    }

    setFilteredStations(result);
  };

  return (
    <ChargingStationContext.Provider
      value={{
        stations: filteredStations,
        filteredStations,
        loading,
        error,
        filterStations,
      }}
    >
      {children}
    </ChargingStationContext.Provider>
  );
};
