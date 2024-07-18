import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Box from '@mui/joy/Box';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';

export default function Q4() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const waterHeater = equipmentInv.find((e) => e.typeId === 8);

  const [tempSetting, setTempSetting] = useState(
    responses.water_heater?.tempSetting || null
  );
  const [age, setAge] = useState(responses.water_heater?.age || null);
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
    <Container sx={{ height: '79vh', alignContent: 'center' }}>
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
        Water Heater
      </Typography>
      <Grid
        container
        spacing={8}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
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
        />
        {waterHeater ? (
          <Grid
            container
            sx={{ justifyContent: 'center' }}
            xs={12}
          >
            <EquipmentCard equipment={waterHeater} />
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
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => history.goBack()}
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
