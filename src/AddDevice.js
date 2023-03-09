import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

function AddDevice() {
  const [deviceID, setDeviceID] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [devices, setDevices] = useState([]);
  const columns = [
    { field: "device_id", headerName: "Device ID", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 160 },
  ];

  const listDevices = async () => {
    try {
      const resp = await axios({
        method: "post",
        url: "http://54.226.199.64:8001/infinite/get_devices",
        headers: {
          "Content-Type": "application/octet-stream",
          "x-token": token,
          "x-user": user,
        },
        params: { device_id: "Device03" },
      });

      setDevices(resp.data);
    } catch (err) {
      if (err) {
        swal({
          text: err,
          icon: "error",
          type: "error",
        });
      }
    }
  };
  useEffect(()=>{
    listDevices();

  },[])

  const handleAdd = (event) => {
    event.preventDefault();
    const addDevice = async () => {
      debugger;
      try {
        const response = await axios.post(
          "http://54.226.199.64:8001/infinite/create_device",
          {
            device_id: deviceID,
            type: type,
            status: "ENABLED",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-token": token,
              "x-user": user,
            },
          }
        );
        
        swal({
          text: "Vehicle Registered Success",
          icon: "success",
          type: "success",
        });
        setDeviceID("");
        setType("");
        listDevices();
        navigate("/add-device");
      } catch (err) {
        if (
          err.response &&
          err.response.data
        ) {
          swal({
            text: err.response.data,
            icon: "error",
            type: "error",
          });
        }
      }
    };

    addDevice();
  };
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
          <Grid item xs={5}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "350",
              }}
            >
              <Typography component="h1" variant="h5">
                Add Vehicle
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleAdd}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Vehicle ID"
                  type="text"
                  id="device_id"
                  name="deviceid"
                  value={deviceID}
                  onChange={(e) => setDeviceID(e.target.value)}
                  autoComplete="off"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  type="text"
                  id="type"
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register Vehicle
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "350",
              }}
            >
              <Typography component="h1" variant="h5">
                List of Vehicles
              </Typography>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={devices}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AddDevice;
