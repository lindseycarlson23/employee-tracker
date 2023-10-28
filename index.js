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
            // if(answers.action == "View Departments") {
            //     // query for getting all department
            //     // SELECT * FROM departments;
            // } else if(answers.action == "View Roles") {
            //     // SELECT * FROM roles;
            // } else if(answers.action == "View Employees") {
            //     // SELECT * FROM employees;
            // }

            switch(answers.action) {
                case "View Departments":
                    // SELECT * FROM departments;
                    viewAllDepartments();
                    break;
                case "View Roles":
                    // SELECT * FROM roles;
                    console.log("Showing roles!")

                    break;

                case "Add Department":
                    addDepartment();
                    break;
                case "Quit":
                    process.exit(1)
                default:
                    console.log("Answer does not match any of choices!")
            }

        })
    
    }

// define all queries as their own functions
    // export and import as needed

function viewAllDepartments() {
    db.query("SELECT * FROM departments;", function(err, data) {
        if(err) {
            console.log(err)
            return;
        }

        console.table(data)
        init();
    })
}

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
}






init();