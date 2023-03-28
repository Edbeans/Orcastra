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

                <div className='footer-slogan' data-aos="fade-down" data-aos-duration="2000">
                    "Connecting investors of today with creators of tomorrow"
                    <div className='footer-slogan-attribute'>
                        -Dosé
                    </div>
                </div>

                <img className="footer-logo" src={logo} data-aos="fade-down" data-aos-duration="2000">
                </img>

        </div>
        </>
    )
}