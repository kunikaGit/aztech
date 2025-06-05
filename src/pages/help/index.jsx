import React from 'react'

const Help = () => {
    return (
        <div className='my-plan-wrapped'>
            <div className='dash-heading'>
                <h2>Help</h2>
                <p>Please save after any changes</p>
            </div>
            <form>
                <div className='profile-form'>
                    <div className='input-main-data'>
                        <label>Full Name</label>
                        <input type='text' placeholder='Enter full name' />
                    </div>

                    <div className='input-main-data'>
                        <label>Mobile Number</label>
                        <input type='text' placeholder='Phone' name='name' />
                    </div>

                    <div className='input-main-data'>
                        <label>Email</label>
                        <input type='text' placeholder='Enter Email ' />
                    </div>

                    <div className='input-main-data'>
                        <label>Subject</label>
                        <input type='text' placeholder='Enter Subject' />
                    </div>
                    <div className='input-main-data w-100'>
                        <label>Message</label>
                        <textarea rows={5} placeholder='Type Message.....' />
                    </div>
                </div>

                <div className='action-btns'>
                    <button type='submit' className='save' >Submit</button>
                    <button type='button' className='cancel' >Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default Help;