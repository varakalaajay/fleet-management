import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Devices() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const [devices, setDevices] = useState([]);

  useEffect(() => {
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
    listDevices();
  }, []);

  const columns = [
    { field: "device_id", headerName: "Device ID", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "createdAt", headerName: "Created At", width: 160 },
  ];

  return (
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
  );
}

export default Devices;
