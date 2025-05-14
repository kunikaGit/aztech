import React from 'react'
import { Dahboardtable, Welcome } from '../../component'

const Dashboard = () => {
  return (
    <div className='dahboard-wrapped'>
        <Welcome/>
        <Dahboardtable/>
    </div>
  )
}

export default Dashboard