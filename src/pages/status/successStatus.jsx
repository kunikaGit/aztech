import React, { useEffect, useState } from 'react';
import './status.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const baseUrl = import.meta.env.VITE_BASE_URL;

const SuccessStatus = () => {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      let data = location.state?.txHash
      await updateStatusApi(1, data);
      setTimeout(() => {
        navigate(`${baseUrl}myaccount/dashboard`);
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
          <h2 className='main-heading'>Payment Status Success</h2>
          <div className='icon'>
            <img src='/img/success.gif' alt='success' />
          </div>
          <p className='success-message'>
            🎉<strong> Congratulations! </strong> Your payment has been successful.
          </p>
          <p className='info'>An email will be sent to you shortly.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStatus;

