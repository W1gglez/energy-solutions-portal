import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box, Button, Grid } from '@mui/joy';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { DateTime } from 'luxon';
import './EnergyReport.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function EnergyReport() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector((store) => store.user);
  const reportDetails = useSelector((store) => store.reports.reportDetails);
  console.log('check reportDetails', reportDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORT_DETAILS', payload: params.id });
  }, []);

  const approveReport = (reportId) => {
    const timeApproved = DateTime.now().setLocale('zh').toLocaleString();
    dispatch({
      type: 'APPROVE_REPORT',
      payload: { reportId, approvedAt: timeApproved },
    });
  };

  return (
    <Container sx={{ flex: 1 }}>
      <Grid
        container
        sx={{ justifyContent: 'space-between' }}
      >
        <Button
          onClick={() => history.push('/user-reports')}
          sx={{ width: '15vw' }}
        >
          Back
        </Button>
        {user.admin ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {!reportDetails.approved ? (
              <Button onClick={() => approveReport(reportDetails.id)}>
                Approve
              </Button>
            ) : (
              <Typography sx={{ alignContent: 'center' }}>
                Approved by: {reportDetails.username} on{' '}
                {DateTime.now().toLocaleString(reportDetails.approvedAt)}
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {reportDetails.approved ? (
              <Typography sx={{ alignContent: 'center' }}>
                Approved by: {reportDetails.username} on{' '}
                {DateTime.now().toLocaleString(reportDetails.approvedAt)}
              </Typography>
            ) : (
              <Typography sx={{ alignContent: 'center' }}>
                Pending Approval by RJ Energy
              </Typography>
            )}
          </Box>
        )}
      </Grid>
      <Box className='container'>
        <Box
          className='card-container'
          sx={{
            minHeight: 75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
          }}
        >
          <Card
            className='container-card'
            variant='outlined'
            sx={(theme) => ({
              width: 250,
              height: 200,
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>{reportDetails.name}</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>Date Submitted: </Typography>
                <Typography level='body-sm'>
                  {DateTime.fromISO(reportDetails.date_submitted).toFormat(
                    'MMMM dd, yyyy'
                  )}
                </Typography>
                <Typography level='title-lg'>Location Address:</Typography>
                <Typography level='body-sm'>{reportDetails.address}</Typography>
                <Typography level='title-lg'>Report Status:</Typography>
                <Typography level='body-sm'>
                  {reportDetails.approved ? (
                    <td>Approved</td>
                  ) : (
                    <td>Pending Approval</td>
                  )}
                </Typography>
              </div>
            </Box>
          </Card>
          <Card
            className='container-card'
            variant='outlined'
            sx={(theme) => ({
              width: 250,
              height: 200, // Set the fixed height here
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>
                  Annual Carbon Footprint
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='body-sm'>
                  {reportDetails.current_carbon_footprint}
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>Annual Energy Cost</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='body-sm'>
                  {reportDetails.current_monthly_cost * 12}
                </Typography>
              </div>
            </Box>
          </Card>
          <Card
            className='container-card'
            variant='outlined'
            sx={(theme) => ({
              width: 250,
              height: 200,
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>Report Notes</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='body-sm'>{reportDetails.notes}</Typography>
              </div>
            </Box>
          </Card>
        </Box>
        <Box
          className='card-container'
          sx={{
            minHeight: 75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
          }}
        >
          <Card
            className='container-card'
            variant='outlined'
            sx={(theme) => ({
              width: 800,
              height: 200,
              flexDirection: 'column',
              overflow: 'scroll',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
            })}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <div>
                <Typography level='title-lg'>Recommendations</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='body-sm'>
                  {reportDetails?.recommendations?.map(
                    (recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    )
                  )}
                </Typography>
              </div>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
