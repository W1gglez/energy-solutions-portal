import React from 'react';
import FacilityForm from './FacilityForm';
import AdminFacilities from './AdminFacilities';

import Box from '@mui/joy/Box';

function AdminFacilityPage() {
	return (
    <Box sx={{ flex: 1 }}>
      <AdminFacilities />
      <FacilityForm />
    </Box>
  );
}

export default AdminFacilityPage;
