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

  return (
    <Button
      onClick={handleExit}
      sx={{
        backgroundColor: '#008242',
        '&:hover': { backgroundColor: '#00341a' },
        fontSize: 16,
        px: 2.5,
        py: 1,
      }}
    >
      Exit Assessment
    </Button>
  );
}
