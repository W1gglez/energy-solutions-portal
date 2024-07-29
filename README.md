# RJ Energy Solutions - Audit Portal

## Description

_Duration: 2 Week Sprint_

A proof-of-concept web app to replace the RJ Energy Solutions's Google Sheets workflow for tracking equipment, costs, and carbon footprint.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)

## Installation

1. Create a database named `rj_assessmnet_portal`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Create an `.env` file and add an environment variable `SERVER_SESSION_SECRET` with a random string of characters and numbers for password hashing
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Add your facility's information
2. Complete energy audit 
3. Review completed audits 

## Built With

- React.js
- Express.js
- Node.js
- Redux
- Passport.js
- Material UI

## Acknowledgement
Thanks to [Emerging Digital Academy](https://emergingacademy.org) who equipped and helped me to make this application a reality. 

## Support
If you have suggestions or issues, please email us at [minskyenergysolutions@gmail.com](minskyenergysolutions@gmail.com)