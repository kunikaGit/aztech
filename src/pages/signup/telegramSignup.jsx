import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OverlayLoading from '../../component/common/overlayLoader.jsx';
import { API_ENDPOINTS } from "../../constants/endPoints";
import useApiRequest from "../../hook/useApiRequest";
import { errorMsg, successMsg } from "../../utlis/customFn";
import { useDispatch } from "react-redux";
import { isloginSuccess } from "../../redux/slice/authSlice.js";

const TelegramSignup = () => {
    const { fetchData } = useApiRequest();
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', isNotUsCitizen: false });
    const [formErrors, setFormErrors] = useState({});
    const [telegramData, setTelegramData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Extract Telegram data from URL query string
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const telegramUser = {};
        for (const [key, value] of searchParams.entries()) {
            telegramUser[key] = value;
        }

        if (telegramUser.id) {
            setTelegramData({
                telegram_id: telegramUser.id,
                username: telegramUser.username || '',
                first_name: telegramUser.first_name || '',
                last_name: telegramUser.last_name || '',
                photo_url: telegramUser.photo_url || '',
            });
        } else {
            console.warn('Telegram data not found in URL.');
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };


    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Enter a valid email address';
        } else if (!formData.isNotUsCitizen) {
            errors.email = 'You must confirm you are not a US citizen.';
        }
        return errors;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (!telegramData) {
            errorMsg('Telegram authentication data missing.');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                email: formData.email,
                telegram_id: telegramData.telegram_id,
                username: telegramData.username,
                name: telegramData.first_name,
                surname: telegramData.last_name,
                photo_url: telegramData.photo_url,
                auth_type: 'telegram',
                isNotUsCitizen: formData.isNotUsCitizen
            };
            const signUpRes = await fetchData(API_ENDPOINTS.signup, navigate, "POST", payload);

            if (signUpRes?.success) {
                successMsg(signUpRes?.message)
                localStorage.setItem("auth_token", signUpRes?.data.token);

                dispatch(isloginSuccess());
                navigate("/")
            } else {
                errorMsg(signUpRes?.message ? signUpRes?.message : signUpRes)
            }


        } catch (err) {
            console.error(err);
            errorMsg(err)
        } finally {
            setLoading(false);
        }
    };




    return (
        <OverlayLoading isLoading={loading}>
            <div className='login'>
                <div className='upper-body'>
                    <div className='form-box'>
                        <div className='logo-box'>
                            <Link to='/' className='logo-text animate-gradient mb-5 block text-center'>
                                ARC
                            </Link>
                        </div>
                        <h2 className='main-heading'>Register your account (Please enter your email)</h2>
                        <form onSubmit={submitForm}>
                            <div className='input-main-data'>
                                <label>Email address <span className="text-danger">*</span></label>
                                <input type='email' name='email' onChange={handleChange} value={formData.email} />
                                {formErrors?.email && <div className="error-message">{formErrors.email}</div>}
                            </div>
                            <div className='input-main-data'>
                                <input
                                    className='checkbox'
                                    type='checkbox'
                                    name='isNotUsCitizen'
                                    checked={formData.isNotUsCitizen}
                                    onChange={handleChange}
                                />
                                <label className='flex items-center gap-2'>
                                    I confirm that I am <strong>not a US citizen</strong> <span className="text-danger">*</span>
                                </label>
                                {formErrors?.isNotUsCitizen && (
                                    <div className="error-message">{formErrors.isNotUsCitizen}</div>
                                )}
                            </div>
                            <button type='submit' className='login-btn'>Sign up</button>
                        </form>

                        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
                            <hr style={{ flexGrow: 0 }} />
                            <span style={{ margin: '0 10px', color: '#999' }}></span>
                            <hr style={{ flexGrow: 0 }} />
                        </div>

                        <div className='signup-text'>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayLoading>
    );
};

export default TelegramSignup;
