import React, { useEffect, useState } from 'react'
import './chooseplan.scss'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Chooseplan = () => {
      const { auth_token } = useSelector((state) => state.auth);
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [plans, setPlans] = useState([]);
    useEffect(() => {
        callPlansApi()
    }, []);

    const callPlansApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.plans, navigate, 'GET', {});

            if (res.success) {
                setPlans(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckout = (e, plan) => {
        e.preventDefault();
        if(auth_token){
        navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan } });
        return
        }
                navigate(`${baseUrl}login`);

    };
    return (
        <section className='choose-plan'>
            <div className='main-heading'>
                <h2>
                    Unlock Limitless Possibilities <br /> at a Price That Feels Unreal
                </h2>
                <p>
                    Why pay more for less? With AZ Tech, you get a complete digital mall — from AI tools and educational content to entertainment and pro resources — all starting at just <strong>$0.08/day</strong>. No gimmicks, no overpriced subscriptions — just pure value built for learners, creators, and dreamers. Choose a plan that fuels your passion and rewards your journey.
                </p>
                <span className='plan-badge'>Only $2.4/month – Everything You Need, All in One Place</span>

            </div>

            <div className='plan-cards'>

                {plans.length > 0 &&
                    plans.map((plan, index) => (
                        <div className={'cards'}>
                            <h3 className='title'>{plan.name}</h3>
                            <p className='des'>{plan.description}</p>
                            <hr />
                            <div className='price'>
                                <h2>${parseFloat(plan.amount).toFixed(1)}</h2>
                                <span>Per {plan.duration}</span>
                            </div>
                            <button type='button' className='plan-btn' onClick={(e) => handleCheckout(e, plan)}>Get Started</button>
                            <div className='plan-benifits'>
                                <ul>
                                    {plan?.pointers.length > 0 && plan?.pointers.map((point) => (<li>{point}</li>))}
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