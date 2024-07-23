import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import EquipmentForm from '../../Assessment/EqupmentForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ReportEquipmentCard({ e }) {
  const user = useSelector((store) => store.user);
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);

  const [open, setOpen] = useState(false);

  const determineUnit = () => {
    if (e.amps != null) {
      return 1;
    } else if (e.watts != null) {
      return 2;
    } else if (e.kW != null) {
      return 3;
    } else if (e.btu != null) {
      return 4;
    }
  };

  return (
    <Card
      orientation='horizontal'
      variant='outlined'
    >
      <EquipmentForm
        open={open}
        setOpen={setOpen}
        e={e}
        unit={determineUnit()}
      />
      <CardContent
        onClick={
          user.admin === true
            ? () => {
                setOpen(true);
              }
            : undefined
        }
      >
        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
        >
          <DialogTitle>{e.description ?? types[e.typeId - 1].type}</DialogTitle>
          <DialogTitle>Qty: {e.qty}</DialogTitle>
        </Grid>

        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography>{locations[e.locationId - 1].location}</Typography>
          <Typography>Daily Usage: {e.hoursPerDay} hrs</Typography>
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: 'space-between',
          }}
        >
          {e.brand && <Typography>Brand: {e.brand}</Typography>}
          {e.modelNumber && <Typography>Model: {e.modelNumber}</Typography>}
          {e.serialNumber && <Typography>SN: {e.serialNumber}</Typography>}
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Typography>Type: {categories[e.categoryId - 1].category}</Typography>
          <Typography>Energy Usage: {e.energy_usage} kWh</Typography>
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Typography>Monthly Cost: ${e.cost_per_month.toFixed(2)}</Typography>
          <Typography>
            Carbon Footprint: {e.carbon_footprint} tons/yr
          </Typography>
        </Grid>
        <Grid container>
          <Typography>Notes: {e.notes}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
