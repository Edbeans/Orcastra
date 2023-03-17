import { useSelector } from 'react-redux';
import './Splash.css';
import './Splash.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// import logo from '../../assets/discord-logo.png';
import splashorca1 from '../../assets/splash-orca1.png'
import splashorca2 from '../../assets/splash-orca2.png'
import splashorca3 from '../../assets/splash-orca3.png'
import logo from '../../assets/logo1.png'
import SignUpForm from '../Auth/SignUpModal/SignupForm';

// import section3 from '../../assets/section3.svg';
// import section4 from '../../assets/section4.svg';
// import section5 from '../../assets/section5.svg';
// import sparkles from '../../assets/sparkles.svg';

const SplashPage = () => {

    return (
        <>
            <div className='splash-page-main'>

                <div className='splash-section-1'>

                    <button
                        className='lbh-btn about-btn'>
                        About Us
                    </button>

                    <div className='splash-page-after-nav'>
                        <div className='splash-page-main-heading' data-aos="fade-down" data-aos-duration="3000">
                            <img src={logo} style={{ objectFit: 'cover', objectPosition: 'center', maxWidth: '650px', height: 'auto' }} >
                            </img>
                        </div>
                        <div className='splash-page-slogan' data-aos="fade-down" data-aos-duration="3000">
                            Connecting investors of today with creators of tomorrow
                        </div>
                    </div>

                    <button
                        className='lbh-btn gs-btn'
                    >
                        Get started
                    </button>

                </div>


                <div className='hero-section'>
                    <div className='img-container' data-aos="fade-left" data-aos-duration="1000">
                        <img src={splashorca1} alt='inv' className='all-sec-img' />
                    </div>
                    <div className='content' data-aos="fade-left" data-aos-duration="1000">
                        <h1 className='section-header'>
                            Make a splash with your next game changer
                        </h1>
                        <p className='section-text'>
                            Orcastra is the best place to get inspired and receive feedback on your latest billion-dollar idea.
                        </p>
                    </div>
                </div>
                <div className='hero-section alternate-section'>
                    <div className='content' data-aos="fade-right" data-aos-duration="1000">
                        <h1 className='section-header'>
                            Find your pod
                        </h1>
                        <p className='section-text'>
                            Build a community in a sea of like-minded investors and entrepreneurs. And remember: We're not sharks. We don't bite.
                        </p>
                    </div>
                    <div className='img-container' data-aos="fade-right" data-aos-duration="1000">
                        <img src={splashorca2} alt='txt' className='all-sec-img' />
                    </div>
                </div>
                <div className='hero-section'>
                    <div className='img-container' data-aos="zoom-in" data-aos-duration="1000">
                        <img
                            src={splashorca3}
                            alt='mod-tools'
                            className='all-sec-img'
                        />
                    </div>
                    <div className='content' data-aos="zoom-in" data-aos-duration="1000">
                        <h1 className='section-header'>Go out and make a krilling!</h1>
                        <p className='section-text'>
                            Conduct your business affairs with the help of live-feedback and data analytics. 
                        </p>
                    </div>
                </div>


                {/* <div className='section-5 alternate-section'>
                    <div className='content-top'>
                        <h1 className='section-header-top'>
                            RELIABLE TECH FOR STAYING CLOSE
                        </h1>
                        <p className='section-text section-text-top'>
                            Low-latency voice and video feels like you're in the
                            same room. Wave hello over video, watch friends stream
                            their games, or gather up and have a drawing session
                            with screen share.
                        </p>
                        <img
                            src={section5}
                            alt='reliable'
                            className='bigger-img'
                        />
                    </div>
                </div>
                <div className='section-6'>
                    <div className='section-6-content'>
                        <img
                            src={sparkles}
                            alt='sparkles-banner'
                            className='sparkles'
                        />
                        <h1 className='sparkles-header'>
                            Ready to start your journey?
                        </h1>
                        <button
                            onClick={handleClick}
                            className='splash-button bigger-button'
                        >
                            Open Discable
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
};
export default SplashPage;