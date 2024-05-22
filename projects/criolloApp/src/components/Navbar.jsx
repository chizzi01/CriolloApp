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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import { ControlledSwitches } from './Switch'
import '../../src/App.css'
import logo from '../assets/CRIOLL.png'
import avatarUrl from '../assets/avatar.jpg'


const drawerWidth = 240;
// const navItems = ['<Experiencia />', '<DevTools />', '<Portfolio />', '<Contacto />', <ControlledSwitches />];

const IniText = 'Tutoriales'   // Define el texto de la sección de Inicio
const ExpText = 'Practicas'  // Define el texto de la sección de Experiencia
const DevText = 'Novedades'  // Define el texto de la sección de DevTools
const PortText = 'Comunidad'  // Define el texto de la sección de Portfolio
const username = 'Usuario'




// Define el resto de los textos de la misma manera


export function DrawerAppBar({ window, currentSection }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // console.log(currentSection)

  const [isHovered, setIsHovered] = React.useState(false);
  // console.log(isHovered)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: 'linear-gradient(90deg, #0F0F0F 0.02%, rgba(0, 71, 255, 0.51) 99.99%)' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#FFF' }}>
        CRIOLLO
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
            <Button
              disableRipple
              onMouseEnter={(event) => { handlePopoverOpen(event); }}
            ><a className={currentSection === 'tutoriales-section' ? 'active' : ''} href="#avatar-section" >{IniText}</a>  <ExpandMoreIcon
                style={{
                  color: '#077647',
                  transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out'
                }}
              /></Button>
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
        <Popover
          id="mouse-over-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            onMouseLeave: handlePopoverClose,
            className: 'popover-content', // Aplica la clase CSS
          }}
        >
          <List>
            {[
              {
                primary: 'Introducción a las Finanzas',
                secondary: 'Descubre el camino hacia la libertad financiera',
              },
              {
                primary: 'Conceptos Básicos',
                secondary: 'Aprende conceptos básicos de finanzas y economía',
              },
              {
                primary: 'Conceptos Avanzados',
                secondary: 'Aprende conceptos avanzados de finanzas y economía',
              },
              {
                primary: 'Ahorros',
                secondary: 'Descubre cómo empezar a ahorrar de manera efectiva',
              },
              {
                primary: 'Inversiones',
                secondary: 'Explora oportunidades de inversión y aprende a hacer crecer tu dinero',
              },
            ].map((item, index) => (
              <ListItem key={index} className="list-item">
                {/* Aplica la clase CSS */}
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                  primaryTypographyProps={{ className: 'primary-text' }} // Aplica la clase CSS
                  secondaryTypographyProps={{ className: 'secondary-text' }} // Aplica la clase CSS
                />
              </ListItem>
            ))}
          </List>
          <Box className="tema-del-dia">
            {/* Aplica la clase CSS */}
            <Typography variant="subtitle1">Tema del día</Typography>
            <Box display="flex" alignItems="center">
              <img
                src="https://via.placeholder.com/50" // Reemplaza con la URL de tu imagen
                alt="Dólar MEP"
                className="tema-image" // Aplica la clase CSS
              />
              <Typography>Dólar MEP</Typography>
            </Box>
          </Box>
        </Popover>
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
