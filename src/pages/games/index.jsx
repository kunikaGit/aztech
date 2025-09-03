import React, { useState, useEffect } from 'react'
import GameEmbed from "./games"
import { useNavigate } from 'react-router-dom';
import useApiRequest from "../../hook/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import './games.scss';
import AZProgress from './azprogres';
import { useSelector } from "react-redux";
import Slider from 'react-slick';
import HollowCard from './HollowCard';
const baseUrl = import.meta.env.VITE_BASE_URL;
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Games = () => {
    const { auth_token, game_plan } = useSelector((state) => state.auth);

    const { fetchData } = useApiRequest();
    const navigate = useNavigate();

    const [gameDetails, setGameDetails] = useState(null);

    const [gameArray, setGameArray] = useState(["https://html5.gamemonetize.co/ghsqbsab3s37q5x2gk5k54w6shwl4i5f/", "https://html5.gamemonetize.co/8sttq4hfxsvoveqhy43cp39updyjcs48/", "https://html5.gamemonetize.co/6afbjlwlbhxw5d3diva2y8qcq12paknn/", "https://html5.gamemonetize.co/2phx77hb3rbyjwskesu03phcv7d8d8k4/", "https://html5.gamemonetize.co/mlj93g4er4ynh1smd4fm0c0ecbuygg68/", "https://html5.gamemonetize.co/if45nr0axy9o1wlasn2cwo0u04r1i59z/", "https://html5.gamemonetize.co/wtv21hm84crp7qcztjsvkl5tuxa1uwzk/", "https://html5.gamemonetize.co/r85hwpgbjc07uasm61ypwqqd6fgq40fr/", "https://html5.gamemonetize.co/747rmx6lgnjk5zl63keg5fz24wz5ge4v/", "https://html5.gamemonetize.co/i0otyw47jtfd4u20u8cwxtuzq8vxjlia/", "https://html5.gamemonetize.co/kzgs6w7m9a6oipotviw3o2mclc0b0zxk/", "https://html5.gamemonetize.co/xeb0zdlwn0qpzwl2e9wbwqajdy15ho23/", "https://html5.gamemonetize.co/gisd00oq9kft4npyvub4v2ibqrp3x98j/", "https://html5.gamemonetize.co/1q6swhq95j9i4olu3luuea72ocg1ornl/", "https://html5.gamemonetize.co/h8381esputdzb7w30swugmh9aufj4lrz/", "https://html5.gamemonetize.co/30dx8hml6r4cfbx0bj341mfnaqnkkrrm/", "https://html5.gamemonetize.co/6jn2zmjsqtxy1e6dwju2346nhggg3h3h/", "https://html5.gamemonetize.co/2fv0ll1x7y0tpbax9wv27skdijx8nxs1/", "https://html5.gamemonetize.co/h31mj5h9t2r0imhvrmwf3xelw5nw2vjf/", "https://html5.gamemonetize.co/4fhv9bnnvkkv8xi4k1a5hl5res510tw5/", "https://html5.gamemonetize.co/0bjxllp6iiy7ygc1qgwwt5lnsnr741ia/", "https://html5.gamemonetize.co/5gv5nhrtgk7s57iddr7kxnxneuxugiya/", "https://html5.gamemonetize.co/wp9o3vgbgwsitkvnnit9emgdmxecn3jw/", "https://html5.gamemonetize.co/0fgyb9jvnyq1g35j2sz3aehyjabxvy2e/"])

    const [gameArray2, setGameArray2] = useState([
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Dazzling+Divas+Makeup.png",
            link: "https://html5.gamemonetize.co/tblpkzk6l9k17s7rd43dc36zgz7ht88m/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Number%20Master%20Run%20And%20Merge.png",
            link: "https://html5.gamemonetize.co/5vt2xenmk9j49nba4kj6ymf4txnsmxlg/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Dress%20Up%20Game%20Princess%20Doll%202.png",
            link: "https://html5.gamemonetize.co/e60tb5zjmg6wfnkaddqv8bji60h8gx50/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Snowboard%20Game%20Party.png",
            link: "https://html5.gamemonetize.co/jp22mjv7m4b283qu7mhzsy599omxbi13/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Rapid+Apex+Rush.png",
            link: "https://html5.gamemonetize.co/63y8xp0cin5ls6ujx19662u0tuwvaz5v/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Repo%20androids%20for%20two.png",
            link: "https://html5.gamemonetize.co/0khp6yxfvfzeyxc65krkzfio6l9ujwpw/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Tung%20Sahur%20Italien%20Brainrot.png",
            link: "https://html5.gamemonetize.co/hppar6ddbbis1rd0hadzb73c0i6yjat0/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Word%20Blocks.png",
            link: "https://html5.gamemonetize.co/xp0vfhnwdhhniu52fyb1vu3lezbl85vm/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Celebrity%20BarbieCore%20Aesthetic%20Look.png",
            link: "https://html5.gamemonetize.co/upf7jow3akcirma7ysj1ku0j2m0vn4fi/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/tic%20tac%20toe%20html.png",
            link: "https://html5.gamemonetize.co/dzq93k974fw1sl2hwrkis1r5jc47ohou/"
        },
        {
            image: "https://az-file-uploads.s3.eu-west-1.amazonaws.com/Fin+Flinger.png",
            link: "https://html5.gamemonetize.co/j4j0ucs81t2ds1mps9mi72i6649g50s2/"
        }
    ]);

        const [gameArray3, setGameArray3] = useState([{link:"https://html5.gamemonetize.co/ghsqbsab3s37q5x2gk5k54w6shwl4i5f/",name:"Mr Autofire"}, {link:"https://html5.gamemonetize.co/8sttq4hfxsvoveqhy43cp39updyjcs48/",name:"Stop Zombies"},{ link:"https://html5.gamemonetize.co/6afbjlwlbhxw5d3diva2y8qcq12paknn/",name:"Tile Stamper"}, {link:"https://html5.gamemonetize.co/2phx77hb3rbyjwskesu03phcv7d8d8k4/",name:"Save Earth"}, {link:"https://html5.gamemonetize.co/mlj93g4er4ynh1smd4fm0c0ecbuygg68/",name:"Trick Arrow"}, {link:"https://html5.gamemonetize.co/if45nr0axy9o1wlasn2cwo0u04r1i59z/",name:"Bob the builder coloring"}, {link:"https://html5.gamemonetize.co/wtv21hm84crp7qcztjsvkl5tuxa1uwzk/",name:"Tung Tung Sahur Supermarket"},{ link:"https://html5.gamemonetize.co/r85hwpgbjc07uasm61ypwqqd6fgq40fr/",name:"Data Breach"}, {link:"https://html5.gamemonetize.co/747rmx6lgnjk5zl63keg5fz24wz5ge4v/",name:"Monster Rush"}, {link:"https://html5.gamemonetize.co/i0otyw47jtfd4u20u8cwxtuzq8vxjlia/",name:"Bottle Flip"}, {link:"https://html5.gamemonetize.co/kzgs6w7m9a6oipotviw3o2mclc0b0zxk/",name:"Chicken Dash"},{ link:"https://html5.gamemonetize.co/xeb0zdlwn0qpzwl2e9wbwqajdy15ho23/",name:"Block Breaker"}, {link:"https://html5.gamemonetize.co/gisd00oq9kft4npyvub4v2ibqrp3x98j/",name:"Drive Mad 2"}, {link:"https://html5.gamemonetize.co/1q6swhq95j9i4olu3luuea72ocg1ornl/",name:"Spirit Boy"}, {link:"https://html5.gamemonetize.co/h8381esputdzb7w30swugmh9aufj4lrz/",name:"Tennis Dash"}, {link:"https://html5.gamemonetize.co/30dx8hml6r4cfbx0bj341mfnaqnkkrrm/",name:"Black and Pink"}, {link:"https://html5.gamemonetize.co/6jn2zmjsqtxy1e6dwju2346nhggg3h3h/",name:"Italian Brainroot Pizza"}, {link:"https://html5.gamemonetize.co/2fv0ll1x7y0tpbax9wv27skdijx8nxs1/",name:"Mystireous Familiar Encharand Bestiar"}, {link:"https://html5.gamemonetize.co/h31mj5h9t2r0imhvrmwf3xelw5nw2vjf/",name:"Hide And Luig"}, {link:"https://html5.gamemonetize.co/4fhv9bnnvkkv8xi4k1a5hl5res510tw5/",name:"I am Security"}, {link:"https://html5.gamemonetize.co/0bjxllp6iiy7ygc1qgwwt5lnsnr741ia/",name:"Girls Nail Fashion Salon"}, {link:"https://html5.gamemonetize.co/5gv5nhrtgk7s57iddr7kxnxneuxugiya/",name:"Dark Spirint"}, {link:"https://html5.gamemonetize.co/wp9o3vgbgwsitkvnnit9emgdmxecn3jw/",name:"Magic Piano Music"}, {link:"https://html5.gamemonetize.co/0fgyb9jvnyq1g35j2sz3aehyjabxvy2e/",name:"Shish Fruit"}])

    useEffect(() => {
        callApi()
    }, []);

    const callApi = async () => {
        try {

            if (game_plan == "active") {
                let gameDetails = await fetchData(API_ENDPOINTS.gameDetails, navigate, 'GET', {});

                if (gameDetails.success) {
                    setGameDetails(gameDetails.data)

                }
            }

            // let res = await fetchData(API_ENDPOINTS.products, navigate, 'GET', {});

            // if (res.success) {
            //     setList(res.data)

            // }


        } catch (error) {
            console.log(error)
        }
    }

    const handleParticipate = (e) => {
        e.preventDefault();
        let plan = { name: "Game Plan", description: "The game plan will give 2X of your participation amount.", id: 4, amount: 25 }
        let type = 3
        if (auth_token) {
            navigate(`${baseUrl}myaccount/checkout`, { state: { product: plan, type } });
            return
        }
        navigate(`${baseUrl}login`);
    }

    const handleGame = (e, gamelink, index) => {
        e.preventDefault()

        const shuffled = [...gameArray].sort(() => 0.5 - Math.random());

        let gameLink = shuffled[index]
        setGameArray(shuffled)
        if (gameLink) {
            window.open(gameLink, '_blank', 'noopener,noreferrer');
        }
    }

    const handleGame2 = (e, gamelink) => {
        e.preventDefault()
        window.open(gamelink, '_blank', 'noopener,noreferrer');

    }

    const handleBack = (e) => {
        e.preventDefault()
        navigate(`${baseUrl}myaccount/dashboard`)
    }

    return (
        <div className='games-wrapped'>

            <div className='vdo-section'>

                <video autoPlay muted loop playsInline className='background-video'>
                    <source src={`https://az-file-uploads.s3.eu-west-1.amazonaws.com/game-video.mp4`} type="video/mp4" />
                </video>


                <section className='main-content'>
                    <button
                        className='part-btn dashboard-nav-btn btn-small'
                        style={{ position: 'fixed', top: 24, left: 24, zIndex: 1000, padding: '4px 12px', fontSize: '0.85rem', minHeight: 'unset', minWidth: 'unset' }}
                        onClick={(e) => handleBack(e)}
                    >
                        {'< Dashboard'}
                    </button>
                    <h2 className='highlighted-text-shadow'>WIN 2X AND MORE WITH AZ TECH</h2>
                    <h3 className='para'>AZ Tech Provides you amazing opportunity to<br /> learn , win and grow</h3>
                    {/* <button onClick={(e) => { handleParticipate(e) }} className='part-btn mb-5'>Participate Now</button> */}



                    {game_plan=='active' && gameDetails?<div className='withdrawal'>
                        <div className="flex flex-wrap gap-8 justify-center">
                            <div className="text-center">
                                <HollowCard
                                    fillPercent={30}
                                    imageUrl="https://az-file-uploads.s3.eu-west-1.amazonaws.com/az-hollow.png"
                                />

                            </div>


                        </div>
                        <div className='withdrawal-amount'>
                            <div className='balance'><b>Withdraw : </b>${gameDetails[0].withdraw}</div>
                            <div className='balance'><b>Current Progress : </b>${gameDetails[0].showing}</div>
                            <div className='balance'><b>Withdrawable : </b>${gameDetails[0].withdrawable}</div>

                            <button className='part-btn' disabled={gameDetails[0].withdrawable<=0}>Withdraw Now</button>
                        </div>
                    </div>
:
                    <div className='withdrawal'>

                        <div className="flex flex-wrap gap-8 justify-center">
                            <div className="text-center">
                                <HollowCard
                                    fillPercent={30}
                                    imageUrl="https://az-file-uploads.s3.eu-west-1.amazonaws.com/az-hollow.png"
                                />

                            </div>


                        </div>
                        <div className='withdrawal-amount'>
                            <div className='balance'>Start your AZ 2X game journey with only $25</div>
                            <button className='part-btn' onClick={(e) => { handleParticipate(e) }}>Participate Now</button>
                        </div>
                    </div>}

                    <h4 className='mono-font'>
                        NO TASK NO ASK ONLY PLAY<br />
                        STARTS WITH ONLY $25
                    </h4>

                    <div className='note'>
                        <p><b>Note :</b> The $50 reward isn't a question of 'if' — only 'when'. Play your part in AZ, and see it happen faster</p>
                    </div>
                </section>
            </div>

            {/* <AZProgress progress={100} /> */}
            <div className='blue-card'>
                <div className='content'>
                    <h3> Play free games under az community</h3>
                    <p>Enjoy a variety of engaging and fun games, absolutely free—exclusively for our community members!</p>
                </div>
                {/* <div className="game-list-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, margin: '21px 0' }}>
                    {gameArray3.map((game, idx) => (
                        <div key={idx} className="border-card p-3" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={e => handleGame2(e, game.link)}>
                            <div style={{ fontWeight: 600, marginBottom: 8 ,color:"#ff0cba"}}>{game.name}</div>
                          
                        </div>
                    ))}
                </div> */}
                <div className="game-list-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, margin: '32px 0',marginLeft: '132px' }}>
    {gameArray3.map((game, idx) => (
        <div
            key={idx}
            className="border-card p-3"
            style={{ cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
            onClick={e => handleGame2(e, game.link)}
        >
            <span style={{ fontSize: 18, color: '#ff0cba' }}>➔</span>
            <div style={{ fontWeight: 600, marginBottom: 8, color: "#ff0cba" }}>{game.name}</div>
        </div>
    ))}
</div>
                <div className='slider-game'>
                    <Slider {...settings}>
                        {gameArray2.map((item, index) => (
                            <div className='border-card  p-3' onClick={e => { handleGame2(e, item.link) }}>
                                <img src={item.image} />
                            </div>))}
                    </Slider>
                </div>
                <div className='content-cards'>

                    {gameArray.map((item, index) => (


                        <div className='border-card' onClick={e => { handleGame(e, item, index) }}>
                            <img src={`https://az-file-uploads.s3.eu-west-1.amazonaws.com/surprise-game.png`} />
                        </div>))}
                </div>

                <div className='content'>
                    <h3 style={{ color: '#000' }}> Play free games under az community </h3>
                </div>

            </div>

        </div>
    )
}

export default Games