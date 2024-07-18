import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function Q5() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [isProgrammable, setIsProgrammable] = useState(
    responses.thermostat?.isProgrammable || false
  );
  const [isProgrammed, setIsProgrammed] = useState(
    responses.thermostat?.isProgrammed || false
  );

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
  };

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['thermostat'] = { isProgrammable, isProgrammed }),
    });
    history.push('/assessment/q6');
  };

  return (
    <Container sx={{ height: '78vh', alignContent: 'center' }}>
      <Button
        onClick={handleExit}
        sx={{ position: 'absolute', top: '10%', left: '8%' }}
      >
        Exit Assessment
      </Button>
      <Typography
        level='h1'
        sx={{ position: 'absolute', top: '10%', left: '43vw' }}
      >
        Thermostats
      </Typography>
      <Grid
        container
        spacing={12}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid xs={4.25}>
          <Typography
            level='h4'
            sx={{ textAlign: 'center' }}
          >
            Are the thermostats programmable?
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{ pl: 0 }}
        >
          <RadioGroup
            value={isProgrammable}
            orientation='horizontal'
            sx={{
              gap: 18,
              justifyContent: 'center',
            }}
            onChange={(e) => {
              setIsProgrammable(e.target.value);
            }}
          >
            <Radio
              sx={{
                fontSize: '24px',
              }}
              label='Yes'
              value={true}
            />

            <Radio
              sx={{
                fontSize: '24px',
              }}
              label='No'
              value={false}
            />
          </RadioGroup>
        </Grid>
        {isProgrammable === 'true' && (
          <Grid
            container
            xs={12}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Grid xs={4}>
              <Typography
                level='h4'
                sx={{ textAlign: 'center' }}
              >
                If programmable, are they setup?
              </Typography>
            </Grid>
            <Grid
              xs={3}
              sx={{ pl: 0 }}
            >
              <RadioGroup
                value={isProgrammed}
                orientation='horizontal'
                sx={{
                  gap: 18,
                  justifyContent: 'center',
                }}
                onChange={(e) => {
                  setIsProgrammed(e.target.value);
                }}
              >
                <Radio
                  sx={{
                    fontSize: '24px',
                  }}
                  label='Yes'
                  value={true}
                />

                <Radio
                  sx={{
                    fontSize: '24px',
                  }}
                  label='No'
                  value={false}
                />
              </RadioGroup>
            </Grid>
          </Grid>
        )}
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => history.push('/assessment/q4')}
            sx={{ width: '25%' }}
          >
            Previous
          </Button>
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
