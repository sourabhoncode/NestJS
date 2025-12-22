import React from 'react';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

interface MapAreaProps {
  onLoad: (map: google.maps.Map) => void;
  directionsResponse: google.maps.DirectionsResult | null;
  center: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number } | null;
}

const MapArea: React.FC<MapAreaProps> = ({ onLoad, directionsResponse, center, userLocation }) => {
  return (
    <div className="flex-1 h-full relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={onLoad}
      >
        {userLocation && (
          <Marker position={userLocation} />
        )}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapArea;