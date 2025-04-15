-- First ensure we have a unique constraint on name
ALTER TABLE organizations ADD CONSTRAINT organizations_name_unique UNIQUE (name);

-- Insert a default organization
INSERT INTO organizations (
    name,
    address,
    contact_number,
    email,
    country,
    created_at,
    is_active
) VALUES (
    'Rajapur High School',                -- name
    'Rajapur, Jhalakathi',               -- address
    '+880-1234567890',                   -- contact_number
    'info@rajapurhs.edu.bd',             -- email
    'Bangladesh',                         -- country
    CURRENT_DATE,                         -- created_at
    B'1'                                  -- is_active (bit type requires B'1' for true)
)
ON CONFLICT ON CONSTRAINT organizations_name_unique DO NOTHING;  -- Prevent duplicate organization names
