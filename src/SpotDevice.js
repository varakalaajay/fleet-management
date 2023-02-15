import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import osm from "./osm-providers";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import cities from "./cities.json";
import axios from "axios";
import swal from "sweetalert";
import LocationMarker from "./LocationMarker";
import MapView from "./MapView";

const markerIcon = new L.Icon({
  iconUrl: require("./img/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

function SpotDevice() {
  const [center, setCenter] = useState({ lat: 36.23, lng: -98.38 });

  const mapRef = useRef();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [location, setLocation] = useState({});
  const [dname, setDname] = useState("");
  const [zoom, setZoom] = useState("5");
  const [status, setStatus] = useState(true);

  const getDevices = async () => {
    const devres = await axios({
      method: "post",
      url: "http://174.138.121.17:8001/infinite/get_devices",
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
  }, []);

  const [position, setPosition] = useState(null);

  const handleStatusChange = (e) => {
    e.preventDefault();
    const setDeviceStatus = async () => {
      const getStatus = status === true ? "DISABLED" : "ENABLED";
      const getstatusres = await axios.post(
        "http://174.138.121.17:8001/infinite/set_device",
        {
          device_id: "Device01",
          type: "TCU",
          status: getStatus ,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
            "x-user": user,
          },
        }
      );
      setStatus(!status);
      swal({
        text: getstatusres.data,
        icon: "success",
        type: "success",
      });
    };
    setDeviceStatus();
  };

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      setDname(e.target.value);
      setZoom("14");
      const getDeviceLatLng = async () => {
        const gpsres = await axios({
          method: "post",
          url: "http://174.138.121.17:8001/infinite/get_gps",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-token": token,
            "x-user": user,
          },
          params: { device_id: e.target.value, count: 1 },
        });
        setCenter({ lat: gpsres.data[0].lat, lng: gpsres.data[0].long });
        setPosition([gpsres.data[0].lat, gpsres.data[0].long]);
        setLocation({ lat: gpsres.data[0].lat, lng: gpsres.data[0].long });
      };
      getDeviceLatLng();
    },
    [zoom]
  );

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
                {position === null ? null : (
                  <>
                    {status === true ? (
                      <span style={{ margin: "10px" }}> Status: Active</span>
                    ) : (
                      <span style={{ margin: "10px" }}>Status: Deactive</span>
                    )}
                    {status === false ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 1 }}
                        onClick={handleStatusChange}
                      >
                        ENABLED
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 1 }}
                        onClick={handleStatusChange}
                      >
                        DISABLED
                      </Button>
                    )}

                    {/* <div>
                      <Button
                        variant="outlined"
                        disabled
                        size="small"
                        startIcon={<ThumbUpOffAltIcon />}
                        sx={{ mt: 1, mb: 1, mr: 4, ml: 1 }}
                      >
                        Enable
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ThumbDownOffAltIcon />}
                        sx={{ mt: 1, mb: 1 }}
                      >
                        Disable
                      </Button>
                    </div> */}
                  </>
                )}
              </Box>
              <MapView
                center={center}
                zoom={zoom}
                location={location}
                position={position}
              />
              {/* <MapContainer
                style={{ width: "100%", height: "70vh" }}
                center={center}
                zoom={zoom}
                ref={mapRef}
                scrollWheelZoom={true}
                fadeAnimation={true}
                markerZoomAnimation={true}
              >
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />

                {position === null ? (
                  cities.map((city, idx) => (
                    <Marker
                      position={[city.lat, city.lng]}
                      icon={markerIcon}
                      key={idx}
                    >
                      <Popup>
                        <b>{city.city}</b>
                      </Popup>
                    </Marker>
                  ))
                ) : (
                  <LocationMarker location={location} />
                )}
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
