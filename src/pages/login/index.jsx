import React, { useState } from 'react';
import imageMap from '../../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { Container } from 'react-bootstrap';
import { EyeIcon, EyeoffIcon } from '../../icons/icons'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { successMsg, errorMsg } from "../../utils/customFn";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // for calling userinfo API

const Login = () => {
  const navigate = useNavigate();
  const { fetchData } = useApiRequest();

  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    auth_type: 'email',
  });

  const [errors,setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:  value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]:  "",
    }))
  };

  const validation=()=>{
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

    if(!validation()){
      return
    }
    let res = await fetchData(API_ENDPOINTS.signup, navigate, "POST", formData);
           if (res.success) {
             successMsg(res.message)
             navigate(`/login`)
           } else {
             errorMsg(res.message)
             setLoading(false)
   
           }
  } catch (error) {
    console.error('Login error:', error);
    alert(error.response?.data?.message || 'Login failed. Please try again.');
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
        console.log('Google User Info:', res.data);
        navigate('/myaccount/dashboard');
      } catch (err) {
        console.error('Google login failed', err);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <><div className='login-wrapped'>
      <Container>
        <div className='two-grid'>
          <div className='content'>
            <div className='logo'>
              <img src='/images/logo-big.png' alt='logo' />
            </div>
            <div className='heading'>
              Login to enjoy the huge ton of <b>exclusive Courses</b>
            </div>
            <div className='checklist'>
              <ul>
                <li>Special discount rates</li>
                <li>Unlimited free downloads</li>
                <li>Special promotions</li>
                <li>Coupon winning</li>
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
                <Link to='/forgot-password'>Forgot Password</Link>
              </div>

              <div className='new-account'>
                <span>
                  Do not have an account? <Link to='/signup'><b>Sign Up</b></Link> Here
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
