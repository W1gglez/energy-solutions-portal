import { useSelector } from 'react-redux';

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';

export default function EquipmentCard({ equipment }) {
  const categories = useSelector((store) => store.categories);
  const types = useSelector((store) => store.equipmentTypes);
  const locations = useSelector((store) => store.locations);

  return (
    <Grid>
      <Card
        orientation='horizontal'
        variant='outlined'
        sx={{ width: '45vw' }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DialogTitle>
              {equipment.description ?? types[equipment.typeId - 1].type}
            </DialogTitle>
            <DialogTitle>Qty: {equipment.qty}</DialogTitle>
          </Box>

          <Typography>
            {locations[equipment.locationId - 1].location}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {equipment.brand && (
              <Typography>Brand: {equipment.brand}</Typography>
            )}
            {equipment.modelNumber && (
              <Typography>Model: {equipment.modelNumber}</Typography>
            )}
            {equipment.serialNumber && (
              <Typography>SN: {equipment.serialNumber}</Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Typography>
              Type: {categories[equipment.categoryId - 1].category}
            </Typography>
            {equipment.amps && <Typography>Amps: {equipment.amps}</Typography>}
            {equipment.watts && (
              <Typography>Watts: {equipment.watts}</Typography>
            )}
            {equipment.volts && (
              <Typography>Volts: {equipment.volts}</Typography>
            )}
            {equipment.kW && (
              <Typography>Killowatts: {equipment.kW}</Typography>
            )}
            {equipment.btu && <Typography>BTUs: {equipment.btu}</Typography>}

            <Typography>
              Hours running per day: {equipment.hoursPerDay}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
