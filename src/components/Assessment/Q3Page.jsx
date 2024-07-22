import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import BackToReviewButton from '../BackToReviewButton.jsx/BackToReviewButton';
import ExitAssessmentButton from '../ExitAssesmentButton/ExitAssessmentButton';

export default function Q3() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [lengthOfTime, setLengthOfTime] = useState(
    responses.hot_water || undefined
  );
  const [selectedValue, setSelectedValue] = useState(
    responses.restroom_leaks || 'false'
  );

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
  };

  const handleChange = (e) => {
    setLengthOfTime(e.target.value);
  };

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload:
        ((responses['hot_water'] = lengthOfTime ?? 0),
        (responses['restroom_leaks'] = selectedValue)),
    });
    history.push('/assessment/q4');
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
        <Typography level='h1'>Restrooms</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <ExitAssessmentButton />
        <BackToReviewButton
          payload={
            ((responses['hot_water'] = lengthOfTime),
            (responses['restroom_leaks'] = selectedValue))
          }
        />
      </Grid>
      <Grid
        container
        spacing={12}
        sx={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Grid xs={6.5}>
          <Typography
            level='h4'
            sx={{ textAlign: 'center' }}
          >
            Open the hot water faucet - How long does it take for the water to
            get hot?
          </Typography>
        </Grid>
        <Grid
          xs={1.5}
          sx={{ pl: 0 }}
        >
          <Input
            value={lengthOfTime}
            type='number'
            slotProps={{ input: { min: 0 } }}
            onChange={handleChange}
            endDecorator={'s'}
            required
          />
        </Grid>
        <Grid
          container
          xs={12}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Grid xs={5.5}>
            <Typography
              level='h4'
              sx={{ textAlign: 'center' }}
            >
              Any leaks found around toilets, urinals, or faucets?
            </Typography>
          </Grid>
          <Grid
            xs={3}
            sx={{ pl: 0 }}
          >
            <RadioGroup
              value={selectedValue}
              orientation='horizontal'
              sx={{
                gap: 18,
                justifyContent: 'center',
              }}
              onChange={(e) => {
                setSelectedValue(e.target.value);
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
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/q2')}
          sx={{ width: '25%' }}
        >
          Previous
        </Button>
        {responses.hot_water ? (
          <Button
            onClick={recordResponse}
            sx={{ width: '25%' }}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={recordResponse}
            sx={{ width: '25%' }}
            disabled
          >
            Next
          </Button>
        )}
      </Grid>
    </Box>
  );
}
