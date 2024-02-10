-- Insert a client into the clients table --
INSERT INTO public.account (
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password
    ) 
VALUES(
    'Tony', 
    'Stark', 
    'tony@starkent.com', 
    'Iam1ronM@n'
    );

-- Modify the Tony Stark record to change the Admin --
UPDATE public.account SET account_type ='Admin' 
WHERE account_id = 1;

-- Delete Tony Stark account from database --
DELETE FROM public.account WHERE account_id = 1;

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interior" using a single query.--
UPDATE public.inventory SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10;

-- In join Sport --
SELECT inv_make, inv_model
FROM public.inventory
INNER JOIN public.classification
ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';

UPDATE public.inventory
SET 
    inv_image = REPLACE (inv_image, '/images/', './images/vehicles'),
    inv_thumbnail = REPLACE (inv_thumbnail, '/images/', './images/vehicles/');