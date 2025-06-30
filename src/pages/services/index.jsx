import React, { useState, useEffect,useCallback } from 'react'
import imageMap from '../../utils/helpers'
import './services.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useSelector } from "react-redux";
import { Col, Row } from 'react-bootstrap';
import { CategoryShimmer } from '../../component/common/shimmer';
import { Search } from '@mui/icons-material';
import debounce from 'lodash.debounce';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Services = () => {
    const { plan_id } = useSelector((state) => state.auth);
    const { auth_token } = useSelector((state) => state.auth);

    const { loading, fetchData } = useApiRequest();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // <-- Get URL params
    const plan_Id = searchParams.get('plan'); // <-- Extract plan_Id
    const plan_name = searchParams.get('plan_name'); // <-- Extract plan_Id
    const [list, setList] = useState([]);
    const [planId, setPlanId] = useState('')
    const [planName, setPlanName] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        callApi()
    }, [plan_Id]);


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


    const callApi = async (query=null) => {
        try {



            if (plan_Id) {
                setPlanId(plan_Id)
                setPlanName(plan_name)
                let res1 = await fetchData(`${API_ENDPOINTS.categoriesPlanwise}?id=${plan_Id}&search=${query}`, navigate, 'GET', {});
                if (res1.success) {

                    setList(res1.data.list)
                }

            } else {
                let res = await fetchData(`${API_ENDPOINTS.categories}?search=${query}`, navigate, 'GET', {});

                if (res.success) {
                    setList(res.data.list);
                    setPlanId("")
                    setPlanName("")
                }
            }


        } catch (error) {
            console.log(error)
        }
    }

    const handleProduct = (e, category) => {
        e.preventDefault();
        if (planId) {
            navigate(`${baseUrl}products?category=${category.id}&name=${category.name}&plan=${planId}&plan_name=${planName}`)
            return
        }
        navigate(`${baseUrl}products?category=${category.id}?name=${category.name}`)
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
                    {/* <button type='button' className='blue-btn'>Explore Now</button> */}
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
                    <button type='button' className='blue-btn' onClick={(e) => { handleCheckout(e, planId) }}>Process to checkout</button>
                </div>
            }
            <div className='searchbox'>
                <div className='search-icon'><Search color="#ccc" /></div>
                 <input  placeholder="Search"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off" />
            </div>
            <div className='service-cards-wrapped'>
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
                        <div className='service-cards' onClick={(e) => { handleProduct(e, category) }}>
                            <div className='icon'>
                                {/* <img src={imageMap[`${category.icon}`]} alt='icon' /> */}
                                <img src={`${category.icon}`} alt='icon' />
                            </div>
                            <div className='content'>
                                {console.log(`(${category.product_count})`,auth_token)}
                                {category.product_count ?
                                    <h3>{category.name} { auth_token ? `(${category.product_count})`:""}</h3>
                                    :
                                    <h3>{category.name} </h3>}
                                <p>{category.description}</p>
                            </div>
                        </div>))}
            </div>

        </div>
    )
}

export default Services