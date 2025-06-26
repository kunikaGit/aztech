import React, { useEffect, useState } from 'react'

const ScrTable = () => {
    const tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    const [type, setType] = useState('table');
    const setTypeMethod = (e, newType) => {
        e.preventDefault()
        setType(newType)
    }
    return (
        <div className='az-table'>
            <div className='table-header'>
                <div className='dash-heading'>
                    <h2>Your SCR</h2>
                    <p>xyz</p>
                </div>
                <ul className="tab-toggle">
                    <li>
                        <button className={type === 'table' ? 'active' : ''} onClick={(e) => setTypeMethod(e, 'table')}>
                            Table
                        </button>
                    </li>
                    <li>
                        <button className={type === 'table2' ? 'active' : ''} onClick={(e) => setTypeMethod(e, 'table2')}>
                            Table 2
                        </button>
                    </li>
                </ul>
            </div>
            {type === 'table' &&
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>S. No</th>
                                <th>Name</th>
                                <th>Referral Count</th>
                                <th>Reward Level</th>
                                <th>Reward Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index}>
                                    <td style={{width:'20%'}}>1</td>
                                    <td style={{width:'20%'}}>Harsh </td>
                                    <td style={{width:'20%'}}>2</td>
                                    <td style={{width:'20%'}}>2</td>
                                    <td style={{width:'20%'}}>2000</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
  {type === 'table2' &&
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>S. No</th>
                                <th>Levels</th>
                                <th>Referral Count</th>
                                <th>Reward percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index}>
                                    <td style={{width:'25%'}}>1</td>
                                    <td style={{width:'25%'}}>2</td>
                                    <td style={{width:'25%'}}>2</td>
                                    <td style={{width:'25%'}}>20%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default ScrTable
