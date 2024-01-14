const router = require('express').Router();
let Employee = require('../models/employee.model');

// Get all employees
router.route('/').get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Add a new employee
router.route('/add').post((req, res) => {
  const { name, address, phoneNumber, email } = req.body;
  const newEmployee = new Employee({ name, address, phoneNumber, email });

  newEmployee
    .save()
    .then(() => res.json('Employee added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Get employee by ID
router.route('/:id').get((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Update employee by ID
router.route('/update/:id').post((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      employee.name = req.body.name;
      employee.address = req.body.address;
      employee.phoneNumber = req.body.phoneNumber;
      employee.email = req.body.email;

      employee
        .save()
        .then(() => res.json('Employee updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Delete employee by ID
router.route('/:id').delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;