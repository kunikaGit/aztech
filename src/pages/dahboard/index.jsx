import React, { useEffect, useState } from 'react'

import './dashboard.scss'
import DasboardCards from '../../component/dashboard/dasboardCards'
import Radarcharts from '../../component/dashboard/radarcharts'
import WalletCards from '../../component/dashboard/walletCards'
import Dashboardplans from '../../component/dashboard/dashboardplans'
import Dashbordtable from '../../component/dashboard/dashbordtable'
import DashbordtableTwo from '../../component/dashboard/dashbordtable2'

import { CalenderIcon, UserIcon } from '../../icons/icons'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import ActivityCard from '../../component/dashboard/activityCards'
import Modal from 'react-bootstrap/Modal';
const Dashboard = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState(null)

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.dashboard, navigate, 'GET', {});

      if (res.success) {
        setData(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return (<>Loading...</>)
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short", // or "2-digit"
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // set to false for 24-hour format
    });
  };

  return (
    <div className='dahboard-wrapped'>
      <div className='header-flex'>
        <h2 className='main-title'>Welcome {data.name} 👋</h2>
        <div className='box theme-card' onClick={() => handleShow()} style={{ cursor: 'pointer' }}>

          <span className='blue'><UserIcon /></span>
          {data.status == 'active' ? <span>{data.remainingDays} Days Left</span> : <span>Inactive User</span>}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          className='joining-modal'
        >
           <Modal.Header closeButton></Modal.Header>
          <div className='content'>
            <h3>Joining Data</h3>
            {data.activationDate && <span> <CalenderIcon /> {formatDateTime(data.activationDate)}</span>}
          </div>
        </Modal>
      </div>
      <ActivityCard data={{ totalVisitedFromPackage: data.totalVisitedFromPackage, totalotherPurchases: data.totalotherPurchases, totalDownline: data.totalDownline, totalReferal: data.totalReferal, referralEarning: parseFloat(data.referralEarningBalance).toFixed(2) }} />
      <DasboardCards data={data.graphs} />
      <WalletCards data={data.balance} />
      <Dashboardplans data={data.plans} />
      {/* <Radarcharts data={{ totalVisitedFromPackage: data.totalVisitedFromPackage, totalotherPurchases: data.totalotherPurchases, totalDownline: data.totalDownline, totalReferal: data.totalReferal, referralEarning: parseFloat(data.referralEarningBalance).toFixed(2) }} /> */}
      <div className='flex-two-grid'>
        <div className='left-side'>
          <Dashbordtable data={data.referralTable} />
        </div>
        <div className='right-side'>
          <DashbordtableTwo data={data.referralEarning} /></div>
      </div>
    </div>
  )
}

export default Dashboard