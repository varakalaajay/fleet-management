import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer as Map, Marker, useMap, TileLayer } from "react-leaflet";
const markerIcon = new L.Icon({
    iconUrl: require("../../src/img/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
const AnimatedMarker = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const map = useMap();
  useEffect(() => {
    

    const interval = setInterval(() => {
      const newPosition = [
        position[0] + Math.random() - 0.5,
        position[1] + Math.random() - 0.5
      ];
      setPosition(newPosition);
      map.locate().on("locationfound", function (e) {
        map.flyTo(position, map.getZoom());
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [position]);

  return <Marker position={position} icon={markerIcon}></Marker>;
};

const PageOne = () => {
  return (
    <Map center={[51.505, -0.09]} zoom={13} style={{ width: "100%", height: "70vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <AnimatedMarker />
    </Map>
  );
};

export default PageOne;
