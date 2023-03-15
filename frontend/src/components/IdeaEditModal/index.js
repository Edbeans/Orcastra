import { useState } from "react"
import EditModalForm from "./EditModalForm"
import { Modal } from "../../context/modal"
import './EditModalForm'

export default function EditModalButton ({idea}) {
    const [openEditModal, setOpenEditModal] = useState(false)


    
    return (
        <div>
            <div onClick={()=>setOpenEditModal(true)}>Edit Idea</div>
            {openEditModal && (
                <Modal onClose={() => setOpenEditModal(false)}>
                    <EditModalForm
                    idea={idea}/>
                </Modal>
            )}
        </div>
    )
}