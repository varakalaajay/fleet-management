import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import AirplaneMarker from "./AirplaneMarker";
import geopoints from "../../src/geo-locations.json";
import newGeoPoints from "../../src/newpoints.json";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { Box, Toolbar } from "@mui/material";

const dataStory = [
  {
    lat: 53.22376666666667,
    lng: 50.745841666666664,
  },
  {
    lat: 53.22376666666667,
    lng: 50.745841666666664,
  },
  {
    lat: 53.223728333333334,
    lng: 50.74598666666667,
  },
  {
    lat: 53.223705,
    lng: 50.746021666666664,
  },
  {
    lat: 53.22365166666667,
    lng: 50.746075,
  },
];

let cursor = 0;
export default function LiveTracking() {
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {
    setCurrentTrack(geopoints[cursor]);

    const interval = setInterval(() => {
      if (cursor === geopoints.length - 1) {
        cursor = 0;
        setCurrentTrack(geopoints[cursor]);
        return;
      }

      cursor += 1;
      setCurrentTrack(geopoints[cursor]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
      <Toolbar />
      <MapContainer
        style={{ height: "calc(100vh - 52px)" }}
        center={[22.2974883, 73.2067383]}
        zoom={17}
        minZoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AirplaneMarker data={currentTrack ?? {}} />
      </MapContainer>
    </Box>
  );
}
