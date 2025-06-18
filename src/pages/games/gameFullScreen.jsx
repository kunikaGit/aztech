import React, { useState, useEffect } from 'react'
import GameEmbed from "./games"
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import './games.scss';
import AZProgress from './azprogres';
import { useSelector } from "react-redux";

const baseUrl = import.meta.env.VITE_BASE_URL;

const GameFullScreen = ({link}) => {
    const { auth_token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if(!auth_token){
navigate(`${baseUrl}`)
    }

        if(!link){
navigate(`${baseUrl}`)
    }
   

    return (
        <div className='games-wrapped'>
            <iframe
        src={link}
        width="200"
        height="200"
        scrolling="none"
        frameBorder="0"
        allowFullScreen
        title="Game"
        style={{ border: 'none', borderRadius: '10px' }}
      ></iframe>

        </div>
    )
}

export default GameFullScreen