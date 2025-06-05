import React, { useState, useEffect } from 'react'
import './products.scss'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import Slider from 'react-slick';
const baseUrl = import.meta.env.VITE_BASE_URL;

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  responsive: [
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
  ]
};


const Products = ({ planId }) => {

  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [list1, setList1] = useState([]);
  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res1 = await fetchData(`${API_ENDPOINTS.planwise}?planId=${planId}`, navigate, 'GET', {});
      //  let res1 = await fetchData(API_ENDPOINTS.categorywise, navigate, 'GET', {});

      if (res1.success) {
        setList1(res1.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

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
                    <Slider {...settings}>
                      {products?.length > 0 &&
                        products.map((product) => (
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
                        ))}
                    </Slider>
                  </div>
                ))}
            </>
          ))}
      </section>
    </div>
  )
}

export default Products