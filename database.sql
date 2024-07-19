CREATE TABLE IF NOT EXISTS "user" (
	"id" serial primary key,
	 "username" varChar(80) not null UNIQUE,
	"password" varChar(100) not null,
	"admin" boolean default false,
	"registered" boolean default false
);

CREATE TABLE IF NOT EXISTS "facility" (
	"id" serial primary key,
	"user_id" int references "user" ON DELETE CASCADE,
	"name" varchar not null,
	"address" varchar not null,
	"city" varchar not null DEFAULT 'Fargo',
	"state" varchar not null,
	"zip" int not null,
	"years_in_business" int not null,
	"building_age" int not null,
	"hours_of_operation" int not null,
	"weekly_customers" int not null,
	"sit_down" boolean default true
);
	


CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial primary key,
	"facility_id" int references "facility" ON DELETE CASCADE,
	"date_submitted" DATE not null,
	"current_monthly_cost" decimal not null,
	"current_carbon_footprint" decimal not null,
	"approved" boolean default false,
	"notes" varchar,
	"approvedBy" int references "user"."id",
	"approvedAt" date
);

CREATE TABLE IF NOT EXISTS "equipment_type" (
	"id" serial primary key,
	"type" varchar not null
);

CREATE TABLE IF NOT EXISTS "equipment_location" (
	"id" serial primary key,
	"location" varchar not null
);

CREATE TABLE IF NOT EXISTS "energy_category" (
	"id" serial primary key,
	"category" varchar not null
);

CREATE TABLE IF NOT EXISTS "energy_units" (
	"id" serial primary key,
	"unit" varchar not null
);

CREATE TABLE IF NOT EXISTS "energy_cost" (
	"id" serial primary key,
	"report_id" int references "reports" ON DELETE CASCADE,
	"electric" decimal not null,
	"natural_gas" decimal not null,
	"liquid_propane" decimal not null,
	"gas_propane" decimal not null,
	"heating_oil" decimal not null
);

CREATE TABLE IF NOT EXISTS "equipment" (
	"id" serial primary key,
	"report_id" int references "reports" ON DELETE CASCADE,
	"description" varchar,
	"type_id" int references "equipment_type" not null,
	"brand" varchar,
	"model_number" varchar,
	"serial-number" varchar,
	"quantity" int not null,
	"location_id" int references "equipment_location" not null,
	"category_id" int references "energy_category" not null,
	"amps" decimal,
	"volts" int,
	"watts" int,
	"kW" decimal,
	"btu" int,
	"hours_used/day" int not null,
	"energy_usage" decimal not null, -- in kWh
	"cost_per_day" decimal not null,
	"cost_per_month" decimal not null,
	"carbon_footprint" decimal not null, --in ton/year
	"notes" varchar
);

CREATE TABLE IF NOT EXISTS "recommendations"(
"id" serial primary key,
"report_id" int references "reports" ON DELETE CASCADE,
"recommendations" varchar not null
);


INSERT INTO equipment_type (type) VALUES
('Oven'),
('Ice machine'),
('Cooler'),
('Freezer'),
('Food Warmer'),
('Fan'),
('Walk In Freezer'),
('Water Heater'),
('Lights'),
('Dishwasher'),
('Boiler system'),
('Rooftop Unit'),
('Ice Cream machine'),
('Air Conditioner'),
('Furnace'),
('Heat Pump'),
('Heater'),
('Ventilation System'),
('TVs'),
('Coffee Maker'),
('Refrigerator'),
('Water Pumps');



INSERT INTO equipment_location (location) VALUES
('Front Entrance'),
('Rear Entrance'),
('Bathroom'),
('Kitchen'),
('Dining Area'),
('Office Area'),
('Break Area'),
('Roof'),
('Lobby'),
('Hallways'),
('Storage Room'),
('Mechanical Room'),
('Server Room'),
('Pantry'),
('Bar area'),
('Dishwashing area'),
('Outdoor seating');

INSERT INTO energy_category (category) VALUES
('Electric'),
('Natural Gas'),
('Liquid Propane'),
('Gas Propane');

INSERT INTO energy_units (unit) VALUES
('Amps/Volts'),
('Watts'),
('Kilowatts'),
('BTUs');



