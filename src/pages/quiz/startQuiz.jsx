import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./quiz.scss";
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
const baseUrl = import.meta.env.VITE_BASE_URL;

const QuizStart = () => {

    // Share results state
    const [emails, setEmails] = useState([""]);
    const [shareLoading, setShareLoading] = useState(false);

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ids = queryParams.get('id');

    useEffect(() => {
        if (!ids) {
            navigate(`${baseUrl}myaccount/dashboard`);
        }
    },[])

    const handleBackToDashboard = () => {
        navigate(`${baseUrl}myaccount/dashboard`);
    };



    // Add email input
    const handleEmailChange = (idx, value) => {
        const newEmails = [...emails];
        newEmails[idx] = value;
        setEmails(newEmails);
    };

    const handleAddEmail = () => {
        if (emails.length < 2) setEmails([...emails, ""]);
    };

    const handleRemoveEmail = (idx) => {
        if (emails.length > 1) setEmails(emails.filter((_, i) => i !== idx));
    };

    const handleShareResults = async () => {
        // Validate emails
        const validEmails = emails.filter(e => e.trim() !== "");
        if (validEmails.length === 0) {
            errorMsg("Please enter at least one email address.");
            return;
        }
        for (let email of validEmails) {
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                errorMsg("Please enter valid email addresses.");
                return;
            }
        }
        setShareLoading(true);
        let res = await fetchData(`${API_ENDPOINTS.openProduct}?id=${ids}`, navigate, 'POST', { email: validEmails });
        if (res.success) {
            window.open(res.data[0].link, '_blank');
            return;
        }else{
            errorMsg(res.message);
        }
        try {
            successMsg("Results shared successfully");
        } catch {
            errorMsg("Failed to share results.");
        } finally {
            setShareLoading(false);
        }
    };



    return (
        <div className="quiz-section">


            <div className="quiz-container">

                <p style={{ textAlign: "center" }}>To start the quiz , please fill the emails where we can send the result</p>

                <div className="results-section">

                    <div className="share-results">
                        <h3>Share Results</h3>
                        {emails.map((email, idx) => (
                            <div className="email-input-row" key={idx}>
                                <input
                                    type="email"
                                    placeholder="Enter email id"
                                    value={email}
                                    onChange={e => handleEmailChange(idx, e.target.value)}
                                    maxLength={100}
                                />
                                {emails.length > 1 && (
                                    <button type="button" className="remove-email-btn" onClick={() => handleRemoveEmail(idx)} title="Remove">
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="share-actions">
                            <button
                                type="button"
                                className="add-email-btn"
                                onClick={handleAddEmail}
                                disabled={emails.length >= 2}
                            >
                                + Add another
                            </button>
                            <button
                                type="button"
                                className="share-btn"
                                onClick={handleShareResults}
                                disabled={shareLoading}
                            >
                                {shareLoading ? 'Starting...' : 'Start'}
                            </button>
                        </div>
                    </div>

                    <button
                        className="nav-btn"
                        onClick={handleBackToDashboard}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizStart;
