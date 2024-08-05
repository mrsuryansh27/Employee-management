import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!employee) return <p>Employee not found.</p>;

  return (
    <div>
      <h1>Employee Details</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Employee ID:</strong> {employee._id}</p>
      <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
      <p><strong>Contact Methods:</strong></p>
      <ul>
        {employee.contactMethods.map((contact, index) => (
          <li key={index}>{contact.contact_method}: {contact.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDetails;
