import { AppBar,  Box, Button, Container, IconButton, Menu, MenuItem, Toolbar,  Typography } from '@material-ui/core';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import { useNavigate } from 'react-router-dom';
const pages = ['home','member list', 'add book'];

function NavBar() {
    const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigateToPage(page);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const navigateToPage = (page) => {
    if(page === "home"){
        navigate('/');
    }
    else{
    navigate('/'+page.split(' ').join('-'));
    }
  }
  return (
    <AppBar position="static" style={{ background: "red" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              getContentAnchorEl={null}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography className='typography' onClick={()=>navigateToPage(page)}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoStoriesRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{ color: 'white', fontSize: '20px', marginLeft: "30px" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
