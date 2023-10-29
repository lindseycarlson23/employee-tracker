--view all departments
    --formatted table showing department names and department ids



--view all roles
    --job title, role id, the department that role belongs to, and the salary for that role
USE t5nwm6np5lskt3ga;

SELECT roles.title, roles.id, departments.department_name, roles.salary
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id;

--view all employees
    --formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WITH managersCTE AS (SELECT * FROM employees WHERE manager_id IS NULL)
SELECT 
	e.id, 
    e.first_name, 
    e.last_name,
	roles.title, 
    departments.department_name AS department, 
    roles.salary,
    CONCAT(managersCTE.first_name, ' ', managersCTE.last_name) AS manager    
FROM employees AS e
LEFT JOIN roles ON e.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN managersCTE ON e.manager_id = managersCTE.id
--add a department
    --prompted to enter the name of the department and that department is added to the database

--add a role
    --prompted to enter the name, salary, and department for the role and that is added to the database
INSERT INTO role (title, salary, department_id)
    VALUES ()

--add an employee
    --prompted to enter employee's first name, last name, role, and manager, and that is added to the db

--update an employee role
    --prompted to select an employee to update and their new role and this information is updated in the db