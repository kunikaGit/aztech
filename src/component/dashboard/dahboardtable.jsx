import React from 'react'
import imageMap from '../../utils/helpers'
import { Delete, DeleteOutline, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { EditIcon } from '../../icons/icons'

const Dahboardtable = () => {
        const users = [
        { name: 'Brug Michael', email: 'app@dev.com', paid: '$ 2,000', date: '25 May 2025', validTill: '25 May 2026', status: 'Approved' },
        { name: 'John Doe', email: 'john@dev.com', paid: '$ 1,500', date: '15 Apr 2025', validTill: '15 Apr 2026', status: 'Pending' },
        { name: 'Jane Smith', email: 'jane@dev.com', paid: '$ 2,500', date: '10 Jun 2025', validTill: '10 Jun 2026', status: 'Approved' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' }
    ];
        const colors = ['border-start-danger', 'border-start-warning', 'border-start-pink'];

    return (
        <div className='az-table'>
            <div className='table-header'>
                <div className='dash-heading'>
                    <h2>Total Users</h2>
                    <p>More than 550+ new members</p>
                </div>
                <ul>
                    <li><Link to='/#' className='active'>Month</Link></li>
                    <li><Link to='/#'>Week</Link></li>
                    <li><Link to='/#'>Day</Link></li>
                </ul>
            </div>
            <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Paid</th>
                        <th>Date</th>
                        <th>Valid Till</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {users.map((user, index) => (
                        <tr key={index} className={`custom-row borders-${index % 3}`} >
                            <td>
                                <div className='profile d-flex align-items-center gap-2'>
                                    <div className='image'><img src={imageMap['girl-profile.png']} alt='Profile' /></div>
                                    <div className='info'>
                                        <h3>{user.name}</h3>
                                        <p><b>Email:</b> {user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{user.paid}</td>
                            <td>{user.date}</td>
                            <td>{user.validTill}</td>
                            <td>
                                <div className='status'>{user.status}</div>
                            </td>
                            <td>
                                <div className='action d-flex gap-2'>
                                    <button className='bg-transparent border-0'><EditIcon/></button>
                                    <button className='bg-transparent border-0'><DeleteOutline/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Dahboardtable