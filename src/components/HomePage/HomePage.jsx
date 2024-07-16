import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, Table } from '@mui/joy';
import { DateTime } from 'luxon';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
// import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';

function HomePage() {
  const reports = useSelector((store) => store.reports);
  const facilities = useSelector((store) => store.facilities);
  const carbonTotal = useSelector((store) => store.carbon);
  console.log('check carbon', carbonTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REPORTS' });
    dispatch({ type: 'FETCH_USER_FACILITIES' });
    dispatch({ type: 'FETCH_CARBON' });
  }, []);

  const deleteFacility = (facilityId) => {
    console.log('delete facility was clicked, check id', facilityId);
    dispatch({ type: 'DELETE_FACILITY', payload: facilityId });
  };

  return (
    <div>
      <>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
          }}
        >
          <Card variant='outlined'>
            <CardContent>
              <Typography level='title-md'>Total carbon footprint: </Typography>
              <Typography>Total energy cost #</Typography>
            </CardContent>
          </Card>
        </Box>
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
        <h3>My facilities </h3>
        <Sheet sx={{ height: 200, overflow: 'auto' }}>
          <Table borderAxis='bothBetween' color='neutral' size='md' stickyFooter={false} stickyHeader variant='plain'>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Facility</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id}>
                  <td>{facility.name}</td>
                  <td>
                    {facility.address}, {facility.state}
                  </td>
                  <td>
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button onClick={() => deleteFacility(facility.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </>
    </div>
  );
}

export default HomePage;
