import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Courses, Dashboard, Home, Login, Myplans, Networks, ProductDetail, Signup ,Transactions} from '../pages';
import Mainlayout from '../mainlayout';
import DashboardOutlet from '../pages/dashboardOutlet';
const RoutesMain = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    {/* -----------outer pages--------- */}
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/detail' element={<ProductDetail />} />
        </Route>
    {/* ----------inner dashboard pages-------------- */}
        <Route path="/myaccount" element={<DashboardOutlet />}>
          <Route path='/myaccount/myplans' element={<Myplans />} />
          <Route path='/myaccount/dashboard' element={<Dashboard />} />
          <Route path='/myaccount/transactions' element={<Transactions />} />
          <Route path='/myaccount/networks' element={<Networks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RoutesMain