// import of mysql
const mysql = require('mysql2');
// import of inquirer
const inquirer = require('inquirer');

require("console.table");

//sql connection
const db = mysql.createConnection(
    {
      host: 'exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      // MySQL username,
      user: 'nrnd2jw978qxv51i',
      // TODO: Add MySQL password here
      password: 'lenbf7e246lhh7cw',
      database: 't5nwm6np5lskt3ga'
    },
    console.log(`Connected to the employee tracker database.`)
  );

// inquirer prompt
    // asks user what they want to do
    // switch case with the different choices

function init() {

    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Quit"
                ]
            }
        ])
        .then((answers) => {
            
            switch(answers.action) {
                case "View Departments":
                    // SELECT * FROM departments;
                    viewAllDepartments();
                    break;
                case "View Roles":
                    // SELECT * FROM roles;
                    viewAllRoles();
                    break;
                case "View Employees":
                    // SELECT * FROM roles;
                    viewAllEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Quit":
                    process.exit(1)
                default:
                    console.log("Answer does not match any of choices!")
            }

        })
    
};

// define all queries as their own functions
function viewAllDepartments() {
    db.query("SELECT * FROM departments;", function(err, data) {
        if(err) {
            console.log(err)
            return;
        }
        console.table(data)
        init();
    })
};


function viewAllRoles() {
    db.query(`SELECT roles.title, roles.id, departments.department_name, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id;`, function(err, data) {
        if(err) {
            console.log(err)
            return;
        }
        console.table(data)
        init();
    })
};


function viewAllEmployees() {
    db.query(`WITH managersCTE AS (SELECT * FROM employees WHERE manager_id IS NULL)
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
    LEFT JOIN managersCTE ON e.manager_id = managersCTE.id`, function(err, data) {
        if(err) {
            console.log(err)
            return;
        }
        console.table(data)
        init();
    })
};


function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        }
    ])
    .then(answers => {
        // INSERT INTO departments(department_name) VALUES (answers.department_name)

        // db.query("INSERT INTO departments(department_name, more) VALUES (?, ?);", [answers.department_name, answers.more])

        db.query("INSERT INTO departments(department_name) VALUES (?);", [answers.department_name], function(err, data) {
            if(err) {
                console.log(err)
                return;
            }
            console.log("Department has been created!")
            init();
        })

    })
};

function addRole() {
 
    db.query("SELECT departments.id, department_name FROM departments;", function(err, rows) {
        if(err) {
            console.log(err)
            return;
        }
        console.log(rows);
        let departments = rows;
        const departmentChoices = departments.map(({ id, name}) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                name: "title",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                message: "What is the salary for the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does the role belong to?",
                choices: departmentChoices
            }
        ])
        .then(answers => {
            console.log(answers);
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);", [answers.title, answers.salary, answers.department_id], function(err, rows) {
                if(err) {
                    console.log(err)
                    return;
                }
                console.log("Role has been created!")
                init();
            })
        })
      
    })
 
};

// function findAllDepartments() {
// // Find all departments
// // findAllDepartments() {
//     return this.connection.promise().query(
//       "SELECT department.id, department.name FROM department;"
//     );
//   }
    // db.query("SELECT * FROM departments;", function(err, data) {
    //     if(err) {
    //         console.log(err)
    //         return;
    //     }
    //     console.log(data);
    //     return data;
    // })
// };


// employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    //role TRYING WITH TO DO TWO QUERIES _ IN PROGRESS!!!!!
    db.query("WITH roleChoices AS (SELECT roles.id, roles.title FROM roles), ;", function (err, rows) {
        if(err) {
            console.log(err)
            return;
        }
        console.log(rows);
        let roles = rows;
        const roleChoices = roles.map(({ id, title}) => ({
            title: title,
            value: id
        }));

        inquirer.prompt([
            {
                name: "first_name",
                message: "What is the first name?"
            },
            {
                name: "last_name",
                message: "What is the last name?"
            },
            {
                type: "list",
                name: "role_title",
                message: "What is the role title?",
                choices: roleChoices
            },
            {
                type: "list",
                name: "manager",
                message: "Who is their manager?",
                choices: managerChoices
            }

        ])

    })

};






    // db.findAllRoles()
    // .then(([rows]) => {
    //     let departments = rows;
    //     const departmentChoices = departments.map(({ id, name}) => ({
    //         name: name,
    //         value: id
    //     }));
    // prompt([
    //     {
    //         name: "title",
    //         message: "What is the name of the role?"
    //     },
    //     {
    //         name: "salary",
    //         message: "What is the salary for the role?"
    //     },
    //     {
    //         type: "list",
    //         name: "department_id",
    //         message: "Which department does the role belong to?",
    //         choices: departmentChoices
    //     }
    // ])
    //     .then(answers => {
    //         db.createRole(answers)
    //             .then(() => console.log('Added ${role.title} to the database'))
    //             // .then(() => loadMainPrompts())
    //     })
    // })



    // inquirer.prompt([
    //     {
    //         type: "input",
    //         name: "first_name",
    //         message: "What is the first name?"
    //     },
    //     {
    //         type: "input",
    //         name: "last_name",
    //         message: "What is the last name?"
    //     },
    //     {
    //         type: "list",
    //         name: "role",
    //         message: "What is the role id?"
    //     }
    // ])
    // .then(answers => {
    //     // INSERT INTO departments(department_name) VALUES (answers.department_name)

    //     // db.query("INSERT INTO departments(department_name, more) VALUES (?, ?);", [answers.department_name, answers.more])

    //     db.query("INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?);", [answers.title, answers.salary, answers.department_id], function(err, data) {
    //         if(err) {
    //             console.log(err)
    //             return;
    //         }
    //         console.log("New role has been created!")
    //         init();
    //     })

    // })


init();