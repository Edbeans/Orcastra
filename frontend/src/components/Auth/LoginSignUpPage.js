import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import './LoginSignUpPage.css'; 
import { useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// import React from 'react';

// // context for modal
// export const ModalContext = React.createContext();

export default function LoginSignUpPage() {
    // const [showLoginModal, setShowLoginModal] = useState(false)
    // const [showSignUpModal, setShowSignUpModal] = useState(false)
    AOS.init();


    return (
        <div className="loginsignuppage-wrapper">
            <div className="login-signup-header-wrapper"><h1 data-aos="fade-down"
                data-aos-duration="1700"
                >ORCASTRA</h1></div>
            
            <div className='loginsignuppage-button' data-aos="fade-down"
                data-aos-duration="1500">
                <LoginModal
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                    />
            </div>
            <div className='loginsignuppage-button' data-aos="fade-down"
                data-aos-duration="1000">
                <SignUpModal
                    showSignUpModal={showSignUpModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}/>
            </div>
        </div>
    )
}