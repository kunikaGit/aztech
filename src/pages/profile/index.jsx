import React from 'react'
import imageMap from '../../utils/helpers'
import { Edit } from '@mui/icons-material'
import './profile.scss'
const MyProfile = () => {
  return (
    <div className='my-plan-wrapped'>
      <div className='dash-heading'>
        <h2>Profile</h2>
        <p>Edit your profile</p>
      </div>
      <div className='profile-info'>
        <div className='profile-des'>
          <div className='profile-img'>
            <img src={imageMap['user.png']} alt='profile' />
          </div>
          <div className='description'>
            <h3>Anastasya Gordon</h3>
            <p>Elite Rank</p>
            <h3>Descriptions</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className='actions'>
          <button type='button' className='light-btn'>Upload new picture</button>
          <button type='button' className='blue-btn'><Edit />Edit</button>
        </div>
      </div>
      <form>
        <div className='profile-form'>
          <div className='input-main-data'>
            <label>Email Address</label>
            <input type='text' placeholder='Enter Email' />
          </div>
          <div className='input-main-data'>
            <label>Full Name</label>
            <input type='text' placeholder='Enter full name' />
          </div>
          <div className='input-main-data'>
            <label>Mobile Number</label>
            <input type='text' placeholder='Enter mobile' />
          </div>
          <div className='input-main-data'>
            <label>Gender</label>
            <input type='text' placeholder='Enter gender' />
          </div>
          <div className='input-main-data'>
            <label>Date Of Birth</label>
            <input type='text' placeholder='Enter DOB' />
          </div>
          <div className='input-main-data'>
            <label>Wallet Address</label>
            <input type='text' placeholder='Enter wallet address' />
          </div>
          <div className='input-main-data'>
            <label>Referral Address</label>
            <input type='text' placeholder='Enter referral address' />
          </div>
        </div>
        <div className='action-btns'>
          <button type='submit' className='save'>Save</button>
          <button type='button' className='cancel'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default MyProfile