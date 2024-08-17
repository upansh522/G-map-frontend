import React, { useState, useMemo, useCallback } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import useGoogleMapsLoader from "./hooks/useGoogleMapsLoader";
import CustomMarker from "./CustomMarker";

const options = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: true,
};

const Map_New = ({ route, currentLocation, travelMode, movementInfo }) => {
  const [map, setMap] = useState(null);
  const [response, setResponse] = useState(null);

  const { isLoaded } = useGoogleMapsLoader();

  const origin = useMemo(() => {
    if (!route) return null;
    return {
      lat: route.steps[0].start_location.lat,
      lng: route.steps[0].start_location.lng,
    };
  }, [route]);

  const destination = useMemo(() => {
    if (!route) return null;
    const len = route.steps.length;
    return {
      lat: route.steps[len - 1].end_location.lat,
      lng: route.steps[len - 1].end_location.lng,
    };
  }, [route]);

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const center = useMemo(
    () => ({
      lat: 19.07266,
      lng: 72.91231,
    }),
    []
  );

  const directionsCallback = useCallback((result, status) => {
    if (result !== null) {
      if (status === "OK") {
        setResponse(result);
      } else {
        console.log("response: ", result);
      }
    }
  }, []);

  const directionsServiceOptions = useMemo(() => {
    if (!origin || !destination) return undefined;
    return {
      destination,
      origin,
      travelMode,
    };
  }, [origin, destination, travelMode]);

  const directionsResult = useMemo(() => {
    return {
      directions: response ?? undefined,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#3DDBD9",
        strokeWeight: 2,
      },
    };
  }, [response]);

  const onLoad = useCallback(
    (map) => {
      if (origin && destination) {
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(origin.lat, origin.lng),
          new google.maps.LatLng(destination.lat, destination.lng)
        );
        map.fitBounds(bounds);
      } else {
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(19.07266, 72.91231) // Default location
        );
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [origin, destination]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      id="map"
      center={center}
      mapContainerStyle={containerStyle}
      zoom={7}
      onLoad={onLoad}
      options={options}
      onUnmount={onUnmount}
    >
      {origin && (
        <Marker
          position={origin}
          title="Origin Location"
        />
      )}
      {currentLocation && (
        <CustomMarker
          position={currentLocation}
          icon="../assets/car.png" // Path to your car icon
          info={{
            type: 'current',
            speed: movementInfo.speed,
            isMoving: movementInfo.isMoving,
            street: movementInfo.street,
            distanceCovered: movementInfo.distanceCovered,
            distanceRemaining: movementInfo.distanceRemaining,
            timeElapsed: movementInfo.timeElapsed,
          }}
        />
      )}
      {destination && (
        <Marker
          position={destination}
          title="Destination Location"
          icon={{
            url: "../assets/origin.png", // Path to your car icon
            scaledSize: new google.maps.Size(50, 50), // Resize icon
          }}
        />
      )}
      {directionsServiceOptions && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      )}
      {directionsResult.directions && (
        <DirectionsRenderer options={directionsResult} />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map_New;
