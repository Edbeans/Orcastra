import './SignUpModal.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearSessionErrors } from '../../../store/session';

export default function SignUpForm(props) {
    const showSignUpModal = props.showSignUpModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const errors = useSelector(state => state.errors.session)

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const toggleForm = () => {
        setShowLoginModal(true)
        setShowSignUpModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email,
            username,
            password
        }
        dispatch(signup(user))
    }

    return (

        <div className='modal-background'>
            <button className="modal-close-button" onClick={() => setShowSignUpModal(false)}>&#10005;</button>
            <div className="login-signup-modal">
                <form className="login-signup-form" onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: '36px', textAlign: 'center', padding: '15px' }}>Take a dip.</h2>
                    <div className="input-container">

                        <div className='form-input-group'>
                            <input className="form-inputs" type="text" onChange={(e) => setUsername(e.target.value)} required />
                            <span className="form-input-labels">Username</span>
                            <div className="sign-up-errors">{errors?.username}</div>

                        </div>

                        <div className='form-input-group'>
                            <input className="form-inputs" type="text" onChange={(e) => setEmail(e.target.value)} required />
                            <span className="form-input-labels">Email</span>
                            <div className="sign-up-errors">{errors?.email}</div>
                        </div>

                        <div className='form-input-group'>
                            <input className="form-inputs" type="password" onChange={(e) => setPassword(e.target.value)} required />
                            <span className="form-input-labels">Password</span>
                            <div className="sign-up-errors"><h1>{errors?.password}</h1></div>
                        </div>

                        <button className='default-button-1'
                            style={{ padding: "10px 50px", marginTop: "30px" }}
                            onClick={handleSubmit}>Sign Up</button>

                    </div>
                </form>

                <div className="sutl-container">Already have an account?
                    <span> </span>
                    <span className="signup-to-login-link" onClick={toggleForm}>Log in here</span>
                </div>

            </div>

        </div>

        // <div className='login-modal-background'>
        //     <div className="login-modal">
        //         <button className="modal-close-button" onClick={() => setShowLoginModal(false)}>&#10005;</button>
        //         <form className="signup-form" onSubmit={handleSubmit}>
        //             <div>
        //                 <label /> Username
        //             </div>
        //             <div>
        //                 <input type="text" onChange={(e) => setUsername(e.target.value)} />
        //             </div>
        //             <div>
        //                 <label /> Email
        //             </div>
        //             <div>
        //                 <input type="text" onChange={(e) => setEmail(e.target.value)} />
        //             </div>
        //             <div>
        //                 <label>Password</label>
        //             </div>
        //             <div>
        //                 <input type="password" onChange={(e) => setPassword(e.target.value)} />
        //             </div>
        //             <div>
        //                 <label>Confirm Password</label>
        //             </div>
        //             <div>
        //                 <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        //             </div>
        //             <div>
        //                 <button>Sign Up</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}
