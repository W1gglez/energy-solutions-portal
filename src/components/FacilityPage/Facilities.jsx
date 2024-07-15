import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

function Facilities() {

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_FACILITIES' });
    }, []);

    const facilities = useSelector((store) => store.facilities);

    const dispatch = useDispatch();
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
                    </tr>
                </thead>
                <tbody>
                    {facilities.map((facility) => (
                        <tr key={facility.id}>
                            <td>{facility.name}</td>
                            <td>{facility.address}</td>
                            <td>{facility.state}</td>
                            <td>{facility.zip}</td>
                            <td>{facility.years_in_business}</td>
                            <td>{facility.building_age}</td>
                            <td>{facility.hours_of_operation}</td>
                            <td>{facility.weekly_customers}</td>
                            <td>{facility.sit_down ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Facilities;