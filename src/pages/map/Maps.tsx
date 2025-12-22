import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import MapControls from '../../components/map/MapControls';
import MapArea from '../../components/map/MapArea';
import { UserHeader } from '../../components/user/UserHeader';
import { authService } from '../../services/authServices';

// Define libraries array outside component to prevent re-renders
const libraries: ("places")[] = ['places'];

const Maps: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  
  // Get user data for header
  const currentUser = authService.getCurrentUser();
  const username = currentUser?.fullName || currentUser?.name || 'User';

  // 1. Add center state with fallback to Kochi
const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 9.9312, lng: 76.2673 });
  // 2. On mount, try to get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    }
  }, []);

  // Add effect to pan map to center on change
  useEffect(() => {
    if (
      map &&
      center &&
      typeof center.lat === "number" &&
      typeof center.lng === "number" &&
      isFinite(center.lat) &&
      isFinite(center.lng)
    ) {
      map.panTo(center);
    }
  }, [center, map]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
    message.success('Logged out successfully');
    navigate('/user/login');
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading Map...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-50">
      {/* Header Component */}
      <UserHeader 
        navigate={handleNavigate}
        handleLogout={handleLogout}
        username={username}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 w-full pt-2 pb-2 px-2 gap-2">
        <MapControls 
          onDirectionsCalculated={(result) => setDirectionsResponse(result)}
          onClearRoute={() => setDirectionsResponse(null)}
          onPanToLocation={(lat, lng) => setCenter({ lat, lng })}
        />

        <MapArea 
          onLoad={(map) => setMap(map)}
          directionsResponse={directionsResponse}
          center={center} // Pass center here
        />
      </div>
    </div>
  );
};

export default Maps;