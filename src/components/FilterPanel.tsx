import React, { useState } from "react";
import { X } from "lucide-react";
import { useChargingStations } from "../context/ChargingStationContext";

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
  const { filterStations } = useChargingStations();
  const [filters, setFilters] = useState({
    connectionType: "",
    minPlugs: 0,
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === "minPlugs" ? parseInt(value) || 0 : value,
    });
  };

  const applyFilters = () => {
    filterStations(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      connectionType: "",
      minPlugs: 0,
    });
    filterStations({});
    onClose();
  };

  return (
    <div className="bg-white shadow-lg border-t border-gray-200 p-4 absolute top-full left-0 right-0 z-10 animate-fade-in-down">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anschlusstyp
            </label>
            <select
              name="connectionType"
              value={filters.connectionType}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Alle Typen</option>
              <option value="AC">AC</option>
              <option value="DC">DC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mindeststeckplätze
            </label>
            <input
              type="number"
              name="minPlugs"
              min="0"
              value={filters.minPlugs}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={applyFilters}
              className="btn bg-primary-500 outline-primary-500 flex-1"
            >
              Filter anwenden
            </button>
            <button onClick={resetFilters} className="btn btn-outline">
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
