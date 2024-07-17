import React from 'react';
import FacilityForm from './FacilityForm';
import Facilities from './Facilities';
import AdminFacilities from './AdminFacilities';

function FacilityPage() {   
    return (
        <>
            
            {/* <AdminFacilities /> */}
             <Facilities />
            <FacilityForm />
        </>
    );
}

export default FacilityPage;
