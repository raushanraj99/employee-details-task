import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employees, loading, error } = useEmployees();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const employee = employees.find(emp => emp.id === Number(id));
  console.log("emp : ",employee)
  if (!employee) return <Typography>Employee not found</Typography>;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>{employee.name}</Typography>
        <Typography><strong>Email:</strong> {employee.email}</Typography>
        <Typography><strong>Department:</strong> {employee.department}</Typography>
        <Typography><strong>Position:</strong> {employee.position}</Typography>
        <Typography><strong>Join Date:</strong> {employee.joinDate}</Typography>
        <Button component={Link} to={`/employees/${id}/edit`} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
          Edit
        </Button>
        <Button component={Link} to="/employees" variant="outlined" sx={{ mt: 2 }}>
          Back to List
        </Button>
      </Paper>
    </Container>
  );
};

export default EmployeeDetails;

