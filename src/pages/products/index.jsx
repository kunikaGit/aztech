import React, { useState, useEffect } from 'react'
import Packages from './packages'
import Product from './products'
import Category from './category';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const Products = () => {

  const [showProducts, setShowProducts] = useState(false)
  const [showCategories, setShowCategories] = useState(false)


  const [newPlanId, setNewPlanId] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')


  const setPlanId = (value) => {
    setNewPlanId(value);
    setShowCategories(true)
  }

    const setCategoryId = (value) => {
    setNewCategoryId(value);
    setShowProducts(true)
  }


  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [data, setData] = useState(null)

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.dashboard, navigate, 'GET', {});

      if (res.success) {
        setData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

    if(!data){
return(<>Loading...</>)
  }

  return (
    <div className='dahboard-wrapped'>
      {!showCategories && !showProducts && <Packages data={data.plans} setPlan={setPlanId} />}
      {!showProducts && showCategories && <Category planId={newPlanId} setCategory={setCategoryId}/>}
      {showProducts && showCategories && <Product planId={newPlanId} categoryId={newCategoryId}/>}

    </div>
  )
}

export default Products