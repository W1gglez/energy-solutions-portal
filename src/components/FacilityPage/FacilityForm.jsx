import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    const [isExpanded, setIsExpanded] = useState(false);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFacilityInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            name: facilityInfo.facilityName,
            address: facilityInfo.facilityAddress,
            state: facilityInfo.facilityState,
            zip: facilityInfo.facilityZip,
            years_in_business: parseInt(facilityInfo.facilityYearsInBusiness, 10),
            building_age: parseInt(facilityInfo.facilityBuildingAge, 10), 
            hours_of_operation: parseInt(facilityInfo.facilityHoursOfOperation, 10), 
            weekly_customers: parseInt(facilityInfo.facilityNumberOfGuests, 10),
            sit_down: facilityInfo.facilitySitDownRestaurant === 'true', 
        };
        try {
            dispatch({ type: 'ADD_FACILITY', payload: submissionData });
            alert('Facility Information Submitted');
        } catch (error) {
            console.error('Error updating trip:', error);
            alert('Error updating trip');
        }
    };

	return (
		<>
			
            <div>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Collapse Input' : 'Enter New Facility'}
      </Button>
      {isExpanded && (
        <div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Facility Name'
						name='facilityName'
						value={facilityInfo.facilityName}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Facility Address'
						name='facilityAddress'
						value={facilityInfo.facilityAddress}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Facility State'
						name='facilityState'
						value={facilityInfo.facilityState}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Facility Zip'
						name='facilityZip'
						value={facilityInfo.facilityZip}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Facility Years In Business'
						name='facilityYearsInBusiness'
						value={facilityInfo.facilityYearsInBusiness}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Facility Building Age in Years'
						name='facilityBuildingAge'
						value={facilityInfo.facilityBuildingAge}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Facility Weekly Hours Of Operation'
						name='facilityHoursOfOperation'
						value={facilityInfo.facilityHoursOfOperation}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Facility Number Of Guests Per Week'
						name='facilityNumberOfGuests'
						value={facilityInfo.facilityNumberOfGuests}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Select
						name='facilitySitDownRestaurant'
						value={facilityInfo.facilitySitDownRestaurant}
						onChange={handleChange}
						required
					>
						<option value=''>Sit Down Restaurant?</option>
						<option value='true'>Yes</option>
						<option value='false'>No</option>
					</Form.Select>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
        </div>
      )}
    </div>
		</>
	);
}

export default FacilityForm;
