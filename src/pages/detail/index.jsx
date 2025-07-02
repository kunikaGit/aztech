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
import { EyeIcon, EyeoffIcon } from '../../icons/icons'
import PdfPreview from './previewPdf';
import PreviewModal from './imagePreview';
const baseUrl = import.meta.env.VITE_BASE_URL;

const ProductDetail = () => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewFormat, setPreviewFormat] = useState('');

    const { auth_token, plan_id, status } = useSelector((state) => state.auth);

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
                setPreviewFormat(res.data.list[0].format)
                setList(res.data.list)
                setTotal(res.data.total)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCallOpen = async (e) => { // this will call main pdf 
        e.preventDefault()
        try {
            if (auth_token) {
                if (plan_id >= list[0].plan_included) {
                    let res = await fetchData(`${API_ENDPOINTS.openProduct}?id=${ids}`, navigate, 'GET', {});
                    if (res.success) {
                        //window.open(res.data[0].link, '_blank');
                        setPreviewUrl(res.data[0].link)
                         setIsModalOpen(true)
                    }
                    return
                } else {
                    navigate(`${baseUrl}`)
                    return
                }
            }
            navigate(`${baseUrl}`)

        } catch (error) {
            console.log(error)
        }
    }

    const handleCallPreview = async (e) => { // this will call sample pdf 
        e.preventDefault()
        try {
            if (auth_token) {

                if (plan_id >= list[0].plan_included) {
                    let res = await fetchData(`${API_ENDPOINTS.previewProduct}?id=${ids}`, navigate, 'GET', {});
                  
                    if (res.success) {
                        //window.open(res.data[0].link, '_blank');
                        setPreviewUrl(res.data[0].preview_link);
                        setIsModalOpen(true)

                    }
                    return
                }
            }
         //   navigate(`${baseUrl}`)

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
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className='item'>
                                        <p>Level</p>
                                        <span>{list[0].level_name}</span>
                                    </div>
                                    {list[0].total_opens > 1 &&
                                        <div className='item'>
                                            <p>Audience</p>
                                            <span>{list[0].total_opens}</span>
                                        </div>}
                                    {list[0].show_language &&
                                        <div className='item'>
                                            <p>Language</p>
                                            {list[0].languages.map((language) => (<span>{language} | </span>))}
                                        </div>}

                                </div>
                                <div className='actions'>
                                    <div className='action-item'><FavoriteBorderIcon /> Wishlist</div>
                                    <div className='action-item'><ShareOutlinedIcon />Share</div>
                                    <div className='action-item' onClick={(e) => { handleCallPreview(e) }}><EyeIcon />Preview</div>

                                </div>
                            </div>
                            <div className='course-video'>
                                {!previewUrl ? (
                                    <img src={`${list[0].main_image}`} alt='preview' />
                                ) : list[0].format === "pdf" ? (
                                    <PdfPreview pdfUrl={previewUrl} />
                                ) : list[0].format === "video" ? (
                                    <div className="video-thumbnail-wrapper">
                                        <img src={`${list[0].main_image}`} alt="video-preview" />
                                        <div className="play-icon">
                                            ▶️
                                        </div>
                                    </div>
                                ) : (
                                    <img src={`${list[0].main_image}`} alt="preview" />
                                )}
                            </div>

                            <div className='description-box'>
                                <h4 className='sub-heading'>Overview</h4>
                                <p>{list[0].overview}</p>

                            </div>
                        </div>
                        <div className='price-chart'>
                            {list[0].plan_name==0?
                            <h2>$ {list[0].discount_percentage > 0 ? list[0].price - ((list[0].price * list[0].discount_percentage) / 100) : list[0].price}</h2>
                            :
                            <h2>Plan - {list[0].plan_name}</h2>}
                            {list[0].plan_name==0 &&
                            <div className='price'>
                                $ {list[0].price}
                                <div className='discount'>{list[0].discount_percentage > 0 ? `${list[0].discount_percentage}% Off` : 'No discount available'}</div>
                            </div>}
                            <div className='action-btn'>
                                <button type='button' className='outlined' onClick={(e) => handleCallOpen(e)}>{auth_token ? plan_id >= list[0].plan_included ? "Open" : "Upgrade Now" : "Buy Now"}</button>
                            </div>
                            <div className='course-list'>
                                <h3 className='title'>This product includes</h3>
                                <ul>
                                    {list[0].includes.map((include) => (<li>{include}</li>))}

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
                        </div>
                    </div>
                    <PreviewModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        fileUrl={previewUrl}
                        format={previewFormat}
                    />
                </section>}



        </>
    )
}

export default ProductDetail