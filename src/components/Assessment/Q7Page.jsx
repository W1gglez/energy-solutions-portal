import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import { Maximize } from '@mui/icons-material';

export default function Q7() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);

  const lights = equipmentInv.filter((e) => e.typeId === 9);

  const [isLED, setisLED] = useState(responses.lights?.isLED || false);
  const [motionSensor, setmotionSensor] = useState(
    responses.lights?.motionSensor || false
  );
  const [open, setOpen] = useState(false);

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
  };

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['lights'] = { isLED, motionSensor }),
    });
    // history.push('/assessment/additional-equipment');
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
        sx={{ position: 'absolute', top: '10%', left: '47vw' }}
      >
        Lights
      </Typography>
      <Grid
        container
        spacing={8}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid xs={4}>
          <Typography
            level='h4'
            sx={{ textAlign: 'center' }}
          >
            Is the facility using LED lightbulbs?
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{ pl: 0 }}
        >
          <RadioGroup
            value={isLED}
            orientation='horizontal'
            sx={{
              gap: 18,
              justifyContent: 'center',
            }}
            onChange={(e) => {
              setisLED(e.target.value);
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
              Are motion sensors being used?
            </Typography>
          </Grid>
          <Grid
            xs={3}
            sx={{ pl: 0 }}
          >
            <RadioGroup
              value={motionSensor}
              orientation='horizontal'
              sx={{
                gap: 18,
                justifyContent: 'center',
              }}
              onChange={(e) => {
                setmotionSensor(e.target.value);
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
        <EquipmentForm
          open={open}
          setOpen={setOpen}
          type={9}
          category={1}
        />
        {lights && (
          <Grid
            sx={{ p: 0, maxHeight: '246px', width: '50vw', overflow: 'auto' }}
          >
            {lights.map((e) => (
              <EquipmentCard
                key={e.id}
                equipment={e}
              />
            ))}
          </Grid>
        )}
        <Grid
          xs={8}
          sx={{ textAlign: 'center', py: 4 }}
        >
          <Button onClick={() => setOpen(true)}>Add Light Details</Button>
        </Grid>
        <Grid
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => history.push('/assessment/q6')}
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
