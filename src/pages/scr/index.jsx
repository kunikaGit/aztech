import React, { useEffect, useState } from 'react'
import './scr.scss'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';

const ScrTable = () => {

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();
    const tableData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

    const referralRulesNote = ["The percentage distribution rule will apply on every plan.","If member's referral choose higher or lower package then percentage will calculate on lower package."]

    const [scrList, setScrList] = useState([])
    const [scrNotes, setScrNotes] = useState([])
    const [scrDetails, setScrDetails] = useState([])

    const [referralRules, setReferralRules] = useState([])



    const [type, setType] = useState('Sales Campaign Reward');
    const setTypeMethod = (e, newType) => {
        e.preventDefault()
        setType(newType)
    }

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.scrDetails, navigate, 'GET', {});
            let res2 = await fetchData(API_ENDPOINTS.referralRules, navigate, 'GET', {});

            if (res.success) {
                setScrList(res.data.scrList)
                setScrNotes(res.data.notes)
                setScrDetails(res.data.scrDetails)

            }
            if (res2.success) {
                setReferralRules(res2.data)
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
    return (
        <div className='az-table src-table'>
            <div className='table-header'>
                <div className='dash-heading'>
                    <h2>
                        {type}
                    </h2>
                    {/* <p>xyz</p> */}
                </div>
                <ul className="tab-toggle">
                    <li>
                        <button className={type === 'Sales Campaign Reward' ? 'active' : ''} onClick={(e) => setTypeMethod(e, 'Sales Campaign Reward')}>
                            Sales Campaign Reward
                        </button>
                    </li>
                    <li>
                        <button className={type === 'Referral Rules' ? 'active' : ''} onClick={(e) => setTypeMethod(e, 'Referral Rules')}>
                            Referral Rules
                        </button>
                    </li>
                </ul>
            </div>
            {type === 'Sales Campaign Reward' && (
                <>
                    {scrList.length > 0 ? (
                        <div className='basic-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S. No</th>
                                        <th>Name</th>
                                        <th>Total Sales Count</th>
                                        <th>Sales Amount ($)</th>
                                        <th>Reward Amount ($)</th>
                                        <th>Reward Percentage (%)</th>
                                        <th>Rank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scrList.map((item, index) => (
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td >{item.name ?? "player"}</td>
                                            <td >{item.total_sales_unit}</td>
                                            <td >{parseFloat(item.total_sales_amount).toFixed(2)}</td>
                                            <td >{parseFloat(item.reward_amount).toFixed(2)}</td>
                                            <td >{parseFloat(item.reward_percentage).toFixed(0)}</td>

                                            <td >{item.rank_name}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No Active Reward Campaign</div>
                    )}

                    {/* Note section */}
                    <div className=''>
                        <p><b>Note:</b></p>
                        <ul>
                            {scrNotes.map((note, index) => (
                                <li key={`note-${index}`}>{note}</li>
                            ))}

                            {scrDetails.length > 0 && (
                                <>
                                    <li key="detail-1">
                                        {scrDetails[0].heading} starts on {formatDateTime(scrDetails[0].start)} and ends on {formatDateTime(scrDetails[0].end)}
                                    </li>
                                    <li key="detail-2">
                                        Total Reward will be of ${parseFloat(scrDetails[0].reward).toFixed(2)}
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                </>
            )}

            {type === 'Referral Rules' &&
                <>
                    {referralRules.length > 0 ? (
                        <div className='basic-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S. No</th>
                                        <th>Levels</th>
                                        <th>Direct Referral Count Required</th>
                                        <th>Description</th>
                                        <th>Percentage (%)</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {referralRules.map((item, index) => (
                                        <tr key={index}>
                                            <td >{index + 1}</td>
                                            <td >{item.name}</td>
                                            <td >{item.directs}</td>
                                            <td >{item.description}</td>
                                            <td >{parseFloat(item.percentage).toFixed(0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )
                        : (
                            <div>No Active Reward Campaign</div>
                        )}

                    <p><b>Note : </b>
                           <ul>
                            {referralRulesNote.map((note, index) => (
                                <li key={`note-${index}`}>{note}</li>
                            ))}
                            </ul>
                    </p>
                </>

            }
        </div>
    )
}

export default ScrTable
