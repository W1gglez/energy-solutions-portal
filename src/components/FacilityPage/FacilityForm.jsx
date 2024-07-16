import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, Input, Select, FormControl, FormLabel, Option } from '@mui/joy';

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
	const [option, setOption] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFacilityInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// const handleOptions = (e) => {
	// 	const { name, value } = e.target;
	// 	setFacilityInfo((prevState) => ({
	// 		...prevState,
	// 		[name]: value,
	// 	}));
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		const submissionData = {
			name: facilityInfo.facilityName,
			address: facilityInfo.facilityAddress,
			state: facilityInfo.facilityState,
			zip: facilityInfo.facilityZip,
			years_in_business: parseFloat(facilityInfo.facilityYearsInBusiness, 10),
			building_age: parseFloat(facilityInfo.facilityBuildingAge, 10),
			hours_of_operation: parseFloat(facilityInfo.facilityHoursOfOperation, 10),
			weekly_customers: parseFloat(facilityInfo.facilityNumberOfGuests, 10),
			sit_down: facilityInfo.facilitySitDownRestaurant === 'true',
		};
		try {
			dispatch({ type: 'ADD_FACILITY', payload: submissionData });
			alert('Facility Information Submitted');
			setFacilityInfo({
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
			setOpen(false);
		} catch (error) {
			console.error('Error updating Facility', error);
			alert('Error updating Facility');
		}
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Button variant='outlined' onClick={handleOpen}>
				Enter New Facility
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'lightgreen',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id='modal-title' level='h4'>
						Add Facility Information
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityName'
							placeholder='Facility Name'
							label='facilityName'
							name='facilityName'
							type='text'
							value={facilityInfo.facilityName}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityAddress'
							placeholder='Facility Address'
							label='facilityAddress'
							name='facilityAddress'
							type='text'
							value={facilityInfo.facilityAddress}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityState'
							placeholder='State'
							label='facilityState'
							name='facilityState'
							type='text'
							value={facilityInfo.facilityState}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityZip'
							placeholder='Zip'
							label='facilityZip'
							name='facilityZip'
							type='text'
							value={facilityInfo.facilityZip}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityYearsInBusiness'
							placeholder='Years in Business'
							label='facilityYearsInBusiness'
							name='facilityYearsInBusiness'
							type='number'
							value={facilityInfo.facilityYearsInBusiness}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityBuildingAge'
							placeholder='Building Age'
							label='facilityBuildingAge'
							name='facilityBuildingAge'
							type='number'
							value={facilityInfo.facilityBuildingAge}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityHoursOfOperation'
							placeholder='Hours of Operation per week'
							label='facilityHoursOfOperation'
							name='facilityHoursOfOperation'
							type='number'
							value={facilityInfo.facilityHoursOfOperation}
							onChange={handleChange}
							autoFocus
						/>
						<Input
							margin='normal'
							required
							fullWidth
							id='facilityNumberOfGuests'
							placeholder='Number of Guests per week'
							label='facilityNumberOfGuests'
							name='facilityNumberOfGuests'
							type='number'
							value={facilityInfo.facilityNumberOfGuests}
							onChange={handleChange}
							autoFocus
						/>
						{/* <FormControl>
						<FormLabel>Select Option</FormLabel>
						<Select
							value={option}
							onChange={handleOptions}
							placeholder="Select Option"
						>
							<Option value="Yes">Yes</Option>
							<Option value="No">No</Option>
						</Select>
					</FormControl> */}

						<Button type='submit'>Submit</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

export default FacilityForm;
