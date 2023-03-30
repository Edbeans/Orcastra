
import { useContext } from "react"
import { ModalContext } from "../Feed/Feed"
import { Modal } from "../../context/modal"
import './IncompleteModal.css'

export default function IncompleteModal() {

    const { showIncompleteModal, setShowIncompleteModal } = useContext(ModalContext);

    return (
        <>
            {showIncompleteModal && (
                <Modal onClose={() => setShowIncompleteModal(false)}>
                    <button className="modal-close-button" onClick={() => setShowIncompleteModal(false)}>&#10005;</button>
                    <div className="modal-background" style={{ width: '1300px', height: '900px' }}>
                        Hello
                    </div>
                </Modal>
            )}
        </>
    )
}