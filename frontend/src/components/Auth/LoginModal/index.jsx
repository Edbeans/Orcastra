import './LoginModal.css';
import { Modal } from '../../../context/modal';
import { useContext, useState } from 'react';
import LoginForm from './LoginForm';
import LoginIcon from '@mui/icons-material/Login';
import { ModalContext } from '../../Navigation/Sidebar';


export default function LoginModal() {

    const { open, showLoginModal, setShowLoginModal, showSignUpModal, setShowSignUpModal, SignUpModal } = useContext(ModalContext)

    return (
        <div>
            <div className='sideitem' onClick={()=>setShowLoginModal(true)}><div className='item-icon'><LoginIcon/><span className='item-icon-tooltip'>Login</span></div>
            <span className={open ? "linkText" : "linkTextClosed"}>Login</span>
            </div>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm
                        showLoginModal={showLoginModal}
                        setShowLoginModal={setShowLoginModal}
                        setShowSignUpModal={setShowSignUpModal} />
                        
                </Modal>
            )}
        </div>
    )
}