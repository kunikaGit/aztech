import React, { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";

const FailedStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const timeout = setTimeout(async () => {
        let data = null//location.state?.txHash
        await updateStatusApi(3, data);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 3000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    const { fetchData } = useApiRequest();
  
    const updateStatusApi = async (status, data) => {
      try {
        let id = localStorage.getItem("session_id")
        let payload = { status, id, data }
        const updateStatusRes = await fetchData(`${API_ENDPOINTS.updateStatus}`, navigate, "POST", payload);
  
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='status-wrapped'>
      <div className='upper-body'>
        <div className='form-box'>
          <h2 className='main-heading failed'>Payment Failed</h2>
          <div className='text-center text-5xl py-10'>
            ❌
          </div>
          <p className='success-message'>
             Oops! Your payment has failed.
          </p>
          <p className='info'>
            Please try again or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailedStatus;
