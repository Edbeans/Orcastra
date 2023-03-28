import { useState } from "react"
import AboutModal from "./AboutModal/AboutModal"
import './Footer.css'
import 'aos/dist/aos.css';
import logo from '../../assets/logo1.png'
import { padding } from "@mui/system";

export default function Footer() {

    return (
        <>
        <div className="footer-container">

                <div className='footer-slogan'>
                    "Connecting investors of today with creators of tomorrow"
                    <div className='footer-slogan-attribute'>
                        -Dosé
                    </div>
                </div>

                <img className="footer-logo" src={logo}>
                </img>

                <div className="meet-the-team-button">
                    <button>
                        Test
                    </button>
                </div>

        </div>
        </>
    )
}