let employeeList = require('./employees.json');
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from './manageEmployees';
import { getBoss, getSubordinates, findLowestEmployee } from './getEmployees';

// Main code goes here

function main() {
    var tree = generateCompanyStructure(employeeList.employees);

    let jamel = {
        "name": "Jamel",
        "jobTitle": "Developer",
        "boss": "Sarah",
        "salary": "1"
    };

    hireEmployee(tree, jamel, "Sarah");
    promoteEmployee(tree, "Jared");
    fireEmployee(tree, "Nick");
    demoteEmployee(tree, "Xavier", "Jared");

    console.log("[getBoss]: Bill's boss is " + getBoss(tree, "Bill").value.name);
    console.log("[getSubordinates]: Xavier's subordinates are " + getSubordinates(tree, "Xavier", true));
    console.log("Lowest employee is " + findLowestEmployee(tree).value.name);
}

main()