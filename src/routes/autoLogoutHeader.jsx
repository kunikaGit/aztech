import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../src/redux/slice/authSlice.js';
import { autoLogout } from "../utils/autoLogout.js";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AutoLogoutHandler = () => {
  const navigate = useNavigate();
  const { auth_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth_token) {
      autoLogout(auth_token, () => {
        dispatch(logout());
        navigate(`${baseUrl}login`);
      });
    }
  }, [auth_token, dispatch, navigate]);

  return null;
};

export default AutoLogoutHandler;
