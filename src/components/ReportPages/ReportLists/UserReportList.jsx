import { useDispatch } from 'react-redux';
import ReportItem from '../ReportItem/ReportItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ReportList.css';
import { Container, Box } from '@mui/joy';
export default function UserReportList() {
  const dispatch = useDispatch();
  const reports = useSelector((store) => store.reports.reportReducer);
  console.log('check reports', reports);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REPORTS' });
  }, []);
  return (

    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <h1>User Reports</h1>
      <Box sx={{ flex: 1, py: 4 }}>
        {reports.map((report) => (
          <ReportItem
            key={report.id}
            report={report}
          />
        ))}
      </Box>
    </Container>
  );
}
