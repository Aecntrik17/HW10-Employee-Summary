// TODO: Write code to define and export the Intern class.
// linking this file to pull from Employee class
const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getRole() {
    return "Intern";
  }
  getSchool() {
    return this.school;
  }
}
// making sure data in this file can be pulled into others
module.exports = Intern;
