import {
  Button,
  Radio,
  RadioGroup,
  Grid,
  Typography,
  Card,
  CardContent,
  DialogTitle,
  Box,
} from '@mui/joy';
import Container from '@mui/joy/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';

export default function Q2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);

  const [entryHeater, setEntryHeater] = useState(
    responses.entry_heater?.entryHeater || false
  );
  const [isRunning, setIsRunning] = useState(
    responses.entry_heater?.isRunning || false
  );
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['entry_heater'] = {
        entryHeater,
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
    <Container sx={{ height: '75vh', alignContent: 'center' }}>
      <Button
        onClick={handleExit}
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
            {equipmentInv[0] && (
              <Grid
                container
                sx={{ justifyContent: 'center' }}
                xs={12}
              >
                <Card
                  orientation='horizontal'
                  variant='outlined'
                  sx={{ width: '45vw' }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <DialogTitle>
                        {equipmentInv[0].description ??
                          types[equipmentInv[0].typeId - 1].type}
                      </DialogTitle>
                      <DialogTitle>Qty: {equipmentInv[0].qty}</DialogTitle>
                    </Box>

                    <Typography>
                      {locations[equipmentInv[0].locationId - 1].location}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography>Brand: {equipmentInv[0].brand}</Typography>
                      <Typography>
                        Model: {equipmentInv[0].modelNumber}
                      </Typography>
                      <Typography>
                        SN: {equipmentInv[0].serialNumber}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography>
                        Type:{' '}
                        {categories[equipmentInv[0].categoryId - 1].category}
                      </Typography>
                      {equipmentInv[0].amps && (
                        <Typography>Amps: {equipmentInv[0].amps}</Typography>
                      )}
                      {equipmentInv[0].watts && (
                        <Typography>Watts: {equipmentInv[0].watts}</Typography>
                      )}
                      {equipmentInv[0].volts && (
                        <Typography>Volts: ${equipmentInv[0].volts}</Typography>
                      )}
                      {equipmentInv[0].kW && (
                        <Typography>
                          Killowatts: {equipmentInv[0].kW}
                        </Typography>
                      )}
                      {equipmentInv[0].btu && (
                        <Typography>BTUs: {equipmentInv[0].btu}</Typography>
                      )}

                      <Typography>
                        Hours running per day: {equipmentInv[0].hoursPerDay}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
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
