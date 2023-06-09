import { Link } from "react-router-dom";
import "./UserIdeaIndexItem.css";

export default function UserIdeaIndexItem({ idea }) {
    return (
        <>
            <Link to={`/idea/${idea._id}`} className='index-item-link' data-aos="fade-right" data-aos-duration="1500">
                <div className="uiii-container">
                    <div className="uiii-item-body">
                        <img className='uiii-img' src={idea.imageUrls[0]}></img>     
                        <div className="idea-text-box">
                            <h1 className="index-idea-title">{idea.title}</h1>
                            <h2 className="index-item-body">{idea.body}</h2>
                        </div>
                    </div>    
                </div>
            </Link> 

        </>
    )
}
