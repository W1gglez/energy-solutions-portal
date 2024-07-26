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
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function EquipmentForm(props) {
  const {
    type,
    location,
    category,
    unit,
    e,
    i,
    open,
    setOpen,
    setIsEntryHeater,
  } = props;

  const dispatch = useDispatch();
  const url = useLocation();
  const reportDetails = useSelector((store) => store.reports.reportDetails);

  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);
  const energyUnits = useSelector((store) => store.energyUnits);
  const energyCost = url.pathname.includes('/report/')
    ? reportDetails.energy_cost
    : useSelector((store) => store.energyCost);

  const [equipment, setEquipment] = useState({
    description: e?.description || undefined,
    typeId: e?.typeId || type || 0,
    brand: e?.brand || undefined,
    modelNumber: e?.modelNumber || undefined,
    serialNumber: e?.serialNumber || undefined,
    qty: e?.qty || 1,
    locationId: e?.locationId || location || 0,
    categoryId: e?.categoryId || category || 0,
    amps: e?.amps || undefined,
    volts: e?.volts || undefined,
    watts: e?.watts || undefined,
    kW: e?.kW || undefined,
    btu: e?.btu || undefined,
    hoursPerDay: e?.hoursPerDay || undefined,
    notes: e?.notes || undefined,
  });

  const [selectedOption, setSelectedOption] = useState(unit ?? 1);

  const calculateEnergyUsage = () => {
    const { amps, volts, watts, kW, btu, hoursPerDay } = equipment;
    let energyUsage;
    if (amps != null) {
      energyUsage = ((volts * amps) / 1000) * hoursPerDay;
    } else if (watts != null) {
      energyUsage = (watts / 1000) * hoursPerDay;
    } else if (kW != null) {
      energyUsage = kW * hoursPerDay;
    } else if (btu != null) {
      energyUsage = (btu / 3412.13) * hoursPerDay;
    }
    return energyUsage.toFixed(3);
  };

  function calculateCostPerDay(energyUsage) {
    const { categoryId, qty } = equipment;
    const { electric, natural_gas, liquid_propane, gas_propane } = energyCost;
    let costPerDay;
    switch (categoryId) {
      case 1:
        costPerDay = energyUsage * qty * electric;
        break;
      case 2:
        costPerDay = energyUsage * qty * natural_gas;
        break;
      case 3:
        costPerDay = energyUsage * qty * liquid_propane;
        break;
      case 4:
        costPerDay = energyUsage * qty * gas_propane;
        break;
    }
    return costPerDay.toFixed(2);
  }

  const calculateCarbonFootprint = (costPerDay) => {
    const { categoryId } = equipment;
    //Store as lbs/kWh
    const carbonEmissions = {
      electric: 0.99,
      natural_gas: 0.399,
      liquid_propane: 0.494,
      gas_propane: 0.494,
    };
    let carbonFootprint;
    switch (categoryId) {
      case 1:
        carbonFootprint = (costPerDay * carbonEmissions.electric * 365) / 2000;
        break;
      case 2:
        carbonFootprint =
          (costPerDay * carbonEmissions.natural_gas * 365) / 2000;
        break;
      case 3:
        carbonFootprint =
          (costPerDay * carbonEmissions.liquid_propane * 365) / 2000;
        break;
      case 4:
        carbonFootprint =
          (costPerDay * carbonEmissions.gas_propane * 365) / 2000;
        break;
    }
    return carbonFootprint.toFixed(3);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const energyUsage = calculateEnergyUsage();
    // console.log(energyUsage);
    const costPerDay = calculateCostPerDay(energyUsage);
    // console.log(costPerDay);

    const costPerMonth = costPerDay * 30.5;
    const carbonFootprint = calculateCarbonFootprint(costPerDay);
    console.log(typeof e);
    {
      if (url.pathname.includes('/report/')) {
        typeof e !== 'undefined'
          ? dispatch({
              type: 'UPDATE_EQUIPMENT',
              payload: {
                ...equipment,
                reportId: reportDetails.id,
                id: e.id,
                energyUsage,
                costPerDay,
                costPerMonth,
                carbonFootprint,
              },
            })
          : dispatch({
              type: 'ADD_EQUIPMENT',
              payload: {
                ...equipment,
                reportId: reportDetails.id,
                energyUsage,
                costPerDay,
                costPerMonth,
                carbonFootprint,
              },
            });
      } else {
        typeof i !== 'undefined'
          ? dispatch({
              type: 'UPDATE_EQUIPMENT_INV',
              payload: {
                i,
                equipment: {
                  ...equipment,
                  energyUsage,
                  costPerDay,
                  costPerMonth,
                  carbonFootprint,
                },
              },
            })
          : dispatch({
              type: 'ADD_EQUIPMENT_INV',
              payload: {
                ...equipment,
                energyUsage,
                costPerDay,
                costPerMonth,
                carbonFootprint,
              },
            });
      }
    }
    setEquipment({
      description: e?.description || undefined,
      typeId: e?.typeId || type || 0,
      brand: e?.brand || undefined,
      modelNumber: e?.modelNumber || undefined,
      serialNumber: e?.serialNumber || undefined,
      qty: e?.qty || 1,
      locationId: e?.locationId || location || 0,
      categoryId: e?.categoryId || category || 0,
      amps: e?.amps || undefined,
      volts: e?.volts || undefined,
      watts: e?.watts || undefined,
      kW: e?.kW || undefined,
      btu: e?.btu || undefined,
      hoursPerDay: e?.hoursPerDay || undefined,
      notes: e?.notes || undefined,
    });

    setOpen(false);
  };

  const handleClose = () => {
    setEquipment({
      description: e?.description || undefined,
      typeId: e?.typeId || type || 0,
      brand: e?.brand || undefined,
      modelNumber: e?.modelNumber || undefined,
      serialNumber: e?.serialNumber || undefined,
      qty: e?.qty || 1,
      locationId: e?.locationId || location || 0,
      categoryId: e?.categoryId || category || 0,
      amps: e?.amps || undefined,
      volts: e?.volts || undefined,
      watts: e?.watts || undefined,
      kW: e?.kW || undefined,
      btu: e?.btu || undefined,
      hoursPerDay: e?.hoursPerDay || undefined,
      notes: e?.notes || undefined,
    });
    {
      url.pathname.includes('/assessment/q2') && setIsEntryHeater(false);
    }
    setOpen(false);
  };

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
    >
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
                  value={equipment.description}
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
                  defaultValue={equipment.locationId}
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
                  defaultValue={equipment.typeId}
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
                  value={equipment.brand}
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
                  value={equipment.modelNumber}
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
                  value={equipment.serialNumber}
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
                  defaultValue={equipment.categoryId}
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
                    value={equipment.amps}
                    slotProps={{ input: { step: '.01', min: 0 } }}
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
                    value={equipment.volts}
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
                  value={equipment.watts}
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
                  value={equipment.kW}
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
                  value={equipment.btu}
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
                value={selectedOption}
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
                  required
                  value={equipment.hoursPerDay}
                  slotProps={{ input: { min: 0, max: 24 } }}
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
              value={equipment.notes}
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
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              type='submit'
              sx={{
                backgroundColor: '#008242',
                width: '25%',
                '&:hover': {
                  backgroundColor: '#00341a',
                },
              }}
            >
              Submit
            </Button>
            <Button
              color='danger'
              sx={{
                width: '25%',
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
}
