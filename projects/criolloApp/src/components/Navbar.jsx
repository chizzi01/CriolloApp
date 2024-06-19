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
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
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


export default function DrawerAppBar({ window, currentSection }) {
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
          background: '#FFF',
        }}
        >
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
          <Link to="/">
          <img src={logo} alt="Logo" style={{ width: '4rem', height: '4rem', padding: '5px' }} />
          </Link>
          <Box className="navTexts" sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            button: {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}>
            <Link to="/tutoriales">
              <Button
                disableRipple
                onMouseEnter={(event) => { handlePopoverOpen(event); }}
                style={{outline: 'none'}}
              ><p className={currentSection === 'tutoriales-section' ? 'active' : ''}  >{IniText}</p>  <ExpandMoreIcon
                  style={{
                    color: '#077647',
                    transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                /></Button>
            </Link>
            <Link to="/practicas">
              <Button style={{outline: 'none'}} disableRipple><p className={currentSection === 'practicas-section' ? 'active' : ''}  >{ExpText}</p></Button>
            </Link>
            <Link to="/novedades">
              <Button  style={{outline: 'none'}} disableRipple><p className={currentSection === 'novedades-section' ? 'active' : ''}>
                {DevText}
              </p> </Button>
            </Link>
            <Link to="/comunidad">
              <Button  style={{outline: 'none'}} disableRipple><p className={currentSection === 'comunidad-section' ? 'active' : ''}  >{PortText}</p></Button>
            </Link>
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
                secondary: 'Explora oportunidades de inversión y aprende a hacer crecer tu dinero (Cedears, FIMA, Bonos, Cripto)',
              },
            ].map((item, index) => (
              <div key={index} className='list-card'>
                <Link to="/inversiones">
                <ListItem key={index} className="list-item">
                  {/* Aplica la clase CSS */}
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    primaryTypographyProps={{ className: 'primary-text' }} // Aplica la clase CSS
                    secondaryTypographyProps={{ className: 'secondary-text' }} // Aplica la clase CSS
                  />
                </ListItem>
                </Link>
              </div>
            ))}
          </List>
          <Box className="tema-del-dia">
            <h1 className='temaDia-title'>Tema del día</h1>
            <Box display="flex" alignItems="center">
              <h3 className='temaDia-subtitle'>Dólar MEP</h3>
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
