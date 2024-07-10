CREATE TABLE IF NOT EXISTS "user" (
	"id" serial primary key,
	 "username" varChar(80) not null UNIQUE,
	"password" varChar(100) not null,
	"admin" boolean default false,
	"registered" boolean default false
);

CREATE TABLE IF NOT EXISTS "facility" (
	"id" serial primary key,
	"user_id" int references "user" not null,
	"name" varchar not null,
	"address" varchar not null,
	"state" varchar not null,
	"zip" int not null,
	"years_in_business" int not null,
	"building_age" int not null,
	"hours_of_operation" int not null,
	"weekly_customers" int not null,
	"sit_down" boolean default true
);
	
CREATE TABLE IF NOT EXISTS "energy_cost" (
	"id" serial primary key,
	"facility_id" int references "facility" not null,
	"electric" decimal not null,
	"natural_gas" decimal not null,
	"liquid_propane" decimal not null,
	"gas_propane" decimal not null,
	"heating_oil" decimal not null
);

CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial primary key,
	"facility_id" int references "facility" not null,
	"recommendations" text,
	"current_monthly_cost" decimal not null,
	"current_carbon_footprint" decimal not null,
	"proposed_monthly_cost" decimal not null, --May not need, discuss with russel
	"proposed_carbon_footprint" decimal not null --May not need, discuss with russel
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

CREATE TABLE IF NOT EXISTS "equipment" (
	"id" serial primary key,
	"facility_id" int references "facility" not null,
	"type_id" int references "equipment_type" not null,
	"brand" varchar,
	"model_number" varchar,
	"serial-number" varchar,
	"quantity" int not null,
	"location_id" int references "equipment_location" not null,
	"category_id" int references "energy_category" not null,
	"unit_id" int references "energy_units" not null,
	"hours_used/day" int not null,
	"energy_usage" decimal not null,
	"cost_per_day" decimal not null,
	"cost_per_month" decimal not null,
	"carbon_footprint" decimal not null,
	"notes" varchar
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
('Sink'),
('Toilet'),
('Doors'),
('Windows'),
('Ice Cream machine'),
('Air Conditioner'),
('Furnace'),
('Heat Pump'),
('Ventilation System'),
('Thermostat'),
('Computer'),
('Printer'),
('Copier'),
('Monitor'),
('Server'),
('Microwaves'),
('Blender'),
('Coffee Maker'),
('Refrigerator'),
('Vending Machine'),
('Point of Sale system'),
('Cash Register'),
('Fire Alarm'),
('Security System'),
('Solar Panels'),
('Battery storage'),
('Sprinklers'),
('Water Pumps'),
('Fountains'),
('Electric Hand Dryers');


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
('Gas Propane'),
('Water');

INSERT INTO energy_units (unit) VALUES
('Amps&Volts'),
('Watts'),
('Kilowatts'),
('BTU'),
('CCF'),
('Cubic Ft'),
('Gallons');