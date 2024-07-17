import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function EquipmentForm(props) {
  const { type, location, category } = props;

  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);
  const energyUnits = useSelector((store) => store.energyUnits);

  const [equipment, setEquipment] = useState({
    description: null,
    typeId: type || 0,
    brand: null,
    modelNumber: null,
    serialNumber: null,
    qty: 1,
    locationId: location || 0,
    categoryId: category || 0,
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

  //   useEffect(() => {
  //     console.table(equipment);
  //   }, [equipment]);

  return (
    <Modal open={Boolean(props.open)}>
      <ModalDialog sx={{ width: '65vw' }}>
        <DialogTitle>Equipment Details</DialogTitle>
        <DialogContent>
          Fill in the information from your equipments data plate.
        </DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              xs={6}
              sx={{ alignContent: 'center' }}
            >
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder='ex: "Beer Cooler"'
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      description: e.target.value || null,
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
                  defaultValue={location || null}
                  placeholder='Select the equipment location...'
                  sx={{ height: 41 }}
                  onChange={(e, newVal) => {
                    setEquipment({ ...equipment, locationId: newVal });
                  }}
                  required
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
                  slotProps={{ input: { min: 0 } }}
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      qty: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
          >
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Type*</FormLabel>
                <Select
                  defaultValue={type || null}
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
                <Input
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      brand: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      modelNumber: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Serial Number</FormLabel>
                <Input
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      serialNumber: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
          >
            <Grid xs={3}>
              <FormControl>
                <FormLabel>Category*</FormLabel>
                <Select
                  defaultValue={category || null}
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
                    slotProps={{ input: { min: 0 } }}
                    placeholder='Amps'
                    onChange={(e) =>
                      setEquipment({
                        ...equipment,
                        amps: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    type='number'
                    slotProps={{ input: { min: 0 } }}
                    placeholder='Volts'
                    sx={{ ml: 1 }}
                    onChange={(e) =>
                      setEquipment({
                        ...equipment,
                        volts: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              )}
              {selectedOption === 2 && (
                <Input
                  type='number'
                  slotProps={{ input: { min: 0 } }}
                  placeholder='Watts'
                  sx={{ mt: '26px' }}
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      watts: e.target.value,
                    })
                  }
                  required
                />
              )}
              {selectedOption === 3 && (
                <Input
                  type='number'
                  placeholder='Killowatts'
                  slotProps={{ input: { step: '.001', min: 0 } }}
                  sx={{ mt: '26px' }}
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      kW: e.target.value,
                    })
                  }
                  required
                />
              )}

              {selectedOption === 4 && (
                <Input
                  type='number'
                  slotProps={{ input: { min: 0 } }}
                  placeholder='BTUs'
                  sx={{ mt: '26px' }}
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      btu: e.target.value,
                    })
                  }
                  required
                />
              )}
            </Grid>
            <Grid xs={3}>
              <Select
                onChange={(e, newVal) => {
                  setSelectedOption(newVal);
                  setEquipment({
                    ...equipment,
                    amps: null,
                    volts: null,
                    watts: null,
                    kW: null,
                    btu: null,
                  });
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
                  slotProps={{ input: { min: 0 } }}
                  placeholder='Hours used per day'
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      hoursPerDay: e.target.value,
                    })
                  }
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
              onChange={(e) =>
                setEquipment({
                  ...equipment,
                  notes: e.target.value,
                })
              }
            />
          </Grid>
          <Grid
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              type='submit'
              sx={{ width: '25vw' }}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
}
