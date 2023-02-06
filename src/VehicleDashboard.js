import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import axios from "axios";

const VehicleDashboard = () => {
  const mapRef = useRef();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const [dname, setDname] = useState("");

  useEffect(() => {
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
    getDevices();
  }, []);

  /* const [position, setPosition] = useState(null); */

  const handleClick = useCallback(
    (id) => () => {
      const getAccelerometer = async () => {
        try {
          const acceRes = await axios({
            method: "post",
            url: "http://174.138.121.17:8001/infinite/get_accelerometer",
            headers: {
              "Content-Type": "application/octet-stream",
              "x-token": token,
              "x-user": user,
            },
            params: { device_id: id, count: 1 },
          });

          swal({
            text: acceRes.data,
            icon: "success",
            type: "success",
          });
        } catch (err) {
          if (
            err.acceRes &&
            err.acceRes.data &&
            err.acceRes.data.errorMessage
          ) {
            swal({
              text: err.acceRes.data.errorMessage,
              icon: "error",
              type: "error",
            });
          }
        }
      };
      const getGyroscope = async () => {
        try {
          const gyroRes = await axios({
            method: "post",
            url: "http://174.138.121.17:8001/infinite/get_gyroscope",
            headers: {
              "Content-Type": "application/octet-stream",
              "x-token": token,
              "x-user": user,
            },
            params: { device_id: id, count: 1 },
          });

          swal({
            text: gyroRes.data,
            icon: "success",
            type: "success",
          });
        } catch (err) {
          if (
            err.gyroRes &&
            err.gyroRes.data &&
            err.gyroRes.data.errorMessage
          ) {
            swal({
              text: err.gyroRes.data.errorMessage,
              icon: "error",
              type: "error",
            });
          }
        }
      };
      getAccelerometer();
      getGyroscope();
    },
    []
  );

  /* const handleChange = (e) => {
    e.preventDefault();
    setDname(e.target.value);
     const getDeviceLatLng = async () => {
      const gpsres = await axios({
        method: "post",
        url: "http://174.138.121.17:8001/infinite/get_gps",
        headers: {
          "Content-Type": "application/octet-stream",
          "x-token": token,
          "x-user": user,
        },
        params: { device_id: e.target.value, count: 0 },
      });
      
    };
    //getDeviceLatLng(); 
  }; */

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
                    onChange={handleClick("Device01")}
                    
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
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Footer sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default VehicleDashboard;
