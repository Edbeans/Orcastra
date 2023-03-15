import './LoginModal.css';
import { useState, useEffect, useContext } from 'react';
import { login, clearSessionErrors } from '../../../store/session';
import { useDispatch } from 'react-redux';
import { ModalContext } from '../../Navigation/Sidebar';

export default function LoginForm(props) {
    const dispatch = useDispatch()

    // const {showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal} = useContext(ModalContext)
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    // const handleOutsideClick = () => {
    //     setShowLoginModal(false)
    // }

    const toggleForm = () => {
        setShowLoginModal(false)
        console.log('login', showLoginModal)
        setShowSignUpModal(true)
        // console.log('signup', showSignUpModal)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    return (
        <div className='login-modal-background'>
            <button className="modal-close-button" onClick={() => setShowLoginModal(false)}>&#10005;</button>
            <div className="login-modal">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: '36px', textAlign: 'center', paddingBottom: '15px' }}>Welcome to Orcastra</h2>
                    <div className="login-input-text-wrapper">

                        <div className='login-form-input-group'>
                            <input className="login-inputs" type="text" onChange={(e) => setEmail(e.target.value)} required />
                            <span className="login-input-labels">Username or Email</span>
                        </div>


                        <div className='login-form-input-group'>
                            <input className="login-inputs" type="password" onChange={(e) => setPassword(e.target.value)} required />
                            <span className="login-input-labels">Password</span>
                        </div>

                        <div>
                            <button onClick={handleSubmit}>Log in</button>
                        </div>
                    </div>
                </form>
                <button
                    style={{marginTop:'20px'}}
                    type='submit'
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                            login({ email: 'demo@gmail.com', password: 'password' })
                        );
                    }}>
                    Login as Demo User
                </button>
            <div onClick={toggleForm}>Don't have an account yet? Sign up</div>
            </div>

        </div>
    )
}
