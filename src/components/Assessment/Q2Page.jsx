import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import EquipmentForm from './EqupmentForm';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import BackToReviewButton from '../BackToReviewButton.jsx/BackToReviewButton';
import ExitAssessmentButton from '../ExitAssesmentButton/ExitAssessmentButton';

export default function Q2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const responses = useSelector((store) => store.responses);
  const equipmentInv = useSelector((store) => store.equipmentInv);
  const entryHeater = equipmentInv.find((e) => e.typeId === 17);
  const entryHeaterIndex = equipmentInv.findIndex((e) => e.typeId === 17);

  const [isEntryHeater, setIsEntryHeater] = useState(
    responses.entry_heater?.isEntryHeater || 'false'
  );
  const [isRunning, setIsRunning] = useState(
    responses.entry_heater?.isRunning || 'false'
  );
  const [open, setOpen] = useState(false);

  const recordResponse = () => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: (responses['entry_heater'] = {
        isEntryHeater,
        isRunning,
      }),
    });
    history.push('/assessment/q3');
  };

  const handleExit = () => {
    history.push('/');
    dispatch({ type: 'CLEAR_RESPONSES' });
    dispatch({ type: 'CLEAR_EQUIPMENT' });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Grid
        xs={12}
        className='report-header'
        sx={{ py: 2, mb: 2 }}
      >
        <Typography level='h1'>Entry Way</Typography>
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <ExitAssessmentButton />
        <BackToReviewButton
          payload={
            (responses['entry_heater'] = {
              isEntryHeater,
              isRunning,
            })
          }
        />
      </Grid>
      <Grid
        container
        spacing={8}
        sx={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Grid xs={3}>
          <Typography
            sx={{ textAlign: 'center' }}
            level='h4'
          >
            Is there an electric heater?
          </Typography>
        </Grid>
        <Grid
          xs={3}
          sx={{ pl: 0 }}
        >
          <RadioGroup
            defaultValue={false}
            value={isEntryHeater}
            orientation='horizontal'
            sx={{
              gap: 18,
              justifyContent: 'center',
            }}
            onChange={(e) => {
              e.target.value === 'true'
                ? (setIsEntryHeater(e.target.value), setOpen(e.target.value))
                : (setIsEntryHeater(e.target.value),
                  setIsRunning(e.target.value));
            }}
          >
            <Radio
              sx={{
                fontSize: '24px',
              }}
              label='Yes'
              value={true}
            />

            <Radio
              sx={{
                fontSize: '24px',
              }}
              label='No'
              value={false}
            />
          </RadioGroup>
        </Grid>
        {isEntryHeater === 'true' && (
          <>
            <EquipmentForm
              open={open}
              setOpen={setOpen}
              location={1}
              type={17}
              category={1}
              setIsEntryHeater={setIsEntryHeater}
            />
            {entryHeater && (
              <Grid
                container
                sx={{ justifyContent: 'center' }}
                xs={12}
              >
                <EquipmentCard
                  equipment={entryHeater}
                  i={entryHeaterIndex}
                />
              </Grid>
            )}
            <Grid xs={3}>
              <Typography
                sx={{ textAlign: 'center' }}
                level='h4'
              >
                Is the heater running?
              </Typography>
            </Grid>
            <Grid
              xs={3}
              sx={{ pl: 0 }}
            >
              <RadioGroup
                defaultValue={false}
                value={isRunning}
                orientation='horizontal'
                sx={{
                  gap: 18,
                  justifyContent: 'center',
                }}
                onChange={(e) => setIsRunning(e.target.value)}
              >
                <Radio
                  sx={{
                    fontSize: '24px',
                  }}
                  label='Yes'
                  value={true}
                />

                <Radio
                  sx={{
                    fontSize: '24px',
                  }}
                  label='No'
                  value={false}
                />
              </RadioGroup>
            </Grid>
          </>
        )}
      </Grid>
      <Grid
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between', mx: 6 }}
      >
        <Button
          onClick={() => history.push('/assessment/q1')}
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
          }}
        >
          Previous
        </Button>
        <Button
          onClick={recordResponse}
          sx={{
            backgroundColor: '#008242',
            width: '25%',
            '&:hover': {
              backgroundColor: '#00341a',
            },
          }}
        >
          Next
        </Button>
      </Grid>
    </Box>
  );
}
