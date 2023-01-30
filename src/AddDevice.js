import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Devices from "./Devices";


function AddDevice() {
  const [deviceID, setDeviceID] = React.useState("");
  const [type, setType] = React.useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleAdd = (event) => {
    event.preventDefault();
    const addDevice = async () => {
      try {
        const response = await axios.post(
          "http://174.138.121.17:8001/infinite/create_device",
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
          text: response.data,
          icon: "success",
          type: "success",
        });
        setDeviceID("");
        setType("");
        navigate("/add-device");
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
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
                Add Device
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
                  label="Device ID"
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
                  Register Device
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Devices />
          </Grid>
        </Grid>
      </Container>
    </Box>
    
  );
}

export default AddDevice;
