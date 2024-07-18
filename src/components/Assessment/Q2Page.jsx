import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';

export default function Q2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const entryHeater = equipmentInv.find((e) => e.typeId === 17);

  const [isEntryHeater, setIsEntryHeater] = useState(
    responses.entry_heater?.isEntryHeater || false
  );
  const [isRunning, setIsRunning] = useState(
    responses.entry_heater?.isRunning || false
  );
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['entry_heater'] = {
        isEntryHeater,
        isRunning,
      }),
    });
    history.push('/assessment/q3');
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
        Entry Way
      </Typography>
      <Grid
        container
        spacing={8}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid xs={3}>
          <Typography
            sx={{ textAlign: 'center' }}
            level='h4'
          >
            Is there an electric heater?
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{ pl: 0 }}
        >
          <RadioGroup
            defaultValue={false}
            value={isEntryHeater}
            orientation='horizontal'
            sx={{
              gap: 18,
              justifyContent: 'center',
            }}
            onChange={(e) => {
              setIsEntryHeater(e.target.value);
              setOpen(e.target.value);
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
        {isEntryHeater === 'true' && (
          <>
            <EquipmentForm
              open={open}
              setOpen={setOpen}
              location={1}
              type={17}
              category={1}
            />
            {entryHeater && (
              <Grid
                container
                sx={{ justifyContent: 'center' }}
                xs={12}
              >
                <EquipmentCard equipment={entryHeater} />
              </Grid>
            )}
            <Grid xs={3}>
              <Typography
                sx={{ textAlign: 'center' }}
                level='h4'
              >
                Is the heater running?
              </Typography>
            </Grid>
            <Grid
              xs={3}
              sx={{ pl: 0 }}
            >
              <RadioGroup
                defaultValue={false}
                value={isRunning}
                orientation='horizontal'
                sx={{
                  gap: 18,
                  justifyContent: 'center',
                }}
                onChange={(e) => setIsRunning(e.target.value)}
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
          </>
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
