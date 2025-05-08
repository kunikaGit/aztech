import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Courses, Home, ProductDetail } from '../pages';
const RoutesMain = () => {
  return (
    <Router>
      <Routes>
          <Route index element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/detail' element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default RoutesMain