import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const reports = useSelector((store) => store.reports);
  console.log('check reports', reports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORTS' });
    dispatch({ type: 'FETCH_FACILITIES' });
  }, []);
  return (
    <div>
      <>
        <h3>Total carbon footprint & energy costs card</h3>
        <h3>My facilities card</h3>
        <h3>My assessments card</h3>
      </>
    </div>
  );
}

export default HomePage;
