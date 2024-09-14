import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  Container,
  Paper,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FiMenu,
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiBell,
  FiMail,
  FiLogOut,
  FiTrendingUp,
  FiDollarSign,
  FiShoppingCart,
  FiCheckSquare,
} from "react-icons/fi";
import ButtonComponent from "../../../../component/Core/ButtonComponent";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate("/login");
    setAnchorEl(null);
  };

  const menuItems = [
    { text: "Dashboard", icon: <FiHome /> },
    { text: "Posts", icon: <FiFileText /> },
    { text: "Users", icon: <FiUsers /> },
    { text: "Settings", icon: <FiSettings /> },
  ];

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <FiMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          <IconButton color="inherit" size="large">
            <FiMail />
          </IconButton>
          <IconButton color="inherit" size="large">
            <FiBell />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            <MenuItem onClick={handleClose}>
              <FiLogOut style={{ marginRight: "8px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={sidebarOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Dashboard</Typography>
        </Breadcrumbs>
        <Container maxWidth="lg">
          <Box container spacing={3}>
            {/* Summary Cards */}
            <Box item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <FiUsers size={40} color={theme.palette.primary.main} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total Users
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  1,234
                </Typography>
              </Paper>
            </Box>
            <Box item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <FiDollarSign size={40} color={theme.palette.secondary.main} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Revenue
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  $56,789
                </Typography>
              </Paper>
            </Box>
            <Box item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <FiShoppingCart size={40} color={theme.palette.error.main} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  New Orders
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  23
                </Typography>
              </Paper>
            </Box>
            <Box item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <FiCheckSquare size={40} color={theme.palette.success.main} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Pending Tasks
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  7
                </Typography>
              </Paper>
            </Box>

            {/* Recent Activity */}
            <Box item xs={12} md={6}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <FiTrendingUp style={{ marginRight: "8px" }} />
                  Recent Activity
                </Typography>
                <List>
                  {[
                    "User John Doe logged in",
                    "New order received",
                    "Payment processed",
                    "New user registered",
                  ].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={text}
                        secondary={`${index + 1} hour${
                          index !== 0 ? "s" : ""
                        } ago`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>

            {/* Quick Actions */}
            <Box item xs={12} md={6}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <FiSettings style={{ marginRight: "8px" }} />
                  Quick Actions
                </Typography>
                <Box container spacing={2}>
                  <Box item xs={12} sm={6}>
                    <ButtonComponent
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<FiUsers />}
                    >
                      Add New User
                    </ButtonComponent>
                  </Box>
                  <Box item xs={12} sm={6}>
                    <ButtonComponent
                      variant="contained"
                      color="secondary"
                      fullWidth
                      startIcon={<FiFileText />}
                    >
                      Create Invoice
                    </ButtonComponent>
                  </Box>
                  <Box item xs={12} sm={6}>
                    <ButtonComponent
                      variant="contained"
                      color="warning"
                      fullWidth
                      startIcon={<FiTrendingUp />}
                    >
                      Generate Report
                    </ButtonComponent>
                  </Box>
                  <Box item xs={12} sm={6}>
                    <ButtonComponent
                      variant="contained"
                      color="info"
                      fullWidth
                      startIcon={<FiShoppingCart />}
                    >
                      Update Inventory
                    </ButtonComponent>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
