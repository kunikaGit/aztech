import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";

const EmailVerification = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState(true);
    const { fetchData } = useApiRequest();

    const callApi = async (token) => {
        try {
            const verifyEmailRes = await fetchData(`${API_ENDPOINTS.verifyEmail}?token=${token}`, navigate, "GET", {});
            if (verifyEmailRes?.success || verifyEmailRes?.status) {
                setLoading(false)
                setResult(false)
            } else {
                setLoading(false)
                setResult(true)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setResult(true)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
    
        const timeout = setTimeout(async () => {
            if (token) {
                await callApi(token);
            } else {
                setLoading(false);
                setResult(true); // Token missing, treat as failure
            }
    
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }, 3000);
    
        return () => clearTimeout(timeout);
    }, []);
    

    if(loading 
    ){ 
        return(
        <div className='login'>
            <div className='upper-body'>
                <div className='form-box'>
                    <h2 className='main-heading'>Email Verification Status</h2>
                    <p className=''>
                      Loading ...
                        <br />
                        Please wait we are fetching your request.
                    </p>
                </div>
            </div>
        </div>)
    }

   if(!loading){ 
    return (
        <>{result ? <div className='login'>
            <div className='upper-body'>
                <div className='form-box'>
                    <h2 className='main-heading'>Email Verification Status</h2>
                    <p className='error-message'>
                        ❌ Oops! Your Email Verification has failed.
                        <br />
                        Please try again or contact support.
                    </p>
                </div>
            </div>
        </div> :
            <div className='login'>
                <div className='upper-body'>
                    <div className='form-box'>
                        <h2 className='main-heading'>Email Verification Status</h2>
                        <p className='success-message'>
                            🎉 Congratulations! Your Email Verification has been successful.
                            <br />
                            An email will be sent to you shortly.
                        </p>
                    </div>
                </div>
            </div>}
        </>
    );}
};

export default EmailVerification;
