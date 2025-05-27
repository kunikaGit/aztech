import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OverlayLoading from '../../component/common/overlayLoader.jsx';
import { errorMsg } from "../../utlis/customFn";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/authAction";

const TelegramLoginStatus = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const [telegramData, setTelegramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(true)

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
            setResult(false)
            setLoading(false)
            console.warn('Telegram data not found in URL.');
        }
    }, [location.search]);

  // 🕒 Call submitForm after 3 seconds of telegramData being set
  useEffect(() => {
    if (telegramData) {
      const timeout = setTimeout(() => {
        submitForm();
      }, 3000);

      return () => clearTimeout(timeout); // clean up
    }
  }, [telegramData]);
      const submitForm = async () => {
    if (!telegramData) {
        errorMsg('Telegram authentication data missing.');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2s if data is missing
        return;
    }
        try {
            setLoading(true);

            const formData = {
                telegram_id: telegramData.telegram_id,
                username: telegramData.username,
                name: telegramData.first_name,
                surname: telegramData.last_name,
                photo_url: telegramData.photo_url,
                auth_type: 'telegram'
            };

            dispatch(login({ formData, navigate }));
            setResult(true)
        } catch (err) {
            console.error(err)
            setResult(false)
            setLoading(false)
            errorMsg(err)
   // ⏳ Redirect to login after 2 seconds if there's an error
        setTimeout(() => navigate('/login'), 2000);
            } finally {
            setLoading(false);
        }
    };


    if (loading
    ) {
        return (
            <div className='login'>
                <div className='upper-body'>
                    <div className='form-box'>
                        <h2 className='main-heading'>Telegram Login</h2>
                        <p className=''>
                            Loading ...
                            <br />
                            Please wait we are fetching your request.
                        </p>
                    </div>
                </div>
            </div>)
    }

    if (!loading) {
        return (
            <>{result ? <div className='login'>
                <div className='upper-body'>
                    <div className='form-box'>
                        <h2 className='main-heading'>Telegram Login</h2>
                        <p className='error-message'>
                            ❌ Oops! Your telegram login has failed.
                            <br />
                            Please try again or contact support. If you do not have an account please register first.
                        </p>
                    </div>
                </div>
            </div> :
                <div className='login'>
                    <div className='upper-body'>
                        <div className='form-box'>
                            <h2 className='main-heading'>Telegram Login</h2>
                            <p className='success-message'>
                                🎉 Congratulations! Your telegram login has been successful.
                                <br />
                                We will redirect you to your dashboard
                            </p>
                        </div>
                    </div>
                </div>}
            </>
        );
    }
};

export default TelegramLoginStatus;
