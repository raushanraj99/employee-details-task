import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log("context : ",response);
      const formattedEmployees = response.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.company.name, 
        position: user.company.bs, 
        joinDate: new Date(2023, user.id % 12, user.id % 28 + 1).toISOString().split('T')[0] // Generate a random join date
      }));

      setEmployees(formattedEmployees);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', employee);
      const newEmployee = {
        ...response.data,
        department: employee.department,
        position: employee.position,
        joinDate: employee.joinDate
      };
      setEmployees([...employees, newEmployee]);
    } catch (err) {
      setError('Failed to add employee');
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, employee);
      const updatedEmployee = {
        ...response.data,
        department: employee.department,
        position: employee.position,
        joinDate: employee.joinDate
      };
      setEmployees(employees.map(emp => emp.id === id ? updatedEmployee : emp));
    } catch (err) {
      setError('Failed to update employee');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Failed to delete employee');
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, fetchEmployees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmployeeContext;

