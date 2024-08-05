import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../services/employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees(employees.filter(employee => employee._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No Employees in the system.</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              {employee.name} ({employee._id})
              <Link to={`/employee/${employee._id}`}> View</Link>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add">Add New Employee</Link>
    </div>
  );
};

export default EmployeeList;
