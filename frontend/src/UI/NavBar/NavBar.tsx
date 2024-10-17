import {AppBar, Toolbar, Container, Typography, Box, Grid} from '@mui/material';
import cocktailsAppLogo from '../../assets/images/cocktailsAppLogo.png';
import {NavLink} from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSlice';
import UserMenu from './UserMenu';

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="static" sx={{backgroundColor: '#fff', mb: 3, p: .5, boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.1)'}}>
      <Toolbar>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box component={NavLink} to="/" display="flex" alignItems="center" sx={{textDecoration: 'none', color: '#fff', cursor: 'pointer'}}>
                <img src={cocktailsAppLogo} alt="Logo" style={{width: 65, height: 65, marginRight: 10, borderRadius: '10px'}}/>
                <Typography variant="h5" color='#000' fontWeight='bold' component="span">
                  Коктейли
                </Typography>
              </Box>
            </Grid>
            {user ? (<UserMenu user={user}/>): (<AnonymousMenu />)}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;