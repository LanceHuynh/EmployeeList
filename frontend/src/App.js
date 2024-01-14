import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';

const remote = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList remote={remote} />} />
      </Routes>
    </Router>
  );
}

export default App;