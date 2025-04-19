-- Insert default organization
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
);  -- Prevent duplicate organization names


-- Insert roles
INSERT INTO roles (role_name)
VALUES
    ('Admin'),
    ('Teacher'),
    ('Student'),
    ('Staff'),
    ('Parent'),
    ('Principal');

INSERT INTO users (
    organization_id,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    gender,
    date_of_birth,
    is_active,
    created_at,
    updated_at
) VALUES
    (1, 'John', 'Doe', 'admin@gmail.com', '+1234567890',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Male', '1980-01-15', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert a default user role mapping
INSERT INTO role_mapping (
    role_id,
    user_id
) VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1);