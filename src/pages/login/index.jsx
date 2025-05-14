import React from 'react'
import imageMap from '../../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { Container } from 'react-bootstrap'
const Login = () => {
const navigate=  useNavigate()
  return (
    <div className='login-wrapped'>
      <Container>
      <div className='two-grid'>
        <div className='content'>
          <div className='logo'>
            <img src='/images/logo-big.png' />
          </div>
          <div className='heading'>
            Login to enjoy the huge ton of <b>exclusive Courses</b>
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
          <form>
            <h1>Log in</h1>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </p>
            <button type='button' className='input-box d-flex gap-2 justify-content-center'>
              <img src={imageMap['google.svg']} />Sign in with Google</button>
            <div className='divide-line'>
              <span>Or sign in with</span>
            </div>
            <div className='input-main-data'>
              <label>E-mail</label>
              <input type='text' placeholder='Enter your e-mail' className='input-box'/>
            </div>
            <div className='input-main-data'>
              <label>Password</label>
              <input type='password' placeholder='Enter your password' className='input-box'/>
            </div>
            <div className='form-footer'>
                <label className='d-flex gap-2' htmlFor='checkbox'>
                  <input type='checkbox' id='checkbox'/>
                  Remember me
                </label>
                <Link to='#/'>Forgot Password</Link>
            </div>
            <button type='submit' className='blue-btn' onClick={()=>navigate('/myaccount/dashboard')}>Login</button>
          </form>
        </div>
      </div>
      </Container>
    </div>
  )
}

export default Login;
