import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button, Box } from '@mui/joy';
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box
    sx={
      {
        alignContent: 'center',
        flex: 1,
      }
    }
    >
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="Button"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </Box>
  );
}

export default RegisterPage;
