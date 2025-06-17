import React, { useState } from 'react';

const DashbordtableTwo = ({data}) => {

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
            <table>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>User Name</th>
                        <th>Level</th>
                        <th>Referred By</th>
                        <th>Amount ($)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstRow + index + 1}</td>
                            <td>{item.name} {item.surname}</td>
                            <td>{item.level_id}</td>
                            <td>{item.sponsor_name} {item.sponsor_surname}</td>
                            <td>{parseFloat(item.amount).toFixed(2)}</td>
                            <td>{formatDateTime(item.datetime)}</td> 
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

export default DashbordtableTwo;
