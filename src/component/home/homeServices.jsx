import React, { useState, useEffect } from 'react'
import imageMap from '../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const baseUrl = import.meta.env.VITE_BASE_URL;

const HomeServices = () => {
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
        navigate(`${baseUrl}products?category=${category.id}?name=${category.name}`)
    }
    return (
        <div className='services-wrapped'>
                <div className='main-heading mb-4'>
                    <h2>AZ Tech Services</h2>
                    <span className='lower-heading'>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, accusamus.
                    </span>
                </div>
            <div className='service-cards-wrapped'>
                {list.length > 0 &&
                    list.slice(0, 8).map((category) => (
                        <div className='service-cards' onClick={(e) => { handleProduct(e, category) }}>
                            <div className='icon'>
                                <img src={imageMap[`${category.icon}`]} alt='icon' />
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

export default HomeServices