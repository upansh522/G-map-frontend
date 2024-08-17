import { useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const useGoogleMapsLoader = () => {
  const libraries=['places'];
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (loadError) {
    console.error("Google Maps API load error:", loadError);
  }

  return { isLoaded };
};

export default useGoogleMapsLoader;
