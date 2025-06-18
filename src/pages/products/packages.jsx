import React, { useState, useEffect } from 'react'
import './products.scss'
import imageMap from '../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Packages = () => {

  const { auth_token } = useSelector((state) => state.auth);
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

    const [data, setData] = useState([])
  
    useEffect(() => {
      callApi()
    }, []);
  
    const callApi = async () => {
      try {
        let res = await fetchData(API_ENDPOINTS.dashboard, navigate, 'GET', {});
  
        if (res.success) {
          setData(res.data.plans)
        }
      } catch (error) {
        console.log(error)
      }
    }
  const handleCheckout = (e, plan) => {
    e.preventDefault();
    //setPlan(plan.id)
    navigate(`${baseUrl}myaccount/services?plan_id=${plan.id}`)

  };

  return (
    <div className='dahboard-wrapped'>
    <section className='choose-plan'>

      <div className='flex-container'>
        <div className='blue-card'>
          <div className='content'>
            <h3>🎯 Our Packages</h3>
            <p>Here are the packages include products. Please click to see the products list in the perticular plan.</p>
          </div>

        </div>
      </div>


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
              <button type='button' className='plan-btn' disabled={plan.button_name=="Already Achieved"} onClick={(e) => handleCheckout(e, plan)}>{plan.button_name}</button>
              <div className='plan-benifits'>
                <ul>
                  {plan?.pointers.length > 0 && plan?.pointers.map((point,idx) => (<li key={idx}>{point}</li>))}
                </ul>
              </div>
               <button type='button' className='blue-btn' onClick={(e) => handleCheckout(e, plan)}>View Products</button>
            </div>
            
          ))}

      </div>
    </section>
    </div>
  )
}

export default Packages