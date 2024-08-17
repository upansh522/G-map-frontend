import React, { useState } from 'react';
import Map_New from './Map_New.jsx';
import Input from './input';
import axios from 'axios';
import SpeedControl from './SpeedControl';
import LocationMovement from './LocationMovement';

const App = () => {
  const [route, setRoute] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [speed, setSpeed] = useState(5);
  const [movementInfo, setMovementInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Correctly access the environment variable and construct the URL
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/frontend`, {
            origin,
            destination,
        });
        const { distance, duration, steps } = response.data;

        setRoute({ steps });
        setCurrentLocation(origin); 

    } catch (error) {
        console.error('Error fetching directions:', error.response ? error.response.data : error.message);
    }
};


  return (
    <div className="app-container relative h-screen w-screen">
      <div className="form-container absolute top-0 left-0 right-0 p-4 bg-gray-100 bg-opacity-80 shadow-lg flex justify-around z-10">
        <form onSubmit={handleSubmit} className="flex w-full justify-around">
          <Input
            label="Origin"
            id="origin"
            onPlaceSelected={(location) => setOrigin(location)}
            className="mx-2"
          />
          <Input
            label="Destination"
            id="destination"
            onPlaceSelected={(location) => setDestination(location)}
            className="mx-2"
          />
          <div className="travel-mode-container mx-2">
            <label htmlFor="travelMode" className="block text-gray-700">Travel Mode</label>
            <select
              id="travelMode"
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
          <button type="submit" className="submit-button bg-blue-500 text-white px-4 py-2 rounded-md">
            Get Directions
          </button>
        </form>
      </div>

      <div className="map-container flex-grow relative">
        <Map_New
          route={route}
          currentLocation={currentLocation}
          travelMode={travelMode}
          movementInfo={movementInfo} 
        />
      </div>

      {route && (
        <div className="speed-control absolute bottom-10 left-10 z-10">
          <SpeedControl speed={speed} setSpeed={setSpeed} />
        </div>
      )}

      {route && (
        <LocationMovement
          steps={route.steps}
          setCurrentLocation={setCurrentLocation}
          speed={speed}
          setMovementInfo={setMovementInfo}
        />
      )}
    </div>
  );
};

export default App;
