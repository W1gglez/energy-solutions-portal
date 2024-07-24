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

export default function AdditionalEquipment() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);

  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['inReview'] = true),
    });
    history.push('/assessment/review');
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
        <Typography level='h1'>Additional Equipment</Typography>
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
        />

        <Grid
          container
          sx={{
            maxHeight: '500px',
            width: '50vw',
            overflow: 'auto',
            justifyContent: 'center',
          }}
        >
          {equipmentInv.map((e, i) => (
            <EquipmentCard
              key={i}
              i={i}
              equipment={e}
            />
          ))}
        </Grid>
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
            }}>Add Equipment</Button>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/q7')}
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
          Review
        </Button>
      </Grid>
    </Box>
  );
}
