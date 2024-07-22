import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/joy';


function LoginPage() {
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
      <LoginForm />

      <center>
        <Button
          type="button"
          className="Button"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </Box>
  );
}

export default LoginPage;
