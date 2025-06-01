import React, { useState, useEffect } from 'react'
import './popularCertificates.scss'
import imageMap from '../../../utils/helpers'
import { EyeIcon, MessageIcon, StarIcon } from '../../../icons/icons'
import { useNavigate } from 'react-router-dom'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";
const baseUrl = import.meta.env.VITE_BASE_URL;

const cards = [
    { image: 'certificate1.png' },
    { image: 'certificate2.png' },
    { image: 'certificate3.png' }
]
const PopularCertifictes = () => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState('');

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.products, navigate, 'GET', {});

            if (res.success) {
                setList(res.data.list.slice(0, 3)) // here I only want to set the initial 3 
                setTotal(res.data.total)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct=()=>{
        navigate(`${baseUrl}products`)
    }
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
            {/* <div className='certificate-cards'>
                {cards.map((item,index)=>(
                <div className='cards' key={index}>
                    <div className='img' onClick={()=>navigate('/detail')}><img src={imageMap[`${item.image}`]} /></div>
                    <div className='content'>
                        <h3 className='title'>Inflation calculator (2024...</h3>
                        <p>Ever-so-useful Excel Inflation Calculator covering 50 countries. Fully editable.</p>
                        <div className='spc'>
                            <div className='item'>Calculator</div>
                            <div className='item'>Inflation</div>
                            <div className='item'>Finance</div>
                        </div>
                        <ul className='p-0 list-content'>
                            <li><StarIcon /><b>4.6</b>(480 Review)</li>
                            <li><EyeIcon />1,840</li>
                            <li><MessageIcon />249</li>
                        </ul>
                        <div className='card_footer'>
                            <div className='d-flex gap-3'>
                                <img src={imageMap['dummy-img.png']} alt='profile' />
                                <div className='profile-content'>
                                    <h3 className='name'>Diana Jones</h3>
                                    <h3 className='des'>Pegasus Team</h3>
                                </div>
                            </div>
                            <button type='button'>$12.00</button>
                        </div>
                    </div>
                </div>
                ))}
            </div> */}

            {list.length > 0 &&
                <div className='certificate-cards'>
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
                </div>}
        </section>
    )
}

export default PopularCertifictes