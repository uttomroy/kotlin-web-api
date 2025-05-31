-- Check and create database if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'management') THEN
        CREATE DATABASE management;
    END IF;
END
$$;

-- Connect to the management database
\c management

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT null,
    address VARCHAR(255),
    contact_number varchar(50),
    email varchar(100),
    country varchar(100),
    created_at date,
    is_active bit
);

-- Create users table
CREATE TABLE users (
    user_id         SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    first_name      VARCHAR(255) NOT NULL,
    last_name       VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone_number    VARCHAR(25) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    gender          VARCHAR(25),
    date_of_birth   VARCHAR(30) NOT NULL,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id) 
);

-- Create roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create role_mapping table
CREATE TABLE role_mapping (
    role_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (role_id, user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)  ,
    FOREIGN KEY (user_id) REFERENCES users(user_id)  
);

-- Create teachers table
CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    department VARCHAR(50),
    joining_date VARCHAR(50),
    photo_url VARCHAR(300),
    designation VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)  
);

-- -- Create class levels
CREATE TABLE class_level (
                         id SERIAL PRIMARY KEY,
                         organization_id INTEGER NOT NULL,
                         name VARCHAR(50) NOT NULL,
                         FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

-- Create shifts table
CREATE TABLE shifts (
    shift_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    shift_name VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description VARCHAR(200),
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

-- Create classes table (updated to use shift_id instead of section)
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    class_level_id INTEGER NOT NULL,
    shift_id INTEGER NOT NULL,
    class_teacher_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)  ,
    FOREIGN KEY (class_level_id) REFERENCES class_level(id)  ,
    FOREIGN KEY (shift_id) REFERENCES shifts(shift_id),
    FOREIGN KEY (class_teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL
);

-- Create students table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    parent_contact VARCHAR(100),
    address VARCHAR(300),
    enrollment_date DATE NOT NULL,
    photo_url VARCHAR(300),
    emergency_contact VARCHAR(15),
    status VARCHAR(15),
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)  ,
    FOREIGN KEY (user_id) REFERENCES users(user_id)  ,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)  
);

-- Create subjects table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    is_compulsory BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create class subject mapping table
CREATE TABLE class_subject_mapping (
                          id SERIAL PRIMARY KEY,
                          class_id INTEGER NOT NULL,
                          subject_id INTEGER NOT NULL,
                          teacher_id INTEGER NOT NULL,
                          FOREIGN KEY (class_id) REFERENCES classes(class_id),
                          FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

-- Create exams table
CREATE TABLE exams (
    exam_id SERIAL PRIMARY KEY,
    class_id INTEGER NOT NULL,
    exam_type VARCHAR(50),
    passing_marks INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)  
);

-- Create exams_mapping table
CREATE TABLE exams_mapping (
    exam_map_id SERIAL PRIMARY KEY,
    exam_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    passing_marks INTEGER NOT NULL,
    exam_date DATE NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)  ,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)  
);

-- Create exams_results table
CREATE TABLE exams_results (
    exam_result_id SERIAL PRIMARY KEY,
    exam_map_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    marks_obtained INTEGER NOT NULL,
    grade VARCHAR(5) NOT NULL,
    status VARCHAR(15),
    FOREIGN KEY (exam_map_id) REFERENCES exams_mapping(exam_map_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)  
);

-- Create student_attendance table
CREATE TABLE student_attendance (
    student_attendance_id SERIAL PRIMARY KEY,
    class_subject_mapping_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    attendance_date DATE NOT NULL,
    present BOOLEAN NULL,
    remarks VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (class_subject_mapping_id) REFERENCES class_subject_mapping(id)
);

-- Add indexes for student_attendance table to improve query performance
CREATE INDEX IF NOT EXISTS idx_student_attendance_student_date 
ON student_attendance(student_id, attendance_date);