import { useState } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { navData } from '../../lib/navdata';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../store/session';
import { LoginModalContext } from '../../App';
import { useContext } from 'react';
import { useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
// import LogoIcon from '../../assets/logo-icon.png'
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// import SettingsIcon from '@mui/icons-material/Settings';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import WavesIcon from '@mui/icons-material/Waves';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CreateIcon from '@mui/icons-material/Create';
import SetMealIcon from '@mui/icons-material/SetMeal';
// import MessageIcon from '@mui/icons-material/Message';


export default function Sidebar({ open, setOpen }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // const [open, setOpen] = useState(false)
    const { showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal } = useContext(LoginModalContext)

    const navData = sessionUser ? [
        {
            id: 0,
            icon: <HomeIcon />,
            text: 'About',
            link: '/',
        },
        {
            id: 1,
            icon: <WavesIcon />,
            text: 'Ideas Feed',
            link: '/feed',
        },
        {
            id: 2,

            icon: <CreateIcon />,
            text: 'Create',
            link: '/ideas/new',
        },
        {
            id: 3,
            icon: <SetMealIcon />,
            text: "Profile",
            link: `/users/${sessionUser._id}/ideas`
        }

    ] : [
        {
            id: 0,
            icon: <HomeIcon />,
            text: 'About',
            link: '/',
        },
        {
            id: 1,
            icon: <WavesIcon />,
            text: "Ideas Feed",
            link: "/feed"
        }
    ]

    function toggleOpen() {
        setOpen(!open)
    }

    function handleLogout() {
        dispatch(logout())
    }

    useEffect(() => {
        setShowLoginModal(false)
        setShowSignUpModal(false)
    }, [sessionUser])

    return (
        <>

            <div className="sidenav-container">
                <div className={open ? 'sidenav' : 'sidenavClosed'}>
                    <div>
                        <button className={open ? "menu-buttonOpen" : "menu-button"} onClick={toggleOpen}>
                            <MenuIcon />
                        </button>
                        <div className="sideitem-container">
                            {navData.map(item => <NavLink key={item.id} className='sideitem' to={item.link}>
                                <div className="item-icon">{item.icon}<span className='item-icon-tooltip'>{item.text}</span></div>
                                {/* {console.log(open)} */}
                                <span className={open ? 'linkText' : 'linkTextClosed'}>{item.text}</span>
                            </NavLink>)}
                        </div>
                    </div>

                    <div className={open ? 'sideitem-authfunctions-containerOpen' : ""}>
                        {!sessionUser ?
                            <div className='sideitem' onClick={() => setShowLoginModal(true)}>
                                <div className='item-icon'><LoginIcon /><span className='item-icon-tooltip'>Login</span></div>
                                <span className={open ? "linkText" : "linkTextClosed"}>Login</span>
                            </div> :
                            <div className='sideitem' onClick={handleLogout}>
                                <div className='item-icon'> <LogoutIcon /><span className='item-icon-tooltip'>Log out</span> </div>
                                <span className={open ? 'linkText' : 'linkTextClosed'}>Log out</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
