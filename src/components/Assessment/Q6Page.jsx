import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import ExitAssessmentButton from '../ExitAssesmentButton/ExitAssessmentButton';

export default function Q6() {
  const history = useHistory();
  const dispatch = useDispatch();

  const equipmentInv = useSelector((store) => store.equipmentInv);
  const hvac = equipmentInv.filter(
    (e) =>
      e.typeId === 18 || e.typeId === 14 || e.typeId === 15 || e.typeId === 12
  );
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    history.push('/assessment/q7');
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
        <Typography level='h1'>Heating & Cooling</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-start', mx: 6 }}
      >
        <ExitAssessmentButton />
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <EquipmentForm
          open={open}
          setOpen={setOpen}
          type={18}
          category={1}
        />
        {hvac && (
          <Grid
            container
            sx={{
              maxHeight: '500px',
              width: '50vw',
              overflow: 'auto',
              justifyContent: 'center',
            }}
          >
            {hvac.map((e, i) => (
              <EquipmentCard
                key={i}
                i={i}
                equipment={e}
              />
            ))}
          </Grid>
        )}
        <Grid
          xs={8}
          sx={{ textAlign: 'center', py: 4 }}
        >
          <Button onClick={() => setOpen(true)}
            sx={{
              backgroundColor: '#008242',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}
            >Add HVAC System Details</Button>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/q5')}
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
          }}        >
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
          }}        >
          Next
        </Button>
      </Grid>
    </Box>
  );
}
