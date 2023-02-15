import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const Map = () => {
  const [geofence, setGeofence] = useState(null);

  const onMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setGeofence([lat, lng]);
  };

  return (
    <LeafletMap
      center={[51.505, -0.09]}
      zoom={13}
      onClick={onMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {geofence && (
        <circle
          center={geofence}
          radius={300}
          stroke="blue"
          fill="blue"
          fillOpacity={0.2}
        />
      )}
    </LeafletMap>
  );
};

export default Map;