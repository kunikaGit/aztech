import React from 'react'
import imageMap from '../../utils/helpers'
import { Edit } from '@mui/icons-material'
import './settings.scss';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useState, useEffect } from 'react'
import Select from 'react-select';
import { successMsg, errorMsg } from "../../utils/customFn";

const Settings = () => {
  const { fetchData } = useApiRequest();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});


  const [errors, setErrors] = useState({})

  const [edit, setEdit] = useState(false);


  const [withdrawCurrencies, setWithdrawCurrencies] = useState([]);
  useEffect(() => {
    callApi()
  }, []);

  const callApi = async () => {
    try {
      let res = await fetchData(API_ENDPOINTS.getWithdrawCurrencies, navigate, 'GET', {});

      if (res.success) {

        setWithdrawCurrencies(res.data)

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
        <h2>Settings</h2>
        <p>You can add you wallet address by selecting the currency type</p>
      </div>

      <form>
        <div className='profile-form'>


          <div className='input-main-data'>
            <label>Select Currency</label>

            <Select
              name="currency_id"
              value={withdrawCurrencies.find(opt => opt.id === formData.currency_id) || null}
              onChange={option => setFormData(prev => ({ ...prev, currency_id: option.id }))}
              options={withdrawCurrencies.map(currency => ({
                value: currency.id,
                label: currency.withdraw_name,
                symbol: currency.withdraw_symbol,
                icon1: currency.withdraw_icon_1,
                icon2: currency.withdraw_icon_2,
              }))}
              components={{ Option: CurrencyOption, SingleValue: CurrencyOption }}
              placeholder="Select currency"
            />
          </div>



          <div className='input-main-data'>
            <label>Wallet Address</label>
            <input
              type='text'
              placeholder='Enter wallet address'
              name='wallet_address'
              value={formData.wallet_address}

            />
          </div>

          <div className='input-main-data'>
            <label>Withdraw Amount (USD)</label>
            <input
              type='number'
              min='1'
              step='any'
              placeholder='Enter amount in USD'
              name='withdraw_amount'
              value={formData.withdraw_amount || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='action-btns'>
          <button type='submit' className='save' onClick={(e) => updateProfile(e)}>Save</button>
        </div>

      </form>

      <div className="withdraw-history-table">
        <h3>Withdraw Request History</h3>
        <div className='az-table'>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder for history data */}
              {/* In a real app, you'd fetch this from an API */}
              {/* For now, we'll just show a message */}
              <tr><td colSpan={5}>No history found.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

const CurrencyOption = (props) => {
  const { innerProps, innerRef, data } = props;
  return (
    <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8 }}>
      {data.icon1 && <img src={data.icon1} alt="" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />}
      {data.icon2 && <img src={data.icon2} alt="" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />}
      <div>
        <div style={{ fontWeight: 600 }}>{data.label}</div>
        <div style={{ fontSize: 12, color: '#888' }}>{data.symbol}</div>
      </div>
    </div>
  );
};

export default Settings