import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useEmployees } from '../context/EmployeeContext';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee = {
      name: formData.get('name'),
      email: formData.get('email'),
      department: formData.get('department'),
      position: formData.get('position'),
      joinDate: formData.get('joinDate'),
    };
    console.log("new employee ",newEmployee)
    await addEmployee(newEmployee);
    navigate('/employees');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add New Employee</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" required />
        <TextField name="email" label="Email" fullWidth margin="normal" required type="email" />
        <TextField name="department" label="Department" fullWidth margin="normal" required />
        <TextField name="position" label="Position" fullWidth margin="normal" required />
        <TextField name="joinDate" label="Join Date" fullWidth margin="normal" required type="date" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Employee
        </Button>
      </form>
    </Container>
  );
};

export default AddEmployee;

