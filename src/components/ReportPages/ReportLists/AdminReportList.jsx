import { useDispatch } from 'react-redux';
import ReportItem from '../ReportItem/ReportItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ReportList.css';
import { Box } from '@mui/joy';

export default function ReportList() {
  const dispatch = useDispatch();
  const reports = useSelector((store) => store.reports.reportReducer);
  console.log('check reports', reports);

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORTS' });
  }, []);
  return (
    <>
      <Box className='report-header' height={40} display='flex' alignItems='center' p={5}>
        <h1>All Reports</h1>
      </Box>
      <section className='report-container'>
        {reports.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
      </section>
    </>
  );
}
