import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Sheet, Table } from '@mui/joy';
import { DateTime } from 'luxon';
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
import FaciliytSelect from '../Assessment/FacilitySelect';
import Container from '@mui/joy/Container';

function HomePage() {
  const reports = useSelector((store) => store.reports);
  const facilities = useSelector((store) => store.facilities);
  const carbonTotal = useSelector((store) => store.carbon);
  const energyCost = useSelector((store) => store.cost);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REPORTS' });
    dispatch({ type: 'FETCH_USER_FACILITIES' });
    dispatch({ type: 'FETCH_CARBON' });
    dispatch({ type: 'FETCH_COST' });
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [openFacilitySelect, setOpenFacilitySelect] = useState(false);

  const deleteFacility = (facilityId) => {
    dispatch({ type: 'DELETE_FACILITY', payload: facilityId });
    setOpen(false);
    dispatch({ type: 'FETCH_USER_FACILITIES' });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}
    >
      {energyCost[0]?.sum !== null && (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Card variant='outlined' sx={{ width: '400px' }}>
            <CardContent>
              <DialogTitle>Assessment Totals</DialogTitle>
              <Grid container>
                <Grid xs>
                  <Typography level='title-md'>Total carbon footprint: </Typography>
                  {carbonTotal.map((carbon) => (
                    <p>{carbon.sum} tons/year</p>
                  ))}
                </Grid>
                <Grid xs>
                  <Typography>Total energy cost: </Typography>
                  {energyCost.map((cost) => {
                    let sum = Number(cost.sum).toFixed(2);
                    return <p>${sum} /year</p>;
                  })}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      )}
      <section className='container'>
        {reports.reportReducer?.length > 0 ? (
          <>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: '10px',
              }}
            >
              <h3>My assessments</h3>
              <Button onClick={() => history.push('/user-reports')}>View all assessments</Button>
            </Container>
            <Divider />
            <Sheet
              sx={{
                maxHeight: 240,
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
                    <th style={{ width: '40%', backgroundColor: 'lightgrey', textAlign: 'center' }}>Date Submitted</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>Facility</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>Location</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.reportReducer?.map((report) => (
                    <tr key={report.id}>
                      <td>{DateTime.fromISO(report.date_submitted).toFormat('MMMM dd, yyyy')}</td>
                      <td>{report.name}</td>
                      <td>
                        {report.city}, {report.state}
                      </td>
                      {report.approved ? <td>View Report</td> : <td>In Review</td>}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </>
        ) : (
          <>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: '10px',
              }}
            >
              <h3>My assessments</h3>{' '}
            </Container>
            <Divider />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Button onClick={() => setOpenFacilitySelect(true)}>Start Assessment</Button>
              <FaciliytSelect open={openFacilitySelect} setOpen={setOpenFacilitySelect} />
            </Container>
          </>
        )}
      </section>
      <section className='container'>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            my: '10px',
          }}
        >
          <h3>My facilities </h3>
          <Button onClick={() => history.push('/facilities')}>View all Facilities</Button>
        </Container>
        {facilities.length > 0 ? (
          <>
            <Sheet
              sx={{
                maxHeight: 240,
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
                    <th style={{ width: '25%', backgroundColor: 'lightgrey', textAlign: 'center' }}>Facility</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>Address</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>City</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}>State</th>
                    <th style={{ backgroundColor: 'lightgrey', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.map((facility) => (
                    <tr key={facility.id}>
                      <td>{facility.name}</td>
                      <td>{facility.address}</td>
                      <td>{facility.city}</td>
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
        ) : (
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
              marginTop: '10px',
            }}
          >
            <Button onClick={() => history.push('/facilities')}>Add Facility</Button>
          </Container>
        )}
      </section>
    </Container>
  );
}

export default HomePage;
