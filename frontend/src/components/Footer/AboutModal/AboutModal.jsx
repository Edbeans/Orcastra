import { useContext } from "react"
import { ModalContext } from "../../Splash/Splash"
import { Modal } from "../../../context/modal"
import './AboutModal.css'

export default function AboutModal() {

    const { showAboutModal, setShowAboutModal } = useContext(ModalContext)

    return (
        <>
            {showAboutModal && (
                <Modal onClose={() => setShowAboutModal(false)}>
                    <div className="modal-background">
                        <div className="about-container">
                            <button className="modal-close-button" onClick={() => setShowAboutModal(false)}>&#10005;</button>
                            <div className="about-grid">
                                <div className="about-grid-item">Daniel</div>
                                <div className="about-grid-item">Omar</div>
                                <div className="about-grid-item">Stephen</div>
                                <div className="about-grid-item">Edward</div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}