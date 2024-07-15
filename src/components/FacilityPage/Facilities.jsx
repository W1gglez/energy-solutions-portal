import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
            payload: { id: editRowId, ...editFormData }
          });
        setEditRowId(null);
    };

    const handleChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <h2>Facility Information</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Years in Business</th>
                        <th>Building Age</th>
                        <th>Hours of Operation</th>
                        <th>Number of Guests</th>
                        <th>Sit Down Restaurant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    {facilities.map((facility) => (
        <tr key={facility.id}>
            {editRowId === facility.id ? (
                <>
                    <td><input type='text' name='name' value={editFormData.name} onChange={handleChange} /></td>
                    <td><input type='text' name='address' value={editFormData.address} onChange={handleChange} /></td>
                    <td><input type='text' name='state' value={editFormData.state} onChange={handleChange} /></td>
                    <td><input type='text' name='zip' value={editFormData.zip} onChange={handleChange} /></td>
                    <td><input type='text' name='years_in_business' value={editFormData.years_in_business} onChange={handleChange} /></td>
                    <td><input type='text' name='building_age' value={editFormData.building_age} onChange={handleChange} /></td>
                    <td><input type='text' name='hours_of_operation' value={editFormData.hours_of_operation} onChange={handleChange} /></td>
                    <td><input type='text' name='weekly_customers' value={editFormData.weekly_customers} onChange={handleChange} /></td>
                    <td><input type='text' name='sit_down' value={editFormData.sit_down} onChange={handleChange} /></td> 
                    <td>
                        <Button onClick={() => handleSaveClick()}>Submit Changes</Button> 
                        <Button onClick={handleCancelClick}>Cancel</Button> 
                    </td>
                </>
            ) : (
                <>
                    <td>{facility.name}</td>
                    <td>{facility.address}</td>
                    <td>{facility.state}</td>
                    <td>{facility.zip}</td>
                    <td>{facility.years_in_business}</td>
                    <td>{facility.building_age}</td>
                    <td>{facility.hours_of_operation}</td>
                    <td>{facility.weekly_customers}</td>
                    <td>{facility.sit_down ? 'Yes' : 'No'}</td>
                    <td>
                        <Button onClick={() => handleEditClick(facility)}>Edit</Button>
                    </td>
                </>
            )}
        </tr>
    ))}
</tbody>
            </Table>
        </>
    );
}

export default Facilities;