import React, { useEffect, useState, useRef, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import './header.scss'
import { UserIcon } from "../../icons/icons";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import imageMap from "../../utils/helpers";
import Drawer from 'react-modern-drawer'
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import debounce from 'lodash.debounce';
import { ThemeContext } from "../../context/themeContext";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Header = () => {
    const { auth_token } = useSelector((state) => state.auth);
    const { fetchData } = useApiRequest();

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ products: [], categories: [] });
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Debounced API Call
    const fetchSearchResults = debounce(async (q) => {
        if (!q.trim()) {
            setResults({ products: [], categories: [] });
            return;
        }

        try {
            let res = await fetchData(`${API_ENDPOINTS.searchHome}?search=${q}`, navigate, 'GET', {});
            setResults(res.data);

            setShowDropdown(true);
        } catch (err) {
            console.error('Search error:', err);
        }
    }, 500);

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSearchResults(value);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e, path) => {
        e.preventDefault()
        navigate(`${baseUrl}${path}`)
    }
  const { darkMode, toggleTheme } = useContext(ThemeContext);



    return (
        <header>
            <div className="header-wrapped">
                <div className="logo" onClick={() => navigate(`${baseUrl}`)}>
                    <img src="/test/images/logo-1.png" alt="logo" />
                    <h2>AZTECH</h2>
                </div>
                <div className="web-search">
                    <div className='searchbox' ref={dropdownRef}>
                        <div className='search-icon'><Search color="#ccc" /></div>
                        <input
                            type='text'
                            placeholder='Search everything'
                            value={query}
                            onChange={handleChange}
                            onFocus={() => query && setShowDropdown(true)}
                        />

                        {/* 🔽 Dropdown Results */}
                        {showDropdown && (
                            <div className="search-dropdown">
                                {/* Products Section */}
                                <div className="section-block">
                                    <h5>Products</h5>
                                    <div className="scroll-list">
                                        {results?.products.length > 0 ? (
                                            <ul>
                                                {results?.products.map((product) => (
                                                    <li key={product.id} title={product.name} onClick={e => { handleSearch(e, `detail?prd=${product.id}`) }}>{product.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-result">No Product found</p>
                                        )}
                                    </div>
                                </div>

                                {/* Services Section */}
                                <div className="section-block">
                                    <h5>Services</h5>
                                    <div className="scroll-list">
                                        {results?.categories.length > 0 ? (
                                            <ul>
                                                {results?.categories.map((cat) => (
                                                    <li key={cat.id} title={cat.name} onClick={e => { handleSearch(e, `products?category=${cat.id}&${cat.name}`) }}>{cat.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-result">No Services found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to={`${baseUrl}`} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                        <li><Link to={`${baseUrl}products`} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                        <li><Link to={`${baseUrl}services`} className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                    </ul>
                    <button type="button" className="orange-button" onClick={() => navigate(auth_token ? `${baseUrl}myaccount/dashboard` : `${baseUrl}login`)}>
                        {auth_token ? <span>My Account <UserIcon /></span> : `Login`}
                    </button>
                    {/* <button className="button" onClick={toggleTheme}>
                        Switch to {darkMode ? "Light" : "Dark"} Theme
                    </button> */}
                </div>
                <button type="button" className="menu-toggle bg-transparent border-0" onClick={toggleDrawer}>
                    <img src={imageMap['menu.svg']} alt="img" />
                </button>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='mobile-menu'
                style={{ width: "200px" }}>

                <ul>
                    <li>
                        <div className="logo" onClick={() => navigate(`${baseUrl}`)}>
                            <img src="/test/images/logo-1.png" alt="logo" />
                            <h2>AZTECH</h2>
                        </div>
                    </li>
                    <li>
                        <div className='searchbox' ref={dropdownRef}>
                            <div className='search-icon'><Search color="#ccc" /></div>
                            <input
                                type='text'
                                placeholder='Search everything'
                                value={query}
                                onChange={handleChange}
                                onFocus={() => query && setShowDropdown(true)}
                            />

                            {/* 🔽 Dropdown Results */}
                            {showDropdown && (
                                <div className="search-dropdown">
                                    {/* Products Section */}
                                    <div className="section-block">
                                        <h5>Products</h5>
                                        <div className="scroll-list">
                                            {results?.products.length > 0 ? (
                                                <ul>
                                                    {results?.products.map((product) => (
                                                        <li key={product.id} title={product.name} onClick={e => { handleSearch(e, `detail?prd=${product.id}`) }}>{product.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="no-result">No Product found</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Services Section */}
                                    <div className="section-block">
                                        <h5>Services</h5>
                                        <div className="scroll-list">
                                            {results?.categories.length > 0 ? (
                                                <ul>
                                                    {results?.categories.map((cat) => (
                                                        <li key={cat.id} title={cat.name} onClick={e => { handleSearch(e, `products?category=${cat.id}&${cat.name}`) }}>{cat.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="no-result">No Services found</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </li>
                    <li><Link to={`${baseUrl}`} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to={`${baseUrl}products`} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                    <li><Link to={`${baseUrl}services`} className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                    <li>
                        <button type="button" className="bg-transparent border-0" onClick={() => navigate(auth_token ? `${baseUrl}myaccount/dashboard` : `${baseUrl}login`)}>
                            {auth_token ? <span>My Account </span> : `Login`}
                        </button>
                    </li>
                </ul>

            </Drawer>
        </header>
    )
}
export default Header;