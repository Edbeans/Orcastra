import { useState } from "react"
import './Navigation.css'
import { NavLink } from 'react-router-dom'
import { navData } from "../../lib/navdata"
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from "../Auth/LoginModal";
import SignUpModal from "../Auth/SignUpModal";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../store/session";

import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';


export const ModalContext = React.createContext();


export default function Sidebar({open, setOpen}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    // const [open, setOpen] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    const navData = sessionUser ? [
        {
            id: 0,
            icon: <HomeIcon />,
            text: "Feed",
            link: "/"
        },
        {
            id: 1,
            icon: <BarChartIcon />,
            text: "investments",
            link: "/"
        },
        {
            id: 2,
            icon: <CreateIcon />,
            text: "Create an idea",
            link: "/ideas/new"
        },
        {
            id: 3,
            icon: <ViewCarouselIcon />,
            text: "Your ideas",
            link: `/users/${sessionUser._id}/ideas`
        },
        {
            id: 4,
            icon: <SettingsIcon />,
            text: "Settings",
            link: "/"
        }
    ] : [
        {
            id: 0,
            icon: <HomeIcon />,
            text: "Feed",
            link: "/"
        }
    ]

    function toggleOpen() {
        setOpen(!open)
    }

    function handleLogout() {
        dispatch(logout())
    }
    

    return (

        <div className="sidenav-container">
            <div className={open ? 'sidenav' : 'sidenavClosed'}>
                <div>
                <button className={open ? "menu-buttonOpen" : "menu-button"} onClick={toggleOpen}>
                    <MenuIcon />
                </button>
                <div className="sideitem-container">
                    {navData.map(item => <NavLink key={item.id} className='sideitem' to={item.link}>
                        <div>{item.icon}</div>
                        {/* {console.log(open)} */}
                        <span className={open ? 'linkText' : 'linkTextClosed'}>{item.text}</span>
                    </NavLink>)}
                </div>
                </div>

                <div className='sideitem-authfunctions-container'>
                { !sessionUser ? 
                    <ModalContext.Provider value={{open, showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal, SignUpModal}}>
                        <SignUpModal/>
                        <LoginModal/>
                    </ModalContext.Provider> : 
                    <div className='sideitem' onClick={handleLogout}> 
                        <div> <LogoutIcon/> </div>
                        <span className={open ? 'linkText' : 'linkTextClosed'}>Log out</span>
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}