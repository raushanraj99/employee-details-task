import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lightTheme, darkTheme } from './theme';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header';
import { EmployeeProvider } from './context/EmployeeContext';
import { Box } from '@mui/system';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('theme');
    return savedPreference ? savedPreference === 'dark' : prefersDarkMode;
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? darkTheme.palette.background.default
      : lightTheme.palette.background.default;
    document.body.style.color = darkMode
      ? darkTheme.palette.text.primary
      : lightTheme.palette.text.primary;
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <EmployeeProvider>
        <Router>
          <Header />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', padding: '10px' }}>
            <Box>Light</Box>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              color="default"
              inputProps={{ 'aria-label': 'toggle dark mode' }}
            />
            <Box>Dark</Box>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/employees/:id/edit" element={<EditEmployee />} />
          </Routes>
        </Router>
      </EmployeeProvider>
    </ThemeProvider>
  );
};

export default App;
