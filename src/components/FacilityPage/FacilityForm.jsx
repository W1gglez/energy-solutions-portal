import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Typography,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Option,
  ModalDialog,
  Grid,
  Box,
  DialogTitle,
} from '@mui/joy';

function FacilityForm() {
  const [facilityInfo, setFacilityInfo] = useState({
    facilityName: '',
    facilityAddress: '',
    facilityState: '',
    facilityZip: '',
    facilityYearsInBusiness: '',
    facilityBuildingAge: '',
    facilityHoursOfOperation: '',
    facilityNumberOfGuests: '',
    facilitySitDownRestaurant: '',
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacilityInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event, newValue) => {
    setFacilityInfo((prevState) => ({
      ...prevState,
      facilitySitDownRestaurant: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      name: facilityInfo.facilityName,
      address: facilityInfo.facilityAddress,
      city: facilityInfo.facilityCity,
      state: facilityInfo.facilityState,
      zip: facilityInfo.facilityZip,
      years_in_business: parseFloat(facilityInfo.facilityYearsInBusiness, 10),
      building_age: parseFloat(facilityInfo.facilityBuildingAge, 10),
      hours_of_operation: parseFloat(facilityInfo.facilityHoursOfOperation, 10),
      weekly_customers: parseFloat(facilityInfo.facilityNumberOfGuests, 10),
      sit_down: facilityInfo.facilitySitDownRestaurant === 'Yes',
    };
    try {
      dispatch({ type: 'ADD_FACILITY', payload: submissionData });
      setFacilityInfo({
        facilityName: '',
        facilityAddress: '',
        facilityCity: '',
        facilityState: '',
        facilityZip: '',
        facilityYearsInBusiness: '',
        facilityBuildingAge: '',
        facilityHoursOfOperation: '',
        facilityNumberOfGuests: '',
        facilitySitDownRestaurant: '',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error updating Facility', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFacilityInfo({
      facilityName: '',
      facilityAddress: '',
      facilityCity: '',
      facilityState: '',
      facilityZip: '',
      facilityYearsInBusiness: '',
      facilityBuildingAge: '',
      facilityHoursOfOperation: '',
      facilityNumberOfGuests: '',
      facilitySitDownRestaurant: '',
    });
    setOpen(false);
  };

  return (
    <Grid
      container
      sx={{ justifyContent: 'center' }}
    >
      <Button
        onClick={handleOpen}
        style={{ margin: '40px' }}
      >
        Enter New Facility
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <ModalDialog>
          <DialogTitle id='modal-title'>Add Facility Information</DialogTitle>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={10}
              >
                <FormControl fullWidth>
                  <FormLabel>Facility Name</FormLabel>
                  <Input
                    placeholder='Facility Name'
                    name='facilityName'
                    value={facilityInfo.facilityName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Facility Address</FormLabel>
                  <Input
                    placeholder='Facility Address'
                    name='facilityAddress'
                    value={facilityInfo.facilityAddress}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Facility City</FormLabel>
                  <Input
                    placeholder='Facility City'
                    name='facilityCity'
                    value={facilityInfo.facilityCity}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <FormControl fullWidth>
                  <FormLabel>State</FormLabel>
                  <Input
                    placeholder='State'
                    name='facilityState'
                    value={facilityInfo.facilityState}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <FormControl fullWidth>
                  <FormLabel>Zip</FormLabel>
                  <Input
                    placeholder='Zip'
                    name='facilityZip'
                    value={facilityInfo.facilityZip}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <FormControl fullWidth>
                  <FormLabel>Years in Business</FormLabel>
                  <Input
                    placeholder='Years in Business'
                    name='facilityYearsInBusiness'
                    type='number'
                    value={facilityInfo.facilityYearsInBusiness}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Building Age</FormLabel>
                  <Input
                    placeholder='Building Age'
                    name='facilityBuildingAge'
                    type='number'
                    value={facilityInfo.facilityBuildingAge}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Hours of Operation per week</FormLabel>
                  <Input
                    placeholder='Hours of Operation per week'
                    name='facilityHoursOfOperation'
                    type='number'
                    value={facilityInfo.facilityHoursOfOperation}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Number of Guests per week</FormLabel>
                  <Input
                    placeholder='Number of Guests per week'
                    name='facilityNumberOfGuests'
                    type='number'
                    value={facilityInfo.facilityNumberOfGuests}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <FormControl fullWidth>
                  <FormLabel>Sit Down Restaurant</FormLabel>
                  <Select
                    value={facilityInfo.facilitySitDownRestaurant}
                    onChange={handleSelectChange}
                    placeholder='Select Option'
                    required
                    sx={{ height: 41 }}
                  >
                    <Option value='Yes'>Yes</Option>
                    <Option value='No'>No</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                xs={12}
                sx={{ mt: 2, justifyContent: 'space-between' }}
              >
                <Grid xs>
                  <Button
                    type='submit'
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid xs>
                  <Button
                    color='warning'
                    fullWidth
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ModalDialog>
      </Modal>
    </Grid>
  );
}

export default FacilityForm;
