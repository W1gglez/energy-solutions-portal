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

export default function Q1() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [selectedValue, setSelectedValue] = useState(
    responses.Rush_of_air || 'false'
  );

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['Rush_of_air'] = selectedValue),
    });
    history.push('/assessment/q2');
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
        <Typography level='h1'>Entry Way</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <ExitAssessmentButton />
        <BackToReviewButton
          payload={(responses['Rush_of_air'] = selectedValue)}
        />
      </Grid>
      <Grid
        container
        spacing={12}
        sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Grid xs={8}>
          <Typography sx={{ fontSize: 28, textAlign: 'center' }}>
            Are the doors hard to open and is there an in-rush of air coming
            into the restaurant when opened?
          </Typography>
        </Grid>
        <Grid xs={12}>
          <RadioGroup
            value={selectedValue}
            orientation='horizontal'
            sx={{
              gap: 24,
              justifyContent: 'center',
              '&>span': { fontSize: '28px' },
            }}
            onChange={handleChange}
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
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/energy-cost')}
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
            fontSize: 16,
            px: 2.5,
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
