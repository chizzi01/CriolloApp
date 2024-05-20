import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ControlledSwitches } from './Switch'
import '../../src/App.css'
import logo from '../assets/CRIOLL.png'
import avatarUrl from '../assets/avatar.jpg'


const drawerWidth = 240;
// const navItems = ['<Experiencia />', '<DevTools />', '<Portfolio />', '<Contacto />', <ControlledSwitches />];

const IniText = 'Tutoriales v'   // Define el texto de la sección de Inicio
const ExpText = 'Practicas'  // Define el texto de la sección de Experiencia
const DevText = 'Novedades'  // Define el texto de la sección de DevTools
const PortText = 'Comunidad'  // Define el texto de la sección de Portfolio
const username = 'User'




// Define el resto de los textos de la misma manera


export function DrawerAppBar({ window, currentSection }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(currentSection)


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: 'linear-gradient(90deg, #0F0F0F 0.02%, rgba(0, 71, 255, 0.51) 99.99%)' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#FFF' }}>
        ACM
      </Typography>
      <Divider />
      <List className="navTextsHamburguer">
        <a href="#tutoriales-section">{IniText}</a>
        <a href="#practicas-section">{ExpText}</a>
        <a href="#novedades-section">{DevText}</a>
        <a href="#comunidad-section">{PortText}</a>
      </List>
      {/* <Button><ControlledSwitches onSwitch={toggleLanguage} /></Button> */}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;





  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav"
        sx={{
          background: 'linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(71,216,48,0.113676470588235) 50%, rgba(255,255,255,1) 66%);'
        }}>
        <Toolbar>
          <IconButton
            color="#077647"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={{ width: '4rem', height: '4rem', padding: '5px' }} />
          <Box className="navTexts" sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            button: {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}>
            <Button disableRipple onClick={handleClick}><a className={currentSection === 'tutoriales-section' ? 'active' : ''} href="#avatar-section" >{IniText}</a></Button>
            <Button disableRipple><a className={currentSection === 'practicas-section' ? 'active' : ''} href="#experiencia-section" >{ExpText}</a></Button>
            <Button disableRipple><a className={currentSection === 'novedades-section' ? 'active' : ''} href="#devtools-section" >{DevText}</a></Button>
            <Button disableRipple><a className={currentSection === 'comunidad-section' ? 'active' : ''} href="#proyectos-section" >{PortText}</a></Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex', padding: 5 } }}>
            <div className="user-badge">
              <img src={avatarUrl} alt="User Avatar" className="avatar" />
              <span className="username">{username}</span>
            </div>
          </Box>
        </Toolbar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Tutorial 1</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 2</MenuItem>
          <MenuItem onClick={handleClose}>Tutorial 3</MenuItem>
        </Menu>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'transparent',
              height: '100%',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
