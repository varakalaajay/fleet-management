import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import AirplaneMarker from "./AirplaneMarker";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Toolbar } from "@mui/material";
import axios from "axios";
import { Container } from "@mui/system";

let cursor = 0;
export default function LiveTracking() {
  const [currentTrack, setCurrentTrack] = useState({lat: 40.2974883, lng: -82.2067383});
  const [breach, setBreach] = useState(null);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [dname, setDname] = useState("");

  const getDevices = async () => {
    const devres = await axios({
      method: "post",
      url: "http://54.226.199.64:8001/infinite/get_devices",
      headers: {
        "Content-Type": "application/octet-stream",
        "x-token": token,
        "x-user": user,
      },
    });
    setDevices(devres.data);
  };

  useEffect(() => {
    getDevices();
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
          params: { device_id: dname, count: 1 },
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
          params: { device_id: dname, count: 1 },
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
  }, [dname]);

  const handleChange = (e)=>{
    e.preventDefault();
    setDname(e.target.value);
  }

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
              <FormControl sx={{ m: 1, width: 200 }} size="small">
                  <InputLabel id="demo-select-small">Select Device</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={dname}
                    label="Select Device"
                    size="small"
                    onChange={handleChange}
                  >
                    {devices.map((device) => {
                      const { device_id, status } = device;

                      return (
                        <MenuItem value={device_id} key={device_id}>
                          {device_id}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <MapContainer
                  style={{ height: "calc(100vh - 52px)" }}
                  center={[40.2974883, -82.2067383]}
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
