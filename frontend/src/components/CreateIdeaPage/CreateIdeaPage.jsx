import { useDispatch } from "react-redux";
import { createIdea } from "../../store/idea";
import { useState, useRef } from "react";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import "./CreateIdeaPage.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useHistory } from "react-router";

export default function CreateIdeaPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    // const idea = { title: "", body: "", imageUrl: [] };
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]); 
    const [errors, setErrors] = useState([]);
    const fileRef = useRef(null); 

    const handleCipSubmit = async (e, errors) => {
        e.preventDefault()
        if (errors && Object.values(errors).length === 0) {
            return dispatch(createIdea(title, body, images)).then((res) => history.push(`/idea/${res._id}`));
        }
        setTitle('');
        setBody(''); 
        setImages([]);
        setImageUrls([]); 
    }

    function handleFiles({ currentTarget }) {
        const files = currentTarget.files;  
        setImages(files);
        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = []; 
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader(); 
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[index] = fileReader.result;
                    if (++filesLoaded === files.length) setImageUrls(urls); 
                }
            });
        }
        else setImageUrls([]); 
    }



    return (
        <div className="cip-container">
            <div className="cip-header-container">
                <div className="cip-header" data-aos="fade-down" data-aos-duration="2000">
                    Your billion-dollar venture starts here.
                </div>
                <div className="cip-instructions" data-aos="fade-right" data-aos-duration="2000">
                    Great products were meant to be shared. Fill out the form below with your product information
                </div>
            </div>

            <div className="cip-card-container" data-aos="fade-up" data-aos-duration="2000" >
                <form className="cip-card" onSubmit={(e) => handleCipSubmit(e, errors)}>
                    <div className="cip-card-title">
                        <input 
                            className="cip-card-inputs" 
                            id="cip-input-title" 
                            type="text" 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Your unique title here"
                        />
                        <span className="cip-card-labels" >Title</span>
                    </div>
                    {/* <div className="cip-card-title">
                        <input className="form-inputs" id="cip-input-title" type="text" onChange={(e) => setTitle(e.target.value)}></input>
                        <span className="form-input-labels" >Title</span>
                    </div> */}

                    <div className="cip-card-description">
                        <textarea 
                            className="cip-card-inputs" 
                            id="cip-input-description" 
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Tell us what your product is all about"
                        />
                        <span className="cip-card-labels" >Description</span>
                    </div>
                    
                    {/* FOR IMAGES  */}
                    <div className="cip-card-image-container">
                        <input 
                            className="choose-file-btn"
                            type="file" 
                            ref={fileRef} 
                            accept=".jpg, .jpeg, .png" 
                            onChange={handleFiles} multiple 
                        />
                        <div className="image-upload-content">
                            <div className="round-img-border">
                                <ImageOutlinedIcon className="insert-img-icon"/>
                            </div>
                            <div className="image-upload-description">
                                <span className="img-upload-instruct">Drop an image here, or select a file.</span>
                                <br/>
                                <span className="img-file-type">File must be JPG, JPEG, or PNG.</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {imageUrls.map(image => <img height="80" src={image}/>)}
                    </div>
                    <button className='submit-idea-btn'>Submit Idea</button>
                </form>
            </div>

            {/* maybe? */}
            <div className="cip-river-container">

            </div>
        </div>

    )

}