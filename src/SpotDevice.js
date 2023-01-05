import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Map,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

import cities from "./cities.json";
import axios from "axios";
import swal from "sweetalert";

const markerIcon = new L.Icon({
  iconUrl: require("./img/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

function SpotDevice() {
  const [center, setCenter] = useState({ lat: 36.23, lng: -98.38 });
  const ZOOM_LEVEL = 5;
  const mapRef = useRef();  
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [location, setLocation] = useState({});
  const [dname, setDname] = useState('');

  useEffect(()=>{
    axios({
      method: 'post',
      url: 'http://174.138.121.17:8001/infinite/get_devices',
      headers: { 'Content-Type': 'application/octet-stream', 'x-token' : token, 'x-user': user },
      params: { 'device_id': 'Device03' },
      
  })
    .then((res) => {
      setDevices(res.data);
      
    })
  },[])
  

  const [position, setPosition] = useState([17.45, 78.38]);
  const handleChange = (event) => {
    setDname(event.target.value);
    axios({
      method: 'post',
      url: 'http://174.138.121.17:8001/infinite/get_gps',
      headers: { 'Content-Type': 'application/octet-stream', 'x-token' : token, 'x-user': user },
      params: { 'device_id': event.target.value },
      
  })
    .then((res) => {
      setCenter({ lat: res.data.lat, lng: res.data.long });
      setPosition([res.data.lat, res.data.long]);  
      setLocation(res.data);   
      console.log(res.data)
    })
  };
  /* const map = L.map("map").setView([40.725, -73.985], 13);
  map.on("click", function (e) {
    L.esri.Geocoding
      .reverseGeocode({
        apikey: ""
      })
      .latlng(e.latlng)
      .run(function (error, result) {
        if (error) {
          return;
        }

        L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
      });
  }); */

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "350",
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small">Select Device</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={dname}
                    label="Select Device"
                    onChange={handleChange}
                  >
                    { devices.map((device)=>{
                      return(<MenuItem value={ device.device_id }>
                      { device.device_id }
                    </MenuItem>)
                    })}
                    
                  </Select>
                </FormControl>
                  <Button variant="outlined" sx={{ mt: 1}}>Active</Button>
              </Box>
              <MapContainer style={{ width: "100%", height: "70vh" }} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              
              <Marker
                  position={position}
                  icon={markerIcon}
                >
                  <Popup>
                    <b>
                      Device ID :  {location.device_id} </b> <br/>
                     <b> TimeStamp : { location.timestamp }
                    </b>
                  </Popup>
                </Marker>

              {cities.map((city, idx) => (
                <Marker
                  position={[city.lat, city.lng]}
                  icon={markerIcon}
                  key={idx}
                >
                  <Popup>
                    <b>
                      {city.city}
                    </b>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
              {/* <MapContainer
                style={{ width: "100%", height: "60vh" }}
                zoom={7}
                center={position}
                scrollWheelZoom={true}
                fadeAnimation={true}
                markerZoomAnimation={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Device01 <br />
                    speed : 48kph
                    <br />
                    status: Enabled
                  </Popup>
                </Marker>
              </MapContainer> */}
            </Paper>
          </Grid>
        </Grid>
        <Footer sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}

export default SpotDevice;
