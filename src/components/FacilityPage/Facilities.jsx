import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardActions, CardContent, CardMedia, TextField, Typography, Tooltip } from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import './Facilities.css';
import { Container } from '@mui/joy';
import { blue } from '@mui/material/colors';

function Facilities() {
	const [editRowId, setEditRowId] = useState(null);
	const [editFormData, setEditFormData] = useState({});
	const facilities = useSelector((store) => store.facilities);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'FETCH_USER_FACILITIES' });
	}, [dispatch]);

	const handleEditClick = (facility) => {
		setEditRowId(facility.id);
		setEditFormData(facility);
	};

	const handleCancelClick = () => {
		setEditRowId(null);
	};

	const handleSaveClick = async () => {
		dispatch({
			type: 'UPDATE_FACILITY',
			payload: { id: editRowId, ...editFormData },
		});
		setEditRowId(null);
	};

	const handleDeleteClick = (facility) => {
		dispatch({ type: 'DELETE_USER_FACILITY', payload: facility.id });
	};

	const handleChange = (e) => {
		setEditFormData({
			...editFormData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<Box
				className='facility-header'
				height={40}
				display='flex'
				alignItems='center'
				p={5}
				sx={{ borderBottom: '1px solid #1F1C4C', color: '#1F1C4C' }}
			>
				<h2>Facility Information</h2>
			</Box>
			<Box display='flex' flexWrap='wrap' justifyContent='center'  >
				{facilities.map((facility) => (
					<Box key={facility.id} m={2} overflow={'hide'} maxHeight={'400px'}>
						<ReactCardFlip isFlipped={editRowId === facility.id} flipDirection='horizontal'>
							<Card sx={{ border: 'solid 1px #1F1C4C', width: '250px' }}>
								<CardContent sx={{ px: 4 }}>
									<Typography gutterBottom variant='h5' component='div' >
										{facility.name}
									</Typography>
									<Typography variant='body1'>
										{facility.address}
									</Typography>
									<Typography variant='body1' color='text.primary' mb={2}>
										{facility.city}, {facility.state}, {facility.zip}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										<strong>Years in Business: </strong>
										{facility.years_in_business}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										<strong> Building Age: </strong>
										{facility.building_age}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										<strong> Hours of Operation: </strong>
										{facility.hours_of_operation}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										<strong> Number of Guests: </strong>
										{facility.weekly_customers}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										<strong> Sit Down Restaurant: </strong>
										{facility.sit_down ? 'Yes' : 'No'}
									</Typography>
								</CardContent>
								<CardActions sx={{ justifyContent: 'space-around' }}>
									<Tooltip title='Edit Facility Information'>
										<Button size='lg' color='primary' onClick={() => handleEditClick(facility)}>
											<i className='bi bi-pencil-square' style={{ fontSize: '4vh', color: '#008242' }}></i>
										</Button>
									</Tooltip>
									<Tooltip title='Delete'>
										<Button size='lg' color='error' onClick={() => handleDeleteClick(facility)}>
											<i className='bi bi-trash2' style={{ fontSize: '4vh' }}></i>
										</Button>
									</Tooltip>
								</CardActions>
							</Card>

							<Card height = '800px' overflow = 'scroll'>
								<CardContent>
									<Typography>Edit {facility.name}</Typography>
									<TextField
										label='Name'
										name='name'
										fullWidth
										value={editFormData.name}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Address'
										name='address'
										style={{ width: '50vw' }}
										value={editFormData.address}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='City'
										name='City'
										value={editFormData.city}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='State'
										name='state'
										value={editFormData.state}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Zip'
										name='zip'
										value={editFormData.zip}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Years in Business'
										name='years_in_business'
										value={editFormData.years_in_business}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Building Age'
										name='building_age'
										value={editFormData.building_age}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Hours of Operation'
										name='hours_of_operation'
										value={editFormData.hours_of_operation}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Number of Guests'
										name='weekly_customers'
										value={editFormData.weekly_customers}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
									<TextField
										label='Sit Down Restaurant'
										name='sit_down'
										value={editFormData.sit_down}
										onChange={handleChange}
										InputLabelProps={{ shrink: true }}
										margin='normal'
									/>
                  <CardActions>
									<Button onClick={handleSaveClick}>
										<i className='bi bi-floppy' style={{ fontSize: '4vh' }}></i>
									</Button>
									<Button color='success' onClick={handleCancelClick}>
										<i className='bi bi-x-circle' style={{ fontSize: '4vh' }}></i>
									</Button>
                  </CardActions>
								</CardContent>
								
								
							</Card>
						</ReactCardFlip>
					</Box>
				))}
			</Box>
		</>
	);
}

export default Facilities;
