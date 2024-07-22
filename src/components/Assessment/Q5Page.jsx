import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import BackToReviewButton from '../BackToReviewButton.jsx/BackToReviewButton';

export default function Q5() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [isProgrammable, setIsProgrammable] = useState(
    responses.thermostat?.isProgrammable || 'false'
  );
  const [isProgrammed, setIsProgrammed] = useState(
    responses.thermostat?.isProgrammed || 'false'
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
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Grid
        xs={12}
        className='report-header'
        sx={{ py: 2, mb: 2 }}
      >
        <Typography level='h1'>Thermostats</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button onClick={handleExit}>Exit Assessment</Button>
        <BackToReviewButton
          payload={(responses['thermostat'] = { isProgrammable, isProgrammed })}
        />
      </Grid>
      <Grid
        container
        spacing={12}
        sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
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
              e.target.value === true
                ? setIsProgrammable(e.target.value)
                : setIsProgrammable(e.target.value),
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
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
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
    </Box>
  );
}
