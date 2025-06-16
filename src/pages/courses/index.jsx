import React, { useState, useEffect } from 'react'
import './courses.scss'
import imageMap from '../../utils/helpers';
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import Slider from 'react-slick'

const baseUrl = import.meta.env.VITE_BASE_URL;

const Courses = () => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();


    const [list1, setList1] = useState([]);

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {

            const queryParams = new URLSearchParams(location.search);
            const id = queryParams.get('category'); // this will be "4" if ?prd=4

            if (id) {
                let res1 = await fetchData(`${API_ENDPOINTS.categorywise2}?id=${id}`, navigate, 'GET', {});
                if (res1.success) {
                    setList1(res1.data)
                }
                return
            }

            let res1 = await fetchData(API_ENDPOINTS.categorywise2, navigate, 'GET', {});
            if (res1.success) {
                setList1(res1.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


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

                {list1?.length > 0 &&
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
                {/* </section > */}
            </div >
        </>
    )
}

export default Courses;