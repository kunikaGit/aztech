import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./faq.scss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Faq = React.memo(() => {
    const [activeKey, setActiveKey] = useState([]);

    const getFaq = {
        faqs: [
            {
                question: "What is your return policy?",
                answer:
                    "<p>We accept returns within 30 days of purchase. Make sure the item is in original condition and packaging.</p>",
            },
            {
                question: "Do you offer international shipping?",
                answer:
                    "<p>Yes, we ship to over 50 countries. Shipping fees and delivery times may vary depending on the location.</p>",
            },
            {
                question: "How can I track my order?",
                answer:
                    "<p>Once your order is shipped, you will receive an email with the tracking number and link.</p>",
            },
            {
                question: "Can I change or cancel my order?",
                answer:
                    "<p>You can change or cancel your order within 2 hours of placing it by contacting our support team.</p>",
            },
        ],
    };

    return (
        <div className="question">
            <div className="transparent-card">
                <div className="main-heading">
                <h2> Frequently Asked Questions </h2>
                </div>
                <Accordion>
                    {getFaq?.faqs?.map((item, index) => (
                        <Accordion.Item
                            eventKey={`${index}`}
                            key={index}
                        >
                            <Accordion.Header>
                                {item.question}
                                <div className="icons">
                                    {activeKey.includes(`${index}`) ? (
                                        <RemoveIcon />
                                    ) : (
                                        <AddIcon />
                                    )}
                                </div>
                            </Accordion.Header>

                            <Accordion.Body className="text_14">
                                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
});

export default Faq;
