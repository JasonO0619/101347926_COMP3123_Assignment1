const { check, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = (req, res) => {
    Employee.find()
        .then(employees => {
            res.status(200).json(employees);
        })
        .catch(error => {
            res.status(500).json({ status: false, message: error.message });
        });
};

// Create new employee
exports.createEmployee = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining is required').isISO8601(),
    check('department', 'Department is required').not().isEmpty(),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
        const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });

        newEmployee.save()
            .then(employee => {
                res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
            })
            .catch(error => {
                res.status(500).json({ status: false, message: error.message });
            });
    }
];

// Get employee by ID
exports.getEmployeeById = (req, res) => {
    Employee.findById(req.params.eid)
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ status: false, message: 'Employee not found' });
            }
            res.status(200).json(employee);
        })
        .catch(error => {
            res.status(500).json({ status: false, message: error.message });
        });
};

// Update employee
exports.updateEmployee = [
    check('first_name', 'First name is required').optional().not().isEmpty(),
    check('last_name', 'Last name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('position', 'Position is required').optional().not().isEmpty(),
    check('salary', 'Salary must be a number').optional().isNumeric(),
    check('date_of_joining', 'Date of joining is required').optional().isISO8601(),
    check('department', 'Department is required').optional().not().isEmpty(),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true })
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({ status: false, message: 'Employee not found' });
                }
                res.status(200).json({ message: 'Employee details updated successfully.' });
            })
            .catch(error => {
                res.status(500).json({ status: false, message: error.message });
            });
    }
];

// Delete employee
exports.deleteEmployee = (req, res) => {
    const { eid } = req.query;

    Employee.findByIdAndDelete(eid)
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ status: false, message: 'Employee not found' });
            }
            res.status(200).json({ message: 'Employee deleted successfully.' });
        })
        .catch(error => {
            res.status(500).json({ status: false, message: error.message });
        });

};