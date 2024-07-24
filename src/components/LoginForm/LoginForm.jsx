import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button } from '@mui/joy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
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
    history.push('/home-page');
  }; // end login

  return (
    <form
      className='formPanel'
      onSubmit={login}
    >
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3
          className='alert'
          role='alert'
        >
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor='username'>
          Username:
          <input
            type='text'
            name='username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          Password:
          <input
            type='password'
            name='password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
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
