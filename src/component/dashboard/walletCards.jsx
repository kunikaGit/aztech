import React from 'react'
import imageMap from '../../utils/helpers'

const WalletCards = () => {
  return (
    <div className='wallet-cards'>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src='/images/logo.png' alt='icon'/>
            </div>
            <div className='content'>
                <h3>AZ Wallet</h3>
                <p>$200</p>
                <button type='button' className='withdra-btn'>Withdraw</button>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['gameicon.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>Game Wallet</h3>
                <p>$200</p>
                <button type='button' className='withdra-btn'>Withdraw</button>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['cashicon.png']} alt='icon'/>
            </div>
            <div className='content'>
                <h3>Cash Wallet</h3>
                <p>$200</p>
                <button type='button' className='withdra-btn'>Withdraw</button>
            </div>
        </div>
        <div className='card-wrapped theme-card'>
            <div className='icon'>
                <img src={imageMap['withdrawicon.png']}/>
            </div>
            <div className='content'>
                <h3>Withdraw Wallet</h3>
                <p>$200</p>
                <button type='button' className='withdra-btn'>Withdraw</button>
            </div>
        </div>
    </div>
  )
}

export default WalletCards