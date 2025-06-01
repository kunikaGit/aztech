import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Checkout, Courses, Dashboard, Home, Login, Myplans, MyProfile, Networks, 
  ProductDetail, Signup ,Transactions,SuccessStatus,FailedStatus, AboutUs, Services , Packages,Games} from '../pages';
import Mainlayout from '../mainlayout';
import DashboardOutlet from '../pages/dashboardOutlet';
import AutoLogoutHandler from "./autoLogoutHeader"
const baseUrl = import.meta.env.VITE_BASE_URL;
const RoutesMain = () => {
  return (
        <>
      <AutoLogoutHandler />

      <Routes>
        {/* Auth & Status Routes */}
        <Route path={`${baseUrl}login`} element={<Login />} />
        <Route path={`${baseUrl}signup`} element={<Signup />} />
        <Route path={`${baseUrl}success`} element={<SuccessStatus />} />
        <Route path={`${baseUrl}failed`} element={<FailedStatus />} />

        {/* -----------Outer pages--------- */}
        <Route path={`${baseUrl}`} element={<Mainlayout />}>
          <Route index element={<Home />} />
          <Route path={`${baseUrl}products`} element={<Courses />} />
          <Route path={`${baseUrl}detail`} element={<ProductDetail />} />
          <Route path={`${baseUrl}about-us`} element={<AboutUs />} />
          <Route path={`${baseUrl}services`} element={<Services />} />
        </Route>

        {/* ----------Inner Dashboard pages-------------- */}
        <Route path={`${baseUrl}myaccount`} element={<DashboardOutlet />}>
          <Route path={`${baseUrl}myaccount/mall`} element={<Myplans />} />
          <Route path={`${baseUrl}myaccount/packages`} element={<Packages />} />
          <Route path={`${baseUrl}myaccount/dashboard`} element={<Dashboard />} />
          <Route path={`${baseUrl}myaccount/transactions`} element={<Transactions />} />
          <Route path={`${baseUrl}myaccount/networks`} element={<Networks />} />
          <Route path={`${baseUrl}myaccount/checkout`} element={<Checkout />} />
          <Route path={`${baseUrl}myaccount/profile`} element={<MyProfile />} />
          <Route path={`${baseUrl}myaccount/games`} element={<Games />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesMain