import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This portal is designed to allow auditors and employees to input data on equipment at a facility and will return recommendations on ways to increase energy efficiency and reduce CO2 expenditure for the facility.</p>
      </div>
    </div>
  );
}

export default AboutPage;
