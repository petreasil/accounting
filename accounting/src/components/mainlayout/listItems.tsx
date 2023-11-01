import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Invoices" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Bills" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Expanses" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArrowForwardIosIcon />
      </ListItemIcon>
      <ListItemText primary="Accounting" />
    </ListItemButton>
  </React.Fragment>
);
