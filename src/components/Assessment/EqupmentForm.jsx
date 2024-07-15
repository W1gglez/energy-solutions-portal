import { Grid, Input, Select, Textarea } from '@mui/joy';
import { useSelector } from 'react-redux';

export default function EquipmentForm(props) {
  const { type, location } = props;
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.type);
  const locations = useSelector((store) => store.location);

  return (
    <Grid container>
      <Input placeholder='Description'></Input>
      <Select placeholder='Select the location of the equipment...'>
        {loca}
      </Select>
      <Input placeholder='Brand'></Input>
      <Input placeholder='Model'></Input>
      <Input placeholder='S/N'></Input>
      <Input
        type='number'
        placeholder='Quantity'
        required
      ></Input>
      <Input
        type='number'
        placeholder='Amps'
        required
      ></Input>
      <Input
        type='number'
        placeholder='Volts'
        required
      ></Input>
      <Input
        type='number'
        placeholder='Watts'
      ></Input>
      <Input
        type='number'
        placeholder='Killowatts'
      ></Input>
      <Input
        type='number'
        placeholder='BTUs'
      ></Input>
      <Input
        type='number'
        placeholder='Hours used per day'
      ></Input>
      <Textarea placeholder='Notes'></Textarea>
    </Grid>
  );
}
