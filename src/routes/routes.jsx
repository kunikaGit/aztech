import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Courses, Home, Login, ProductDetail, Signup } from '../pages';
import Mainlayout from '../mainlayout';
const RoutesMain = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/detail' element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RoutesMain