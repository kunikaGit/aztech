import React, { useState, useEffect, useCallback } from 'react'
import './courses.scss'
import imageMap from '../../utils/helpers';
import { EyeIcon, MessageIcon, StarIcon } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import Slider from 'react-slick'
import { useSelector } from "react-redux";
import { Col, Row } from 'react-bootstrap';
import { ShimmerPostItem } from 'react-shimmer-effects';
import { Search } from '@mui/icons-material';
import debounce from 'lodash.debounce';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Courses = () => {
    const { plan_id } = useSelector((state) => state.auth);
    const { auth_token } = useSelector((state) => state.auth);

    const queryParams = new URLSearchParams(location.search);
    const category_id = queryParams.get('category'); // this will be "4" if ?prd=4

    const plan_Id = queryParams.get('plan'); // <-- Extract plan_id
    const plan_name = queryParams.get('plan_name'); // <-- Extract plan_id
    const { loading, fetchData } = useApiRequest();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [list1, setList1] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(9);

    const [planId, setPlanId] = useState('')
    const [planName, setPlanName] = useState('')

    const [categoryId, setCategoryId] = useState('')

    const [pageDependancy, setPageDependancy] = useState(false)
    useEffect(() => {
        callApi()
    }, [plan_Id, pageDependancy, currentPage]);

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
            
            if (plan_Id) {
                let res1 = await fetchData(
                    `${API_ENDPOINTS.productsCategoryPlanwise}?plan_id=${plan_Id}&category_id=${category_id}&search=${query || ''}&page_number=${currentPage}&limit=${pageSize}`, 
                    navigate, 
                    'GET', 
                    {}
                );
                if (res1.success) {
                    setList1(res1.data.list)
                    setTotalPages(res1.data.total_pages || 1)
                    setTotalItems(res1.data.total || 0)
                }
                return
            }

            if (category_id) {
                let res1 = await fetchData(
                    `${API_ENDPOINTS.categorywise2}?id=${category_id}&search=${query || ''}&page_number=${currentPage}&limit=${pageSize}`, 
                    navigate, 
                    'GET', 
                    {}
                );
                if (res1.success) {
                    setList1(res1.data)
                    setPlanId("")
                    setCategoryId(category_id)
                    setPlanName("")
                    // Handle pagination data from category response
                    if (res1.data[0].total_pages) {
                        setTotalPages(res1.data[0].total_pages)
                        setTotalItems(res1.data[0].total || 0)
                    }
                }
                return
            }

            let res1 = await fetchData(
                `${API_ENDPOINTS.categorywise2}?id=&search=${query || ''}&page_number=${currentPage}&limit=${pageSize}`, 
                navigate, 
                'GET', 
                {}
            );
            if (res1.success) {
                setList1(res1.data)
                setPlanId("")
                setPlanName("")
                // Handle pagination data from category response
                if (res1.data.total_pages) {
                    setTotalPages(res1.data.total_pages)
                    setTotalItems(res1.data.total || 0)
                }
            }
        } catch (error) {
            console.log(error)
        }
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

    const handlePageChange = (e, category) => {
        e.preventDefault()
        navigate(`${baseUrl}products?category=${category.id}&name=${category.name}`)
        setPageDependancy(!pageDependancy)
    }

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
        debouncedSearch(value);
    };
    
    const handleReset = () => {
        setSearchTerm('')
        setCurrentPage(1); // Reset to first page when resetting
        callApi()
    }

    // Pagination handlers
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate page numbers for pagination
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

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
                        <button type='button' className='blue-btn' onClick={(e) => { handleCheckout(e, planId) }} >Process to checkout</button>
                    </div>
                }
                <div className='search-header'>
                    <div className='searchbox'>
                        <div className='search-icon'><Search color="#ccc" /></div>
                        <input placeholder="Search"
                            name="search"
                            value={searchTerm}
                            onChange={handleChange}
                            autoComplete="off" />
                    </div>
                    {searchTerm &&
                        <button type='button' className='blue-btn' onClick={handleReset}>Reset</button>
                    }
                </div>
                {loading ?
                    <Row className='mb-5'>
                        {[...Array(3)].map((_, index) => (
                            <Col md={4} key={index}>
                                <ShimmerPostItem card title text cta imageType="thumbnail" />
                            </Col>
                        ))}
                    </Row>
                    :
                    list1?.length > 0 && (!plan_Id) && (!categoryId) &&
                    list1?.map((item, index) => (
                        <div className={`${index % 2 == 0 ? 'certificate-cards-new' : 'certificate-cards-new'} `}>
                            <div className='card-header'>
                                {item.name && <h3 className='sub-heading'>{item.name}</h3>}
                                <button type='button' className='blue-btn' onClick={e => { handlePageChange(e, item) }}>Explore All</button>
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
                                    {loading ?
                                        <Row className='mb-5'>
                                            {[...Array(3)].map((_, index) => (
                                                <Col md={4} key={index}>
                                                    <ShimmerPostItem card title text cta imageType="thumbnail" />
                                                </Col>
                                            ))}
                                        </Row>
                                        :
                                        item?.products?.length > 0 &&
                                        item?.products.map((product) => (
                                            // <div className='certificate-cards'>
                                            <div className='cards' key={index}>

                                                <div className='label-bg'>{product.type_name}</div>
                                                <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${product.id}`)}><img src={`${product.preview_image}`} /></div>
                                                <div className='content'>
                                                    <h3 className='title'>{product.name}</h3>
                                                    <p>{product.description}</p>
                                                    {product?.keywords.length > 0 &&
                                                        <div className='spc'>
                                                            {product?.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                                        </div>}
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

                {loading ?
                    <Row className='mb-5'>
                        {[...Array(3)].map((_, index) => (
                            <Col md={4} key={index}>
                                <ShimmerPostItem card title text cta imageType="thumbnail" />
                            </Col>
                        ))}
                    </Row>
                    :
                    list1?.length > 0 && (plan_Id) && (!categoryId) &&
                    <> <div className=''>
                        {list1[0]?.category_name && <h3 className='sub-heading'>{list1[0]?.category_name}</h3>}

                    </div>
                        <div className='certificate-cards without-slider'>



                            {list1?.map((item, index) => (

                                <div className='cards' key={index}>


                                    <div className='label-bg'>{item.type_name}</div>
                                    <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}><img src={`${item.preview_image}`} /></div>
                                    <div className='content'>
                                        <h3 className='title'>{item.name}</h3>
                                        <p>{item.description}</p>

                                        {item?.keywords.length > 0 && <div className='spc'>
                                            {item?.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                        </div>}
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

                                            <button type='button' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>View Now</button>

                                        </div>
                                    </div>
                                </div>


                            ))}
                        </div>
                    </>}



                {loading ?
                    <Row className='mb-5'>
                        {[...Array(3)].map((_, index) => (
                            <Col md={4} key={index}>
                                <Col md={4} key={index}>
                                    <ShimmerPostItem card title text cta imageType="thumbnail" />
                                </Col>
                            </Col>
                        ))}
                    </Row>
                    :
                    list1?.length > 0 && (!plan_Id) && (categoryId) &&
                    <> <div className=''>
                        {list1[0]?.name && <h3 className='sub-heading'>{list1[0]?.name}</h3>}

                    </div>
                        <div className='certificate-cards without-slider'>



                            {list1[0]?.products?.map((item, index) => (

                                <div className='cards' key={index}>


                                    <div className='label-bg'>{item.type_name}</div>
                                    <div className='img' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}><img src={`${item.preview_image}`} /></div>
                                    <div className='content'>
                                        <h3 className='title'>{item.name}</h3>
                                        <p>{item.description}</p>

                                        {item?.keywords.length > 0 && <div className='spc'>
                                            {item?.keywords.map((keyword) => (<div className='item'>{keyword}</div>))}
                                        </div>}
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

                                            <button type='button' onClick={() => navigate(`${baseUrl}detail?prd=${item.id}`)}>View Now</button>

                                        </div>
                                    </div>
                                </div>


                            ))}
                        </div>
                    </>}

                {/* Pagination Component */}
                {totalPages > 1 && (
                    <div className='pagination-container'>
                        <div className='pagination-info'>
                            <span>Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results</span>
                        </div>
                        <div className='pagination-controls'>
                            <button 
                                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            
                            <div className='page-numbers'>
                                {generatePageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        className={`page-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
                                        onClick={() => page !== '...' && handlePageClick(page)}
                                        disabled={page === '...'}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            
                            <button 
                                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default Courses;