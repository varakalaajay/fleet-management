import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import AirplaneMarker from "./AirplaneMarker";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { Container } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let cursor = 0;
export default function LiveTracking() {
  const [currentTrack, setCurrentTrack] = useState({
    lat: 40.2974883,
    lng: -82.2067383,
  });
  const [breach, setBreach] = useState(null);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [dname, setDname] = useState("");
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);

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
      const timestamp1 = Date.parse(gpsres.data[0].ts);
      console.log(timestamp1, "time stamp1");
      setTime1(timestamp1);
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

      const timestamp2 = Date.parse(breachres.data[0].ts);
      console.log(timestamp2, "time stamp2");
      setTime2(timestamp2);
      setBreach(breachres.data[0]);
    };
    const interval = setInterval(() => {
      
      getDeviceLatLng();
      getGeofenceBreach();

      if (time1 === time2) {
        const date = new Date(time2);
        const reversedTimestamp = date.toLocaleString();
        toast(`${dname} crossed the geofence at ${reversedTimestamp}`);
      }

      /* if (cursor === geopoints.length - 1) {
        cursor = 0;
        setCurrentTrack(geopoints[cursor]);
        return;
      }
    
      cursor += 1;
      setCurrentTrack(geopoints[cursor]); */
    }, 5000);
   
    console.log(time1, time2);
    return () => {
      clearInterval(interval);
    };
  }, [dname, time2, time1]);

  const handleChange = (e) => {
    e.preventDefault();
    setDname(e.target.value);
    toast(`${e.target.value} Location Changed`);
  };

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
        {" "}
        <ToastContainer />
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
