import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EnergyCostReport() {
	const dispatch = useDispatch();
	// const report_id = useParams;
    const report_id = 1;

	useEffect(() => {
		dispatch({ type: 'FETCH_ENERGY_COSTS'});
	}, []);

	const energyCosts = useSelector((store) => store.energy);
	console.log('Testing store', energyCosts);

	return (
		<>
			<div>
				<h4>Energy Cost Report</h4>
				{energyCosts.map((cost, i) => (
					<Card key={i}>
						<Card.Body>
							<Card.Title>Displaying costs for Report {cost.report_id}</Card.Title>
							<Card.Text>
								<p>Electric: {cost.electric}</p>
								<p>Natural Gas: {cost.natural_gas}</p>
								<p>Liquid Propane: {cost.liquid_propane}</p>
								<p>Gas Propane: {cost.gas_propane}</p>
								<p>Heating Oil: {cost.heating_oil}</p>
							</Card.Text>
						</Card.Body>
					</Card>
				))}
			</div>
		</>
	);
}

export default EnergyCostReport;
