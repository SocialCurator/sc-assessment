"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let employeeList = require('./employees.json');
const manageEmployees_1 = require("./manageEmployees");
const getEmployees_1 = require("./getEmployees");
// Main code goes here
function main() {
    var tree = manageEmployees_1.generateCompanyStructure(employeeList.employees);
    let jamel = {
        "name": "Jamel",
        "jobTitle": "Developer",
        "boss": "Sarah",
        "salary": "1"
    };
    manageEmployees_1.hireEmployee(tree, jamel, "Sarah");
    manageEmployees_1.promoteEmployee(tree, "Jared");
    manageEmployees_1.fireEmployee(tree, "Nick");
    manageEmployees_1.demoteEmployee(tree, "Xavier", "Jared");
    console.log("[getBoss]: Bill's boss is " + getEmployees_1.getBoss(tree, "Bill").value.name);
    console.log("[getSubordinates]: Xavier's subordinates are " + getEmployees_1.getSubordinates(tree, "Xavier", true));
    console.log("Lowest employee is " + getEmployees_1.findLowestEmployee(tree).value.name);
}
main();
//# sourceMappingURL=index.js.map