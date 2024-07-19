import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, Table } from '@mui/joy';
import { DateTime } from 'luxon';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/joy/Divider';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function HomePage() {
<<<<<<< HEAD:src/components/UserHomePage/HomePage.jsx
  const reports = useSelector((store) => store.reports.reportReducer);
  const facilities = useSelector((store) => store.facilities);
  const carbonTotal = useSelector((store) => store.carbon);
  const energyCost = useSelector((store) => store.cost);
=======
  const reports = useSelector((store) => store.reports);
  console.log('reports', reports);
  const facilities = useSelector((store) => store.facilities);
  console.log('facilities', facilities);
  const carbonTotal = useSelector((store) => store.carbon);
  const energyCost = useSelector((store) => store.cost);
  console.log('cost', energyCost);
>>>>>>> master:src/components/HomePage/HomePage.jsx

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REPORTS' });
    dispatch({ type: 'FETCH_USER_FACILITIES' });
    dispatch({ type: 'FETCH_CARBON' });
    dispatch({ type: 'FETCH_COST' });
  }, []);

  const [open, setOpen] = React.useState(false);

  const deleteFacility = (facilityId) => {
    dispatch({ type: 'DELETE_FACILITY', payload: facilityId });
    setOpen(false);
  };

  const navReportPage = () => {
    history.push('/user-reports');
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
              {carbonTotal.map((carbon) => (
                <p>{carbon.sum} tons/year</p>
              ))}
              <Typography>Total energy cost: </Typography>
              {energyCost.map((cost) => (
<<<<<<< HEAD:src/components/UserHomePage/HomePage.jsx
                <p>${cost.sum} /year</p>
=======
                <p>${cost.sum}/year</p>
>>>>>>> master:src/components/HomePage/HomePage.jsx
              ))}
            </CardContent>
          </Card>
        </Box>
        <h3>My assessments</h3>
        <Button onClick={navReportPage}>View all assessments</Button>
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
                  <td>{report.name}</td>
                  {report.approved ? <td>View Report</td> : <td>In Review</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <h3>My facilities </h3>
        <Button>View all Facilities</Button>
        <Sheet sx={{ height: 200, overflow: 'auto' }}>
          <Table borderAxis='bothBetween' color='neutral' size='md' stickyFooter={false} stickyHeader variant='plain'>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Facility</th>
                <th>Address</th>
                <th>State</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility.id}>
                  <td>{facility.name}</td>
                  <td>{facility.address}</td>
                  <td>{facility.state}</td>
                  <td>
                    <Button
                      variant='outlined'
                      color='danger'
                      endDecorator={<DeleteForever />}
                      onClick={() => setOpen(true)}
                    >
                      Delete
                    </Button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                      <ModalDialog variant='outlined' role='alertdialog'>
                        <DialogTitle>
                          <WarningRoundedIcon />
                          Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                          Are you sure you want to delete this facility? This will delete all corresponding reports.
                        </DialogContent>
                        <DialogActions>
                          <Button variant='solid' color='danger' onClick={() => deleteFacility(facility.id)}>
                            Delete Facility
                          </Button>
                          <Button variant='plain' color='neutral' onClick={() => setOpen(false)}>
                            Cancel
                          </Button>
                        </DialogActions>
                      </ModalDialog>
                    </Modal>
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
