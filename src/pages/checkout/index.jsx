import React, { useState, useEffect } from 'react'
import './checkout.scss'
import imageMap from '../../utils/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { successMsg, errorMsg } from "../../utils/customFn";
import { loadStripe } from '@stripe/stripe-js';
import OverlayLoading from "../../component/common/overlayLoader";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
    let VITE_REACT_STRIPE_PUBLIC_KEY = import.meta.env.VITE_REACT_STRIPE_PUBLIC_KEY;
        const stripePromise = loadStripe(VITE_REACT_STRIPE_PUBLIC_KEY); // Use your public key

        const [loading,setLoading]=useState(false)
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Product details passed via router state
    const [productDetails, setProductDetails] = useState(location.state?.product || null);

    const [type_id, set_type_id] = useState(location.state?.type || null);

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_number: '',
    });
    const [error, setError] = useState({})

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [finalPrice, setFinalPrice] = useState(productDetails ? productDetails?.amount : 0)

    useEffect(() => {
        if (!productDetails) {
            // Redirect if product details not found
             navigate(`${baseUrl}`);
           // callApi();

        } else {
            callApi();
        }
    }, []);


    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.paymentMethods, navigate, 'GET', {});

            if (res.success) {
                setPaymentMethods(res.data)

            }
        } catch (error) {
            console.log(error)
        }
    }

    // ✅ Form input handler
    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };
    const handlePaymentChange = (method) => {
        setSelectedPayment(method);
        let famount = parseFloat(productDetails.amount) + ((parseFloat(productDetails.amount) * parseFloat(method.fees)) / 100);
        setFinalPrice(famount.toFixed(2));
        setError((prev) => ({ ...prev, ['payment_method']: "" }));
    };

    const validation = () => {
        let isValid = true;
        const newErrors = {};

        // name validation
        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
            isValid = false;
        }

        // name validation
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
            isValid = false;
        }

        // name validation
        if (!selectedPayment) {
            newErrors.payment_method = 'Please select atleast one payment method';
            isValid = false;
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        // contact_number number validation
        if (!formData.contact_number) {
            newErrors.contact_number = 'Contact number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.contact_number)) {
            newErrors.contact_number = 'Contact number must be 10 digits';
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    };

    // ✅ Proceed to payment handler
    const handleCheckout = async(e) => {
        e.preventDefault()
        if (!validation()) return;
setLoading(true)
        const payload={...formData,paymentMethodId:selectedPayment.id,id:productDetails.id,plan_type:productDetails.id==4?"game":"plans",type_id}
        try {
            let res = await fetchData(API_ENDPOINTS.checkout, navigate, 'POST', payload);

            if (res.success) {
            // Save session_id
                if (res?.data) {
                    localStorage.setItem("session_id", res.data);
                }

                if (payload.paymentMethodId == 3) {
                    // Stripe Flow
                    const stripe = await stripePromise;
                    await stripe.redirectToCheckout({ sessionId: res.data });

                } else if (payload.paymentMethodId == 2) {
                    window.location.href = res.data; // redirects in same tab
                }

            }
              setLoading(false)
        } catch (error) {
                setLoading(false)

            console.log(error)
        }
    };
    return (
        <>
        <OverlayLoading isLoading={loading}/>
        <div className='checkout-wrapped'>
            <div className='dash-heading'>
                <h2>Checkout</h2>
            </div>
            <div className='two-grid'>
                <div className='left-side'>
                    <div className='white-card'>
                        <h3>Billing Details</h3>
                        <form>
                            <div className='input-main-data'>
                                <label>First Name</label>
                                <input type='text' placeholder='Enter First Name' name='first_name' value={formData.first_name}
                                    onChange={handleInputChange} />
                                {error.first_name && <div className='error-text'>{error.first_name}</div>}
                            </div>
                            <div className='input-main-data'>
                                <label>Last Name</label>
                                <input type='text' placeholder='Enter Last Name' name='last_name' value={formData.last_name}
                                    onChange={handleInputChange} />
                                {error.last_name && <div className='error-text'>{error.last_name}</div>}
                            </div>
                            <div className='input-main-data'>
                                <label>Email</label>
                                <input type='text' placeholder='Enter Email' name='email' value={formData.email}
                                    onChange={handleInputChange} />
                                {error.email && <div className='error-text'>{error.email}</div>}
                            </div>
                            <div className='input-main-data'>
                                <label>Contact</label>
                                <input type='text' placeholder='Enter contact number' name='contact_number' value={formData.contact_number}
                                    onChange={handleInputChange} />
                                {error.contact_number && <div className='error-text'>{error.contact_number}</div>}
                            </div>
                            <h3 className='mt-4'>Choose Payment Method</h3>
                            {paymentMethods?.length > 0 &&
                                paymentMethods.map((paymentType) => (
                                    <div className='input-box checkcontainer'>
                                        <label htmlFor='card'>
                                            <input type='radio' id='card' name='payment' checked={selectedPayment?.id === paymentType.id}
                                                onChange={() => handlePaymentChange(paymentType)} />{paymentType.name}
                                        </label>
                                        <img src={imageMap[`${paymentType.icon}`]} alt='cards' />
                                    </div>
                                ))}
                            {error.payment_method && <div className='error-text'>{error.payment_method}</div>}

                        </form>
                    </div>
                </div>

                {productDetails &&
                    <div className='right-side'>
                        <div className='white-card'>
                            <h3>Order Details</h3>
                            <div className='order-details-box'>
                                <h6>Package Name: {productDetails.name}</h6>
                                <p>Description: {productDetails.description}</p>
                               {productDetails.duration && <span>Duration: {productDetails.duration}</span>}
                            </div>
                        </div>
                        <div className='white-card'>
                            <table>
                                <tr>
                                    <th>Sub Total</th>
                                    <td>$ {parseFloat(productDetails.amount).toFixed(2)}</td>
                                </tr>
                                {selectedPayment &&
                                    <tr>
                                        <th>Fees Percentage</th>
                                        <td>{selectedPayment.fees} %</td>
                                    </tr>}
                                <tr>
                                    <th>Total</th>
                                    <td>$ {parseFloat(finalPrice).toFixed(2)}</td>
                                </tr>
                            </table>
                            <button type='button' className='blue-btn' onClick={(e) => handleCheckout(e)}>Proceed to payment</button>
                        </div>
                    </div>}
            </div>
        </div >
        </>
    )
}

export default Checkout