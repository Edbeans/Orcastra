
import './Splash.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


export default function Splash() {
    AOS.init();


    return (
        <div className="splash-wrapper">

            <div className='splash-header-wrapper'>
                <div className="splash-header">
                    <h1 data-aos="fade-down" data-aos-duration="3000">ORCASTRA</h1>
                </div>
                <div className="splash-slogan">
                    <h3 data-aos="fade-down" data-aos-duration="3000">connecting investors of today with creators of tomorrow.</h3>
                </div>
            </div>


            <div className='splash-graphics-container'>
                <div className='splash-graphic1'>
                    1
                </div>

                <div className='splash-graphic2'>
                    2
                </div>

                <div className='splash-graphic3'>
                    3
                </div>
            </div>
            

            {/* <div className="splash-content-wrapper">
                <div className="columns-wrapper">
                    <div className="splash-column1">
                        <div className="col-start">
                            Start
                        </div>
                        <div className='col-end'>
                            End
                        </div>
                    </div>
                    <div className="splash-column2">
                        <div className="col-start">
                            Start
                        </div>
                        <div className='col-end'>
                            End
                        </div>
                    </div>
                    <div className="splash-column3">
                        <div className="col-start">
                            Start
                        </div>
                        <div className='col-end'>
                            End
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

{/* <div className='loginsignuppage-button' data-aos="fade-down"
                data-aos-duration="1500">
                <LoginModal
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    setShowSignUpModal={setShowSignUpModal}
                    />
            </div>
            <div className='loginsignuppage-button' data-aos="fade-down"
                data-aos-duration="1000">
                <SignUpModal
                    showSignUpModal={showSignUpModal}
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}/>
            </div> */}