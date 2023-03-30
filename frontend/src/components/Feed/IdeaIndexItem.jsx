import { Link } from "react-router-dom"
import './IndexItem.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function IdeaIndexItem({ idea, ideaIndexOrder }) {

    function getAosDelay(ideaIndexOrder) {
        switch (ideaIndexOrder) {
            case 'index-item-order1':
                return '0';
            case 'index-item-order2':
                return '150';
            case 'index-item-order3':
                return '300';
            case 'index-item-order4':
                return '450';
            default:
                return '0';
        }
    }


    return (
        <>
            <div className={`index-item-wrapper ${ideaIndexOrder}`} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={getAosDelay(ideaIndexOrder)}>
                <Link to={`/idea/${idea._id}`} className='index-item-link'>
                    <img className='placeholder-box' src={idea.imageUrls[0]}></img>
                    <h1 className="index-item-title" >{idea.title}</h1>
                </Link>
            </div>
        </>
    )
}