import { Button, Radio, RadioGroup, Grid, Typography } from '@mui/joy';
import Container from '@mui/joy/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function Q1() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [selectedValue, setSelectedValue] = useState(
    responses.Rush_of_air || false
  );

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const recordResponse = () => {
    console.log(selectedValue);
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['Rush_of_air'] = selectedValue),
    });
    history.push('/assessment/q2');
  };

  return (
    <Container sx={{ height: '75vh', alignContent: 'center' }}>
      <Button
        onClick={handleExit}
        sx={{ position: 'absolute', top: '10%', left: '8%' }}
      >
        Exit Assessment
      </Button>
      <Grid
        container
        spacing={16}
      >
        <Grid xs={12}>
          <Typography
            sx={{ textAlign: 'center' }}
            level='h4'
          >
            As the customer opens the entrance door: Are the doors hard to open
            and is there an in-rush of air coming into the restaurant?
          </Typography>
        </Grid>
        <Grid xs={12}>
          <RadioGroup
            value={selectedValue}
            orientation='horizontal'
            sx={{
              gap: 24,
              justifyContent: 'center',
              ':checked': { backgroundColor: 'red' },
            }}
            onChange={handleChange}
          >
            <Radio
              sx={{
                fontSize: '24px',
              }}
              label='Yes'
              value={true}
            />

            <Radio
              label='No'
              value={false}
              sx={{
                fontSize: '24px',
              }}
            />
          </RadioGroup>
        </Grid>
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'right' }}
        >
          <Button
            onClick={recordResponse}
            sx={{ width: '25%' }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
