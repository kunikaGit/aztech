import React, { useEffect, useState } from 'react'

import './dashboard.scss'
import DasboardCards from '../../component/dashboard/dasboardCards'
import Radarcharts from '../../component/dashboard/radarcharts'
import WalletCards from '../../component/dashboard/walletCards'
import Dashboardplans from '../../component/dashboard/dashboardplans'
import Dashbordtable from '../../component/dashboard/dashbordtable'
import DashbordtableTwo from '../../component/dashboard/dashbordtable2'

import { UserIcon } from '../../icons/icons'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import ActivityCard from '../../component/dashboard/activityCards'
const Dashboard = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

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

  return (
    <div className='dahboard-wrapped'>
      <div className='header-flex'>
        <h2 className='main-title'>Welcome {data.name} 👋</h2>
        <div className='box theme-card'>
          <UserIcon />
          {data.status == 'active' ? <span>{data.remainingDays} Days Left</span> : <span>Inactive User</span>}
        </div>
      </div>
      <ActivityCard/>
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