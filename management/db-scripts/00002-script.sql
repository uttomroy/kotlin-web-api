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

-- Insert users (Admin, Teachers, Students)
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
    -- Admin user
    (1, 'John', 'Doe', 'admin@gmail.com', '+1234567890',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Male', '1980-01-15', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Teacher users
    (1, 'Sarah', 'Johnson', 'sarah.johnson@school.edu', '+1234567891',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Female', '1985-03-20', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    (1, 'Michael', 'Brown', 'michael.brown@school.edu', '+1234567892',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Male', '1982-07-10', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    -- Student users
    (1, 'Alice', 'Smith', 'alice.smith@student.edu', '+1234567893',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Female', '2010-05-15', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    (1, 'Bob', 'Wilson', 'bob.wilson@student.edu', '+1234567894',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Male', '2010-08-22', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    
    (1, 'Carol', 'Davis', 'carol.davis@student.edu', '+1234567895',
     '$2a$12$1w26guq5eUkBFW33ueqvhOCE8YSbgKrfLUq32a3V4nb9j3fLY/L4O',
     'Female', '2010-12-03', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert role mappings
INSERT INTO role_mapping (role_id, user_id) VALUES
    -- Admin roles
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1),
    -- Teacher roles
    (2, 2), (2, 3),
    -- Student roles
    (3, 4), (3, 5), (3, 6);

-- Insert class levels
INSERT INTO class_level (organization_id, name) VALUES
    (1, 'Class One'),
    (1, 'Class Two'),
    (1, 'Class Three');

-- Insert teachers
INSERT INTO teachers (user_id, department, joining_date, designation, is_active) VALUES
    (2, 'Mathematics', '2020-01-15', 'Senior Teacher', true),
    (3, 'Science', '2021-03-10', 'Teacher', true);

-- Insert classes
INSERT INTO classes (organization_id, class_level_id, section, class_teacher_id) VALUES
    (1, 1, 'A', 1),  -- Grade 1, Section A
    (1, 1, 'B', 2),  -- Grade 1, Section B
    (1, 2, 'A', 1);  -- Grade 2, Section A

-- Insert students
INSERT INTO students (
    organization_id, 
    class_id, 
    user_id, 
    father_name, 
    mother_name, 
    parent_contact, 
    address, 
    enrollment_date
) VALUES
    (1, 1, 4, 'Robert Smith', 'Mary Smith', '+1234567896', '123 Main St', '2024-01-15'),
    (1, 1, 5, 'James Wilson', 'Linda Wilson', '+1234567897', '456 Oak Ave', '2024-01-15'),
    (1, 2, 6, 'David Davis', 'Susan Davis', '+1234567898', '789 Pine Rd', '2024-01-15');

-- Insert subjects
INSERT INTO subjects (subject_name, subject_code, is_compulsory) VALUES
    ('Mathematics', 'MATH101', true),
    ('English', 'ENG101', true),
    ('Science', 'SCI101', true),
    ('History', 'HIST101', false);

-- Insert class subject mappings
INSERT INTO class_subject_mapping (class_id, subject_id, teacher_id) VALUES
    -- Grade 1, Section A
    (1, 1, 1),  -- Mathematics
    (1, 2, 2),  -- English
    (1, 3, 2),  -- Science
    
    -- Grade 1, Section B
    (2, 1, 1),  -- Mathematics
    (2, 2, 2),  -- English
    
    -- Grade 2, Section A
    (3, 1, 1),  -- Mathematics
    (3, 2, 2),  -- English
    (3, 3, 2);  -- Science

-- Insert sample attendance data
INSERT INTO student_attendance (
    class_subject_mapping_id,
    student_id,
    attendance_date,
    present,
    remarks
) VALUES
    -- January 2024 attendance for Grade 1, Section A - Mathematics
    (1, 1, '2024-01-15', true, 'Present'),
    (1, 2, '2024-01-15', true, 'Present'),
    (1, 1, '2024-01-16', false, 'Absent - Sick'),
    (1, 2, '2024-01-16', true, 'Present'),
    (1, 1, '2024-01-17', true, 'Present'),
    (1, 2, '2024-01-17', true, 'Present'),
    
    -- January 2024 attendance for Grade 1, Section A - English
    (2, 1, '2024-01-15', true, 'Present'),
    (2, 2, '2024-01-15', true, 'Present'),
    (2, 1, '2024-01-16', false, 'Absent - Sick'),
    (2, 2, '2024-01-16', true, 'Present'),
    
    -- February 2024 attendance
    (1, 1, '2024-02-01', true, 'Present'),
    (1, 2, '2024-02-01', true, 'Present'),
    (1, 1, '2024-02-02', true, 'Present'),
    (1, 2, '2024-02-02', false, 'Absent - Family event'),
    
    -- Grade 2, Section A attendance
    (6, 3, '2024-01-15', true, 'Present'),
    (6, 3, '2024-01-16', true, 'Present'),
    (6, 3, '2024-02-01', false, 'Absent - Medical appointment'),
    (6, 3, '2024-02-02', true, 'Present');