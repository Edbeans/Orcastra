import { useDispatch } from "react-redux";
import { createIdea } from "../../store/idea";
import { useState } from "react";
import "./CreateIdeaPage.css";

export default function CreateIdeaPage() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    // const [images, setImages] = useState([]);
    // const [imageUrls, setImageUrls] = useState([]); 
    const [errors, setErrors] = useState([]);

    function handleCipSubmit(e, errors) {
        e.preventDefault()
        // const formData = FormData.new
        // formData.append("title", title)
        // formData.append("body", body)
        // dispatch(createIdea(formData))
        // const newIdea = {title, body, images}
        const newIdea = {title, body} 
        console.log('attempting submit')
        if (errors && Object.values(errors).length === 0) {
            console.log('attempting dispatch')
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
                        <input className="cip-card-inputs" id="cip-input-title" type="text" onChange={(e) => setTitle(e.target.value)}></input>
                        <span className="cip-card-labels" >Title</span>
                    </div>
                    <div className="cip-card-description">
                        <textarea className="cip-card-inputs" id="cip-input-description" onChange={(e) => setBody(e.target.value)}/>
                        <span className="cip-card-labels" >Description</span>
                    </div>
                    {/* FOR IMAGES  */}
                    {/* <div className="cip-card-image">
                        <input className="cip-card-inputs" type="file" accept=".jpg, .jpeg, .png" multiple onChange={updateFiles}></input>
                        <span className="cip-card-labels">Images</span>
                    </div> */}
                    <button className='submit-idea-btn'>Submit Idea</button>
                </form>
            </div>

            {/* maybe? */}
            <div className="cip-river-container">

            </div>
        </div>

    )

}