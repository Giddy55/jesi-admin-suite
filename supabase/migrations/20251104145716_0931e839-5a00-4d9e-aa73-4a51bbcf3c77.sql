-- Insert sample schools data with correct school types
INSERT INTO schools (name, ges_registration_no, district, region, school_type, address, contact_email, contact_phone, subscription_tier, subscription_status) VALUES 
('Accra Senior High School', 'GES-001-2024', 'Accra Metropolitan', 'Greater Accra', 'Public', '123 Independence Ave, Accra', 'admin@accrashs.edu.gh', '+233 24 123 4567', 'Premium', 'active'),
('Kumasi Technical Institute', 'GES-045-2024', 'Kumasi Metropolitan', 'Ashanti', 'Public', '45 Tech Road, Kumasi', 'info@kti.edu.gh', '+233 32 456 7890', 'Free', 'active'),
('Cape Coast Preparatory School', 'GES-089-2024', 'Cape Coast Metropolitan', 'Central', 'Private', '78 University Road, Cape Coast', 'contact@ccps.edu.gh', '+233 33 789 0123', 'Premium', 'trial'),
('Tamale Islamic School', 'GES-112-2024', 'Tamale Metropolitan', 'Northern', 'Mission', '90 Mosque Street, Tamale', 'admin@tis.edu.gh', '+233 37 234 5678', 'Free', 'active'),
('Tema International School', 'GES-156-2024', 'Accra Metropolitan', 'Greater Accra', 'International', '12 Community 1, Tema', 'admissions@tis.edu.gh', '+233 30 345 6789', 'Premium', 'expired'),
('Ho Polytechnic', 'GES-203-2024', 'Ho Municipal', 'Volta', 'Public', '56 Education Road, Ho', 'info@hopoly.edu.gh', '+233 36 567 8901', 'Free', 'trial'),
('Takoradi Private Academy', 'GES-267-2024', 'Sekondi-Takoradi Metropolitan', 'Western', 'Private', '89 Tech Avenue, Takoradi', 'admissions@tpa.edu.gh', '+233 31 678 9012', 'Premium', 'active'),
('Sunyani Mission School', 'GES-334-2024', 'Sunyani Municipal', 'Bono', 'Mission', '34 School Lane, Sunyani', 'admin@sms.edu.gh', '+233 35 789 0123', 'Free', 'expired');