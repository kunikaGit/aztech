import React, { useState } from 'react';

const Dashbordtable = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

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
        <div className='dashboard-table theme-card'>
                            <h2 className="card-heading" style={{ color: 'var(--text_black)' }}>
                     Referral List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>User Name</th>
                        <th>Level</th>
                        <th>Referred By</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstRow + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.level}</td>
                            <td>{item.referred_by}</td>
                            <td>{formatDateTime(item.created_at)}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={handlePrev} disabled={currentPage === 1} className='withdra-btn'>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages} className='withdra-btn'>Next</button>
            </div>
        </div>
    );
};

export default Dashbordtable;
