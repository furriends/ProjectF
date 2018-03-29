# --- Demo Checklist ---
# Select & Project: 		Get Applications
# Join:						Get branches by city
# Division:					Get branches with all animal breeds
# Aggregation:				By adoption fee
# Nested Aggregation:		Select min/max of average applications per species
# Delete (Cascade):			Delete Animal
# Delete (Non-Cascade): 	Delete Application
# Update:					Animals

# --- TA Questions ---
# Demo checklist for division says "insert a new tuple", can this be manual or must be done through UI?
# Delete user input fales cascade specification?
# Can we do multiple agregations per query?

# ------------
# User
# ------------

# These tables for sign in and join purposes only

# Get Profile (Applicant)
SELECT name, phone FROM Applicant WHERE phone={}

# Get Profile (Staff)
SELECT name, phone FROM Staff WHERE phone={}

# ------------
# Application
# ------------

# Get Single Application
SELECT home, budget, pets, status, animal_id FROM Application WHERE application_id={}

# Get All Applications
SELECT home, budget, pets, status, animal_id, application_id FROM Application

# Get Applications 
SELECT {} FROM Application WHERE {}}={}

# Delete Application
DELETE FROM Application WHERE {}={}

# ------------
# Animal
# ------------

# Get Animal
SELECT img_url, birthdate, sex, weight, name, special_needs, intake_date, animal_id FROM Animal WHERE animal_id={}
# What about species, status, location

# Get all Animals
SELECT img_url, birthdate, sex, weight, name, special_needs, intake_date FROM Animal

# Get Animals by adoption fee
SELECT img_url, birthdate, sex, weight, name, special_needs, intake_date FROM Animal WHERE species_id IN (SELECT DISTINCT species_id FROM Species WHERE fee=MIN(fee))

# Update Animal
UPDATE Animal SET {} WHERE animal_id={}

# Delete Animal
DELETE FROM Animal WHERE {}

# ------------
# Species
# ------------

# We dont need species type

# ------------
# Location
# ------------

# ------------
# Branch
# ------------

# Get branches by city
SELECT name, address FROM Branch NATURAL JOIN Location WHERE city={}

# Get branches with all animal breeds
SELECT name, address, city FROM Branch NATURAL JOIN Location AS B WHERE NOT EXISTS
(SELECT DISTINCT species_id FROM Species WHERE species_id NOT IN (SELECT DISTINCT species_id FROM Animal WHERE Animal.location_id=B.location_id))

# ------------
# Other
# ------------

# Select min/max of average applications per species
SELECT name, breed, MAX(B.avgApplication) FROM Species natural join (
SELECT species_id, AVG(A.numApplication) as avgApplication FROM Animal natural join (
SELECT animal_id, COUNT(animal_id) as numApplication FROM Application WHERE status!="rejected" GROUP BY animal_id) AS A
group by species_id) as B;