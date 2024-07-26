import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import EquipmentForm from '../../Assessment/EqupmentForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/joy';
import { Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function ReportEquipmentCard({ e }) {
  const user = useSelector((store) => store.user);
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);

  const dispatch = useDispatch();

  const reportId = useParams().id;

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

  const handleClick = (e) => {
    if (e.target.name === 'deleteButton') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (user.admin === true) {
        setOpen(true);
      }
    }
  };

  return (
    <Card
      orientation='horizontal'
      variant='outlined'
      sx={{ border: '1px solid #1F1C4C' }}
    >
      <EquipmentForm
        open={open}
        setOpen={setOpen}
        e={e}
        unit={determineUnit()}
      />
      <CardContent
        onClick={() => {
          if (user.admin === true) {
            setOpen(true);
          }
          
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Grid
          container
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <DialogTitle sx={{ textJustify: 'flex-start' }}>
            {e.description ?? types[e.typeId - 1].type}
          </DialogTitle>
          <DialogTitle>Qty: {e.qty}</DialogTitle>
          {user.admin === true && (
            <IconButton
              sx={{ color: 'grey' }}
              onClick={(event) => {
                event.stopPropagation();
                dispatch({
                  type: 'REMOVE_EQUIPMENT',
                  payload: { id: e.id, reportId },
                });
              }}
            >
              <Delete name='deleteButton' />
            </IconButton>
          )}
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
