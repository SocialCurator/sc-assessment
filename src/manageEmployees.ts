import { getEmployee, getBoss, getSubordinates } from './getEmployees';

export class TreeNode {
  value: {name: string, jobTitle: string, boss: string, salary: string} = null;
  descendants: Array<TreeNode> = [];
  constructor(value: {name: string, jobTitle: string, boss: string, salary: string} = null) {
    this.value = value;
    this.descendants = [];
  }
}

// generateCompanyStructure(Object) // t + nt + t + t + t + t + t + t + t + t + t + t + t + t = 13 + n

export const generateCompanyStructure = (employeeData: Object) => {
  let tree = new TreeNode();

  for (const index in employeeData) {
    let employee = employeeData[index], employeeName = employee.name, employeeBoss = employee.boss;

    if (employeeName.includes('@')) {
      employeeName = employeeName.split('@')[0];
      employeeName = employeeName.charAt(0).toUpperCase() + employeeName.slice(1);
      employee.name = employeeName;
    }

    let employeeNode = new TreeNode(employee);
    
    switch(employeeBoss == null) {
      case true:
        tree = employeeNode;
        break;
      default:
        getEmployee(tree, employeeBoss).descendants.push(employeeNode);
    }
  }

  return tree;
}

// hireEmployee(TreeNode, Object, string) // t + (5 + n) + n = 6 + 2n

export const hireEmployee = (tree: TreeNode, employee: {name: string, jobTitle: string, boss: string, salary: string}, boss: string) => {
  let employeeNode = new TreeNode(employee);
  getEmployee(tree, boss).descendants.push(employeeNode);
  console.log("[hireEmployee]: Added new employee (" + employee.name + ") with " + boss + " as their boss");
}

// fireEmployee(TreeNode, string) // (5 + n + 13 + 3n) + (13 + 3n) + nt + t + t + (13 + 3n) + t = 46 + 11n

export const fireEmployee = (tree: TreeNode, employeeName: string) => {
  let bossSub = getSubordinates(tree, getBoss(tree, employeeName).value.name), employeeSub = getSubordinates(tree, employeeName);

  var removeAtIndex = bossSub.map(x => { return x.value.name; }).indexOf(employeeName);

  switch(employeeSub.length > 0) {
    case true:
      var promotedEmployee = employeeSub[Math.floor(Math.random() * employeeSub.length)];
      getSubordinates(tree, getBoss(tree, employeeName).value.name).splice(removeAtIndex, 1, promotedEmployee);
      break;
    default:
      getSubordinates(tree, getBoss(tree, employeeName).value.name).splice(removeAtIndex, 1);
  }

  console.log("[fireEmployee]: Removed employee (" + employeeName + ")");
}

// promoteEmployee(TreeNode, string) // (5 + n + t + t) + t + (5 + n) + (5 + n) + (5 + n) + (13 + 3n) + nt + t + t = 38 + 8n

export const promoteEmployee = (tree: TreeNode, employeeName: string) => {
  let employeeNode = getEmployee(tree, employeeName), bossName = employeeNode.value.boss, tempVal = "@)(&*@#*I($_@!_)(";

  if (bossName !== null) {
    getBoss(tree, employeeName).value.name = tempVal;
    getEmployee(tree, employeeName).value.name = bossName;
    getEmployee(tree, tempVal).value.name = employeeName;

    var bossSub = getSubordinates(tree, employeeName);

    for (let sub in bossSub) {
      bossSub[sub].value.boss = employeeName;
    }

    console.log("[promoteEmployee]: Promoted employee (" + employeeName + ")");
  }
  else {
    console.log("[promoteEmployee]: Employee (" + employeeName + ") does not have a boss")
  }
}

// demoteEmployee(TreeNode, string, string) // (5 + n + t + t) + t + nt + t + (5 + n) + (5 + n) + (5 + n) + (13 + 3n) + nt + t + t = 39 + 9n

export const demoteEmployee = (tree: TreeNode, employeeName: string, subordinateName: string) => {
  let employeeSub = getSubordinates(tree, employeeName), tempVal = "@)(&*@#*I($_@!_)(";

  if (employeeSub.length > 0) {
    var removeAtIndex = employeeSub.map(x => { return x.value.name; }).indexOf(subordinateName);

    if (removeAtIndex >= 0) {
      getEmployee(tree, employeeName).value.name = tempVal;
      getEmployee(tree, subordinateName).value.name = employeeName;
      getEmployee(tree, tempVal).value.name = subordinateName;

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
}