import React from 'react'
import imageMap from '../../utils/helpers'
import { Container } from 'react-bootstrap'
const Signup = () => {

  return (
    <div className='login-wrapped'>
      <Container>
      <div className='two-grid'>
        <div className='content'>
          <div className='logo'>
            <img src='/images/logo-big.png' />
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
          <form>
            <h1>Sign Up</h1>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </p>
            <button type='button' className='input-box d-flex gap-2 justify-content-center'>
              <img src={imageMap['google.svg']} />Sign up with Google</button>
            <div className='divide-line'>
              <span>Or sign in with</span>
            </div>
            <div className='input-main-data'>
              <label>Full Name</label>
              <input type='text' placeholder='Enter your e-mail' className='input-box'/>
            </div>
            <div className='input-main-data'>
              <label>E-mail</label>
              <input type='text' placeholder='Enter your e-mail' className='input-box'/>
            </div>
            <div className='input-main-data'>
              <label>Password</label>
              <input type='password' placeholder='Enter your password' className='input-box'/>
            </div>
            <div className='input-main-data'>
              <label>Confirm Password</label>
              <input type='password' placeholder='Enter your password' className='input-box'/>
            </div>
            <button type='submit' className='blue-btn'>Login</button>
          </form>
        </div>
      </div>
      </Container>
    </div>
  )
}

export default Signup;
