import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, Table } from '@mui/joy';
import { DateTime } from 'luxon';

function HomePage() {
  const reports = useSelector((store) => store.reports);
  console.log('check reports', reports);
  const facilities = useSelector((store) => store.facilities);
  console.log('check facilities', facilities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REPORTS' });
    dispatch({ type: 'FETCH_USER_FACILITIES' });
  }, []);
  return (
    <div>
      <>
        <h3>Total carbon footprint & energy costs card</h3>
        <h3>My assessments</h3>
        <Sheet sx={{ height: 200, overflow: 'auto' }}>
          <Table borderAxis='bothBetween' color='neutral' size='md' stickyFooter={false} stickyHeader variant='plain'>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Date Submitted</th>
                <th>Facility</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{DateTime.fromISO(report.date_submitted).toFormat('MMMM dd, yyyy')}</td>
                  <td>{report.facility_id}</td>
                  {report.approved ? <td>View Report</td> : <td>In Review</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <h3>My facilities card</h3>
      </>
    </div>
  );
}

export default HomePage;
