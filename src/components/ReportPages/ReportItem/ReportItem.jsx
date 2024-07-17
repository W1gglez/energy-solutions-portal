import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { DateTime } from 'luxon';
import { Box } from '@mui/joy';

export default function ReportItem({ report }) {
  return (
    <>
      <Box key={report.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}>
        <Card sx={{ width: 300 }}>
          <div>
            <Typography level='title-lg'>{report.name}</Typography>
            <Typography level='body-sm'>
              Submitted on {DateTime.fromISO(report.date_submitted).toFormat('MMMM dd, yyyy')}
            </Typography>
          </div>
          <AspectRatio minHeight='40px' maxHeight='120px'>
            <img src='public/rj-logo.jpg' srcSet='public/rj-logo.jpg 2x' loading='lazy' alt='' />
          </AspectRatio>
          <CardContent orientation='horizontal'>
            <div>
              <Typography level='body-xs'>Report Status:</Typography>
              <Typography fontSize='lg' fontWeight='lg'>
                {report.approved ? <td>Approved</td> : <td>Needs Review</td>}
              </Typography>
            </div>
            {report.approved ? (
              <Button
                variant='solid'
                size='md'
                color='success'
                aria-label='View Facility Report'
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
              >
                View Report
              </Button>
            ) : (
              <Button
                variant='solid'
                size='md'
                color='danger'
                aria-label='Review and Approved Facility Report'
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
              >
                Review Report
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
