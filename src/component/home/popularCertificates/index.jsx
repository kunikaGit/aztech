import React, { useState, useEffect } from 'react'
import './popularCertificates.scss'
import { EyeIcon, MessageIcon, StarIcon } from '../../../icons/icons'
import { useNavigate } from 'react-router-dom'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";
import Slider from 'react-slick'
const baseUrl = import.meta.env.VITE_BASE_URL;




const PopularCertifictes = () => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState('');

    const [list1, setList1] = useState([]);
    const [total1, setTotal1] = useState('');

    const [list2, setList2] = useState([]);
    const [total2, setTotal2] = useState('');

    const [categoryName, setCategoryName] = useState('');
    const [categoryName1, setCategoryName1] = useState('');
    const [categoryName2, setCategoryName2] = useState('');



    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(`${API_ENDPOINTS.categorywise2}?id=1`, navigate, 'GET', {});

            let res1 = await fetchData(`${API_ENDPOINTS.categorywise2}?id=2`, navigate, 'GET', {});

            let res2 = await fetchData(`${API_ENDPOINTS.categorywise2}?id=3`, navigate, 'GET', {});

            if (res?.success) {

                setList(res?.data[0]?.products)
                setTotal(res.data[0].products.length)
                setCategoryName(res?.data[0]?.name)
            }

            if (res1?.success) {

                setList1(res1?.data[0]?.products)
                setTotal1(res1.data[0].products.length)
                setCategoryName1(res1?.data[0]?.name)

            }

            if (res2?.success) {

                setList2(res2?.data[0]?.products)
                setTotal2(res2.data[0].products.length)
                setCategoryName2(res2?.data[0]?.name)

            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct = () => {
        navigate(`${baseUrl}products`)
    }

        var settings = {
        dots: true,
        // infinite: total<=3 ?false:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        arrows: true,
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

    return (
        <section className='popular-certificate-wrape'>
            <div className='header-section'>
                <div className='main-heading'>
                    <span className='up-heading'>Trending Digital Essentials</span>
                    <h2>Most Popular Picks on AZ Tech</h2>
                    <span className='lower-heading'>
                        Discover what everyone’s loving – from AI tools and eBooks to music, research, and more.
                    </span>
                </div>
                {total - 3 > 0 && <button type='button' className='blue-btn' onClick={() => { handleProduct() }}>Show {total - 3} More</button>}
            </div>

            {list.length > 0 &&
                <div className='certificate-cards'>
                    {categoryName &&
                        <h3 className='sub-heading'>{categoryName}</h3>}
                    <Slider {...settings}>
                        {list.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>
                                    <img src={`${item.preview_image}`} /></div>
                                <div className='content'>
                                    <h3 className='title'>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className='spc'>
                                        {item.keywords.length > 0 && item.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                    </div>
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
                                        <button type='button'>${item.price}</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>}

            {list1.length > 0 &&
                <div className='certificate-cards'>
                    {categoryName1 &&
                        <h3 className='sub-heading'>{categoryName1}</h3>}

                    <Slider {...settings}>
                        {list1.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>
                                    <img src={`${item.preview_image}`} /></div>
                                <div className='content'>
                                    <h3 className='title'>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className='spc'>
                                        {item.keywords.length > 0 && item.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                    </div>
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
                                        <button type='button'>${item.price}</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>}


            {list2.length > 0 &&
                <div className='certificate-cards'>
                    {categoryName2 &&
                        <h3 className='sub-heading'>{categoryName2}</h3>}

                    <Slider {...settings}>
                        {list2.map((item, index) => (
                            <div className='cards' key={index}>
                                <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>
                                    <img src={`${item.preview_image}`} /></div>
                                <div className='content'>
                                    <h3 className='title'>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className='spc'>
                                        {item.keywords.length > 0 && item.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                    </div>
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
                                        <button type='button'>${item.price}</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>}

        </section>
    )
}

export default PopularCertifictes