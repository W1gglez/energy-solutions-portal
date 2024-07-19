import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h2>Usage</h2>
      <p>This portal is designed to take input from auditors or employees and give responses.</p>
      <ul>
        <li>Create a new facility from the Home Page.</li>
        <li>Enter data on the facility and save.</li>
        <li>Start a new Assessment.</li>
        <li>Answer the questions and add any eqipment in that location.</li>
        <li>Enter any additional Equipment not listed.</li>
        <li>Submit the Assessment.</li>
        <li>Review the recommendations and service or replace any items noted.</li>
      </ul>
    </div>
  );
}

export default InfoPage;
