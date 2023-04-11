import { useDispatch } from "react-redux";
import { createIdea } from "../../store/idea";
import { useState } from "react";
import "./CreateIdeaPage.css";

export default function CreateIdeaPage() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])

    function handleCipSubmit(e, errors) {
        e.preventDefault()
        // const formData = FormData.new
        // formData.append("title", title)
        // formData.append("body", body)
        // dispatch(createIdea(formData))
        const newIdea = {title, body}
        if (errors && Object.values(errors).length === 0) {
            return dispatch(createIdea(newIdea))
            }
        }



    return (
        <div className="cip-container">
            Test
            <div className="cip-header-container">
                <div className="cip-header">
                    Your billion-dollar venture starts here.
                </div>
                {/* <div className="cip-instructions">
                    Great products were meant to be shared. Fill out the form below with your product information
                </div> */}
            </div>

            <div className="cip-card-container">
                <form className="cip-card" onSubmit={(e) => handleCipSubmit(e, errors)}>
                    <div className="cip-card-title">
                        <label to="cip-title">Title</label>
                        <input type="text" id="cip-title" onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    <div className="cip-card-description">
                        <label>Description</label>
                        <input type='text' onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <button>Submit Idea</button>
                </form>
            </div>

            {/* maybe? */}
            <div className="cip-river-container">

            </div>
        </div>

    )

}