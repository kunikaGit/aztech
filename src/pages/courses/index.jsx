import React, { useState, useEffect } from 'react'
import './courses.scss'
import imageMap from '../../utils/helpers';
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import Slider from 'react-slick'
import { useSelector } from "react-redux";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Courses = () => {
    const { plan_id } = useSelector((state) => state.auth);
  const { auth_token } = useSelector((state) => state.auth);

    const queryParams = new URLSearchParams(location.search);
    const category_id = queryParams.get('category'); // this will be "4" if ?prd=4

    const plan_Id = queryParams.get('plan'); // <-- Extract plan_id
    const plan_name = queryParams.get('plan_name'); // <-- Extract plan_id
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list1, setList1] = useState([]);

    const [planId, setPlanId] = useState('')
    const [planName, setPlanName] = useState('')

    useEffect(() => {
        callApi()
    }, [plan_Id]);

    const callApi = async () => {
        try {

            setPlanId(plan_Id)
            setPlanName(plan_name)
            if (plan_Id) {
                let res1 = await fetchData(`${API_ENDPOINTS.productsCategoryPlanwise}?plan_id=${plan_Id}&category_id=${category_id}`, navigate, 'GET', {});

                if (res1.success) {

                    setList1(res1.data.list)
                }

                return
            }

            if (category_id) {
                let res1 = await fetchData(`${API_ENDPOINTS.categorywise2}?id=${category_id}`, navigate, 'GET', {});
                if (res1.success) {
                    setList1(res1.data)
                }
                return
            }

            let res1 = await fetchData(API_ENDPOINTS.categorywise2, navigate, 'GET', {});
            if (res1.success) {
                setList1(res1.data)
                setPlanId("")
                setPlanName("")
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
      navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan, type } });
      return
    }
    navigate(`${baseUrl}login`)
  };

    return (
        <>
            <div className='courses-wrapped'>
                <div className='two-grid'>
                    <div className='heading'>
                        <div className='relative'>
                            <img src={imageMap['products-text.svg']} alt='course' />
                        </div>
                    </div>
                    <div className='main-content'>
                        <h2>AZ Tech: Your Ultimate Destination for Digital Innovation</h2>
                        <p>
                            Dive into a vast universe of over 4,000 premium digital products — from cutting-edge AI tools and immersive educational content to creative assets, research papers, music, and beyond. Whether you're a student, professional, or lifelong learner, AZ Tech empowers you with everything you need to grow, create, and succeed — all in one place. Start exploring and transform your digital experience today!
                        </p>
                        <button type='button' className='blue-btn'>Explore Now</button>
                    </div>

                </div>
                {plan_Id && plan_id && (plan_id < plan_Id) &&
                    <div className='header-card d-flex justify-content-between'>
                        <h2>Upgrade to {planName}</h2>
                        <button type='button' className='blue-btn' onClick={(e)=>{handleCheckout(e,planId)}} >Process to checkout</button>
                    </div>
                }

                {(plan_Id && !plan_id) &&
                    <div className='header-card d-flex justify-content-between'>
                        <h2>Get {planName} Plan</h2>
                        <button type='button' className='blue-btn' onClick={(e)=>{handleCheckout(e,planId)}} >Process to checkout</button>
                    </div>
                }

                {list1?.length > 0 && (!plan_Id) &&
                    list1?.map((item, index) => (
                        <div className={`${index % 2 == 0 ? 'certificate-cards-new' : 'certificate-cards-new'} `}>

                            <div className='card-header'>
                                {item.name && <h3 className='sub-heading'>{item.name}</h3>}
                                <button type='button' className='blue-btn'>Explore All</button>
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
                                            // <div className='certificate-cards'>
                                            <div className='cards' key={index}>

                                                <div className='label-bg'>{product.type_name}</div>
                                                <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${product.id}`)}><img src={`${product.preview_image}`} /></div>
                                                <div className='content'>
                                                    <h3 className='title'>{product.name}</h3>
                                                    <p>{product.description}</p>
                                                    {product?.keywords.length>0 && 
                                                    <div className='spc'>
                                                        {product?.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                                    </div>}
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
                                                        {/* <button type='button'>${product.price}</button> */}
                                                        <button type='button' onClick={() => navigate(`${baseUrl}detail?prd=${product.id}`)}>View Now</button>

                                                    </div>
                                                </div>
                                            </div>
                                            // </div>
                                        ))}
                                </Slider>
                            </div>
                        </div>))}

                {list1?.length > 0 && (plan_Id) &&
                    list1?.map((item, index) => (
                        <div className={`${index % 2 == 0 ? 'certificate-cards-new' : 'certificate-cards-new'} `}>


                            <div className='certificate-cards'>

                                <div className='cards' key={index}>

                                    <div className='label-bg'>{item.type_name}</div>
                                    <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}><img src={`${item.preview_image}`} /></div>
                                    <div className='content'>
                                        <h3 className='title'>{item.name}</h3>
                                        <p>{item.description}</p>
                                       
                                       {/* {item?.keywords.length>0 && <div className='spc'>
                                            {item?.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                        </div>} */}
                                        <ul className='p-0 list-content'>
                                            <li><StarIcon /><b>4.6</b>(480 Review)</li>
                                            <li><EyeIcon />1,840</li>
                                            <li><MessageIcon />249</li>
                                        </ul>
                                        <div className='card_footer'>
                                            {item.instructor_name &&
                                                <div className='d-flex gap-3'>
                                                    <img src={`${item.instructor_image}`} alt='profile' />
                                                    <div className='profile-content'>
                                                        <h3 className='name'>{item.instructor_name}</h3>
                                                        <h3 className='des'>{item.instructor_description}</h3>
                                                    </div>
                                                </div>}
                                            {/* <button type='button'>${item.price}</button> */}
                                            <button type='button' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>View Now</button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>))}
                {/* </section > */}
            </div >
        </>
    )
}

export default Courses;