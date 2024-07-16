import {
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Textarea,
  Button,
} from '@mui/joy';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function EquipmentForm(props) {
  const { type, location } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);
  const energyUnits = useSelector((store) => store.energyUnits);

  const [equipment, setEquipment] = useState({
    description: null,
    typeId: 0,
    brand: null,
    modelNumber: null,
    serialNumber: null,
    qty: 1,
    locationId: 0,
    categoryId: 0,
    amps: null,
    volts: null,
    watts: null,
    kW: null,
    btu: null,
    hoursPerDay: null,
    notes: null,
  });

  const [selectedOption, setSelectedOption] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_EQUIPMENT', payload: equipment });
    props.setOpen(false);
  };

  return (
    <Modal open={Boolean(props.open)}>
      <ModalDialog sx={{ width: '65vw' }}>
        <DialogTitle>Equipment Details</DialogTitle>
        <DialogContent>
          Fill in the information from your equipments data plate.
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid
            xs={12}
            container
            spacing={1}
            sx={{ alignContent: 'center' }}
          >
            <Grid
              xs={6}
              sx={{ alignContent: 'center' }}
            >
              <FormControl>
                <FormLabel>Description*</FormLabel>
                <Input
                  placeholder='ex: "Beer Cooler"'
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              xs={4}
              sx={{ alignContent: 'flex-end' }}
            >
              <FormControl>
                <FormLabel>Location*</FormLabel>
                <Select
                  placeholder='Select the equipment location...'
                  sx={{ height: 41 }}
                  onChange={(e, newVal) => {
                    setEquipment({ ...equipment, locationId: newVal });
                  }}
                >
                  {locations.map((l) => (
                    <Option
                      key={l.id}
                      value={l.id}
                    >
                      {l.location}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              xs={2}
              sx={{ alignContent: 'flex-end' }}
            >
              <FormControl>
                <FormLabel>Quantity*</FormLabel>
                <Input
                  value={equipment.qty}
                  type='number'
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            container
            spacing={1}
          >
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Type*</FormLabel>
                <Select
                  placeholder='Select the equipment type...'
                  sx={{ height: 41 }}
                  onChange={(e, newVal) => {
                    setEquipment({ ...equipment, typeId: newVal });
                  }}
                  required
                >
                  {types.map((t) => (
                    <Option
                      key={t.id}
                      value={t.id}
                    >
                      {t.type}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Brand</FormLabel>
                <Input placeholder='(Optional)' />
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input placeholder='(Optional)' />
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Serial Number</FormLabel>
                <Input placeholder='Serial Number' />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            container
            spacing={1}
          >
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Category*</FormLabel>
                <Select
                  placeholder='Select the equipment category...'
                  sx={{ height: 41 }}
                  onChange={(e, newVal) => {
                    setEquipment({ ...equipment, categoryId: newVal });
                  }}
                  required
                >
                  {categories.map((c) => (
                    <Option
                      key={c.id}
                      value={c.id}
                    >
                      {c.category}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3}>
              {selectedOption === 1 && (
                <Grid
                  sx={{
                    mt: '26px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'space-between',
                  }}
                >
                  <Input
                    type='number'
                    placeholder='Amps'
                    required
                  />
                  <Input
                    type='number'
                    placeholder='Volts'
                    sx={{ ml: 1 }}
                    required
                  />
                </Grid>
              )}
              {selectedOption === 4 && (
                <Input
                  type='number'
                  placeholder='Watts'
                  sx={{ mt: '26px' }}
                  required
                />
              )}
              {selectedOption === 2 && (
                <Input
                  type='number'
                  placeholder='Killowatts'
                  sx={{ mt: '26px' }}
                  required
                />
              )}

              {selectedOption === 3 && (
                <Input
                  type='number'
                  placeholder='BTUs'
                  sx={{ mt: '26px' }}
                  required
                />
              )}
            </Grid>
            <Grid xs={3}>
              <Select
                onChange={(e, newVal) => {
                  setSelectedOption(newVal);
                }}
                defaultValue={selectedOption}
                sx={{ height: 41, mt: '26px' }}
              >
                {energyUnits.map((u) => (
                  <Option
                    key={u.id}
                    value={u.id}
                  >
                    {u.unit}
                  </Option>
                ))}
              </Select>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Daily Use*</FormLabel>
                <Input
                  type='number'
                  placeholder='Hours used per day'
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            xs={12}
            sx={{ my: 1 }}
          >
            <Textarea
              placeholder='Additional Notes'
              minRows={3}
            />
          </Grid>
          <Grid
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button>Submit</Button>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
}
