import React from 'react';
import FacilityForm from './FacilityForm';
import Facilities from './Facilities';

import Box from '@mui/joy/Box';

function FacilityPage() {
  return (
    <Box sx={{ justifyContent: 'center', flex: 1 }}>
      <Facilities />
      <FacilityForm />
    </Box>
  );
}

export default FacilityPage;
