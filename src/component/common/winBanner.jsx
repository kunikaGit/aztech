import React, { useState } from 'react'
import '../../assets/scss/winbanner.scss'
import { Cross } from '../../icons/icons'
const WinBanner = () => {
  const [showBanner,setShowBanner] = useState(true)

  const closeBanner = () =>{
    setShowBanner(false)
  }
  return (
    <>
    {showBanner &&
    <div className='win-banner'>
      <button type='button' className='cross' onClick={()=>closeBanner()}><Cross/></button>
      <div className='content'>
        <h2>Win a Free $100k Trading Challenge!</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo voluptatem eos provident nemo molestias voluptas a officia laborum suscipit asperiores! <b>$100k Giveaway</b></p>
      </div>
      <div className='buttons'>
        <button type='button' className='purple-btn'>Enter $100k Giveaway</button>
        <button type='button' className='grey-btn'>I am not Interested</button>
      </div>
    </div>
    }
    </>
  )
}

export default WinBanner