import React, { useState, useEffect } from 'react'
import GameEmbed from "./games"
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
const Games = () => {
    const { fetchData } = useApiRequest();
    const navigate = useNavigate();
    const [list, setList] = useState([
        {
            title: "Car Simulator",
            link: "https://html5.gamemonetize.co/h31mj5h9t2r0imhvrmwf3xelw5nw2vjf/"
        },
        {
            title: "Zombie Shooter",
            link: "https://html5.gamemonetize.co/4fhv9bnnvkkv8xi4k1a5hl5res510tw5/"
        },

                {
            title: "Car Simulator",
            link: "https://html5.gamemonetize.co/0bjxllp6iiy7ygc1qgwwt5lnsnr741ia/"
        },
        {
            title: "Zombie Shooter",
            link: "https://html5.gamemonetize.co/5gv5nhrtgk7s57iddr7kxnxneuxugiya/"
        },

                {
            title: "Car Simulator",
            link: "https://html5.gamemonetize.co/wp9o3vgbgwsitkvnnit9emgdmxecn3jw/"
        },
        {
            title: "Zombie Shooter",
            link: "https://html5.gamemonetize.co/0fgyb9jvnyq1g35j2sz3aehyjabxvy2e/"
        },

        
    ])

    useEffect(() => {
        // callApi()
    }, []);

    const callApi = async () => {
        try {
            let res = await fetchData(API_ENDPOINTS.products, navigate, 'GET', {});

            if (res.success) {
                setList(res.data)

            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='dahboard-wrapped'>
            
            <div className='welcome-wrapped'>
                <div className='flex-container'>

                    <div className='blue-card'>
                        <div className='content'>
                            <h3>🏹 Play free games under az community</h3>
                        </div>
                        <div className='content-cards'>
                            <div className='d-flex gap-2'>
                                {list.length > 0 &&
                                    list.map((item) => (<div className='border-card'>
                                        <GameEmbed src={item.link} />
                                           <p>{item.title}</p>
                                    </div>))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Games