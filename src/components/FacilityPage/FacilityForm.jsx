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

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacilityInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'CREATE_FACILITY', payload: facilityInfo });
            alert('Facility Information Submitted');
        } catch (error) {
            console.error('Error updating trip:', error);
            alert('Error updating trip');
        }
    };

    return (
        <>
            <h2>Enter Facility Information</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Facility Name" name="facilityName" value={facilityInfo.facilityName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Facility Address" name="facilityAddress" value={facilityInfo.facilityAddress} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Facility State" name="facilityState" value={facilityInfo.facilityState} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Facility Zip" name="facilityZip" value={facilityInfo.facilityZip} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Facility Years In Business" name="facilityYearsInBusiness" value={facilityInfo.facilityYearsInBusiness} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Facility Building Age in Years" name="facilityBuildingAge" value={facilityInfo.facilityBuildingAge} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Facility Weekly Hours Of Operation" name="facilityHoursOfOperation" value={facilityInfo.facilityHoursOfOperation} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Facility Number Of Guests Per Week" name="facilityNumberOfGuests" value={facilityInfo.facilityNumberOfGuests} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Facility Sit Down Restaurant?" name="facilitySitDownRestaurant" value={facilityInfo.facilitySitDownRestaurant} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default FacilityForm;