import React, { useState } from 'react'
import imageMap from '../../utils/helpers'
import { Container } from 'react-bootstrap'
import { EyeIcon, EyeoffIcon } from '../../icons/icons'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from "react-router-dom";
import { successMsg, errorMsg } from "../../utils/customFn";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // for calling userinfo API
import { Link } from 'react-router-dom'

import OverlayLoading from "../../component/common/overlayLoader";

const Signup = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirm_password: '',
    auth_type: 'email'
  });

  const [errors, setErrors] = useState({});

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors(prev => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'First Name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Last Name is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { password } = formData;

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@$!%*?#&_]/.test(password),
  };

  const requirementList = [
    { label: "At least 8 characters", passed: passwordChecks.length },
    { label: "At least one uppercase", passed: passwordChecks.uppercase },
    { label: "At least one lowercase", passed: passwordChecks.lowercase },
    { label: "At least one number", passed: passwordChecks.number },
    { label: "At least one special char", passed: passwordChecks.specialChar },
  ];
  const PasswordRequirement = ({ label, passed }) => (
    // <div className="requirement">
    //     <span className={`dot ${passed ? 'dot-passed' : 'dot-not-passed'}`}></span>
    //     {label}
    // </div>

    <div className={`requirement ${passed ? 'passed' : 'not-passed'}`}>
      {passed ? '✅' : '❌'} {label}
    </div>


  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      if (validate()) {
        console.log('Form Data Submitted:', formData);
        // Call signup API here if needed

        let res = await fetchData(API_ENDPOINTS.signup, navigate, "POST", formData);
        if (res.success) {
          successMsg(res.message)
          navigate(`/login`)
        } else {
          errorMsg(res.message)
          setLoading(false)

        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)

        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        console.log('Google User Info:', res.data);
        let payload = {
          name: res.data.given_name, surname: res.data.family_name, email: res.data.email, auth_type: "google"
        }
        let resp = await fetchData(API_ENDPOINTS.signup, navigate, "POST", payload);
        if (resp.success) {
          successMsg(resp.message)
          navigate(`/login`)
        } else {
          errorMsg(resp.message)
          setLoading(false)

        }
        // You can now store this in state or send it to your backend
      } catch (err) {
        console.error('Google login failed', err);
        setLoading(false)

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
              <div className='logo'>
                <img src='/images/logo-big.png' alt='logo' />
              </div>
              <div className='heading'>
                Sign Up to enjoy the huge ton of <b>Premium</b> Courses
              </div>
              <div className='checklist'>
                <ul>
                  <li>Special discounts rates</li>
                  <li>Unlimited free downloads</li>
                  <li>Special promotions</li>
                  <li>Coupon winning</li>
                </ul>
              </div>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                <button type='button' className='input-box d-flex gap-2 justify-content-center' onClick={handleGoogleLogin}>
                  <img src={imageMap['google.svg']} alt='google icon' />
                  Sign up with Google
                </button>
                <div className='divide-line'>
                  <span>Or sign in with</span>
                </div>

                <div className='input-main-data'>
                  <label>First Name</label>
                  <input
                    name='name'
                    type='text'
                    placeholder='Enter your first name'
                    className='input-box'
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <small className='text-danger'>{errors.name}</small>}
                </div>

                <div className='input-main-data'>
                  <label>Last Name</label>
                  <input
                    name='surname'
                    type='text'
                    placeholder='Enter your last name'
                    className='input-box'
                    value={formData.surname}
                    onChange={handleChange}
                  />
                  {errors.surname && <small className='text-danger'>{errors.surname}</small>}
                </div>

                <div className='input-main-data'>
                  <label>E-mail</label>
                  <input
                    name='email'
                    type='email'
                    placeholder='Enter your e-mail'
                    className='input-box'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className='text-danger'>{errors.email}</small>}
                </div>

                <div className='input-main-data'>
                  <label>Password</label>
                  <input
                    name='password'
                    type={isPasswordVisible ? 'password' : 'text'}
                    placeholder='Enter your password'
                    className='input-box'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="eyeicon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <EyeoffIcon /> : <EyeIcon />}
                  </div>
                  {errors.password && <small className='text-danger'>{errors.password}</small>}
                </div>

                <div className="password-requirements">
                  <div className="requirement-row">
                    {requirementList.slice(0, 3).map((req, i) => (
                      <PasswordRequirement key={i} label={req.label} passed={req.passed} />
                    ))}
                  </div>
                  <div className="requirement-row">
                    {requirementList.slice(3).map((req, i) => (
                      <PasswordRequirement key={i + 3} label={req.label} passed={req.passed} />
                    ))}
                  </div>
                </div>

                <div className='input-main-data'>
                  <label>Confirm Password</label>
                  <input
                    name='confirm_password'
                    type={isConfirmPasswordVisible ? 'password' : 'text'}
                    placeholder='Confirm your password'
                    className='input-box'
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  <div className="eyeicon" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    {isConfirmPasswordVisible ? <EyeoffIcon /> : <EyeIcon />}
                  </div>
                  {errors.confirm_password && <small className='text-danger'>{errors.confirm_password}</small>}
                </div>

                <button type='submit' className='blue-btn'>Sign Up</button>

                <div className='new-account'>
                  <span>Already have an account?  <Link to='/login'><b>Login</b></Link> from here</span>
                </div>
              </form>


            </div>
          </div>
        </Container>
      </div>
    </>
  )
}


export default Signup;
