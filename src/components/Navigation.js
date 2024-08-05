import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Employee List</Link></li>
      <li><Link to="/add">Add Employee</Link></li>
    </ul>
  </nav>
);

export default Navigation;
