import { Button, Radio, RadioGroup, Grid, Typography } from '@mui/joy';
import Container from '@mui/joy/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';

export default function Q2() {
  const history = useHistory();
  const dispatch = useDispatch();
  const responses = useSelector((store) => store.responses);
  const [entryHeater, setEntryHeater] = useState(
    responses.entry_heater || false
  );
  const [isRunning, setIsRunning] = useState(responses.isRunning || false);
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    console.log(selectedValue);
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['entry_heater'] = {
        entryHeater,
        isRunning,
      }),
    });
    // history.push('/assessment/q3');
  };

  return (
    <Container sx={{ height: '75vh', alignContent: 'center' }}>
      <Button
        onClick={() => history.push('/')}
        sx={{ position: 'absolute', top: '10%', left: '8%' }}
      >
        Exit Assessment
      </Button>
      <Grid
        container
        spacing={8}
      >
        <Grid xs={12}>
          <Typography
            sx={{ textAlign: 'center' }}
            level='h4'
          >
            Still in the front entry area: Is there an electric heater?
          </Typography>
        </Grid>
        <Grid xs={12}>
          <RadioGroup
            defaultValue={false}
            value={entryHeater}
            orientation='horizontal'
            sx={{
              gap: 24,
              justifyContent: 'center',
            }}
            onChange={(e) => {
              setEntryHeater(e.target.value);
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
        {entryHeater === 'true' && (
          <>
            <EquipmentForm
              open={open}
              setOpen={setOpen}
            />
            <Grid xs={12}>
              <Typography
                sx={{ textAlign: 'center' }}
                level='h4'
              >
                Is the heater running?
              </Typography>
            </Grid>
            <Grid xs={12}>
              <RadioGroup
                defaultValue={false}
                value={isRunning}
                orientation='horizontal'
                sx={{
                  gap: 24,
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
