import { Grid, Input, Option, Select, Textarea } from '@mui/joy';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function EquipmentForm(props) {
  const { type, location } = props;
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.types);
  const locations = useSelector((store) => store.locations);
  const energyUnits = useSelector((store) => store.energyUnits);
  const [selectedUnit, setSelectedUnit] = useState(0);

  return (
    <Grid container>
      <Input placeholder='Description' />
      <Select placeholder='Select the equipment location...'>
        {locations.map((l) => (
          <Option
            key={l.id}
            value={l.id}
          >
            {l.location}
          </Option>
        ))}
      </Select>
      <Input placeholder='Brand' />
      <Input placeholder='Model' />
      <Input placeholder='S/N' />
      <Input
        type='number'
        placeholder='Quantity'
        required
      />

      <Input
        type='number'
        placeholder='Amps'
        required
      />

      <Input
        type='number'
        placeholder='Volts'
        required
      />
      <Input
        type='number'
        placeholder='Watts'
      />
      <Input
        type='number'
        placeholder='Killowatts'
      />
      <Input
        type='number'
        placeholder='BTUs'
      />
      <Select value={1}>
        {energyUnits.map((u) => (
          <Option
            key={u.id}
            value={u.id}
          >
            {u.unit}
          </Option>
        ))}
      </Select>
      <Input
        type='number'
        placeholder='Hours used per day'
      />
      <Grid xs={12}>
        <Textarea
          placeholder='Additional Notes'
          minRows={3}
        />
      </Grid>
    </Grid>
  );
}
