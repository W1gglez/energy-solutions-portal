import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Facilities() {
    useEffect(() => {
        dispatch({ type: 'FETCH_FACILITIES' });
    }, []);

    const dispatch = useDispatch();

    return (
        <>
            <h2>Facility Information</h2>
        </>
    );
}

export default Facilities;

