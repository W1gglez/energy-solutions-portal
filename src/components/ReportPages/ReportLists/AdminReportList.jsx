import { useDispatch } from 'react-redux';
import ReportItem from '../ReportItem/ReportItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ReportList.css';

export default function ReportList() {
  const dispatch = useDispatch();
  const reports = useSelector((store) => store.reports.reportReducer);
  console.log('check reports', reports);

  useEffect(() => {
    dispatch({ type: 'FETCH_REPORTS' });
  }, []);
  return (
    <>
      <h1>Admin Reports</h1>
      <section className='report-container'>
        {reports.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
      </section>
    </>
  );
}
