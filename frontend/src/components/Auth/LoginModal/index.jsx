import './LoginModal.css';
import { Modal } from '../../../context/modal';
import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginIcon from '@mui/icons-material/Login';


export default function LoginModal(props) {
    const open = props.open
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal

    return (
        <div>
            <div onClick={() => setShowLoginModal(true)}><LoginIcon/></div>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        setShowSignUpModal={setShowSignUpModal}/>
                </Modal>
            )}
        </div>
    )
}