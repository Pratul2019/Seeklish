// src/components/MapSearch.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapSearchProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onPlaceSelected }) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      if (!searchInputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current!);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          console.error("No details available for input: '" + place.name + "'");
          return;
        }

        onPlaceSelected(place);
      });
    });
  }, [onPlaceSelected]);

  return (
    <>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Location"
        className="rounded-3xl w-full bg-transparent p-4"
      />
    </>
  );
};

export default MapSearch;
