import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from '../pages';
const RoutesMain = () => {
  return (
    <Router>
      <Routes>
          <Route index element={<Home />} />
      </Routes>
    </Router>
  )
}

export default RoutesMain