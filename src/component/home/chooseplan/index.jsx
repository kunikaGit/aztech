import React from 'react'
import './chooseplan.scss'
const Chooseplan = () => {
    return (
        <section className='choose-plan'>
            <div className='main-heading'>
                <h2>
                    Choose a plan that fits<br /> your needs
                </h2>
                <p>
                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra, pretium tincidunt lacus. Pellentesque non elit. Fusce sed justo eu urna porta tincidunt. Integer sagittis. Vivamus a mauris eget arcu gravida tristique.
                </p>
            </div>
            <div className='plan-cards'>
                <div className='cards'>
                    <h3 className='title'>Basic Plan  </h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div>
                <div className='cards active'>
                    <h3 className='title'>Basic Plan  </h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div>
                <div className='cards'>
                    <h3 className='title'>Basic Plan  </h3>
                    <p className='des'>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris, turpis et commodo pharetra.</p>
                    <hr />
                    <div className='price'>
                        <h2>$100</h2>
                        <span>per month / member</span>
                    </div>
                    <button type='button' className='plan-btn'>Get Started</button>
                    <div className='plan-benifits'>
                        <ul>
                            <li>35 curabitur augue</li>
                            <li>Dapibus quis</li>
                            <li>Vivamus a mauris eget</li> 
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Chooseplan