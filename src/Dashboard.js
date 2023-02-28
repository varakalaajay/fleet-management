import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Footer from "./Footer";
import img2 from "./img/dashboard.png";
import { useMap } from "react-leaflet/hooks";
import { MapContainer } from "react-leaflet/MapContainer";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import osm from "./osm-providers";
import L from "leaflet";
import {
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import PageOne from "./pages/PageOne";
import LiveTrackingMap from "./pages/PageTwo";
import LiveTracking from "./components/LiveTracking";

function MyComponent() {
  const markerIcon = new L.Icon({
    iconUrl: require("./img/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  const [position, setPosition] = React.useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here
      <b>Device ID :  </b> <br />
                <b> TimeStamp :</b>
      </Popup>      
    </Marker>
  );
}

const Dashboard = () => {
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
       {/*  <Grid
          container
          spacing={3}
          sx={{
            height: "80vh",
          }}
        >
          <MapContainer
            center={[36, -98]}
            zoom={13}
            style={{ width: "100%", height: "70vh" }}
            scrollWheelZoom={true}
            fadeAnimation={true}
            markerZoomAnimation={true}
          >
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
              opacity={0.5}
              zIndex={10}
            />
            <ZoomControl position="bottomright" />
            <MyComponent />
            
          </MapContainer>
        </Grid> */}
        {/* <Grid
          container
          spacing={3}>          
          <PageOne />
          </Grid> */}
        {/* <Grid
          container
          spacing={3}>          
          <LiveTracking />
          </Grid>
        <Grid
          container
          spacing={3}>          
          <LiveTrackingMap />
          </Grid> */}
        <Grid
          container
          spacing={3}
          sx={{
            backgroundImage: `url(${img2})`,
            backgroundRepeat: "no-repeat",
            height: "80vh",
          }}
        ></Grid>
        <Footer sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Dashboard;
