import React from 'react'
import imageMap from '../../utils/helpers'
import { Edit } from '@mui/icons-material'
import './profile.scss';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useState, useEffect } from 'react'
import Select from 'react-select';
import { successMsg, errorMsg } from "../../utils/customFn";

const MyProfile = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [countries, setCountries] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [genders, setGenders] = useState(["male", "female", "other"]);

  const [selectedImage, setSelectedImage] = useState(null); // for preview
  const [selectedFile, setSelectedFile] = useState(null);   // for upload

  const [errors, setErrors] = useState({})

  const [edit, setEdit] = useState(false)
  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.getProfile, navigate, 'GET', {});

      if (res.success) {
        setFormData(res.data)
        if(res.data.profile_picture){
          setSelectedImage(res.data.profile_picture)
        }
      }

      let resCountries = await fetchData(API_ENDPOINTS.countries, navigate, 'GET', {});

      if (resCountries.success) {
        setCountries(resCountries.data)
      }

      let resProfessions = await fetchData(API_ENDPOINTS.professions, navigate, 'GET', {});

      if (resProfessions.success) {
        setProfessions(resProfessions.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

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





  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 400 * 1024) {
        alert("Image must be less than 400 KB");
        return;
      }
      setSelectedImage(URL.createObjectURL(file)); // preview
      setSelectedFile(file); // upload
    }
  };


  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const payload = new FormData();

      // Add all fields from formData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });

      // Add profile image if selected
      if (selectedFile) {
        payload.append('profile_picture', selectedFile);
      }

      let res = await fetchData(API_ENDPOINTS.updateProfile, navigate, 'PUT', payload);
      if (res.success) {
        successMsg(res.message)
      } else {
        errorMsg(res.message)
      }

    } catch (error) {
      console.log(error)
      errorMsg(error)

    }
  }

   const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short", // or "2-digit"
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // set to false for 24-hour format
        });
      }
  return (
    <div className='my-plan-wrapped'>
      <div className='dash-heading'>
        <h2>Profile</h2>
        <p>Edit your profile</p>
      </div>
      <div className='profile-info'>
        {/* <div className='profile-des'>
          <div className='profile-img'>
            <img src={imageMap['user.png']} alt='profile' />
          </div>
          <div className='description'>
            {formData &&
              <h3>{formData.name} {formData.surname}</h3>}
            {formData && <p>Member since : {formData.created_at}</p>}
            <h3>Membership Status</h3>
            {formData && <p>{formData.status}</p>}
          </div>
        </div> */}
        <div className='profile-des'>
          <div className='profile-img'>
            <img
              src={selectedImage || imageMap['user.png']}
              alt='profile'
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className='description'>
            {formData && <h3>{formData.name} {formData.surname}</h3>}
            {formData && <p>Member since : {formatDateTime(formData.created_at)}</p>}
            <h3>Membership Status</h3>
            {formData && <p>{formData.status}</p>}
          </div>
        </div>
        <div className='actions'>
          <button type='button' className='light-btn' onClick={(e) => { updateProfile(e) }}>Upload new picture</button>
          {!edit && <button type='button' className='blue-btn' onClick={() => { setEdit(true) }}><Edit />Edit</button>}
        </div>
      </div>
      <form>
        <div className='profile-form'>
          <div className='input-main-data'>
            <label>Email Address</label>
            <input
              type='text'
              placeholder='Enter Email'
              name='email'
              value={formData.email}
              disabled={!edit || formData.auth_type === "email" || formData.auth_type === "google"}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>First Name</label>
            <input
              type='text'
              placeholder='Enter first name'
              name='name'
              value={formData.name}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Last Name</label>
            <input
              type='text'
              placeholder='Enter last name'
              name='surname'
              value={formData.surname}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Contact Number</label>
            <input
              type='text'
              placeholder='Enter contact number'
              name='contact_number'
              value={formData.contact_number}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Country</label>
            {/* <Select
              options={countries?.map((country) => ({
                label: country.name,
                value: country.id,
              }))}
              styles={customStyles}
              name='country_id'
              placeholder="Select Country"
              value={countries.find(opt => opt.value === formData.country_id) || null}
              onChange={(selected) => handleReactSelectChange("country_id", selected)}
              isSearchable={true}
              disabled={!edit}
            /> */}
            <select
              name='country_id'
              value={formData.country_id || ""}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Not selected</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className='input-main-data'>
            <label>Profession</label>
            <select
              name='profession_id'
              value={formData.profession_id || ""}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Not selected</option>
              {professions.map((profession) => (
                <option key={profession.id} value={profession.id}>
                  {profession.name}
                </option>
              ))}
            </select>
          </div>

          <div className='input-main-data'>
            <label>Gender</label>
            <select
              name='gender'
              value={formData.gender || ""}
              onChange={handleChange}
              disabled={!edit}
            >
              <option value="">Not selected</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>


          <div className='input-main-data'>
            <label>Age</label>
            <input
              type='text'
              placeholder='Enter age'
              name='age'
              value={formData.age}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Telegram Id</label>
            <input
              type='text'
              placeholder='Enter telegram id'
              name='telegram_id'
              value={formData.telegram_id}
              disabled={!edit || formData.auth_type === "telegram"}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Telegram Username</label>
            <input
              type='text'
              placeholder='Enter telegram username'
              name='username'
              value={formData.username}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className='input-main-data'>
            <label>Referred By</label>
            <input
              type='text'
              placeholder='Enter wallet address'
              name='referred_by'
              value={formData.referred_by ? formData.referred_by : "No introducer found"}
              disabled
            />
          </div>

          <div className='input-main-data'>
            <label>Share Link (Invite Link)</label>
            <input
              type='text'
              placeholder='Enter referral address'
              name='referral_link'
              value={formData.referal_link}
              disabled
            />
          </div>
        </div>

        {edit && (
          <div className='action-btns'>
            <button type='submit' className='save' onClick={(e) => updateProfile(e)}>Save</button>
            <button type='button' className='cancel' onClick={() => setEdit(false)}>Cancel</button>
          </div>
        )}
      </form>

    </div>
  )
}

export default MyProfile