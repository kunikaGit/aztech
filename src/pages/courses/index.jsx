import React, { useState, useEffect } from 'react'
import './courses.scss'
import imageMap from '../../utils/helpers';
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const cards = [
    { image: 'certificate1.png' },
    { image: 'certificate2.png' },
    { image: 'certificate3.png' }
]
const baseUrl = import.meta.env.VITE_BASE_URL;

const Courses = () => {
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
                                                ))}

                                        </div>))}
                            </>))}

                </section>
            </div>
        </>
    )
}

export default Courses;