import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import './LoginSignUpPage.css'; 
import { useState } from "react";

export default function LoginSignUpPage() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    return (
        <div>
            <div><h1>ORCASTRA</h1></div>
            <div>
                <LoginModal
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                    />
            </div>
            <div>
                <SignUpModal
                    showSignUpModal={showSignUpModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}/>
            </div>
        </div>
    )
}