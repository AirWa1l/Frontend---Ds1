import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const SidebarItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItem
      button
      onClick={() => setSelected(title)}
      selected={selected === title}
      component={Link}
      to={to}
      sx={{
        color: selected === title ? "#6870fa" : colors.grey[100],
        "&:hover": {
          backgroundColor: colors.grey[700],
        },
      }}
    >
      {icon}
      <ListItemText primary={title} />
    </ListItem>
  );
};

const Sidebar = ({ userRole }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  if (userRole !== "admin") {
    return null; // No mostrar el Sidebar si el usuario no es admin
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: isCollapsed ? 60 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 60 : 240,
            boxSizing: "border-box",
            background: `${colors.primary[400]} !important`,
            color: colors.grey[100],
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon />
          </IconButton>
          {!isCollapsed && (
            <Typography variant="h6" color={colors.grey[100]}>
              ADMINIS
            </Typography>
          )}
        </Box>

        {!isCollapsed && (
          <Box mb="25px" display="flex" justifyContent="center" alignItems="center">
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={`../../assets/user.png`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>
        )}

        <List>
          <SidebarItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Manage Team"
            to="/team"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Contacts Information"
            to="/contacts"
            icon={<ContactsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Invoices Balances"
            to="/invoices"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
            Pages
          </Typography>

          <SidebarItem
            title="Profile Form"
            to="/form"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="FAQ Page"
            to="/faq"
            icon={<HelpOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
            Charts
          </Typography>

          <SidebarItem
            title="Bar Chart"
            to="/bar"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Pie Chart"
            to="/pie"
            icon={<PieChartOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Line Chart"
            to="/line"
            icon={<TimelineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <SidebarItem
            title="Geography Chart"
            to="/geography"
            icon={<MapOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
