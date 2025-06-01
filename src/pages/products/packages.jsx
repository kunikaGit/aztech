import React, { useState, useEffect } from 'react'
import './products.scss'
import imageMap from '../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useDispatch, useSelector } from "react-redux";

const Packages = ({setPlan}) => {

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
    setPlan(plan.id)

  };

  return (
    <section className='choose-plan'>

      <div className='flex-container'>
        <div className='blue-card'>
          <div className='content'>
            <h3>🎯 Our Packages</h3>
            <p>Here are the packages include products. Please click to see the products list in the perticular plan.</p>
          </div>

          {/* <img src={imageMap['rocket.png']} alt='roket' className='roket' /> */}
        </div>
      </div>
      {/* <div className='main-heading'>
                <h2>
                   Here are the packages include products. Please click to see the products list in the perticular plan.
                </h2>
            </div> */}

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
              <button type='button' className='plan-btn' onClick={(e) => handleCheckout(e, plan)}>Activate Now</button>
              <div className='plan-benifits'>
                <ul>
                  {plan?.pointers.length > 0 && plan?.pointers.map((point) => (<li>{point}</li>))}
                </ul>
              </div>
            </div>
          ))}

      </div>
    </section>
  )
}

export default Packages