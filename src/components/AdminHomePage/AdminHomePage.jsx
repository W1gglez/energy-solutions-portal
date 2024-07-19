import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, Table } from '@mui/joy';
import { DateTime } from 'luxon';
import Box from '@mui/joy/Box';
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

function AdminHomePage() {
  const reports = useSelector((store) => store.reports.reportReducer);
  const reportsReady = reports.filter((report) => !report.approved);
  const facilities = useSelector((store) => store.facilities);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORTS' });
    dispatch({ type: 'FETCH_FACILITIES' });
    dispatch({ type: 'FETCH_CARBON' });
    dispatch({ type: 'FETCH_COST' });
  }, []);

  const [open, setOpen] = React.useState(false);

  const deleteFacility = (facilityId) => {
    dispatch({ type: 'DELETE_FACILITY', payload: facilityId });
    setOpen(false);
  };

  const navReport = (reportId) => {
    history.push(`/report/${reportId}`);
  };

  return (
    <div>
      <>
        <section className='container'>
          <h3>Assessments Pending Review</h3>
          {reportsReady.length > 0 ? (
            <>
              {' '}
              <Sheet
                sx={{
                  height: 160,
                  overflow: 'auto',
                  border: 1,
                  borderRadius: 5,
                }}
              >
                <Table
                  borderAxis='bothBetween'
                  color='neutral'
                  size='md'
                  stickyFooter={false}
                  stickyHeader
                  variant='plain'
                >
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Date Submitted</th>
                      <th>Facility</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsReady.map((report) => (
                      <tr key={report.id}>
                        <td>{DateTime.fromISO(report.date_submitted).toFormat('MMMM dd, yyyy')}</td>
                        <td>{report.name}</td>
                        <td>
                          <Button variant='outlined' color='primary' onClick={() => navReport(report.id)}>
                            Review Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Sheet>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '10px' }}>
                <Button onClick={() => history.push('/admin-reports')}>View All Assessments</Button>
              </Box>
            </>
          ) : (
            <h6>No Pending Reports</h6>
          )}
        </section>
        <section className='container'>
          <h3>Recently Added Facilities</h3>
          <Sheet
            sx={{
              height: 160,
              overflow: 'auto',
              border: 1,
              borderRadius: 5,
            }}
          >
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '10px' }}>
            <Button onClick={() => history.push('/facilities')}>View All Facilities</Button>
          </Box>
        </section>
      </>
    </div>
  );
}

export default AdminHomePage;
