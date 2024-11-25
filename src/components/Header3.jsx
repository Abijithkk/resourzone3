import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/lOGO RESOURZONE.svg';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('resourceZone_token');
    navigate('/login');
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/login');
    setAnchorEl(null);
  };

  return (
    <AppBar  className='header3' position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <Link to="/dashboard">
            <img src={logo} alt="Logo" height="40" style={{ marginRight: 10 }} />
          </Link>
          
        </Box>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Button  component={Link} to="/users" sx={{ color: 'black' }}>
              Users
            </Button>
            <Button component={Link} to="/enquiries" sx={{ color: 'black' }}>
              Enquiries
            </Button>
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        ) : (
          // Mobile Menu Button
          <IconButton edge="end" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Account Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Mobile Navigation Drawer */}
        {isMobile && mobileMenuOpen && (
          <Box
            position="absolute"
            top="60px"
            left="0"
            width="100%"
            bgcolor="white"
            boxShadow={3}
            zIndex={10}
            p={2}
          >
            <Button component={Link} to="/users" fullWidth sx={{ color: 'black' }}>
              Users
            </Button>
            <Button component={Link} to="/enquiries" fullWidth sx={{ color: 'black' }}>
              Enquiries
            </Button>
            <Button fullWidth sx={{ color: 'black' }} onClick={handleLogin}>
              Login
            </Button>
            <Button fullWidth sx={{ color: 'black' }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
