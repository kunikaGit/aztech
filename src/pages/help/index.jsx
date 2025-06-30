import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from '../../utils/customFn';
const Help = () => {
    const navigate = useNavigate();
    const { fetchData } = useApiRequest();

    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.message.trim()) newErrors.message = 'Message is required.';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {



            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setErrors({});

            const res = await fetchData(`${API_ENDPOINTS.submitHelp}`, navigate, "POST", formData);

            if (res.success) {
                successMsg(res.message)
                // Reset form
                setFormData({
                    fullName: '',
                    mobile: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                errorMsg(res.message)

            }
        } catch (error) {
            errorMsg(error)
        }
    };



    return (
        <div className='my-plan-wrapped'>
            <div className='dash-heading'>
                <h2>Help</h2>
                {/* <p>Please save after any changes</p> */}
            </div>

            <form onSubmit={handleSubmit}>
                <div className='profile-form'>
                    <div className='input-main-data'>
                        <label>Full Name</label>
                        <input
                            type='text'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Enter full name'
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </div>

                    <div className='input-main-data'>
                        <label>Mobile Number (Optional)</label>
                        <input
                            type='text'
                            name='mobile'
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder='Phone'
                        />
                    </div>

                    <div className='input-main-data'>
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter Email'
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className='input-main-data'>
                        <label>Subject</label>
                        <input
                            type='text'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder='Enter Subject'
                        />
                        {errors.subject && <span className="error">{errors.subject}</span>}
                    </div>

                    <div className='input-main-data w-100'>
                        <label>Message</label>
                        <textarea
                            name='message'
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Type Message.....'
                        />
                        {errors.message && <span className="error">{errors.message}</span>}
                    </div>
                </div>

                <div className='action-btns'>
                    <button type='submit' className='save'>Submit</button>
                    {/* <button type='button' className='cancel' onClick={handleCancel}>Cancel</button> */}
                </div>
            </form>
        </div>
    );
};

export default Help;
