import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/joy/Button';

export default function ExitAssessmentButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
    dispatch({ type: 'CLEAR_ENERGY_COST' });
  };

  return <Button 
  onClick={handleExit}
  sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#00341a' } }}
  >
    Exit Assessment</Button>;
}
