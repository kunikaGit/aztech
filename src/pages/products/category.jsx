import React, { useState, useEffect } from 'react'
import './products.scss'
import { useNavigate,useSearchParams } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import Slider from 'react-slick';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Category = () => {

  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [list, setList1] = useState([]);

  const [planId,setPlanId] = useState('')

    const [searchParams] = useSearchParams(); // <-- Get URL params

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {

       const planId = searchParams.get('plan_id'); // <-- Extract plan_id
      if (!planId) {
        console.warn("No plan_id found in URL.");
        return;
      }
      setPlanId(planId)
      let res1 = await fetchData(`${API_ENDPOINTS.categoriesPlanwise}?id=${planId}`, navigate, 'GET', {});
      if (res1.success) {

        setList1(res1.data.list)
      }


    } catch (error) {
      console.log(error)
    }
  }

  const handleProduct = (e, category) => {
    e.preventDefault()
    //setCategory(category.id)
     navigate(`${baseUrl}myaccount/products?plan_id=${planId}&category_id=${category.id}`)
  }

  return (
    <div className='dahboard-wrapped'>

    <div className='services-wrapped'>

      <div className='service-cards-wrapped'>
        {list.length > 0 &&
          list.map((category,index) => (
            <div className='service-cards' key={index} onClick={(e) => { handleProduct(e, category) }}>
              <div className='icon'>
                {/* <img src={imageMap[`${category.icon}`]} alt='icon' /> */}
                <img src={`${category.icon}`} alt='icon' />
              </div>
              <div className='content'>
                <h3>{category.name} ({category.product_count})</h3>
                <p>{category.description}</p>
              </div>
            </div>))}
      </div>
    </div>
      </div>
  )
}

export default Category