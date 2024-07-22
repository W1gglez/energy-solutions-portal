import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Sheet, Table } from '@mui/joy';
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
import FaciliytSelect from '../Assessment/FacilitySelect';

function HomePage() {
  const reports = useSelector((store) => store.reports);
  console.log('reports', reports);
  const facilities = useSelector((store) => store.facilities);
  const carbonTotal = useSelector((store) => store.carbon);
  const energyCost = useSelector((store) => store.cost);
  console.log('cost', energyCost);

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}
    >
      {energyCost[0]?.sum !== null && (
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
              {energyCost.map((cost) => {
                let sum = Number(cost.sum).toFixed(2);
                return <p>${sum} /year</p>;
              })}
            </CardContent>
          </Card>
        </Box>
      )}
      <section className='container'>
        {reports.reportReducer?.length > 0 ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: '10px',
              }}
            >
              <h3>My assessments</h3>
              <Button onClick={() => history.push('/user-reports')}>
                View all assessments
              </Button>
            </Box>
            <Divider />
            <Sheet
              sx={{
                height: 240,
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
                    <th style={{ width: '40%', backgroundColor: 'lightgrey' }}>
                      Date Submitted
                    </th>
                    <th style={{ backgroundColor: 'lightgrey' }}>Facility</th>
                    <th style={{ backgroundColor: 'lightgrey' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.reportReducer?.map((report) => (
                    <tr key={report.id}>
                      <td>
                        {DateTime.fromISO(report.date_submitted).toFormat(
                          'MMMM dd, yyyy'
                        )}
                      </td>
                      <td>{report.name}</td>
                      {report.approved ? (
                        <td>View Report</td>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                my: '10px',
              }}
            >
              <h3>My assessments</h3>{' '}
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Button onClick={() => setOpenFacilitySelect(true)}>
                Start Assessment
              </Button>
              <FaciliytSelect
                open={openFacilitySelect}
                setOpen={setOpenFacilitySelect}
              />
            </Box>
          </>
        )}
      </section>
      <section className='container'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            my: '10px',
          }}
        >
          <h3>My facilities </h3>
          <Button onClick={() => history.push('/facilities')}>
            View all Facilities
          </Button>
        </Box>
        {facilities.length > 0 ? (
          <>
            <Sheet
              sx={{
                height: 240,
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
                    <th style={{ width: '25%', backgroundColor: 'lightgrey' }}>
                      Facility
                    </th>
                    <th style={{ backgroundColor: 'lightgrey' }}>Address</th>
                    <th style={{ backgroundColor: 'lightgrey' }}>City</th>
                    <th style={{ backgroundColor: 'lightgrey' }}>State</th>
                    <th style={{ backgroundColor: 'lightgrey' }}></th>
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
                        <Modal
                          open={open}
                          onClose={() => setOpen(false)}
                        >
                          <ModalDialog
                            variant='outlined'
                            role='alertdialog'
                          >
                            <DialogTitle>
                              <WarningRoundedIcon />
                              Confirmation
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                              Are you sure you want to delete this facility?
                              This will delete all corresponding reports.
                            </DialogContent>
                            <DialogActions>
                              <Button
                                variant='solid'
                                color='danger'
                                onClick={() => deleteFacility(facility.id)}
                              >
                                Delete Facility
                              </Button>
                              <Button
                                variant='plain'
                                color='neutral'
                                onClick={() => setOpen(false)}
                              >
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
              marginTop: '10px',
            }}
          >
            <Button onClick={() => history.push('/facilities')}>
              Add Facility
            </Button>
          </Box>
        )}
      </section>
    </Box>
  );
}

export default HomePage;
