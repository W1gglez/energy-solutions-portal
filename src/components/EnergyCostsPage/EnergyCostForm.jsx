import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EnergyCostForm() {
	const [energyCost, setEnergyCost] = useState({
		electric: '',
		natural_gas: '',
		liquid_propane: '',
		gas_propane: '',
		heating_oil: '',
	});

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
        } catch (error) {
            console.error('Error updating Energy Costs', error);
            alert('Error updating Energy Costs');
        }
    }



	return (
		<>
			<h2>Monthly Energy Costs</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Electric'
						name='electric'
						value={energyCost.electric}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Natural Gas'
						name='natural_gas'
						value={energyCost.natural_gas}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Liquid Propane'
						name='liquid_propane'
						value={energyCost.liquid_propane}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Gas Propane'
						name='gas_propane'
						value={energyCost.gas_propane}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='number'
						placeholder='Heating Oil'
						name='heating_oil'
						value={energyCost.heating_oil}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</>
	);
}

export default EnergyCostForm;
