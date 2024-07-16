import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import MenuIcon from '@mui/icons-material/Menu';
import './Nav.css';
import { Divider } from '@mui/joy';
import { useHistory } from 'react-router-dom';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);

  const navHome = () => {
    console.log('nav button clicked');
    history.push('/home-page');
  };

  return (
    <div className='nav'>
      <IconButton variant='outlined' color='neutral' onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component='label'
            htmlFor='close-icon'
            fontSize='sm'
            fontWeight='lg'
            sx={{ cursor: 'pointer' }}
          ></Typography>
          <ModalClose id='close-icon' sx={{ position: 'initial' }} />
        </Box>
        <List
          size='lg'
          component='nav'
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
          }}
        >
          <ListItemButton onClick={navHome} sx={{ fontWeight: 'lg' }}>
            Home
          </ListItemButton>
          <ListItemButton>My Facilities</ListItemButton>
          <ListItemButton>My Reports</ListItemButton>
          <Divider />
          <ListItemButton>New Report</ListItemButton>
          <Divider />
          <ListItemButton onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</ListItemButton>
        </List>
      </Drawer>
      <Link to='/home'>
        <h2 className='nav-title'>Energy Solutions Portal</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {/* {!user.id && ( */}
        {/* // If there's no user, show login/registration links */}
        {/* //   <Link className='navLink' to='/login'> */}
        {/* // Login / Register */}
        {/* //   </Link>
        // )} */}
        {/* If a user is logged in, show these links */}
        {/* {user.id && (
          <>
            <Link className='navLink' to='/user'>
              Home
            </Link>

            <Link className='navLink' to='/info'>
              Info Page
            </Link>

            <LogOutButton className='navLink' />
          </>
        )}

        <Link className='navLink' to='/about'>
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
