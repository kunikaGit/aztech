import React from 'react'
import './checkout.scss'
import imageMap from '../../utils/helpers'
const Checkout = () => {
    return (
        <div className='checkout-wrapped'>
            <div className='dash-heading'>
                <h2>Checkout</h2>
            </div>
            <div className='two-grid'>
                <div className='left-side'>
                    <div className='white-card'>
                        <h3>Billing Details</h3>
                        <form>
                            <div className='input-main-data'>
                                <label>First Name</label>
                                <input type='text' placeholder='Enter First Name' />
                            </div>
                            <div className='input-main-data'>
                                <label>Last Name</label>
                                <input type='text' placeholder='Enter Last Name' />
                            </div>
                            <div className='input-main-data'>
                                <label>Email</label>
                                <input type='text' placeholder='Enter Email' />
                            </div>
                            <div className='input-main-data'>
                                <label>Contact</label>
                                <input type='text' placeholder='Enter contact number' />
                            </div>
                            <h3 className='mt-4'>Choose Payment Method</h3>
                            <div className='input-box checkcontainer'>
                                <label htmlFor='card'>
                                    <input type='radio' id='card' name='payment'/>Card Payment
                                </label>
                                <img src={imageMap['cards.png']} alt='cards'/>
                            </div>
                            <div className='input-box checkcontainer'>
                                <label htmlFor='upi'>
                                    <input type='radio' id='upi' name='payment'/>UPI Payment
                                </label>
                                <img src={imageMap['cards.png']} alt='cards'/>
                            </div>
                            <div className='input-box checkcontainer'>
                                <label htmlFor='crypto'>
                                    <input type='radio' id='crypto' name='payment'/>Crypto Payment
                                </label>
                                <img src={imageMap['crypto.png']} alt='cards'/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='white-card'>
                        <table>
                            <tr>
                                <th>Sub Total</th>
                                <td>$0</td>
                            </tr>
                            <tr>
                                <th>Discount</th>
                                <td>$0</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>$0</td>
                            </tr>
                        </table>
                        <button type='button' className='blue-btn'>Proceed to payment</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Checkout