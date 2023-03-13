import './SignUpModal.css';
import { useState } from 'react';

export default function SignUpForm(props) {
    const showSignUpModal = props.showSignUpModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='login-modal-background'>
            <div className="login-modal">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label /> Username or Email
                    </div>
                    <div>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div>
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
