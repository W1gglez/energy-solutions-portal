import React from 'react';
import EnergyCostForm from '../EnergyCostsPage/EnergyCostForm.jsx';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useSelector } from 'react-redux';
import EnergyCostCard from '../EnergyCostCard.jsx/EnergyCostCard.jsx';
import { Box } from '@mui/joy';
import ExitAssessmentButton from '../ExitAssesmentButton/ExitAssessmentButton.jsx';

//reports are commented out for testing purposes, will be uncommented when the reports are needed
function EnergyCost() {
  const history = useHistory();
  const energyCost = useSelector((store) => store.energyCost);

  const recordResponse = () => {
    history.push('/assessment/q1');
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
        <Typography level='h1'>Energy Cost</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-start', ml: 6 }}
      >
        <ExitAssessmentButton />
      </Grid>
      <Grid
        xs={12}
        container
        sx={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        {energyCost.electric ? <EnergyCostCard /> : <EnergyCostForm />}
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', mr: 6 }}
      >
        {energyCost.electric ? (
          <Button
            onClick={recordResponse}
            sx={{
              backgroundColor: '#008242',
              width: '25%',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={recordResponse}
            sx={{
              backgroundColor: '#008242',
              width: '25%',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}
            disabled
          >
            Next
          </Button>
        )}
      </Grid>
    </Box>
  );
}

export default EnergyCost;
