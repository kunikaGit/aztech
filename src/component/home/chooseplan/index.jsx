import React, { useEffect, useState } from 'react'
import './chooseplan.scss'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Chooseplan = () => {
      const { auth_token } = useSelector((state) => state.auth);
      const { plan_id } = useSelector((state) => state.auth);

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

    const handleCheckout = (e, plan,type) => {
        e.preventDefault();
        if(auth_token){
        navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan,type } });
        return
        }
                navigate(`${baseUrl}login`);

    };

        const handleServices = (e, plan) => {
        e.preventDefault();
                navigate(`${baseUrl}myaccount/services?plan_id=${plan.id}`)

    };

    
    return (
        <section className='choose-plan'>
            <div className='certificate-cards'>
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
                                <h2>${parseFloat(plan.amount).toFixed(0)}</h2>
                                <span>Per {plan.duration}</span>
                            </div>
                           {plan_id? <button type='button' className='plan-btn' onClick={(e) =>plan_id>=plan.id ?handleServices(e,plan): handleCheckout(e, plan,2)}>
                                 {plan_id>=plan.id ? "View Products":"Upgrade Now"}</button>
                                 :
                                 <button type='button' className='plan-btn' onClick={(e) => handleCheckout(e, plan,1)}>
                                 Get Started</button>}

                            <div className='plan-benifits'>
                                <ul>
                                    {plan?.pointers.length > 0 && plan?.pointers.map((point) => (<li>{point}</li>))}
                                </ul>
                            </div>
                        </div>
                    ))}
            </div>
            </div>
        </section>
    )
}

export default Chooseplan