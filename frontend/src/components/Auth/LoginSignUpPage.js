import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import './LoginSignUpPage.css'; 
import { useState } from "react";


export default function LoginSignUpPage() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    return (
        <div className="loginsignuppage-wrapper">
            <div className="login-signup-header-wrapper"><h1>ORCASTRA</h1></div>
            
            <div className='loginsignuppage-button'>
                <LoginModal
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                    />
            </div>
            <div className='loginsignuppage-button'>
                <SignUpModal
                    showSignUpModal={showSignUpModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}/>
            </div>
        </div>
    )
}