import React, { useEffect, useState } from 'react'
import './plans.scss'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;


const Plans = () => {


  const { auth_token } = useSelector((state) => state.auth);
  const { plan_id } = useSelector((state) => state.auth);

  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [data, setData] = useState([])

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {

      if (auth_token) {
        let res = await fetchData(API_ENDPOINTS.dashboard, navigate, 'GET', {});
        if (res.success) {
          setData(res.data.plans)

        }
      } else {
        let res = await fetchData(API_ENDPOINTS.plans, navigate, 'GET', {});

        if (res.success) {
          setData(res.data)
          console.log(res.data)

        }
      }



    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckout = (e, plan) => {
    e.preventDefault();
    if (auth_token) {
      let type = 1
      if (plan_id < plan.id) {
        type = 2
      }

      if (plan_id == plan.id) {
        navigate(`${baseUrl}services?plan_name=${plan.name}&plan=${plan.id}`)
        return
      }
      navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan, type } });
      return
    }else{
    navigate(`${baseUrl}login`);

    }

    //navigate(`${baseUrl}login`);
    navigate(`${baseUrl}services?plan_name=${plan.name}&plan=${plan.id}`)

  };

  const handleCategory = (e, plan) => {
    e.preventDefault();
    //setPlan(plan.id)
    navigate(`${baseUrl}services?plan_name=${plan.name}&plan=${plan.id}`)

  };

  return (
    <div className='plan-cards'>

      {data.length > 0 &&
        data.map((plan, index) => (
          <div className={'cards'} key={index}>
            <h3 className='title'>{plan.name}</h3>
            <p className='des'>{plan.description}</p>
            <hr />
            <div className='price'>
              <h2>${parseFloat(plan.amount).toFixed(0)}</h2>
              <span>Per {plan.duration}</span>
            </div>
            <button type='button' className='plan-btn' disabled={plan.button_name == "Already Achieved"} onClick={(e) => handleCheckout(e, plan)}>{plan.button_name ? plan.button_name : "Get Started"}</button>
            <div className='plan-benifits'>
              <ul>
                {plan?.pointers.length > 0 && plan?.pointers.map((point, idx) => (<li key={idx}>{point}</li>))}
              </ul>
            </div>
            <button type='button' className='blue-btn' onClick={(e) => handleCategory(e, plan)}>View Products</button>
          </div>

        ))}
    </div>
  )
}

export default Plans
