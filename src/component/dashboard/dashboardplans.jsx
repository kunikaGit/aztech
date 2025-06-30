import React from 'react'
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Dashboardplans = ({ data }) => {
    const navigate = useNavigate()
    const handleCategory = (e, plan) => {
        e.preventDefault();
        //setPlan(plan.id)
        navigate(`${baseUrl}services?plan_name=${plan.name}&plan=${plan.id}`)

    };
    return (
        <div className='dashboard-plans'>
            {data.map((plan) => (<div className='plan-card theme-card'>
                <div className='flex-card'>
                    <div className='left-side'>
                        <h3>{plan.name}</h3>
                        <p>{plan.description}</p>
                    </div>
                    <div className='right-side'>
                        <h2 className='price'>${parseFloat(plan.amount).toFixed(0)} <span>per/{plan.duration}</span></h2>
                    </div>
                </div>
                <button type='button' className='get-start' disabled={plan.button_name == "Already Achieved"} onClick={(e) => { handleCategory(e, plan) }}>{plan.button_name}</button>
            </div>))}

        </div>
    )
}

export default Dashboardplans