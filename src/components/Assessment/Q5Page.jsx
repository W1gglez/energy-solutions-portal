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
import ExitAssessmentButton from '../ExitAssesmentButton/ExitAssessmentButton';

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
        <ExitAssessmentButton />
        <BackToReviewButton
          payload={(responses['thermostat'] = { isProgrammable, isProgrammed })}
        />
      </Grid>
      <Grid
        container
        spacing={12}
        sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Grid xs={5}>
          <Typography sx={{ fontSize: 24, textAlign: 'center' }}>
            Are the thermostats programmable?
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{ pl: 0, alignContent: 'center' }}
        >
          <RadioGroup
            value={isProgrammable}
            orientation='horizontal'
            sx={{
              gap: 18,
              justifyContent: 'center',
              '&>span': { fontSize: 24 },
            }}
            onChange={(e) => {
              e.target.value === true
                ? setIsProgrammable(e.target.value)
                : setIsProgrammable(e.target.value),
                setIsProgrammed(e.target.value);
            }}
          >
            <Radio
              label='Yes'
              value={true}
            />

            <Radio
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
            <Grid xs={5}>
              <Typography sx={{ fontSize: 24, textAlign: 'center' }}>
                If programmable, are they setup?
              </Typography>
            </Grid>
            <Grid
              xs={3}
              sx={{ pl: 0, alignContent: 'center' }}
            >
              <RadioGroup
                value={isProgrammed}
                orientation='horizontal'
                sx={{
                  gap: 18,
                  justifyContent: 'center',
                  '&>span': { fontSize: 24 },
                }}
                onChange={(e) => {
                  setIsProgrammed(e.target.value);
                }}
              >
                <Radio
                  label='Yes'
                  value={true}
                />

                <Radio
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
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
            fontSize: 16,
            py: 1,
          }}
        >
          Previous
        </Button>
        <Button
          onClick={recordResponse}
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
            fontSize: 16,
            py: 1,
          }}
        >
          Next
        </Button>
      </Grid>
    </Box>
  );
}
