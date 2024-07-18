import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, Input, Button, Grid, FormControl, FormLabel } from '@mui/joy';
import { useParams } from 'react-router-dom';

function EnergyCostForm() {
	const { report_id } = useParams();
	const [energyCost, setEnergyCost] = useState({
		electric: '',
		natural_gas: '',
		liquid_propane: '',
		gas_propane: '',
		heating_oil: '',
	});
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEnergyCost((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const submissionData = {
			report_id: report_id,
			electric: parseFloat(energyCost.electric, 10),
			natural_gas: parseFloat(energyCost.natural_gas, 10),
			liquid_propane: parseFloat(energyCost.liquid_propane, 10),
			gas_propane: parseFloat(energyCost.gas_propane, 10),
			heating_oil: parseFloat(energyCost.heating_oil, 10),
		};
		try {
			dispatch({ type: 'ADD_ENERGY_COST', payload: submissionData });
			alert('Energy Costs Submitted');
			setEnergyCost({
				electric: '',
				natural_gas: '',
				liquid_propane: '',
				gas_propane: '',
				heating_oil: '',
			});
			handleClose();
		} catch (error) {
			console.error('Error updating Energy Costs', error);
			alert('Error updating Energy Costs');
		}
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'white',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	return (
		<>
			<Button variant='outlined' onClick={handleOpen}>
				Add Energy Costs
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography level='h4'>Monthly Energy Costs (in dollars)</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel>Electric</FormLabel>
									<Input
										required
										id='electric'
										placeholder='Electric'
										name='electric'
										type='number'
										value={energyCost.electric}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel>Natural Gas</FormLabel>
									<Input
										required
										id='natural_gas'
										placeholder='Natural Gas'
										name='natural_gas'
										type='number'
										value={energyCost.natural_gas}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel>Liquid Propane</FormLabel>
									<Input
										required
										id='liquid_propane'
										placeholder='Liquid Propane'
										name='liquid_propane'
										type='number'
										value={energyCost.liquid_propane}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel>Gas Propane</FormLabel>
									<Input
										required
										id='gas_propane'
										placeholder='Gas Propane'
										name='gas_propane'
										type='number'
										value={energyCost.gas_propane}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel>Heating Oil</FormLabel>
									<Input
										required
										id='heating_oil'
										placeholder='Heating Oil'
										name='heating_oil'
										type='number'
										value={energyCost.heating_oil}
										onChange={handleChange}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button type='submit' fullWidth sx={{ mt: 3, mb: 2 }}>
									Submit
								</Button>
								<Button fullWidth onClick={handleClose}>
									{' '}
									Cancel{' '}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

export default EnergyCostForm;
