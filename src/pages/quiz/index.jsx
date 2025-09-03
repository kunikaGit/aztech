import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./quiz.scss";
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Quiz = React.memo(() => {
    const [quiz, setQuiz] = useState([]);

    const [quizDetails, setQuizDetails] = useState({set_name:"",created_at:"",duration:"",questions_length:""});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionsAndoptions, setQuestionsAndoptions] = useState([]);
    const [yourAnswers, setYourAnswers] = useState([]);
    const [grade, setGrade] = useState(null);
    // Share results state
    // const [emails, setEmails] = useState([""]);
    // const [shareLoading, setShareLoading] = useState(false);

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const session_id = queryParams.get('session_id');

    
    // here I want a to call use effect to check the end_at and if the time of end_at come call handleSubmit()

// useEffect(() => {
//     const checkEndTime = () => {
//         const createdAt = new Date(quizDetails.created_at); // the created_at will come here as Wed Aug 13 2025 23:07:50 GMT+0530 (India Standard Time) and I want to add duration in that and duration will come in minutes as 20
//         const duration = quizDetails.duration || 0;
//         const endTime = new Date(createdAt.getTime() + duration * 60000);//
//         const currentTime = new Date();
//         console.log("End Time:", endTime, "Current Time:", currentTime);
//         // I am getting End Time: Invalid Date Current Time: Wed Aug 13 2025 23:15:01 GMT+0530 (India Standard Time)
//         console.log("Created At:", createdAt);
//         console.log("Duration:", duration);

//         // if (endTime <= currentTime && !isSubmitted) {
//         //     handleSubmit();
//         // }
//     };

//     // run immediately on mount
//     checkEndTime();

//     // then run every minute
//     const intervalId = setInterval(checkEndTime, 60000); // 60 seconds
//     return () => clearInterval(intervalId);

// }, []);


    useEffect(() => {
        callApi();
    }, [currentQuestionIndex]);

    const callApi = async () => {
        try {
            if(!isSubmitted){
                const res = await fetchData(`${API_ENDPOINTS.livequiz}?session_id=${session_id}&question_index=${currentQuestionIndex}`, navigate, 'GET', {});
                if (res.success) {
                    setQuizDetails(res.data)
                    setQuiz(res.data.question_and_options)
                }else{
                    errorMsg(res.message);
                    navigate(`${baseUrl}myaccount/dashboard`);
                }
            }

            
           
        } catch (error) {
            console.log("API Error, using example data:", error);
        }
    };

    const handleAnswerSelect = (answerIndex) => {
        if (!isSubmitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [currentQuestionIndex]: answerIndex
            });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizDetails.questions_length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {

            const res = await fetchData(`${API_ENDPOINTS.submitQuiz}?session_id=${session_id}`, navigate, 'POST', {answers_object:selectedAnswers});
        

            if (res.success) {
                const correctAnswersArray = res.data.correctAnswers || [];
                setCorrectAnswers(correctAnswersArray);
        
                setScore(res.data.correctCount);
                setQuestionsAndoptions(res.data.questions);
                setYourAnswers(res.data.yourAnswers);
                setGrade(res.data.grade);
                setIsSubmitted(true);
            } else {
                console.log("Failed to submit quiz:", res.message);
            }
        } catch (error) {
            console.log("Error submitting quiz:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackToDashboard = () => {
        navigate(`${baseUrl}myaccount/dashboard`);
    };

    const currentQuestion = quiz;
    const progress = ((currentQuestionIndex + 1) / quizDetails.questions_length) * 100;

    // Add email input
    // const handleEmailChange = (idx, value) => {
    //     const newEmails = [...emails];
    //     newEmails[idx] = value;
    //     setEmails(newEmails);
    // };

    // const handleAddEmail = () => {
    //     if (emails.length < 2) setEmails([...emails, ""]);
    // };

    // const handleRemoveEmail = (idx) => {
    //     if (emails.length > 1) setEmails(emails.filter((_, i) => i !== idx));
    // };

    // const handleShareResults = async () => {
    //     // Validate emails
    //     const validEmails = emails.filter(e => e.trim() !== "");
    //     if (validEmails.length === 0) {
    //         errorMsg("Please enter at least one email address.");
    //         return;
    //     }
    //     for (let email of validEmails) {
    //         if (!/^\S+@\S+\.\S+$/.test(email)) {
    //             errorMsg("Please enter valid email addresses.");
    //             return;
    //         }
    //     }
    //     setShareLoading(true);
    //     try {
    //        successMsg("Results shared successfully");
    //     } catch {
    //         errorMsg("Failed to share results.");
    //     } finally {
    //         setShareLoading(false);
    //     }
    // };

    if (quiz.length === 0) {
        return (
            <div className="quiz-section">
                <div className="loading">Loading quiz...</div>
            </div>
        );
    }

    return (
        <div className="quiz-section">
           

            <div className="quiz-container">
                <div className="quiz-header">
                    <h1>{quizDetails.set_name}</h1>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="question-counter">
                        Question {currentQuestionIndex + 1} of {quizDetails.questions_length}
                    </p>
                </div>

                {!isSubmitted ? (
                    <div className="question-section">
                        <h2 className="question-text">{currentQuestion?.question}</h2>
                        
                        <div className="options-container">
                            {currentQuestion?.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${
                                        selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''
                                    }`}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="navigation-buttons">
                            <button
                                className="nav-btn prev-btn"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            
                            {currentQuestionIndex === quizDetails.questions_length - 1 ? (
                                <button
                                    className="nav-btn submit-btn"
                                    onClick={handleSubmit}
                                    disabled={Object.keys(selectedAnswers).length < quizDetails.questions_length || isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                                </button>
                            ) : (
                                <button
                                    className="nav-btn next-btn"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="results-section">
                        <h2>Quiz Results</h2>
                        <div className="score-display">

                            <div className="grading-bar">
                            <div className="grade-segment grade-d">D</div>
                                <div className="grade-segment grade-c">C</div>
                                <div className="grade-segment grade-b">B</div>
                                <div className="grade-segment grade-a">A</div>
                              
                            </div>

                            {grade && (
                                <div className={`grade-letter grade-${grade.grade.toLowerCase()}`}>
                                    {grade.grade}
                                </div>
                            )}
                            <h3>Your Score: {score} out of {questionsAndoptions?.length || 0}</h3>

                            

                        </div>
                        
                        <div className="answers-review">
                            <h3>Review Your Answers:</h3>
                            {questionsAndoptions?.map((question, index) => {
                                const correctAnswer = correctAnswers[index];
                                const isCorrect = yourAnswers[index] === correctAnswer;
                                
                                return (
                                    <div key={index} className="answer-item">
                                        <p className="question-review">
                                            <strong>Q{index + 1}:</strong> {question}
                                        </p>
                                        <p className={`answer-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            Your Answer: {yourAnswers[index]}
                                            {!isCorrect && correctAnswer !== undefined && (
                                                <span className="correct-answer">
                                                    (Correct: {correctAnswer})
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>


                        {/* <div className="share-results">
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
                                    {shareLoading ? 'Sharing...' : 'Share'}
                                </button>
                            </div>
                        </div> */}
                        
                        <button
                            className="nav-btn"
                            onClick={handleBackToDashboard}
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Quiz;
