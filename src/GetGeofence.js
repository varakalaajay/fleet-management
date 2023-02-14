import React, { useEffect, useState } from "react";

import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

/* var map = L.map('map').setView([51.505, -0.09], 13);
     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);
     // FeatureGroup is to store editable layers
     var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl); */

const GetGeofence = () => {
  const [center, setCenter] = useState({ lat: 37.350768, lng: -121.889488 });
  const [mapLayers, setMapLayers] = useState([]);
  const ZOOM_LEVEL = 6;
  const mapRef = useRef();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [location, setLocation] = useState({});
  const [position, setPosition] = useState([17.45, 78.38]);
  const [dname, setDname] = useState(null);


  const [polygons, setPolygons] = useState([]);

  const onEdited = (layers) => {
    //polygons that are changed are stored in changedPolys array
    const changedPolys = Object.values(layers._layers).map((layer) => {
      const latlngs = layer._latlngs[0].map((latlng) => {
        return [latlng.lat, latlng.lng];
      });
      return { id: layer.options.id, latlngs: latlngs };
    });
    
    console.log(changedPolys);
    debugger;
    //update state of all the polygons. replace polygons with changedPolys
    changedPolys.forEach((changedPoly) => {
      setPolygons((polygons) => {
        return polygons.map((polygon) => {
          if (polygon.id === changedPoly.id) {
            return { id: changedPoly.id, latlngs: changedPoly.latlngs };
          }          
          return polygon;
        });
      });
    });
  };

  const getDevices = async () => {
    const res = await axios({
      method: "post",
      url: "http://174.138.121.17:8001/infinite/get_devices",
      headers: {
        "Content-Type": "application/octet-stream",
        "x-token": token,
        "x-user": user,
      },
    });
    setDevices(res.data);
  };
  useEffect(() => {
    getDevices();
  }, []);

  const handleChange = (event) => {
    setDname(event.target.value);
    const getGeofenceLatLng = async () => {
      const { data } = await axios({
        method: "post",
        url: "http://174.138.121.17:8001/infinite/get_geofence",
        headers: {
          "Content-Type": "application/octet-stream",
          "x-token": token,
          "x-user": user,
        },
        params: { device_id: event.target.value },
      });
      const result = Object.values(data).map((coords) => {
        return coords.slice(1, -1).split(", ").map(Number);
      });

      setPolygons([{
        id: 1,
        latlngs: result,
      }]);
    };
    getGeofenceLatLng();
  };

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    console.log(layer);
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
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
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Device
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={dname}
                      label="Select Device"
                      size="small"
                      onChange={handleChange}
                    >
                      {devices.map((device) => {
                        return (
                          <MenuItem
                            value={device.device_id}
                            key={device.device_id}
                          >
                            {device.device_id}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                 {/*  <Button variant="contained" color="success" sx={{ mt: 1 }}>
                    Submit
                  </Button> */}
                </Box>

                {dname === null ? null : (
                  <MapContainer
                    style={{ width: "100%", height: "70vh" }}
                    center={center}
                    zoom={ZOOM_LEVEL}
                    ref={mapRef}
                  >
                    <FeatureGroup>
                      <EditControl
                        position="topright"
                        onCreated={_onCreate}
                        onEdited={(e) => onEdited(e.layers)}
                        onDeleted={_onDeleted}
                        draw={{
                          rectangle: false,
                          polyline: false,
                          circle: false,
                          circlemarker: false,
                          marker: false,
                        }}
                      />

                      {polygons?.map((polygon) => {
                        return (
                          <Polygon
                            key={polygon.id}
                            id={polygon.id}
                            positions={polygon.latlngs}
                            pathOptions={{
                              color: polygon.id === 1 ? "red" : "blue",
                            }}
                          />
                        );
                      })}
                    </FeatureGroup>
                    <TileLayer
                      url={osm.maptiler.url}
                      attribution={osm.maptiler.attribution}
                    />
                  </MapContainer>
                )}
              </Paper>
              {/* <pre className="text-left">
                  {JSON.stringify(mapLayers, 0, 2)}
                </pre> */}
            </Grid>
          </Grid>
          <Footer sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default GetGeofence;
