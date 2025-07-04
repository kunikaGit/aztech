import React, { useState, useEffect } from 'react'
import './onlincourse.scss'
import { useNavigate } from 'react-router-dom'
import useApiRequest from "../../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../../constants/endPoints";


const OnlineCourse = () => {
    const { loading, fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list, setList] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        const res = await fetchData(API_ENDPOINTS.landingPageDetails,navigate, 'GET', {});
        if(res.success){
           
            setList([res.data]);
        }
    }



    return (
        <section className='online-couse-wrapped'>
            <div className='two-grid'>
                {list.length>0 &&
                <div className='grid-item four-cards'>
                    <div className='cards'>
                        <h3>{list[0].total_products}+</h3>
                        <span>Digital Products Across All Categories</span>
                    </div>
                    <div className='cards'>
                        <h3>{list[0].total_users}+</h3>
                        <span>Happy Users and Growing Fast</span>
                    </div>
                    <div className='cards'>
                        <h3>{list[0].landingPage.total_days}</h3>
                        <span>Access Premium Tools with One-Time Plans</span>
                    </div>
                    <div className='cards'>
                        <h3>10-Level</h3>
                        <span>Smart Referral Tree to Maximize Rewards</span>
                    </div>
                </div>}
                <div className='grid-item'>
                    <div className='main-heading'>
                        <h2>Your One-Stop Digital Mall – Explore. Earn. Excel.</h2>
                        <p>From AI tools and learning resources to music, eBooks, and research papers – AZ Tech is your all-in-one platform.
                            Shop smart, grow your skills, and earn rewards. Whether you're a student, creator, or pro, we’ve got something for you.</p>
                        <ul>
                            <li>AI-Powered Creativity Tools</li>
                            <li>Educational & Professional Resources</li>
                            <li>Entertainment: Music, Videos, More</li>
                            <li>Reward-Backed Digital Shopping</li>
                        </ul>
                        <button type='button' className='blue-btn'>View Details</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OnlineCourse