import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: require("./img/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

function LocationMarker({ location }) {
  //const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();
  //map.locate().on("locationfound", function (e) {
    //setPosition(location);
    //map.flyTo(location, map.getZoom(14));
    /* const radius = e.accuracy;
    const circle = L.circle(location, radius);
    circle.addTo(map); */
  //  setBbox(e.bounds.toBBoxString().split(","));
  //});

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      //setPosition(location);
      map.flyTo(location, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(location, radius);
      // circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [location]);

  return location === null ? null : (
    <Marker position={location} icon={markerIcon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
