import React,{useState} from 'react'
import Packages from './packages'
import Product from './products'

const Products = () => {

    const [showProducts,setShowProducts]=useState(false)
    const [newPlanId,setNewPlanId]=useState('')

    const setPlanId=(value)=>{
setNewPlanId(value);
setShowProducts(true)
    }
  return (
    <div className='dahboard-wrapped'>
      {!showProducts &&  <Packages setPlan={setPlanId}/>}
      {showProducts &&  <Product planId={newPlanId}/>}

    </div>
  )
}

export default Products