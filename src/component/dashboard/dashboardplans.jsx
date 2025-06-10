import React from 'react'
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Dashboardplans = ({data}) => {
    const navigate = useNavigate()
    const handlePage=(e,planId)=>{
        e.preventDefault();
 navigate(`${baseUrl}`)
       
    }
    return (
        <div className='dashboard-plans'>
           { data.map((plan)=>(<div className='plan-card theme-card'>
                <div className='flex-card'>
                    <div className='left-side'>
                        <h3>{plan.name}</h3>
                        <p>{plan.description}</p>
                    </div>
                    <div className='right-side'>
                        <h2 className='price'>${parseFloat(plan.amount).toFixed(2)} <span>per/{plan.duration}</span></h2>
                    </div>
                </div>
                <button type='button' className='get-start' disabled={plan.button_name=="Already Achieved"} onClick={(e)=>{handlePage(e,plan.id)}}>{plan.button_name}</button>
            </div>))}
           
        </div>
    )
}

export default Dashboardplans