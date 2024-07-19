import React from 'react';
import FacilityForm from './FacilityForm';
import Facilities from './Facilities';

import Container from '@mui/joy/Container';

function FacilityPage() {
	return (
    <Container sx={{ justifyContent: 'center', flex: 1 }}>
      <Facilities />
      <FacilityForm />
    </Container>
  );
}

export default FacilityPage;
