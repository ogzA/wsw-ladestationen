import React, { useState } from "react";
import { Search, Sliders, ZapIcon } from "lucide-react";
import { useChargingStations } from "../context/ChargingStationContext";
import FilterPanel from "./FilterPanel";
import Logo from "../assets/WSW_Logo_Default.svg";

const Navbar: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { filterStations } = useChargingStations();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterStations({ searchTerm });
  };

  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="WSW Logo" className="bg-white h-24 w-24" />
            <h1 className="text-xl font-bold">Ladestationen</h1>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                placeholder="Adresse oder PLZ suchen..."
                className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 px-2 py-1 text-xs bg-secondary-400 text-white rounded hover:bg-primary-500 transition-colors"
              >
                Suchen
              </button>
            </form>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-1 px-3 py-2 bg-secondary-400 rounded-md hover:bg-primary-700 transition-colors"
            >
              <Sliders className="h-4 w-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 rounded-full hover:bg-primary-600 transition-colors"
            >
              <Sliders className="h-5 w-5" />
            </button>
            <button
              onClick={() =>
                document.getElementById("search-modal")?.showModal()
              }
              className="p-2 rounded-full hover:bg-primary-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {isFilterOpen && <FilterPanel onClose={() => setIsFilterOpen(false)} />}

      {/* Mobile Search Modal */}
      <dialog id="search-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Suche</h3>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Adresse oder PLZ suchen..."
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => document.getElementById("search-modal")?.close()}
                className="btn btn-sm btn-outline"
              >
                Abbrechen
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Suchen
              </button>
            </div>
          </form>
        </div>
        <div className="modal-backdrop">
          <button
            onClick={() => document.getElementById("search-modal")?.close()}
          >
            close
          </button>
        </div>
      </dialog>
    </header>
  );
};

export default Navbar;
