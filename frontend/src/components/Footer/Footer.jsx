import { useState } from "react"
import AboutModal from "../AboutModal/AboutModal";
import IncompleteModal from "../IncompleteModal/IncompleteModal";
import { AboutModalContext } from "../../App";
import { IncompleteModalContext } from "../../App";
import './Footer.css'
import 'aos/dist/aos.css';
import logo from '../../assets/logo1.png'
import { padding } from "@mui/system";
import { useContext } from "react"


export default function Footer() {

    const { showAboutModal, setShowAboutModal } = useContext(AboutModalContext)
    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext)

    return (
        <>
            <div className="footer-container">
                <div className='footer-slogan'>
                    "Connecting investors of today with creators of tomorrow"
                    <div className='footer-slogan-attribute'>
                        -Dosé
                    </div>
                </div>
                <img className="footer-logo" src={logo} >
                </img>

                <div className="footer-links-container">
                    <div className="footer-mobileapp-container">
                        <img src="https://cdn-assets.alltrails.com/assets/images/stores/apple-app-store-en-US.svg" className="footer-mobileapp-links" onClick={() => setShowIncompleteModal(true)}>
                        </img>
                        <img src="https://cdn-assets.alltrails.com/assets/images/stores/google-play-badge-en-US.svg" className="footer-mobileapp-links" onClick={() => setShowIncompleteModal(true)}>
                        </img>
                    </div>
                    <div>
                        <a className='footer-contact-link' href="https://github.com/Edbeans/Orcastra" target='_blank'>
                            Github
                        </a>
                        <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}> | </span>
                        <span className="footer-contact-link" onClick={() => setShowAboutModal(true)}>
                            Meet the team
                        </span>
                    </div>
                </div>

                <div className="footer-lower-container">
                    <div className="footer-lower">
                        <div className="brand-rights">
                            2023 Orca, LLC All Rights Reserved
                        </div>
                        <div className="brand-trademark">
                            ORCA® is a registered trademark of Orca, LLC in the United States as well as certain other jurisdictions.
                        </div>
                        <div className="brand-policies">
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Privacy Policy</span>
                            <span style={{padding:'0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Terms</span>
                            <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item" onClick={() => setShowIncompleteModal(true)}>Cookie Policy</span>
                        </div>
                    </div>
                    <select className="footer-language-dropdown" onClick={() => setShowIncompleteModal(true)}>
                        <option value="" disabled selected>English (US)</option>
                    </select>
                </div>
            </div>
        </>
    )
}