import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, useMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const markerIcon = new L.Icon({
  iconUrl: require("../../src/img/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
function LiveTrackingMap() {
  const [markerPosition, setMarkerPosition] = useState([36.505, -120.09]); // initial marker position
  const map = useMap();

  useEffect(() => {
    // fetch GPS data from backend service in real-time and update marker position
    const interval = setInterval(() => {
      // example code to update marker position
      const newMarkerPosition = [
        36.51 + Math.random() * 0.1,
        -120.09 + Math.random() * 0.1,
      ];
      setMarkerPosition(newMarkerPosition);
      map.locate().on("locationfound", function (e) {
        map.flyTo(markerPosition, map.getZoom());
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Marker position={markerPosition} icon={markerIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

const PageTwo = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={14}
      style={{ width: "100%", height: "70vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <LiveTrackingMap />
    </MapContainer>
  );
};

export default PageTwo;
