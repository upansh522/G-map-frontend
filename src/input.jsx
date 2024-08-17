import React, { useEffect, useRef } from "react";
import useGoogleMapsLoader from "./hooks/useGoogleMapsLoader";

const Input = ({
  label,
  id,
  onPlaceSelected,
  ...props
}) => {
  const autoCompleteRef = useRef();
  const { isLoaded } = useGoogleMapsLoader();

  useEffect(() => {      
    if (isLoaded) {
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        document.getElementById(id) 
      );

      autoCompleteRef.current.addListener("place_changed", () => {
        const place = autoCompleteRef.current?.getPlace();
        if (place.geometry && place.geometry.location) {
          onPlaceSelected(place.geometry.location);
        }
      });
    }
  }, [id, onPlaceSelected, isLoaded]);

  return (
    <div className="flex flex-col gap-y-1 text-black">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input type="text" id={id} {...props} className="p-2 border rounded-lg" />
    </div>
  );
};

export default Input;