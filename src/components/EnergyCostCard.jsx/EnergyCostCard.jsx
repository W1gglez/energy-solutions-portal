import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import { useSelector } from 'react-redux';

export default function EnergyCostCard() {
  const energyCost = useSelector((store) => store.energyCost);
  const date = new Date().toLocaleDateString();

  return (
    <Card
      orientation='horizontal'
      variant='outlined'
      sx={{ width: '45vw' }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle>Input Energy Costs</DialogTitle>
          <DialogTitle>{date}</DialogTitle>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography>Electric: ${energyCost.electric}</Typography>
          <Typography>Natural Gas: ${energyCost.natural_gas}</Typography>
          <Typography>Liquid Propane: ${energyCost.liquid_propane}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          {energyCost.gas_propane && (
            <Typography>Gas Propane: ${energyCost.gas_propane}</Typography>
          )}
          {energyCost.heating_oil && (
            <Typography>Heating Oil: ${energyCost.heating_oil}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
