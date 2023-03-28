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
import { color } from '@mui/system';

const SplashPage = () => {

    return (
        <>
            <div className='splash-page-main'>

                <div className='splash-section-1'>

                    <div className='splash-page-after-nav'>
                        <div className='splash-page-main-heading'>
                            <img src={logo} style={{ objectFit: 'cover', objectPosition: 'center', maxWidth: '550px', height: 'auto' }} >
                            </img>
                        </div>

                    </div>


                    <div className='splash-section-1-rightside'>
                        <div className='splash-greeting' data-aos="fade-in" data-aos-duration="2000" data-aos-delay="1000">
                            <div>Your inspiration starts today.</div>
                        </div>

                        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="2000" className='explore-btn'>
                            <button
                                className='lbh-btn'>
                                Explore
                            </button>
                        </div>

                        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="2250" className='about-btn'>
                            <button
                                className='lbh-btn'>
                                About Us
                            </button>
                        </div>

                        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="2500" className='signup-btn'>
                            <button
                                className='lbh-btn' style={{ width: '20rem' }}>
                                Login / Signup
                            </button>
                        </div>
                    </div>
                </div>


                <div className='hero-section'>

                    <div className='img-container'>
                        <img src={splashorca1} alt='inv' className='all-sec-img' />
                    </div>
                    <div className='content' >
                        <h1 className='section-header'>
                            Splash around with your next game changer
                        </h1>
                        <p className='section-text'>
                            Orca is the best place to get inspired and receive feedback on your latest billion-dollar idea.
                        </p>
                    </div>
                </div>
                <div className='hero-section alternate-section'>
                    <div className='content' data-aos="fade-right" data-aos-duration="1000">
                        <h1 className='section-header'>
                            Find your pod in a big blue sea
                        </h1>
                        <p className='section-text'>
                            Build a community among like-minded investors and entrepreneurs. And remember: We're not sharks. We don't bite.
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
                            data-aos="fade-in" data-aos-duration="1500"
                        />
                    </div>
                    <div className='content' data-aos="zoom-in" data-aos-duration="1000">
                        <h1 className='section-header'>Ride the wave and make a krilling</h1>
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