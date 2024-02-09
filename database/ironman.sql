-- Insert a client into the clients table --
INSERT INTO clients (clientFirstname, clientLastname, clientEmail, clientPassword) 
VALUES('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Modify the Tony Stark record to change the clientLevel to 3 --
UPDATE clients SET clientLevel  = 3 WHERE clientFirstname = 'Tony' AND
clientLastname = 'Stark';

-- Modify the "GM Hummer" record to read "spacious interior" rather than "small interior" using a single query.--
UPDATE inventory SET inv_description = REPLACE(inv_description, 'small', 'spacious')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';
