import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@mui/joy/Modal';
import Box from '@mui/joy/Box';
import DialogTitle from '@mui/joy/DialogTitle';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ModalDialog from '@mui/joy/ModalDialog';
import { DialogContent, Link } from '@mui/joy';

function EnergyCostForm() {
  const [energyCost, setEnergyCost] = useState({});

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnergyCost({
      ...energyCost,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_ENERGY_COST', payload: energyCost });
    handleClose();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEnergyCost({
      electric: null,
      natural_gas: null,
      liquid_propane: null,
      gas_propane: null,
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Energy Costs</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalDialog>
          <DialogTitle>Monthly Energy Costs ($/kWh)</DialogTitle>
          <DialogContent>
            <Link
              sx={{ color: '#008242' }}
              href='https://www.nrg.com/resources/energy-tools/energy-conversion-calculator.html'
              target='_blank'
            >
              Energy Conversion Calculator
            </Link>
          </DialogContent>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={6}
              >
                <FormControl>
                  <FormLabel>Electric*</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    required
                    id='electric'
                    placeholder='Electric ($/kWh)'
                    name='electric'
                    type='number'
                    value={energyCost.electric || null}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl>
                  <FormLabel>Natural Gas*</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    required
                    id='natural_gas'
                    placeholder='Natural Gas  ($/kWh)'
                    name='natural_gas'
                    type='number'
                    value={energyCost.natural_gas || null}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl>
                  <FormLabel>Liquid Propane</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    id='liquid_propane'
                    placeholder='Liquid Propane  ($/kWh)'
                    name='liquid_propane'
                    type='number'
                    value={energyCost.liquid_propane || null}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl>
                  <FormLabel>Gas Propane</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    id='gas_propane'
                    placeholder='Gas Propane ($/kWh)'
                    name='gas_propane'
                    type='number'
                    value={energyCost.gas_propane || null}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                xs={12}
                sx={{ my: 1, justifyContent: 'space-around' }}
              >
                <Button
                  type='submit'
                  sx={{ px: 12 }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{ px: 12 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default EnergyCostForm;
