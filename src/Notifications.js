import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import swal from "sweetalert";
import axios from "axios";

export default function ScrollDialog() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  const [messages, setMessages] = useState({});

  const getNotifications = async () => {
    const getRes = await axios({
      method: "post",
      url: "http://54.226.199.64:8001/infinite/get_dtc",
      headers: {
        "Content-Type": "application/octet-stream",
        "x-token": token,
        "x-user": user,
      },
      params: { device_id: 1, count: 10 },
    });
    const listNotifications = getRes.data;
    setMessages(listNotifications);
  };
  useEffect(() => {
    getNotifications();
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClick = useCallback(
    (id) => () => {
      const delNotification = async () => {
        try {
          const delRes = await axios({
            method: "post",
            url: "http://54.226.199.64:8001/infinite/delete_dtc",
            headers: {
              "Content-Type": "application/octet-stream",
              "x-token": token,
              "x-user": user,
            },
            params: { device_id: 1, key: id },
          });

          swal({
            text: "Deleted",
            icon: "success",
            type: "success",
          });
          getNotifications();
        } catch (err) {
          if (err.delRes && err.delRes.data && err.delRes.data.errorMessage) {
            swal({
              text: err.delRes.data.errorMessage,
              icon: "error",
              type: "error",
            });
          }
        }
      };
      delNotification();
    },
    [messages]
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge color="error">
          <NotificationsIcon onClick={handleClickOpen} />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Notifications</DialogTitle>
        <DialogContent dividers={true}>
          <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid item xs={12} md={6}>
              <List dense={true}>
                {Object.entries(messages).map(([key, val]) => {
                  return (
                    <ListItem
                      key={key}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={handleClick(key)}
                          data-onclickparam={key}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={val.DTC_DESCRIPTION}
                        secondary={val.ts}
                      />
                      <Divider />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
