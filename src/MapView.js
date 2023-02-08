import React, { useRef } from "react";
import osm from "./osm-providers";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import cities from "./cities.json";
import LocationMarker from "./LocationMarker";

const markerIcon = new L.Icon({
  iconUrl: require("./img/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const MapView = (props) => {
    const { center, zoom, location, position } = props;
    const mapRef = useRef();
    console.log(zoom);

  return (
    <>
      <MapContainer
        style={{ width: "100%", height: "70vh" }}
        center={center}
        zoom={zoom}
        ref={mapRef}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />

        {position === null ? (
          cities.map((city, idx) => (
            <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
              <Popup>
                <b>{city.city}</b>
              </Popup>
            </Marker>
          ))
        ) : (
          <LocationMarker location={location} />
        )}
      </MapContainer>
    </>
  );
};

export default MapView;
