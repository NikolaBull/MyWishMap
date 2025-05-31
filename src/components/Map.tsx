
import React, { useState } from 'react';
import { MapPin, MousePointer } from 'lucide-react';

interface MapProps {
  latitude: number;
  longitude: number;
  title?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
  selectedLocation?: { lat: number; lng: number } | null;
}

const Map: React.FC<MapProps> = ({ 
  latitude, 
  longitude, 
  title, 
  onLocationSelect, 
  interactive = false,
  selectedLocation 
}) => {
  const [isInputMode, setIsInputMode] = useState(false);
  const [tempCoords, setTempCoords] = useState({ lat: '', lng: '' });

  const displayLat = selectedLocation?.lat || latitude;
  const displayLng = selectedLocation?.lng || longitude;

  // URL для Google Maps
  const mapUrl = `https://maps.google.com/maps?q=${displayLat},${displayLng}&hl=ru&z=14&output=embed`;
  
  const handleCoordinateSubmit = () => {
    const lat = parseFloat(tempCoords.lat);
    const lng = parseFloat(tempCoords.lng);
    
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      onLocationSelect?.(lat, lng);
      setIsInputMode(false);
      setTempCoords({ lat: '', lng: '' });
    } else {
      alert('Введите корректные координаты (широта: -90 до 90, долгота: -180 до 180)');
    }
  };

  const handleLocationClick = () => {
    if (selectedLocation) {
      const url = `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
      {!interactive || !isInputMode ? (
        <>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта"
          />
          
          {title && selectedLocation && (
            <div 
              className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:bg-emerald-50 transition-colors"
              onClick={handleLocationClick}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-emerald-600">
                <MapPin className="w-4 h-4 text-emerald-500" />
                {title}
              </div>
            </div>
          )}
          
          {interactive && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-slate-200">
              <button
                onClick={() => setIsInputMode(true)}
                className="flex items-center gap-2 text-xs text-slate-600 font-medium hover:text-emerald-600 transition-colors"
              >
                <MousePointer className="w-3 h-3" />
                Выбрать координаты
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="p-6 bg-white h-full flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
            Введите координаты
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Широта (Latitude)
              </label>
              <input
                type="number"
                step="any"
                min="-90"
                max="90"
                placeholder="Например: 55.7558"
                value={tempCoords.lat}
                onChange={(e) => setTempCoords(prev => ({ ...prev, lat: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Долгота (Longitude)
              </label>
              <input
                type="number"
                step="any"
                min="-180"
                max="180"
                placeholder="Например: 37.6173"
                value={tempCoords.lng}
                onChange={(e) => setTempCoords(prev => ({ ...prev, lng: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleCoordinateSubmit}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Выбрать
              </button>
              <button
                onClick={() => {
                  setIsInputMode(false);
                  setTempCoords({ lat: '', lng: '' });
                }}
                className="flex-1 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-slate-500 text-center">
            Можете найти координаты на Google Maps: правый клик → "Что здесь?"
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
