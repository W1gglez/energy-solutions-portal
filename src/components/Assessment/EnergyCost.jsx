import React from 'react';
import EnergyCostForm from '../EnergyCostsPage/EnergyCostForm.jsx';
import EnergyCostReport from '../EnergyCostsPage/EnergyCostReport.jsx';
import AdminEnergyCostReport from '../EnergyCostsPage/AdminEnergyCostReport.jsx';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useSelector } from 'react-redux';
import EnergyCostCard from '../EnergyCostCard.jsx/EnergyCostCard.jsx';

//reports are commented out for testing purposes, will be uncommented when the reports are needed
function EnergyCost() {
  const history = useHistory();
  const energyCost = useSelector((store) => store.energyCost);

  const recordResponse = () => {
    history.push('/assessment/q7');
  };

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
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
        sx={{ position: 'absolute', top: '10%', left: '43%' }}
      >
        Energy Cost
      </Typography>
      {/* <AdminEnergyCostReport /> */}
      {/* <EnergyCostReport /> */}
      <Grid
        xs={12}
        container
        sx={{ my: 8, justifyContent: 'center' }}
      >
        {energyCost.electric ? <EnergyCostCard /> : <EnergyCostForm />}
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          onClick={() => history.push('/assessment/additional-equipment')}
          sx={{ width: '25%' }}
        >
          Previous
        </Button>
        <Button
          onClick={recordResponse}
          sx={{ width: '25%' }}
        >
          Review
        </Button>
      </Grid>
    </Container>
  );
}

export default EnergyCost;
