import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';

export default function Q6() {
  const history = useHistory();
  const dispatch = useDispatch();

  const equipmentInv = useSelector((store) => store.equipmentInv);
  const hvac = equipmentInv.filter(
    (e) => e.typeId === 18 || e.typeId === 14 || e.typeId === 15
  );
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    history.push('/assessment/q5');
  };

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
  };

  return (
    <Container sx={{ height: '75vh', alignContent: 'center' }}>
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
        Heating and Cooling Systems
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <EquipmentForm
          open={open}
          setOpen={setOpen}
          type={18}
          category={1}
        />
        {hvac && (
          <>
            {hvac.map((e) => (
              <EquipmentCard
                key={e.id}
                equipment={e}
              />
            ))}
          </>
        )}
        <Grid
          xs={8}
          sx={{ textAlign: 'center', py: 4 }}
        >
          <Button onClick={() => setOpen(true)}>Add HVAC System Details</Button>
        </Grid>
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
