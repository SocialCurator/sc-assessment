import { TreeNode } from './manageEmployees';

// getEmployee(TreeNode, string) // t + t + nt + t + t + t = 5 + n

export const getEmployee = (tree: TreeNode, name: string) => {
  if (tree.value.name === name) {
    return tree;
  }
  for (const child of tree.descendants) {
    const next = getEmployee(child, name);
    if (next) {
      return next;
    }
  }
};

// getBoss(TreeNode, string) // 5 + n

export const getBoss = (tree: TreeNode, name: string) => {
  return getEmployee(tree, getEmployee(tree, name).value.boss);
}

// getSubordinates(TreeNode, string, boolean) // (5 + n) + t + t + t + nt + t + nt + t + t + t + t = 13 + 3n

export const getSubordinates = (tree: TreeNode, name: string, format: boolean = false) => {
  let subordinates = getEmployee(tree, name).descendants;
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
}

// findLowestEmployee(TreeNode, number) // t + t + t + nt + t + nt + nt + t + t = 6 + 3n

let lowestEmployee = null;

export const findLowestEmployee = (tree: TreeNode, depth: number = 0) => {
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
    const next = findLowestEmployee(child, depth);
    if (lowestEmployee.depth <= depth) {
      lowestEmployee = {
        "employee": next,
        "depth": depth
      };
    }
  }
  return lowestEmployee.employee;
}