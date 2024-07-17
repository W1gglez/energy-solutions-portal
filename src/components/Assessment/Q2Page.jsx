import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
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

export default function Q2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);
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
    <Container sx={{ height: '75vh', alignContent: 'center' }}>
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
                        {entryHeater.description ??
                          types[entryHeater.typeId - 1].type}
                      </DialogTitle>
                      <DialogTitle>Qty: {entryHeater.qty}</DialogTitle>
                    </Box>

                    <Typography>
                      {locations[entryHeater.locationId - 1].location}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography>Brand: {entryHeater.brand}</Typography>
                      <Typography>Model: {entryHeater.modelNumber}</Typography>
                      <Typography>SN: {entryHeater.serialNumber}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography>
                        Type: {categories[entryHeater.categoryId - 1].category}
                      </Typography>
                      {entryHeater.amps && (
                        <Typography>Amps: {entryHeater.amps}</Typography>
                      )}
                      {entryHeater.watts && (
                        <Typography>Watts: {entryHeater.watts}</Typography>
                      )}
                      {entryHeater.volts && (
                        <Typography>Volts: ${entryHeater.volts}</Typography>
                      )}
                      {entryHeater.kW && (
                        <Typography>Killowatts: {entryHeater.kW}</Typography>
                      )}
                      {entryHeater.btu && (
                        <Typography>BTUs: {entryHeater.btu}</Typography>
                      )}

                      <Typography>
                        Hours running per day: {entryHeater.hoursPerDay}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
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
