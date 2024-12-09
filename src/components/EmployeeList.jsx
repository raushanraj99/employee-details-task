import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useEmployees } from '../context/EmployeeContext';

const EmployeeList = () => {
  const { employees, loading, error, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Employee List</Typography>
      <TextField
        label="Search employees"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button component={Link} to="/employees/add" variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/employees/${employee.id}`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button component={Link} to={`/employees/${employee.id}/edit`} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button onClick={() => deleteEmployee(employee.id)} variant="outlined" color="secondary" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;

