"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// getEmployee(TreeNode, string) // t + t + nt + t + t + t = 5 + n
exports.getEmployee = (tree, name) => {
    if (tree.value.name === name) {
        return tree;
    }
    for (const child of tree.descendants) {
        const next = exports.getEmployee(child, name);
        if (next) {
            return next;
        }
    }
};
// getBoss(TreeNode, string) // 5 + n
exports.getBoss = (tree, name) => {
    return exports.getEmployee(tree, exports.getEmployee(tree, name).value.boss);
};
// getSubordinates(TreeNode, string, boolean) // (5 + n) + t + t + t + nt + t + nt + t + t + t + t = 13 + 3n
exports.getSubordinates = (tree, name, format = false) => {
    let subordinates = exports.getEmployee(tree, name).descendants;
    if (format == false) {
        return subordinates;
    }
    else {
        let returnVal = "";
        for (const index in subordinates) {
            returnVal += subordinates[index].value.name;
            if (parseInt(index) < (subordinates.length - 1)) {
                returnVal += ", ";
            }
        }
        if (returnVal == "") {
            returnVal = "no one";
        }
        return returnVal;
    }
};
// findLowestEmployee(TreeNode, number) // t + t + t + nt + t + nt + nt + t + t = 6 + 3n
let lowestEmployee = null;
exports.findLowestEmployee = (tree, depth = 0) => {
    if (tree.descendants.length == 0) {
        if (lowestEmployee == null) {
            lowestEmployee = {
                "employee": tree,
                "depth": depth
            };
        }
        else if (lowestEmployee.depth <= depth) {
            lowestEmployee = {
                "employee": tree,
                "depth": depth
            };
        }
    }
    for (const child of tree.descendants) {
        depth++;
        const next = exports.findLowestEmployee(child, depth);
        if (lowestEmployee.depth <= depth) {
            lowestEmployee = {
                "employee": next,
                "depth": depth
            };
        }
    }
    return lowestEmployee.employee;
};
//# sourceMappingURL=getEmployees.js.map