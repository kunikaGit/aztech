import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Checkout, Courses, Dashboard, Home, Login, Myplans, MyProfile, Networks, 
  ProductDetail, Signup ,Transactions,SuccessStatus,FailedStatus, AboutUs, Services , Packages,Games} from '../pages';
import Mainlayout from '../mainlayout';
import DashboardOutlet from '../pages/dashboardOutlet';
import AutoLogoutHandler from "./autoLogoutHeader"
const RoutesMain = () => {
  return (
    <>
    <AutoLogoutHandler/>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/success' element={<SuccessStatus />} />

        <Route path='/failed' element={<FailedStatus />} />

    {/* -----------outer pages--------- */}
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Courses />} />
          <Route path='/detail' element={<ProductDetail />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
        </Route>
    {/* ----------inner dashboard pages-------------- */}
        <Route path="/myaccount" element={<DashboardOutlet />}>
          <Route path='/myaccount/mall' element={<Myplans />} />
          <Route path='/myaccount/packages' element={<Packages />} />

          <Route path='/myaccount/dashboard' element={<Dashboard />} />
          <Route path='/myaccount/transactions' element={<Transactions />} />
          <Route path='/myaccount/networks' element={<Networks />} />
          <Route path='/myaccount/checkout' element={<Checkout />} />
          <Route path='/myaccount/profile' element={<MyProfile />} />
          <Route path='/myaccount/games' element={<Games />} />

        </Route>
      </Routes>
  
    </>
  )
}

export default RoutesMain