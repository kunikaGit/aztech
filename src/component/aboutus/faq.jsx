
import { Accordion } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";


const Faq = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([])
    useEffect(() => {
        callApi()
    }, []);

    const { fetchData } = useApiRequest();

    const callApi = async () => {
        try {

            const faqRes = await fetchData(`${API_ENDPOINTS.faq}`, navigate, "GET", {});
            if (faqRes.success) {
                setList(faqRes.data)
            }

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='faq'>
            <div className='item1'>
                <h2>Provided Quality
                    Services from
                    2025!</h2>
            </div>
            {/* <div className='item2'>
                <Accordion>
                    {list?.map((item, index) => (
                        <Accordion.Item
                            eventKey={`${index}`}
                            key={index}
                            onClick={() => handleToggle(`${index}`)}
                        >
                            <Accordion.Header>
                                {item.question}
                            </Accordion.Header>

                            <Accordion.Body className="text_14">
                                {item.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div> */}
        </div>
    )
}

export default Faq