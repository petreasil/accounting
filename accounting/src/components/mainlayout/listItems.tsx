import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";

interface itemProps {
  item: string;
}

const ListItems = ({ item }: itemProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate(`/home/${item.toLowerCase()}`)}>
        <ListItemIcon>
          <ArrowForwardIosIcon />
        </ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListItems;
