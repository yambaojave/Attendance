import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./consts/navbarListItems";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../pages/imports";

const Navbar = () => {
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const fetchRole = async () => {
      const response = await axios.get(api.url + "/api/Login/GetRole", {
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });
      setRole(response.data);
    }

    fetchRole();

  }, []);

  const navigate = useNavigate();

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems
        .filter((item) => {
          return item.roles.includes(role);
        })
        .map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => navigate(item.route)}>
              <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
