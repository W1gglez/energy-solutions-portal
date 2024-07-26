import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import FaciliytSelect from '../Assessment/FacilitySelect';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [openFacilitySelect, setOpenFacilitySelect] = useState(false);

  const navHome = () => {
    if (user.admin === true) {
      history.push('/admin-home-page');
    } else {
      history.push('/home-page');
    }
    setOpen(false);
  };

  const navFacilities = () => {
    if (user.admin === true) {
      history.push('/admin-facilities');
    } else {
      history.push('/facilities');
    }
    setOpen(false);
  };

  const newReport = () => {
    setOpenFacilitySelect(true);
    setOpen(false);
  };

  const navReports = () => {
    if (user.admin === true) {
      history.push('/admin-reports');
    } else {
      history.push('/user-reports');
    }
    setOpen(false);
  };

  return (
    <>
      {user.id && user.admin ? (
        <div className='nav'>
          <IconButton sx={{ marginLeft: 2, color: '#1F1C4C' }} onClick={() => setOpen(true)}>
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
              <ListItemButton onClick={navFacilities}>View All Facilities</ListItemButton>
              <ListItemButton onClick={navReports}>View All Reports</ListItemButton>
              <Divider />
              <ListItemButton onClick={newReport}>Start New Report</ListItemButton>
              <Divider />
              <ListItemButton
                onClick={() => {
                  dispatch({ type: 'LOGOUT' });
                  setOpen(false);
                }}
              >
                Log Out
              </ListItemButton>
            </List>
          </Drawer>
          <Link to='/admin-home-page'>
            <h2 className='nav-title'>Energy Solutions Portal</h2>
          </Link>
          <FaciliytSelect open={openFacilitySelect} setOpen={setOpenFacilitySelect} />
        </div>
      ) : (
        <div className='nav'>
          <IconButton sx={{ marginLeft: 2 }} onClick={() => setOpen(true)}>
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
              <ListItemButton onClick={navFacilities}>My Facilities</ListItemButton>
              <ListItemButton onClick={navReports}>My Reports</ListItemButton>
              <Divider />
              <ListItemButton onClick={newReport}>New Report</ListItemButton>
              <Divider />
              <ListItemButton
                onClick={() => {
                  dispatch({ type: 'LOGOUT' });
                  setOpen(false);
                }}
              >
                Log Out
              </ListItemButton>
            </List>
          </Drawer>
          <Link to='/home-page'>
            <h2 className='nav-title'>Energy Solutions Portal</h2>
          </Link>
          <FaciliytSelect open={openFacilitySelect} setOpen={setOpenFacilitySelect} />
        </div>
      )}
      {/* {!user.id && (
        <div className='nav'>
          <h2 className='nav-title'>Energy Solutions Portal</h2>

          <Link
            className='navLink'
            to='/about'
          >
            About
          </Link>
          <Link
            className='navLink'
            to='/login'
          >
            Login / Register
          </Link>
        </div>
      )} */}
    </>
  );
}

export default Nav;
