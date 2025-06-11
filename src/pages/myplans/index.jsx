import React, { useState, useEffect } from 'react'
import './myplan.scss'
import imageMap from '../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Myplans = () => {

  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [total, setTotal] = useState('');

  const [list1, setList1] = useState([]);

  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.products, navigate, 'GET', {});

      if (res.success) {
        setList(res.data.list)
        setTotal(res.data.total)
      }

      let res1 = await fetchData(API_ENDPOINTS.categorywise, navigate, 'GET', {});
      if (res1.success) {
        setList1(res1.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <div className='my-plan-wrapped'>
    //   <div className='dash-heading'>
    //     <h2>My Subscribed Courses</h2>
    //   </div>
    //   <div className='card-container'>
    //     <div className='plan-card'>
    //       <div className='image'>
    //         <img src={imageMap['plan1.jpg']} alt='image' />
    //       </div>
    //       <div className='card_content'>
    //         <h3 className='tag'>App Development</h3>
    //         <h3 className='title'>Inflation calculator (2024)</h3>
    //         <p className='date'>Valid Till : 20 Aug 2025</p>
    //         <div className='d-flex justify-content-between alignitems-center'>
    //           <div className='price d-flex align-items-center gap-2'>
    //             <label>Start  from</label>
    //             <h4>$15</h4>
    //           </div>
    //           <button type='button' className='blue-btn'>Subscribed</button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className='plan-card'>
    //       <div className='image'>
    //         <img src={imageMap['plan1.jpg']} alt='image' />
    //       </div>
    //       <div className='card_content'>
    //         <h3 className='tag'>App Development</h3>
    //         <h3 className='title'>Inflation calculator (2024)</h3>
    //         <p className='date'>Valid Till : 20 Aug 2025</p>
    //         <div className='d-flex justify-content-between alignitems-center'>
    //           <div className='price d-flex align-items-center gap-2'>
    //             <label>Start  from</label>
    //             <h4>$15</h4>
    //           </div>
    //           <button type='button' className='blue-btn'>Subscribed</button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className='plan-card'>
    //       <div className='image'>
    //         <img src={imageMap['plan1.jpg']} alt='image' />
    //       </div>
    //       <div className='card_content'>
    //         <h3 className='tag'>App Development</h3>
    //         <h3 className='title'>Inflation calculator (2024)</h3>
    //         <p className='date'>Valid Till : 20 Aug 2025</p>
    //         <div className='d-flex justify-content-between alignitems-center'>
    //           <div className='price  d-flex align-items-center gap-2'>
    //             <label>Start  from</label>
    //             <h4>$15</h4>
    //           </div>
    //           <button type='button' className='blue-btn'>Subscribed</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className='courses-wrapped'>
      <section className='course-listing'>
        {list1?.length > 0 &&
          list1?.map((item, index) => (
            <><div className='main-heading'>
              <h2>{item.name}</h2>
            </div>

              {item?.products?.length > 0 &&
                item?.products?.map((products) => (
                  <div className='certificate-cards'>

                    {products?.length > 0 &&
                      products.map((product) => (
                        <div className='cards' key={index}>
                          <div className='label-bg'>Ebook</div>
                          <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${product.id}`)}><img src={`${product.preview_image}`} /></div>
                          <div className='content'>
                            <h3 className='title'>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className='spc'>
                              {product.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                            </div>
                            <ul className='p-0 list-content'>
                              <li><StarIcon /><b>4.6</b>(480 Review)</li>
                              <li><EyeIcon />1,840</li>
                              <li><MessageIcon />249</li>
                            </ul>
                            <div className='card_footer'>
                              {product.instructor_name &&
                                <div className='d-flex gap-3'>
                                  <img src={`${product.instructor_image}`} alt='profile' />
                                  <div className='profile-content'>
                                    <h3 className='name'>{product.instructor_name}</h3>
                                    <h3 className='des'>{product.instructor_description}</h3>
                                  </div>
                                </div>}
                              <button type='button'>View Now</button>

                            </div>
                          </div>
                        </div>
                      ))}

                  </div>))}
            </>))}

      </section>
    </div>
  )
}

export default Myplans