import React, { useEffect, useState } from 'react'
import './chooseplan.scss'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";
import { useNavigate } from "react-router-dom";
const Chooseplan = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [plans,setPlans]=useState([]);
  useEffect(()=>{
    callPlansApi()
  },[]);

  const callPlansApi=async()=>{
    try{
        let res=await fetchData(API_ENDPOINTS.plans,navigate,'GET',{}) ;

        if(res.success){
            setPlans(res.data)
        }
    }catch(error){
        console.log(error)
    }
  }
    return (
        <section className='choose-plan'>
            <div className='main-heading'>
                <h2>
                    Choose a plan that fits<br /> your needs
                </h2>
                <p>
                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra, pretium tincidunt lacus. Pellentesque non elit. Fusce sed justo eu urna porta tincidunt. Integer sagittis. Vivamus a mauris eget arcu gravida tristique.
                </p>
            </div>
            <div className='plan-cards'>

{plans.length >0 && 
plans.map((plan,index)=>(
    <div className={index==1?'cards active':'cards'}>
                    <h3 className='title'>{plan.name}</h3>
                    <p className='des'>{plan.description}</p>
                    <hr />
                    <div className='price'>
                        <h2>${parseFloat(plan.amount).toFixed(1)}</h2>
                        <span>Per {plan.duration}</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                           {plan?.pointers.length > 0 && plan?.pointers.map((point)=>(<li>{point}</li>))}
                        </ul>
                    </div>
                </div>
))}

                {/* <div className='cards'>
                    <h3 className='title'>{}</h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div>
                <div className='cards active'>
                    <h3 className='title'>Basic Plan  </h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div>
                <div className='cards'>
                    <h3 className='title'>Basic Plan  </h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Chooseplan