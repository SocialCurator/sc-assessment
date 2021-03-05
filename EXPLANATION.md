# Social Curator Technical Assessment - Jamel Hammoud

## How to install and run the code

Make sure you have node (https://nodejs.org/en/download/) and TypeScript (https://www.npmjs.com/package/typescript) installed.

Files in the src directory have the extension '.ts' and are coded in TypeScript.
Files in the dist directory have the extension '.js' and are transpiled to JavaScript from TypeScript.

Use tsc (TypeScript) to build the src directory, transpiling the files from TypeScript to Javascript.

All edits to the source should be made in the src directory.

## Noteworthy decisions made

1. While generating the company structure as a tree, I simply check if the employee's name includes an @ symbol, if it does, then
I select the string before the @ symbol and replace the employees's name with that string.

2. In both promoteEmployee and demoteEmployee, in order to not cross-contaminate nodes (having two nodes with the same name) when
renaming the boss and the employee, I used a random string of characters (tempVal) and assign the employee's name to the tempVal. 
That way, the I can then safely change the boss's name, and then rename the employee to the boss's name.

3. I tried, in the time I had, to create error messages for each function when it was necessary.

4. I did a lot of the logging within the functions themselves, to satisfy the example output. However, in a real application,
these console outputs would be removed.

## If I had more time

If I had more time, I would clean up / merge some of the functionality of the current functions within manageEmployees.ts and getEmployees.ts.
I would also finalize all the error cases / catching for the existing functions.

## The similarty of promoteEmployee and demoteEmployee

The two functions promoteEmployee and demoteEmployee within manageEmployees.ts both serve functionality equivalent methods. For promoteEmployee,
we swap an employee and their boss. For demoteEmployee, we swap an employee with a subordinate. I would merge these two functions into one, adding
a paramater that checks if we are promoting or demoting the employee.