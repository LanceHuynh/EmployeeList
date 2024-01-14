import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:5000/employees/').then((response) => {
      setEmployees(response.data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    axios.post('http://localhost:5000/employees/add', newEmployee).then(() => {
      fetchEmployees();
      setNewEmployee({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
      });
    });
  };

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`).then(() => {
      fetchEmployees();
    });
  };

  return (
    <div>
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email}
            <button onClick={() => handleDeleteEmployee(employee._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Add Employee</h3>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={handleInputChange}
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={newEmployee.address}
          onChange={handleInputChange}
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={newEmployee.phoneNumber}
          onChange={handleInputChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={newEmployee.email}
          onChange={handleInputChange}
        />
        <br />
        <button type="button" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeList;