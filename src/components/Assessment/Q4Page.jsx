import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import BackToReviewButton from '../BackToReviewButton.jsx/BackToReviewButton';

export default function Q4() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const waterHeater = equipmentInv.find((e) => e.typeId === 8);
  const waterHeaterIndex = equipmentInv.findIndex((e) => e.typeId === 8);

  const [tempSetting, setTempSetting] = useState(
    responses?.water_heater?.tempSetting || undefined
  );
  const [age, setAge] = useState(responses?.water_heater?.age || undefined);
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['water_heater'] = {
        tempSetting,
        age,
      }),
    });
    history.push('/assessment/q5');
  };

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
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
        <Typography level='h1'>Water Heater</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button onClick={handleExit}>Exit Assessment</Button>
        <BackToReviewButton
          payload={
            (responses['water_heater'] = {
              tempSetting,
              age,
            })
          }
        />
      </Grid>

      <Grid
        container
        spacing={8}
        sx={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Grid container>
          <Grid xs={4}>
            <Typography
              sx={{ textAlign: 'right' }}
              level='h4'
            >
              Temperature setting:
            </Typography>
          </Grid>
          <Grid
            xs={2}
            sx={{ pl: 0 }}
          >
            <Input
              value={tempSetting}
              type='number'
              slotProps={{ input: { min: 0 } }}
              endDecorator={'°f'}
              onChange={(e) => setTempSetting(e.target.value)}
              required
            />
          </Grid>
          <Grid xs={3}>
            <Typography
              sx={{ textAlign: 'right' }}
              level='h4'
            >
              Water Heater Age:
            </Typography>
          </Grid>
          <Grid
            xs={2}
            sx={{ pl: 0 }}
          >
            <Input
              value={age}
              type='number'
              slotProps={{ input: { min: 0 } }}
              endDecorator={'yr/s'}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <EquipmentForm
          open={open}
          setOpen={setOpen}
          type={8}
          category={2}
          location={12}
          unit={4}
        />
        {waterHeater ? (
          <Grid
            container
            sx={{ justifyContent: 'center' }}
            xs={12}
          >
            <EquipmentCard
              equipment={waterHeater}
              i={waterHeaterIndex}
            />
          </Grid>
        ) : (
          <Grid
            container
            xs={12}
            sx={{ justifyContent: 'center' }}
          >
            <Button onClick={() => setOpen(true)}>
              Add Water Heater Details
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/q3')}
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
