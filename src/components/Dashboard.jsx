import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { style, styled } from "@mui/system";
import { useEmployees } from "../context/EmployeeContext";

const BarChartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent:"center",
  height: "300px",
  padding: theme.spacing(2),
}));

const BarChartBar = styled(Box)(({ theme }) => ({
  width: "40px",
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  transition: "height 0.3s ease",
}));

const Dashboard = () => {
  const { employees, loading, error } = useEmployees();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  
  const totalEmployees = employees.length;
  const recentJoined = [...employees]
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 5);

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  const maxCount = Math.max(...Object.values(departmentCounts));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sx={{display: 'flex',flexDirection:'column' }}>
          <Grid xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">
                Total Employees: {totalEmployees}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Joined Employees
              </Typography>
              {recentJoined.map((emp) => (
                <Typography key={emp.id}>
                  {emp.name} - {emp.joinDate}
                </Typography>
              ))}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Department-wise Employee Count
            </Typography>
            <BarChartContainer>
              {Object.entries(departmentCounts).map(([department, count]) => (
                <Box
                key={department}
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  
                }}
                >
                <Typography variant="caption">{count}</Typography>
                <Typography variant="caption">{department}</Typography>
                  <BarChartBar
                    sx={{ height: `${(count / maxCount) * 100}%` }}
                  />
                </Box>
              ))}
            </BarChartContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
