import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import { Edit } from '@mui/icons-material';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

import EnergyCostCard from '../EnergyCostCard.jsx/EnergyCostCard';
import EquipmentCard from '../EquipmentCard/EquipmentCard';

export default function AssessmentReview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const energyCosts = useSelector((store) => store.energyCost);
  const date_submitted = new Date().toLocaleDateString();

  function calculateMonthlyCost() {
    return equipmentInv.reduce((sum, item) => {
      // Convert costPerMonth from string to number
      const cost = parseFloat(item.costPerMonth);
      // Add the cost to the accumulator
      return sum + cost;
    }, 0);
  }

  function calculateCarbonFootprint() {
    return equipmentInv.reduce((sum, item) => {
      // Convert costPerMonth from string to number
      const value = parseFloat(item.carbonFootprint);
      // Add the cost to the accumulator
      return sum + value;
    }, 0);
  }

  const submitAssessment = () => {
    const payload = {
      facility_id: responses.facilityId,
      current_monthly_cost: calculateMonthlyCost(),
      current_carbon_footprint: calculateCarbonFootprint(), //represented in (ton/yr)
      date_submitted,
      equipment: equipmentInv,
      // recommendations,
      energyCosts,
    };
    console.table(payload);
    // dispatch({ type: 'ADD_REPORT', payload: {} });
    // history.push('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        level='h1'
        sx={{ textAlign: 'center', position: 'relative', top: 0, mb: 3 }}
      >
        Assessment Review
      </Typography>
      <Box
        sx={{
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: 'center',
            my: 2,
          }}
          spacing={4}
        >
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between', p: 0 }}
            >
              <Grid xs>
                <Typography level='body-lg'>
                  As you enter, Are the doors hard to open and is there an
                  in-rush air coming into the restaurant?
                </Typography>
              </Grid>
              <Grid>
                <Typography level='title-lg'>
                  {responses.Rush_of_air === 'true' ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q1')}
            >
              <Edit />
            </IconButton>
          </Grid>
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Is there an electric heater in the entry way?
              </Typography>
              <Typography level='title-lg'>
                {responses.entry_heater.isEntryHeater === 'true' ? 'Yes' : 'No'}
              </Typography>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q2')}
            >
              <Edit />
            </IconButton>
            {responses.entry_heater.isEntryHeater === 'true' && (
              <Grid
                xs={10}
                container
                sx={{ justifyContent: 'space-between' }}
              >
                <Typography level='body-lg'>
                  If so, is the heater running?
                </Typography>
                <Typography level='title-lg'>
                  {responses.entry_heater.isRunning === 'true' ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid
                xs={10}
                sx={{ p: 0 }}
              >
                <Typography level='body-lg'>
                  Open the hot water faucet - How long does it take for the
                  water to get hot?
                </Typography>
              </Grid>

              <Typography level='title-lg'>{responses.hot_water}s</Typography>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q3')}
            >
              <Edit />
            </IconButton>
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Any leaks found in the bathroom?
              </Typography>
              <Typography level='title-lg'>
                {responses.restroom_leaks === 'true' ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Water heater temperature setting:
              </Typography>
              <Typography level='title-lg'>
                {responses.water_heater.tempSetting}°f
              </Typography>
              <Typography level='body-lg'>Water heater age:</Typography>
              <Typography level='title-lg'>
                {responses.water_heater.age} y/o
              </Typography>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q4')}
            >
              <Edit />
            </IconButton>
          </Grid>
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Are the thermostats on-site programmable?
              </Typography>
              <Typography level='title-lg'>
                {responses.thermostat.isProgrammable === 'true' ? 'Yes' : 'No'}
              </Typography>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q5')}
            >
              <Edit />
            </IconButton>
            {responses.thermostat.isProgrammable === 'true' && (
              <Grid
                xs={10}
                container
                sx={{ justifyContent: 'space-between' }}
              >
                <Typography level='body-lg'>
                  Have the thermostats been programmed properly?
                </Typography>
                <Typography level='title-lg'>
                  {responses.thermostat.isProgrammed === 'true' ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            xs={9}
            sx={{ justifyContent: 'space-between', p: 3 }}
          >
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Is the facility using LEDs?
              </Typography>
              <Typography level='title-lg'>
                {responses.lights.isLED === 'true' ? 'Yes' : 'No'}
              </Typography>
            </Grid>
            <IconButton
              size='sm'
              sx={{ color: 'darkgray' }}
              onClick={() => history.push('/assessment/q7')}
            >
              <Edit />
            </IconButton>
            <Grid
              xs={10}
              container
              sx={{ justifyContent: 'space-between' }}
            >
              <Typography level='body-lg'>
                Is the facility using motion sensors?
              </Typography>
              <Typography level='title-lg'>
                {responses.lights.motionSensor === 'true' ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: 'center',
          }}
        >
          <EnergyCostCard />
        </Grid>
        <Grid
          container
          sx={{ justifyContent: 'center', my: 2 }}
        >
          {equipmentInv.map((e, i) => (
            <EquipmentCard
              key={i}
              i={i}
              equipment={e}
            />
          ))}
        </Grid>
      </Box>
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
          onClick={submitAssessment}
          sx={{ width: '25%' }}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
}
