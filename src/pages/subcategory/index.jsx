import React, { useState, useEffect, useCallback } from 'react'
import imageMap from '../../utils/helpers'
import './subcategory.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useSelector } from "react-redux";
import { Col, Row } from 'react-bootstrap';
import { CategoryShimmer } from '../../component/common/shimmer';
import { Search } from '@mui/icons-material';
import debounce from 'lodash.debounce';

const baseUrl = import.meta.env.VITE_BASE_URL;

const SubCategory = () => {

    const { plan_id } = useSelector((state) => state.auth);
    const { auth_token } = useSelector((state) => state.auth);

    const { loading, fetchData } = useApiRequest();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // <-- Get URL params
    const queryParams = new URLSearchParams(location.search);


    const [list, setList] = useState([]);
    const [planId, setPlanId] = useState('')
    const [planName, setPlanName] = useState('')
    const category_id = queryParams.get('categoryId'); // this will be "4" if ?prd=4

    const plan_Id = queryParams.get('plan'); // <-- Extract plan_id
    const plan_name = queryParams.get('plan_name'); // <-- Extract plan_id
    const [categoryId, setCategoryId] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        callApi()
    }, []);


    // Debounced API call function (wait 500ms after user stops typing)
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                // Optionally clear or handle empty search
                console.log('Empty search - no API call');
                return;
            }

            callApi(query)
        }, 500),
        []
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);


    const callApi = async (query = null) => {
        try {
            setPlanId(plan_Id)
            setPlanName(plan_name)
            if (!category_id) {
                navigate(`${baseUrl}services`)
            } else {

                let res = await fetchData(`${API_ENDPOINTS.subcategories}?id=${category_id}&search=${query}`, navigate, 'GET', {});

                if (res.success) {
                    setTotal(res.data.total)
                    setList(res.data.list);

                }


            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct = (e, category) => {
        e.preventDefault();
        if (planId) {
            navigate(`${baseUrl}products?name=${category.sub_category_name}&plan=${planId}&plan_name=${planName}&subcategory=${category.id}`)
            return
        }
        navigate(`${baseUrl}products?&subcategory=${category.id}&name=${category.sub_category_name}`)
    }


    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const colorPalette = [
        "#3A8BC2", "#6F4CF3", "#0EACDC", "#FFB347", "#FF6961", "#77DD77", "#F49AC2", "#B39EB5"
    ];
    function getColorForString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colorPalette[Math.abs(hash) % colorPalette.length];
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
        <div className='subcategories-wrapped'>
            <div className='two-grid'>
                <div className='heading'>
                    <div className='relative'>
                        <img src={imageMap['subcategory.svg']} alt='course' />
                    </div>
                </div>
                <div className='main-content'>
                    <h2>Explore Curated Collections by Interest and Industry</h2>
                    <p>Unlock tailored digital experiences with our diverse range of sub-categories — whether you're looking for specific tools, focused learning paths, or niche content. From design and development to education, productivity, and entertainment, each sub-category at AZ Tech is designed to help you discover exactly what you need, faster. Navigate with ease and dive deeper into the digital world that matches your goals.

</p>
                </div>
            </div>
            {plan_Id && plan_id && (plan_id < plan_Id) &&
                <div className='header-card d-flex justify-content-between'>
                    <h2>Upgrade to {planName}</h2>
                    <button type='button' className='blue-btn' onClick={(e) => { handleCheckout(e, planId) }} >Process to checkout</button>
                </div>
            }

            {(plan_Id && !plan_id) &&
                <div className='header-card d-flex justify-content-between'>
                    <h2>Get {planName} Plan</h2>
                    <button type='button' className='blue-btn' onClick={(e) => { handleCheckout(e, planId) }} >Process to checkout</button>
                </div>
            }
            <div className='searchbox'>
                <div className='search-icon'><Search color="#ccc" /></div>
                <input placeholder="Search"
                    name="search"
                    value={searchTerm}
                    onChange={handleChange}
                    autoComplete="off" />
            </div>
            {list.length > 0 &&
                <div className='d-flex justify-content-between'>
                   <h5> {list[0].category_name} ({total})</h5>
                </div>}
        
            <div className='subcategory-cards-wrapped'>
                {loading ?
                    <Row className='mb-5 w-100'>
                        {[...Array(6)].map((_, index) => (
                            <Col md={6} key={index}>
                                <CategoryShimmer />
                            </Col>
                        ))}
                    </Row>
                    :
                    list.length > 0 &&
                    list.map((category) => (
                        <div className='subcategory-cards' onClick={(e) => { handleProduct(e, category) }}>

                            <div
                                className='icon letter-icon'
                                style={{
                                    backgroundColor: getColorForString(category.sub_category_name),
                                }}
                            >
                                <span>
                                    {category.sub_category_name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className='content'>
                                {
                                    <h3>{category.sub_category_name} </h3>}
                                <p>{category.description}</p>
                            </div>
                        </div>))}
            </div>

        </div>
    )
}

export default SubCategory