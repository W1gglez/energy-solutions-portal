import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Grid, Input, Typography } from '@mui/joy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    user.admin === true
      ? history.push('/admin-home-page')
      : history.push('/home-page');
  }; // end login

  return (
    <form
      className='formPanel'
      onSubmit={login}
    >
      <Typography level='h3'>Login</Typography>
      {errors.loginMessage && (
        <h3
          className='alert'
          role='alert'
        >
          {errors.loginMessage}
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
              required
              value={username}
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
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Grid>
      </Grid>
      <div>
        <Button
          className='Button'
          sx={{
            backgroundColor: '#008242',
            '&:hover': {
              backgroundColor: '#00341a',
            },
          }}
          type='submit'
          name='submit'
          value='Log In'
        >
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
