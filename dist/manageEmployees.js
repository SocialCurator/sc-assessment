"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getEmployees_1 = require("./getEmployees");
class TreeNode {
    constructor(value = null) {
        this.value = null;
        this.descendants = [];
        this.value = value;
        this.descendants = [];
    }
}
exports.TreeNode = TreeNode;
// generateCompanyStructure(Object) // t + nt + t + t + t + t + t + t + t + t + t + t + t + t = 13 + n
exports.generateCompanyStructure = (employeeData) => {
    let tree = new TreeNode();
    for (const index in employeeData) {
        let employee = employeeData[index], employeeName = employee.name, employeeBoss = employee.boss;
        if (employeeName.includes('@')) {
            employeeName = employeeName.split('@')[0];
            employeeName = employeeName.charAt(0).toUpperCase() + employeeName.slice(1);
            employee.name = employeeName;
        }
        let employeeNode = new TreeNode(employee);
        switch (employeeBoss == null) {
            case true:
                tree = employeeNode;
                break;
            default:
                getEmployees_1.getEmployee(tree, employeeBoss).descendants.push(employeeNode);
        }
    }
    return tree;
};
// hireEmployee(TreeNode, Object, string) // t + (5 + n) + n = 6 + 2n
exports.hireEmployee = (tree, employee, boss) => {
    let employeeNode = new TreeNode(employee);
    getEmployees_1.getEmployee(tree, boss).descendants.push(employeeNode);
    console.log("[hireEmployee]: Added new employee (" + employee.name + ") with " + boss + " as their boss");
};
// fireEmployee(TreeNode, string) // (5 + n + 13 + 3n) + (13 + 3n) + nt + t + t + (13 + 3n) + t = 46 + 11n
exports.fireEmployee = (tree, employeeName) => {
    let bossSub = getEmployees_1.getSubordinates(tree, getEmployees_1.getBoss(tree, employeeName).value.name), employeeSub = getEmployees_1.getSubordinates(tree, employeeName);
    var removeAtIndex = bossSub.map(x => { return x.value.name; }).indexOf(employeeName);
    switch (employeeSub.length > 0) {
        case true:
            var promotedEmployee = employeeSub[Math.floor(Math.random() * employeeSub.length)];
            getEmployees_1.getSubordinates(tree, getEmployees_1.getBoss(tree, employeeName).value.name).splice(removeAtIndex, 1, promotedEmployee);
            break;
        default:
            getEmployees_1.getSubordinates(tree, getEmployees_1.getBoss(tree, employeeName).value.name).splice(removeAtIndex, 1);
    }
    console.log("[fireEmployee]: Removed employee (" + employeeName + ")");
};
// promoteEmployee(TreeNode, string) // (5 + n + t + t) + t + (5 + n) + (5 + n) + (5 + n) + (13 + 3n) + nt + t + t = 38 + 8n
exports.promoteEmployee = (tree, employeeName) => {
    let employeeNode = getEmployees_1.getEmployee(tree, employeeName), bossName = employeeNode.value.boss, tempVal = "@)(&*@#*I($_@!_)(";
    if (bossName !== null) {
        getEmployees_1.getBoss(tree, employeeName).value.name = tempVal;
        getEmployees_1.getEmployee(tree, employeeName).value.name = bossName;
        getEmployees_1.getEmployee(tree, tempVal).value.name = employeeName;
        var bossSub = getEmployees_1.getSubordinates(tree, employeeName);
        for (let sub in bossSub) {
            bossSub[sub].value.boss = employeeName;
        }
        console.log("[promoteEmployee]: Promoted employee (" + employeeName + ")");
    }
    else {
        console.log("[promoteEmployee]: Employee (" + employeeName + ") does not have a boss");
    }
};
// demoteEmployee(TreeNode, string, string) // (5 + n + t + t) + t + nt + t + (5 + n) + (5 + n) + (5 + n) + (13 + 3n) + nt + t + t = 39 + 9n
exports.demoteEmployee = (tree, employeeName, subordinateName) => {
    let employeeSub = getEmployees_1.getSubordinates(tree, employeeName), tempVal = "@)(&*@#*I($_@!_)(";
    if (employeeSub.length > 0) {
        var removeAtIndex = employeeSub.map(x => { return x.value.name; }).indexOf(subordinateName);
        if (removeAtIndex >= 0) {
            getEmployees_1.getEmployee(tree, employeeName).value.name = tempVal;
            getEmployees_1.getEmployee(tree, subordinateName).value.name = employeeName;
            getEmployees_1.getEmployee(tree, tempVal).value.name = subordinateName;
            for (let sub in employeeSub) {
                employeeSub[sub].value.boss = subordinateName;
            }
            console.log("[demoteEmployee]: Demoted employee (" + employeeName + ") and promoted employee (" + subordinateName + ")");
        }
        else {
            console.log("[demoteEmployee]: Subordinate (" + subordinateName + ") is not under employee (" + employeeName + ")");
        }
    }
    else {
        console.log("[demoteEmployee]: Cannot demote employee (" + employeeName + ")");
    }
};
//# sourceMappingURL=manageEmployees.js.map