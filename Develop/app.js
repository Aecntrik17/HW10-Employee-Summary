// setting variables and pulling data from required libraries or class files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// questions for user regarding employees
const questions = [
  {
    type: "input",
    message: "What is the Employee's Name?",
    name: "name",
  },

  {
    type: "list",
    message: "What is the employee's position?",
    name: "role",
    choices: ["Manager", "Intern", "Engineer"],
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email",
  },
  {
    type: "number",
    message: "What is the employee's ID number?",
    name: "id",
  },
  {
    type: "confirm",
    message: "Is this the last employee?",
    name: "finish",
  },
];
// function to ask the questions
async function addEmployee() {
  // saving the answers to a variable
  const answers = await inquirer.prompt(questions);
  switch (answers.role) {
    // switch case to allow for specific questions for when Manager is selected for the Role question
    case "Manager":
      const mgrAnswers = await inquirer.prompt({
        type: "number",
        message: "What is this employee's office number?",
        name: "officeNumber",
      });
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        mgrAnswers.officeNumber
      );
      employeeArray.push(manager);
      console.log("Manager: ", manager);
      break;
    // switch case to allow for specific questions for when Engineer is selected for the Role question
    case "Engineer":
      const engineerAnswers = await inquirer.prompt({
        type: "input",
        message: "What is this employee's github username?",
        name: "github",
      });
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        engineerAnswers.github
      );
      employeeArray.push(engineer);
      console.log("Engineer: ", engineer);
      break;
    // switch case to allow for specific questions for when Intern is selected for the Role question
    case "Intern":
      const internAnswers = await inquirer.prompt({
        type: "input",
        message: "What school does this intern attend?",
        name: "school",
      });
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        internAnswers.school
      );
      employeeArray.push(intern);
      console.log("Intern: ", intern);
      break;
  }
  //   conditional that makes sure the program sends the data to render function if true
  if (answers.finish) {
    console.log(employeeArray);
    // this render function is taking in the objects that make up the employeeArray, which effectively converts it to html
    render(employeeArray);
    // setting the html created through the render function to a variable to be used to actually write the html file
    const html = render(employeeArray);
    console.log(html);
    // writing the html file and placing it inside of the Output folder
    fs.writeFile("../Output/team.html", html, (err) => {});
  } else {
    addEmployee();
  }
}
// this array will hold the objects of employees that are generated
const employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
