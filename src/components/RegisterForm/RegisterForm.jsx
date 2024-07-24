import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Input, Typography } from '@mui/joy';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form
      className='formPanel'
      onSubmit={registerUser}
    >
      <Typography level='h3'>Register User</Typography>
      {errors.registrationMessage && (
        <h3
          className='alert'
          role='alert'
        >
          {errors.registrationMessage}
        </h3>
      )}
      <Grid
        container
        spacing={1}
        sx={{ m: 2 }}
      >
        <Grid
          container
          xs={12}
        >
          <label
            htmlFor='username'
            style={{ flex: 1 }}
          >
            Username:
            <Input
              type='text'
              name='username'
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </Grid>
        <Grid
          container
          xs={12}
        >
          <label
            htmlFor='password'
            style={{ flex: 1 }}
          >
            Password:
            <Input
              type='password'
              name='password'
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Grid>
      </Grid>
      <div>
        <Button
          sx={{
            backgroundColor: '#008242',
            '&:hover': {
              backgroundColor: '#00341a',
            },
          }}
          type='submit'
          name='submit'
          value='Register'
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
