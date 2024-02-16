const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');
const employeesController=require('../../controllers/employeesController')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.updateEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;