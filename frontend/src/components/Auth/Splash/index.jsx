import { useState } from "react"
import './Navigation.css'
import { NavLink } from 'react-router-dom'
import { navData } from "../../lib/navdata"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
export default function Sidebar() {
    const [open, setOpen] = useState(false)

    function toggleOpen() {
        setOpen(!open)
    }

    return (
        <div className={open ? 'sidenav' : 'sidenavClosed'}>
            <button className="menu-button" onClick={toggleOpen}>
                {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </button>
            {navData.map(item => <NavLink key={item.id} className={open ? "sideitem" : "sideitemClosed"} to={item.link}>{item.icon}
                <span className={open ? 'linktext' : 'linktextClosed'}>{item.text}</span>
            </NavLink>)}
        </div>
    )
}