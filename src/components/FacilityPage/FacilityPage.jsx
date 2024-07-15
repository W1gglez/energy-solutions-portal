import React from 'react';
import FacilityForm from './FacilityForm';
import Facilities from './Facilities';

function FacilityPage() {   
    return (
        <>
            <h1>Facility Information</h1>
            <Facilities />

            <FacilityForm />
        </>
    );
}

export default FacilityPage;
