
import { Accordion } from 'react-bootstrap';


const getFaq = [
    {
        question: 'Who we are?',
        answer: 'Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .Tortor porttitor tortor vitae commodo et. Et morbi at felis vestibulum pulvinar libero utne pulvinar libero'
    },
    {
        question: 'What’s our goal?',
        answer: 'Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .Tortor porttitor tortor vitae commodo et. Et morbi at felis vestibulum pulvinar libero utne pulvinar libero'
    },
    {
        question: 'Our vision',
        answer: 'Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .Tortor porttitor tortor vitae commodo et. Et morbi at felis vestibulum pulvinar libero utne pulvinar libero'
    },
]
const Faq = () => {



    return (
        <div className='faq'>
            <div className='item1'>
                <h2>Provided Quality
                    Services from
                    2025!</h2>
            </div>
            <div className='item2'>
                <Accordion>
                    {getFaq?.map((item, index) => (
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
            </div>
        </div>
    )
}

export default Faq