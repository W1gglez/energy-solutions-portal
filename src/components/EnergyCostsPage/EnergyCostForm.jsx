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

import { useParams } from 'react-router-dom';
import { EnergySavingsLeafSharp } from '@mui/icons-material';

function EnergyCostForm() {
  const [energyCost, setEnergyCost] = useState({
    // electric: '',
    // natural_gas: '',
    // liquid_propane: '',
    // gas_propane: '',
    // heating_oil: '',
  });
  const decimal = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
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
      heating_oil: null,
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
          <DialogTitle>Monthly Energy Costs (in dollars)</DialogTitle>
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
                  <FormLabel>Electric</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    required
                    id='electric'
                    placeholder='Electric'
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
                  <FormLabel>Natural Gas</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    required
                    id='natural_gas'
                    placeholder='Natural Gas'
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
                    placeholder='Liquid Propane'
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
                    placeholder='Gas Propane'
                    name='gas_propane'
                    type='number'
                    value={energyCost.gas_propane || null}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl>
                  <FormLabel>Heating Oil</FormLabel>
                  <Input
                    startDecorator={'$'}
                    slotProps={{ input: { step: '.001' } }}
                    id='heating_oil'
                    placeholder='Heating Oil'
                    name='heating_oil'
                    type='number'
                    value={energyCost.heating_oil || null}
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
