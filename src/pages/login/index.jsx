import React, { useState, useEffect } from 'react';
import imageMap from '../../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { Container } from 'react-bootstrap';
import { EyeIcon, EyeoffIcon } from '../../icons/icons'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // for calling userinfo API
import { login } from "../../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import OverlayLoading from "../../component/common/overlayLoader";
import TelegramLogin from "../signup/telegram";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const { auth_token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth_token) {
      navigate(`${baseUrl}myaccount/dashboard`); // ✅ Safe inside useEffect
    }
  }, [auth_token, navigate]);

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    auth_type: 'email',
  });

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!validation()) {
        return
      }
      setLoading(true)

      dispatch(login({ formData, navigate }))
      setLoading(false)
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false)

    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        let payload = JSON.stringify({
          email: res.data.email,
          auth_type: 'google',
        })
        dispatch(login({ formData: payload, navigate }));

      } catch (err) {
        console.error('Google login failed', err);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <>
      <OverlayLoading isLoading={loading} />

      <div className='login-wrapped'>
        <Container>
          <div className='two-grid'>
            <div className='content'>
              <div className='logo' onClick={() => navigate(`${baseUrl}`)}>
                <img src={`${baseUrl}images/logo-big-1.png`} alt='logo' />
              </div>
              <div className='heading'>
                Welcome Back to <b>AZ Tech!</b>👋 
              </div>
              <div className='checklist'>
                <ul>
                  <li>Access your personalized learning dashboard</li>
                  <li>Resume from where you left off</li>
                  <li>Unlock your saved courses, eBooks, and tools</li>
                  <li>Secure login to keep your progress safe</li>
                </ul>
              </div>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>

                <button
                  type='button'
                  className='input-box d-flex gap-2 justify-content-center'
                  onClick={() => handleGoogleLogin()}
                >
                  <img src={imageMap['google.svg']} alt='google icon' />
                  Sign in with Google
                </button>
                <TelegramLogin redirectUrl={'https://arcforyou.com/telegram-auth'} />


                <div className='divide-line'>
                  <span>Or sign in with</span>
                </div>

                <div className='input-main-data'>
                  <label>E-mail</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your e-mail'
                    className='input-box'
                    required
                  />
                  {errors.email && <small className='text-danger'>{errors.email}</small>}
                </div>

                <div className='input-main-data'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter your password'
                    className='input-box'
                    required
                  />
                  {errors.password && <small className='text-danger'>{errors.password}</small>}

                </div>

                <div className='form-footer'>
                  <label className='d-flex gap-2' htmlFor='rememberMe'>
                    <input
                      type='checkbox'
                      id='rememberMe'
                      name='rememberMe'
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>
                  <Link to={`${baseUrl}forgot-password`}>Forgot Password</Link>
                </div>

                <div className='new-account'>
                  <span>
                    Do not have an account? <Link to={`${baseUrl}signup`}><b>Sign Up</b></Link> Here
                  </span>
                </div>

                <button type='submit' className='blue-btn'>
                  Login
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
