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
import IconButton from '@mui/joy/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

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

  const navReport = (reportId) => {
    history.push(`/report/${reportId}`);
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
          <Card variant='outlined' sx={{ width: '400px', marginTop: 4 }}>
            <h5>Report Totals</h5>
            <CardContent>
              <Grid container>
                <Grid xs>
                  <IconButton>
                    <EnergySavingsLeafIcon />
                  </IconButton>
                  <Typography level='title-sm'>Total Carbon Footprint: </Typography>
                  {carbonTotal.map((carbon) => (
                    <Typography level='title-md'>{carbon.sum} tons/year</Typography>
                  ))}
                </Grid>
                <Grid xs>
                  <IconButton>
                    <AttachMoneyIcon />
                  </IconButton>
                  <Typography level='title-sm'>Total Energy Cost: </Typography>
                  {energyCost.map((cost) => {
                    let sum = Number(cost.sum).toFixed(2);
                    return <Typography level='title-md'>${sum} /year</Typography>;
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

              <h3>My Reports</h3>
              <Button size='sm' onClick={() => history.push('/user-reports')}
                sx={{
              backgroundColor: '#008242',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}>
                View all Reports

              </Button>
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

                    <th style={{ width: '40%', backgroundColor: '#e5f2ec', textAlign: 'center' }}>Date Submitted</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>Facility</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>Location</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>Status</th>
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
                      {report.approved ? (
                        <td>
                          <Button variant='outlined' color='primary' onClick={() => navReport(report.id)}
                        >
                            View Report
                          </Button>
                        </td>
                      ) : (
                        <td>In Review</td>
                      )}
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
              <h3>My Reports</h3>{' '}
            </Container>
            <Divider />
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Button onClick={() => setOpenFacilitySelect(true)}
                sx={{
              backgroundColor: '#008242',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}>Start Report</Button>
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

          <h3>My Facilities </h3>
          <Button size='sm' onClick={() => history.push('/facilities')}
            sx={{
              backgroundColor: '#008242',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}>

            View all Facilities
          </Button>
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

                    <th style={{ width: '25%', backgroundColor: '#e5f2ec', textAlign: 'center' }}>Facility</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>Address</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>City</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}>State</th>
                    <th style={{ backgroundColor: '#e5f2ec', textAlign: 'center' }}></th>
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
            <Button onClick={() => history.push('/facilities')}
              sx={{
              backgroundColor: '#008242',
              '&:hover': {
                backgroundColor: '#00341a',
              },
            }}>Add Facility</Button>
          </Container>
        )}
      </section>
    </Container>
  );
}

export default HomePage;
