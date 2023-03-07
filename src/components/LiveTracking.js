import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import AirplaneMarker from "./AirplaneMarker";
import geopoints from "../../src/geo-locations.json";
import newGeoPoints from "../../src/newpoints.json";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { Box, Grid, Paper, Toolbar } from "@mui/material";
import axios from "axios";
import { Container } from "@mui/system";

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
  const [breach, setBreach] = useState(null);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  useEffect(() => {
    setCurrentTrack(geopoints[cursor]);

    const interval = setInterval(() => {
      const getDeviceLatLng = async () => {
        const gpsres = await axios({
          method: "post",
          url: "http://54.226.199.64:8001/infinite/get_gps",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-token": token,
            "x-user": user,
          },
          params: { device_id: "Device01", count: 1 },
        });
        setCurrentTrack({ lat: gpsres.data[0].lat, lng: gpsres.data[0].long });
      };
      const getGeofenceBreach = async () => {
        const breachres = await axios({
          method: "post",
          url: "http://54.226.199.64:8001/infinite/get_geofence_breach",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-token": token,
            "x-user": user,
          },
          params: { device_id: "1", count: 1 },
        });
        setBreach(breachres.data[0]);      
        
      };

      getDeviceLatLng();
      getGeofenceBreach();
      console.log(breach)
      /* if (cursor === geopoints.length - 1) {
        cursor = 0;
        setCurrentTrack(geopoints[cursor]);
        return;
      }
    
      cursor += 1;
      setCurrentTrack(geopoints[cursor]); */
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "350",
                }}
              > 
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
