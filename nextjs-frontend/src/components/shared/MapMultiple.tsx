"use client";

// MultipleMarkersMap.tsx
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define the type for props
interface MultipleMarkersMapProps {
  arrCoordinates: L.LatLngLiteral[];
}

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to render multiple markers
const MultipleMarkersMap: React.FC<MultipleMarkersMapProps> = ({
  arrCoordinates,
}) => {
  const center: L.LatLngLiteral = new L.LatLng(-6.2945589, 106.7849192);

  const coodinates = arrCoordinates.map((coordinate) => {
    return new L.LatLng(coordinate.lat, coordinate.lng);
  });

  return (
    <MapContainer
      center={coodinates[0]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coodinates.map((coordinate, index) => {
        return <Marker key={index} position={coordinate} icon={icon} />;
      })}
    </MapContainer>
  );
};

export default MultipleMarkersMap;
