import './LoginModal.css';
import { Modal } from '../../../context/modal';
import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import { LoginModalContext } from '../../../App';


export default function LoginModal() {

    const { showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal } = useContext(LoginModalContext)

    return (
        <>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        setShowSignUpModal={setShowSignUpModal} />    
                </Modal>
            )}
        </>
    )
}