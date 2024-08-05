import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/employeeService';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
  const [contactMethods, setContactMethods] = useState([{ contact_method: 'EMAIL', value: '' }]);
  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = { name, emp_id: empId, address, contactMethods };
    try {
      await addEmployee(newEmployee);
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleChangeContactMethod = (index, field, value) => {
    const newContactMethods = [...contactMethods];
    newContactMethods[index][field] = value;
    setContactMethods(newContactMethods);
  };

  const handleAddContactMethod = () => {
    setContactMethods([...contactMethods, { contact_method: 'EMAIL', value: '' }]);
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleAddEmployee}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Employee ID:
          <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} required />
        </label>
        <label>
          Address Line 1:
          <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
        </label>
        <label>
          City:
          <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
        </label>
        <label>
          Country:
          <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
        </label>
        <label>
          Zip Code:
          <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
        </label>
        <div>
          <h3>Contact Methods</h3>
          {contactMethods.map((contact, index) => (
            <div key={index}>
              <label>
                Contact Method:
                <select value={contact.contact_method} onChange={(e) => handleChangeContactMethod(index, 'contact_method', e.target.value)}>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                </select>
              </label>
              <label>
                Value:
                <input type="text" value={contact.value} onChange={(e) => handleChangeContactMethod(index, 'value', e.target.value)} />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddContactMethod}>Add Contact Method</button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
