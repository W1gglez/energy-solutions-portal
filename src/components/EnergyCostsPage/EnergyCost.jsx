import React from 'react';
import EnergyCostForm from './EnergyCostForm';
import EnergyCostReport from './EnergyCostReport.jsx';

function EnergyCost() {
	return (
		<>
			<h2>Energy Costs</h2>
            <EnergyCostReport />
			<EnergyCostForm />
		</>
	);
}

export default EnergyCost;