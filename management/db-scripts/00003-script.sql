ALTER TABLE users
ALTER COLUMN date_of_birth TYPE DATE
USING to_date(date_of_birth, 'YYYY-MM-DD');