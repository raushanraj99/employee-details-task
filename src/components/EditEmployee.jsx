import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useEmployees } from '../context/EmployeeContext';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useEmployees();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: '',
  });
  // console.log("edit emp : ",employees)

  useEffect(() => {
    const emp = employees.find(e => e.id === Number(id));
    if (emp) {
      setEmployee(emp);
    }
  }, [id, employees]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateEmployee(Number(id), employee);
    navigate(`/employees/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit Employee</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          required
          value={employee.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          required
          type="email"
          value={employee.email}
          onChange={handleChange}
        />
        <TextField
          name="department"
          label="Department"
          fullWidth
          margin="normal"
          required
          value={employee.department}
          onChange={handleChange}
        />
        <TextField
          name="position"
          label="Position"
          fullWidth
          margin="normal"
          required
          value={employee.position}
          onChange={handleChange}
        />
        <TextField
          name="joinDate"
          label="Join Date"
          fullWidth
          margin="normal"
          required
          type="date"
          InputLabelProps={{ shrink: true }}
          value={employee.joinDate}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Update Employee
        </Button>
      </form>
    </Container>
  );
};

export default EditEmployee;

