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
import { ControlledSwitches } from './Switch'


const drawerWidth = 240;
// const navItems = ['<Experiencia />', '<DevTools />', '<Portfolio />', '<Contacto />', <ControlledSwitches />];

const IniText = localStorage.getItem('language') === 'es' ? '<Inicio />' : '<Home />'  // Define el texto de la sección de Inicio
const ExpText = localStorage.getItem('language') === 'es' ? '<Experiencia />' : '<Experience />' // Define el texto de la sección de Experiencia
const DevText = localStorage.getItem('language') === 'es' ? '<DevTools />' : '<DevTools />' // Define el texto de la sección de DevTools
const PortText = localStorage.getItem('language') === 'es' ? '<Portfolio />' : '<Portfolio />' // Define el texto de la sección de Portfolio
const ContText = localStorage.getItem('language') === 'es' ? '<Contacto />' : '<Contact />'



// Define el resto de los textos de la misma manera


export function DrawerAppBar({window, currentSection}) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(currentSection)
 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleLanguage = () => {
    localStorage.setItem('language') === 'es' ? localStorage.setItem('language', 'en') : localStorage.setItem('language', 'es')
    window.location.reload()
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: 'linear-gradient(90deg, #0F0F0F 0.02%, rgba(0, 71, 255, 0.51) 99.99%)' }}>
      <Typography variant="h6" sx={{ my: 2, color: '#FFF' }}>
        ACM
      </Typography>
      <Divider  />
      <List className="navTextsHamburguer">
        <a href="#avatar-section">{IniText}</a>
        <a href="#experiencia-section">{ExpText}</a>
        <a href="#devtools-section">{DevText}</a>
        <a href="#portfolio-section">{PortText}</a>
        <a style={{backgroundColor:"#6C8DFF"}} href="#contacto-section">{ContText}</a>
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
          background: 'linear-gradient(90deg, #0F0F0F 0.02%, rgba(0, 71, 255, 0.51) 99.99%)'
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ACM
          </Typography>
          <Box className="navTexts" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button><a className={currentSection === 'avatar-section' ? 'active' : ''} href="#avatar-section" >{IniText}</a></Button>
          <Button><a className={currentSection === 'experiencia-section' ? 'active' : ''} href="#experiencia-section" >{ExpText}</a></Button>
          <Button><a className={currentSection === 'devtools-section' ? 'active' : ''} href="#devtools-section" >{DevText}</a></Button>
          <Button><a className={currentSection === 'proyectos-section' ? 'active' : ''} href="#proyectos-section" >{PortText}</a></Button>
          <Button><a className={currentSection === 'contacto-section' ? 'active' : ''} style={{backgroundColor:"rgb(108 141 255 / 47%)", borderRadius:"12px"}} href="#contacto-section" >{ContText}</a></Button>
          {/* <Button><ControlledSwitches onSwitch={toggleLanguage}/></Button> */}

          </Box>
        </Toolbar>
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
