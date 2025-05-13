import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Courses, Home, Login, Myplans, ProductDetail, Signup } from '../pages';
import Mainlayout from '../mainlayout';
import DashboardOutlet from '../pages/dashboardOutlet';
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
        <Route path="/myaccount" element={<DashboardOutlet />}>
          <Route path='/myaccount/myplans' element={<Myplans />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RoutesMain