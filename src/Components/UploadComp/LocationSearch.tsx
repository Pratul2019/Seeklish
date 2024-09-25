"use client"

import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import MapSearch from './MapSearch';


interface LocationSearchProps {
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export default function LocationSearch({ onPlaceSelected }: LocationSearchProps) {
    return (
        <div className="w-full">
      <div className="flex items-center space-x-2">
        <FaLocationDot size={25} className="text-gray-500 flex-shrink-0" />
        <MapSearch onPlaceSelected={onPlaceSelected} />
      </div>
    </div>
    );
}
