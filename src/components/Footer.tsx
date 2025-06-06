import React from "react";
import { Info } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-3 text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <Info className="h-4 w-4 mr-1" />
            <span>Daten von OpenStreetMap | © WSW mobil GmbH</span>
          </div>

          <div className="flex space-x-4">
            <p>
              Diese Website wurde von{" "}
              <a
                href="https://oguzakankan.com"
                className="text-primary-500"
                target="_blank"
                rel="noopener"
              >
                Oguz Akankan
              </a>{" "}
              als Demonstrationsprojekt entwickelt und steht in keiner
              offiziellen Verbindung zur WSW mobil GmbH.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
