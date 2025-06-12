import React, { useState, useEffect } from 'react'
import imageMap from '../../utils/helpers'
import './services.scss';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Services = () => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list, setList] = useState([]);

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.categories, navigate, 'GET', {});

            if (res.success) {
                setList(res.data.list)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct = (e, category) => {
        //e.previentDefault()
        navigate(`${baseUrl}products?category=${category.id}?name=${category.name}`)
    }
    return (
        <div className='services-wrapped'>
            <div className='two-grid'>
                <div className='heading'>
                    <div className='relative'>
                        <img src={imageMap['services.svg']} alt='course' />
                    </div>
                </div>
                <div className='main-content'>
                    <h2>Discover the Ultimate Digital Mall at AZ Tech</h2>
                    <p>Explore thousands of cutting-edge digital products — from AI tools and creative assets to eBooks, videos, music, and much more. Everything you need to learn, create, and grow is just a click away.</p>
                    <button type='button' className='blue-btn'>Explore Now</button>
                </div>

            </div>
            <div className='service-cards-wrapped'>
                {list.length > 0 &&
                    list.map((category) => (
                        <div className='service-cards' onClick={(e) => { handleProduct(e, category) }}>
                            <div className='icon'>
                                {/* <img src={imageMap[`${category.icon}`]} alt='icon' /> */}
                                <img src={`${category.icon}`} alt='icon' />
                            </div>
                            <div className='content'>
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                            </div>
                        </div>))}
            </div>

        </div>
    )
}

export default Services