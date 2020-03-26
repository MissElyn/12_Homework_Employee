var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "Would you like to [ADD]?",
      choices: ["department", "role", "employee"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions

      if (answer.task === "department") {
        postdepartment();
      } else {

        if (answer.task === "role") {
          postrole();

        } else {

          if (answer.task === "employee") {
            postemployee();

          } else {

            connection.end();
          }
        }
      };

    })
}
function postdepartment() {
  // prompt for info 
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department you would like to add?"
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
        }
      );
    });
}
function postemployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Employee's First Name?"},{

        name: "last_name",
        type: "input",
        message: "Employee's Last Name?"},{

        name: "role_id",
        type: "input",
        message: "What is the Roll ID?"},{

        name: "manager_id",
        type: "input",
        message: "If there is a manager please insert the ID#.",

      }])
    .then(function (answer) {
      // when finished prompting, insert a new item
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          roll_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
        }
      );
    });
}
function postrole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "list",
        message: "What is the new role?",
        choices: ["Adminstrative", "Teaching Staff", "Office"]},{

        name: "salary",
        type: "input",
        message: "What is the salary?"},{

        name: "department_id",
        type: "input",
        message: "Which department?"

      }])
    .then(function (answer) {
      // when finished prompting, insert a new item
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
        }
      );
    });
  }