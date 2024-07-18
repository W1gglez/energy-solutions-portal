import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';

export default function AdditionalEquipment() {
  const history = useHistory();
  const dispatch = useDispatch();

  const equipmentInv = useSelector((store) => store.equipmentInv);

  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    history.push('/assessment/energy-cost');
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
        sx={{ position: 'absolute', top: '10%', left: '33%' }}
      >
        Additional Equipment
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <EquipmentForm
          open={open}
          setOpen={setOpen}
        />

        <Grid sx={{ maxHeight: '500px', width: '50vw', overflow: 'auto' }}>
          {equipmentInv.map((e, i) => (
            <EquipmentCard
              key={i}
              equipment={e}
            />
          ))}
        </Grid>
        <Grid
          xs={8}
          sx={{ textAlign: 'center', py: 4 }}
        >
          <Button onClick={() => setOpen(true)}>Add Equipment</Button>
        </Grid>
        <Grid
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => history.push('/assessment/q5')}
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
