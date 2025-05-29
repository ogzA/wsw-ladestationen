import React from "react";
import { Info } from "lucide-react";

const InfoBox: React.FC = () => {
  return (
    <div className="absolute bottom-16 left-4 z-[500] md:bottom-4">
      <div className="bg-white p-3 rounded-lg shadow-md max-w-xs">
        <div className="flex items-start mb-2">
          <Info className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
          <h3 className="font-medium text-gray-800">Legende</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-primary-500 mr-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
                <line x1="23" y1="13" x2="23" y2="11"></line>
              </svg>
            </div>
            <span className="text-gray-700">AC Ladestation</span>
          </div>

          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-orange-600 mr-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
                <line x1="23" y1="13" x2="23" y2="11"></line>
                <line x1="5" y1="10" x2="19" y2="10"></line>
              </svg>
            </div>
            <span className="text-gray-700">DC Schnellladestation</span>
          </div>

          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-500 mr-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <span className="text-gray-700">Ihr Standort</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
