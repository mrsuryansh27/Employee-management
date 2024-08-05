import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'; // Import the Navigation component

// Lazy load the components to split code and improve performance
const EmployeeList = lazy(() => import('./components/EmployeeList'));
const EmployeeDetails = lazy(() => import('./components/EmployeeDetails'));
const AddEmployee = lazy(() => import('./components/AddEmployee'));

// Fallback component for lazy-loaded components
const Loading = () => <div>Loading...</div>;

function App() {
  return (
    <Router>
      <Navigation /> {/* Render the Navigation component */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEmployee />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
