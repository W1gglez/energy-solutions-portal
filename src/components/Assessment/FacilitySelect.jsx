import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function FaciliytSelect({ open, setOpen }) {
  const facilities = useSelector((store) => store.facilities);
  const responses = useSelector((store) => store.responses);
  const [facilityId, setFacilityId] = useState(facilities[0]?.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: 'SET_RESPONSES', payload: { ...responses, facilityId } });
    history.push('/assessment/energy-cost');
    setOpen(false);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_LOCATIONS' });
    dispatch({ type: 'FETCH_TYPES' });
    dispatch({ type: 'FETCH_UNITS' });
  }, []);
  
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <ModalDialog
        component={'form'}
        onSubmit={handleSubmit}
      >
        <DialogTitle>Select Facility for Assessment</DialogTitle>
        <FormControl>
          <FormLabel>Location*</FormLabel>
          <Select
            defaultValue={facilityId}
            sx={{ height: 41 }}
            onChange={(e, newVal) => {
              setFacilityId(newVal);
            }}
            required
          >
            {facilities.map((f) => (
              <Option
                key={f.id}
                value={f.id}
              >
                {f.name} | {f.address}
              </Option>
            ))}
          </Select>
        </FormControl>
        <Button type='submit'>Submit</Button>
      </ModalDialog>
    </Modal>
  );
}
