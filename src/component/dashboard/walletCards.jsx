import React from 'react'
import imageMap from '../../utils/helpers'
const baseUrl = import.meta.env.VITE_BASE_URL;
const WalletCards = ({ data }) => {
    return (
        <div className='wallet-cards'>
            <div className='card-wrapped theme-card'>
                <div className='card-content'>
                    <div className='icon'>
                        <img src={`${baseUrl}images/logo-1.png`} alt='icon' />
                    </div>
                    <div className='content'>
                        <h3>AZ Wallet</h3>
                        <p>${parseFloat(data?.azWallet).toFixed(2)}</p>
                    </div>
                </div>
                <p className='des'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, animi?</p>
                <button type='button' className='withdra-btn'>Purchase</button>
            </div>
            <div className='card-wrapped theme-card'>
                <div className='card-content'>
                    <div className='icon'>
                        <img src={imageMap['gameicon.png']} alt='icon' />
                    </div>
                    <div className='content'>
                        <h3>Game Wallet</h3>
                        <p>$200</p>
                    </div>
                </div>
                <p className='des'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, animi?</p>
                <button type='button' className='withdra-btn'>Withdraw to cash wallet</button>
            </div>
            <div className='card-wrapped theme-card'>
                <div className='card-content'>
                    <div className='icon'>
                        <img src={imageMap['cashicon.png']} alt='icon' />
                    </div>
                    <div className='content'>
                        <h3>Cash Wallet</h3>
                        <p>${parseFloat(data?.cashWallet).toFixed(2)}</p>
                    </div>
                </div>
                <p className='des'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, animi?</p>
                <button type='button' className='withdra-btn'>Transfer</button>
            </div>
            <div className='card-wrapped theme-card'>
                <div className='card-content'>
                    <div className='icon'>
                        <img src={imageMap['withdrawicon.png']} />
                    </div>
                    <div className='content'>
                        <h3>Withdraw Wallet</h3>
                        <p>$200</p>
                    </div>
                </div>
                <p className='des'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, animi?</p>
                <button type='button' className='withdra-btn'>View</button>
            </div>
        </div>
    )
}

export default WalletCards