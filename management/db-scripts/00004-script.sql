ALTER TABLE teachers
ALTER COLUMN joining_date TYPE DATE
USING to_date(joining_date, 'YYYY-MM-DD')
