import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import imageMap from '../../utils/helpers';
import { EditIcon } from '../../icons/icons';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const Transactions = () => {
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const [list, setList] = useState([])
    useEffect(() => {
        callApi()
    }, []);

    const { fetchData } = useApiRequest();

    const callApi = async () => {
        try {

            const transactionsRes = await fetchData(`${API_ENDPOINTS.transactions}`, navigate, "GET", {});
            if (transactionsRes.success) {
                setList(transactionsRes.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short", // or "2-digit"
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // set to false for 24-hour format
        });
    };

    const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleTransactions = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='az-table'>
            <div className='table-header'>
                <div className='dash-heading'>
                    <h2>Total Transactions</h2>
                    <p>{list?.length} Transactions</p>
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
                            <th>Product</th>
                            <th>Date and Time</th>
                            <th>Paid Amount</th>
                            <th>Paid via</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleTransactions.map((transaction, index) => (
                            <tr key={index} className={`custom-row borders-${index % 3}`}>
                                <td>
                                    <div className='profile d-flex align-items-center gap-2'>
                                        <div className='image'><img src={transaction.type_icon} alt='Profile' /></div>
                                        <div className='info'>
                                            <h3>{transaction.type_name}</h3>
                                            <p>{transaction.type_description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='status'><b>{transaction.plan_name}</b></div>
                                    <div className='status'>{transaction.plan_description}</div>
                                </td>
                                <td>
                                    <div className='status'><b>Created On: </b>{formatDateTime(transaction.created_at)}</div>
                                    <div className='status'><b>Updated At: </b>{formatDateTime(transaction.updated_at)}</div>
                                </td>
                                <td><b>{parseFloat(transaction.amount).toFixed(2)}</b> {transaction.currency_type}</td>
                                <td>
                                    <div className='status'><b>{transaction.payment_name}</b></div>
                                    <div className='status'>{transaction.pament_description}</div>
                                    <div className='status'><span>Fees (if any): {transaction.payment_fees}</span>%</div>
                                </td>
                                <td>
                                    <div className='status'><b>{transaction.status_name}</b></div>
                                    <div className='status'>{transaction.status_description}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ⬅ Prev
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next ➡
                </button>
            </div>
        </div>
    )
}

export default Transactions
