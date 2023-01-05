import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import RoomIcon from "@mui/icons-material/Room";
import HouseIcon from "@mui/icons-material/House";
import MapIcon from "@mui/icons-material/Map";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useLocation } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard"></ListItemText>
      </ListItemButton>
    </Link>
    <Link to="/add-device">
      <ListItemButton to="/add-device">
        <ListItemIcon>
          <DirectionsBusFilledIcon />
        </ListItemIcon>
        <ListItemText primary="Device Registration" />
      </ListItemButton>
    </Link>
    <ListItemButton to="/spot-device">
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText primary="Spot Device" />
    </ListItemButton>
    <ListItemButton to="/add-geofence">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Set Geo Fence" />
    </ListItemButton>
    <ListItemButton to="/logout">
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
