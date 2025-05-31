import React, { useState, useEffect } from 'react'
import imageMap from '../../utils/helpers'
import './detail.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { FilterList, Language, ListAltSharp } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {

    const { auth_token,plan_id,status } = useSelector((state) => state.auth);

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();
    const location = useLocation();

    const [list, setList] = useState([]);
    const [total, setTotal] = useState('');
    const [ids, setId] = useState('');

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            const queryParams = new URLSearchParams(location.search);
            const id = queryParams.get('prd'); // this will be "4" if ?prd=4

            if (!id) return; // Optionally handle if id is not present
            setId(id)
            let res = await fetchData(`${API_ENDPOINTS.products}?id=${id}`, navigate, 'GET', {});

            if (res.success) {
                setList(res.data.list)
                setTotal(res.data.total)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (e) => {
        e.preventDefault()
        try {
            if (auth_token) {
                if (plan_id >= ids) {
                    let res = await fetchData(`${API_ENDPOINTS.openProduct}?id=${ids}`, navigate, 'GET', {});
                    if (res.success) {
                       window.open(res.data[0].link, '_blank');
                    }
                    return
                } else {
                    navigate('/')
                    return
                }
            }
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {list && list.length > 0 &&
                <section className='product-details'>
                    <div className='two_grid'>
                        <div className='content'>
                            <div className='main-heading'>
                                {<h2>{list[0].name}</h2>}
                            </div>
                            <div className='review'>
                                <span>5.5</span>
                                <img src={imageMap['startIcon.svg']} alt='star' />
                            </div>
                            <div className='more-details'>
                                <div className='detail-item'>
                                    <div className='item'>
                                        <p>Last Updates</p>
                                        <span>
                                            {new Date(list[0].updated_at || list[0].created_at).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short', // use 'long' for full month name
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className='item'>
                                        <p>Level</p>
                                        <span>{list[0].level_name}</span>
                                    </div>
                                    <div className='item'>
                                        <p>Audience</p>
                                        <span>{list[0].audience}</span>
                                    </div>
                                    <div className='item'>
                                        <p>Language</p>
                                        {list[0].languages.map((language) => (<span>{language} | </span>))}
                                    </div>

                                </div>
                                <div className='actions'>
                                    <div className='action-item'><FavoriteBorderIcon /> Wishlist</div>
                                    <div className='action-item'><ShareOutlinedIcon />Share</div>
                                </div>
                            </div>
                            <div className='course-video'>
                                {/* <img src={imageMap['youtube-preview.png']} alt='youtube' /> */}
                                <img src={`${list[0].main_image}`} alt='youtube' />

                            </div>
                            <div className='description-box'>
                                <h4 className='sub-heading'>Overview</h4>
                                <p>{list[0].overview}</p>
                                {/* <p>This course has been specifically designed for beginners who have been looking to obtain a hands-on learning experience with Python, teaching you concepts of programming right from the basics and Python being the most simplest language for a beginner to start with.</p>
                                <p>It is the right time to start learning the in-demand Python language because of its gaining popularity in the fields on Data Science, Backend Development, Internet of Things, etc. Keep yourself equipped with the most sought-after skills!</p>
                                <p>You will work on a project at the end of this course, which has been designed for you to implement all the topics which you would have mastered by the end of this course to give you enough confidence to start writing your own independent programs in Python.</p> */}
                            </div>
                        </div>
                        <div className='price-chart'>
                            <h2>$ {list[0].discount_percentage > 0 ? list[0].price - ((list[0].price * list[0].discount_percentage) / 100) : list[0].price}</h2>
                            <div className='price'>
                                $ {list[0].price}
                                <div className='discount'>{list[0].discount_percentage > 0 ? `${list[0].discount_percentage}% Off` : 'No discount available'}</div>
                            </div>
                            <div className='action-btn'>
                                {console.log(plan_id , list[0].plan_included)}
                                {/* <button type='button' className='field'>Add to Cart</button> */}
                                <button type='button' className='outlined' onClick={(e) => handleChange(e)}>{auth_token ? plan_id >= list[0].plan_included ? "Open" : "Upgrade Now" : "Buy Now"}</button>
                            </div>
                            <div className='course-list'>
                                <h3 className='title'>This product includes</h3>
                                <ul>
                                    {list[0].includes.map((include) => (<li>{include}</li>))}
                                    {/* <li>1 article</li>
                                    <li>50 downloadable resources</li>
                                    <li>Full lifetime access</li>
                                    <li>Access on mobile and TV</li>
                                    <li>Certificate of completion</li> */}
                                </ul>
                            </div>
                            {list[0].instructor_name &&
                                <div className='profile'>
                                    <h3 className='title'>About the Instructor</h3>
                                    <div className='profile-photo'>
                                        <div className='img'>
                                            <img src={`${list[0].instructor_image}`} alt='profile' />
                                        </div>
                                        <div className='detail'>
                                            <h4>{list[0].instructor_name}</h4>
                                            <span>{list[0].description}</span>
                                        </div>
                                    </div>
                                </div>}
                            {/* <div className='d-flex justify-content-between align-items-center'>
                                        <div className='review'>
                                            <span>5.5</span>
                                            <img src={imageMap['startIcon.svg']} alt='star' />
                                        </div>
                                        <div className='review'>
                                            <ListAltSharp/>
                                            <span>12 Courses</span>
                                        </div>
                                    </div> */}
                        </div>
                    </div>
                </section>}
        </>
    )
}

export default ProductDetail