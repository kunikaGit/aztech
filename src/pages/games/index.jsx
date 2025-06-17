import React, { useState, useEffect } from 'react'
import GameEmbed from "./games"
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import './games.scss';
import AZProgress from './azprogres';
import { useSelector } from "react-redux";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Games = () => {
          const { auth_token } = useSelector((state) => state.auth);
    
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

    const handleParticipate=(e)=>{
        e.preventDefault();
        let plan={name:"Game Plan",description:"The game plan will give 2X of your participation amount.",id:4,amount:25}
if(auth_token){
        navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan } });
        return
        }
                navigate(`${baseUrl}login`);
    }

    return (
        <div className='games-wrapped'>
            <video autoPlay muted loop playsInline className='background-video'>
                <source src={`https://az-file-uploads.s3.eu-west-1.amazonaws.com/game-video.mp4`} type="video/mp4" />
            </video>

            {/* <AZProgress progress={100} /> */}
            {/* <div className='blue-card'>
                <div className='content'>
                    <h3> Play free games under az community</h3>
                    <p>Enjoy a variety of engaging and fun games, absolutely free—exclusively for our community members!</p>
                </div>

                <div className='content-cards'>
                    <button onClick={(e)=>{handleParticipate(e)}}>Participate Now</button>
                </div>
                <div className='content-cards'>
                    {list.length > 0 &&
                        list.map((item) => (<div className='border-card'>
                            <GameEmbed src={item.link} />
                            <p>{item.title}</p>
                        </div>))}
                </div>
            </div> */}


        </div>
    )
}

export default Games