import React, { useState, useEffect } from 'react'
import imageMap from '../../utils/helpers'
import { DeleteOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { EditIcon } from '../../icons/icons'
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const Networks = () => {

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [list2, setList2] = useState([]);

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.referralList, navigate, 'GET', {});
            let res2 = await fetchData(API_ENDPOINTS.referralTree, navigate, 'GET', {});

            if (res.success) {
                setList(res.data)
            }
            if(res2.success){
                console.log(res2.data)
                setList2(res2.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const users = [
        { name: 'Brug Michael', email: 'app@dev.com', paid: '$ 2,000', date: '25 May 2025', validTill: '25 May 2026', status: 'Approved' },
        { name: 'John Doe', email: 'john@dev.com', paid: '$ 1,500', date: '15 Apr 2025', validTill: '15 Apr 2026', status: 'Pending' },
        { name: 'Jane Smith', email: 'jane@dev.com', paid: '$ 2,500', date: '10 Jun 2025', validTill: '10 Jun 2026', status: 'Approved' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' },
        { name: 'Alice Johnson', email: 'alice@dev.com', paid: '$ 1,200', date: '05 Jul 2025', validTill: '05 Jul 2026', status: 'Expired' },
    ];

    return (
        <div className='az-table'>
            <div className='table-header'>
                <div className='dash-heading'>
                    <h2>Your Network</h2>
                    <p>{list?.length} Networks</p>
                </div>
                {/* <ul>
                    <li><Link to='/#' className='active'>Month</Link></li>
                    <li><Link to='/#'>Week</Link></li>
                    <li><Link to='/#'>Day</Link></li>
                </ul> */}
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {/* <th>Name</th> */}
                            <th>Date</th>
                          
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((user, index) => (
                            <tr key={index} className={`custom-row borders-${index % 3}`} >
                                <td>
                                    <div className='profile d-flex align-items-center gap-2'>
                                        <div className='image'><img src={`https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png`} alt='Profile' /></div>
                                        <div className='info'>
                                            <h3>{user.name}</h3>
                                            <p>{user.surname}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.created_at}</td>
                                <td>
                                    <div className='status'>{user.status}</div>
                                </td>
                                {/* <td>
                                    <div className='action d-flex gap-2'>
                                        <button className='bg-transparent border-0'><EditIcon /></button>
                                        <button className='bg-transparent border-0'><DeleteOutline sx={{ color: red[500] }} /></button>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Networks