import React, { useState, useEffect } from 'react'
import './products.scss'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import Slider from 'react-slick';
const baseUrl = import.meta.env.VITE_BASE_URL;




const Product = ({ planId ,categoryId}) => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [list1, setList1] = useState([]);
  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res1 = await fetchData(`${API_ENDPOINTS.productsCategoryPlanwise}?plan_id=${planId}&category_id=${categoryId}`, navigate, 'GET', {});
      //  let res1 = await fetchData(API_ENDPOINTS.categorywise, navigate, 'GET', {});
      if (res1.success) {

        setList1(res1.data.list)
      }


    } catch (error) {
      console.log(error)
    }
  }



  return (

    <div className='courses-wrapped'>

        {list1?.length > 0 &&
          list1?.map((item, index) => (
            <div className={`${index % 2 == 0 ? 'certificate-cards-new' : 'certificate-cards-new'} `}>
              <div className='main-heading'>
                <h2 className='sub-heading'>{item.name}</h2>
              </div>
              <div className='certificate-cards'>
              <Slider
                dots={true}
                infinite={item.length > 3 ? true : false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                initialSlide={0}
                arrows={true}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
              >
                {item?.products?.length > 0 &&
                  item?.products.map((product) => (
                    <div className='cards' key={index}>
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
                          <button type='button' onClick={() => navigate(`${baseUrl}detail?prd=${product.id}`)}>View Now</button>

                        </div>
                      </div>
                    </div>
                    // </div>
                  ))}
              </Slider>
              </div>
            </div>))}


    </div>

  )
}

export default Product