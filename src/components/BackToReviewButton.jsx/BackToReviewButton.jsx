import Button from '@mui/joy/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function BackToReviewButton({ payload }) {
  const responses = useSelector((store) => store.responses);
  const history = useHistory();
  const dispatch = useDispatch();

  const updateResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload,
    });
    history.push('/assessment/review');
  };

  return (
    responses.inReview === true && (
      <Button onClick={updateResponse}
      sx={{
        backgroundColor: '#008242',
        '&:hover': {
          backgroundColor: '#00341a',
        },
      }}>Back to Review</Button>
    )
  );
}
