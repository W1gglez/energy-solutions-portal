import React from 'react';
import EnergyCostForm from './EnergyCostForm';
import EnergyCostReport from './EnergyCostReport.jsx';
import AdminEnergyCostReport from './AdminEnergyCostReport.jsx';


//reports are commented out for testing purposes, will be uncommented when the reports are needed
function EnergyCost() {
	return (
		<>
			<h2>Energy Costs</h2>
			{/* <AdminEnergyCostReport /> */}
            {/* <EnergyCostReport /> */}
			<EnergyCostForm />
		</>
	);
}

export default EnergyCost;