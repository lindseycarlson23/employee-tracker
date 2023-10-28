INSERT INTO departments (department_name)
VALUES  ("Human Resources"),
        ("Engineering"),
        ("Sales"),
        ("Finance"),
        ("Business Operations");


INSERT INTO roles (title, salary, department_id)
VALUES  ("HR Generalist", 75000, 1),
        ("HR VP", 140000, 1),
        ("Software Engineer", 110000, 2),
        ("CTO", 180000, 2),
        ("B2B Sales Rep", 100000, 3),
        ("Sales Manager", 150000, 3);
        

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("Fitzwilliam", "Darcy", 5),
        ("Jane", "Bennett", 3),
        ("Elizabeth", "Bennett", 4),
        ("Caroline", "Bingley", 1),
        ("Georgiana", "Darcy", 3),
        ("Charlotte", "Lucas", 6),
        ("Colonel", "Fitzwilliam", 2),
        ("Charles", "Bingley", 5);
