import { useContext } from 'react';
import { AboutModalContext } from '../../App';
import { Modal } from '../../context/modal';
import './AboutModal.css';

import profilepic from '../../assets/edbeanis.jpeg';

import danielHeadshot from '../../assets/daniel-headshot.png';
import edwardHeadshot from '../../assets/edward-headshot.png';
import omarHeadshot from '../../assets/omar-headshot.png';
import linkedin from '../../assets/linkedincrop.png';
import github from '../../assets/github.png';
import portfolio from '../../assets/user-icon.png';
import { padding } from '@mui/system';

export default function AboutModal() {
  const { showAboutModal, setShowAboutModal } =
    useContext(AboutModalContext);

  return (
    <>
      {showAboutModal && (
        <Modal onClose={() => setShowAboutModal(false)}>
          <div
            className='modal-background'
            style={{ width: '1200px', height: '700px' }}
          >
            <button
              className='modal-close-button'
              onClick={() => setShowAboutModal(false)}
            >
              &#10005;
            </button>
            <div className='about-grid'>
              <div className='about-grid-item'>
                <div className='agi-info'>
                  <img src={danielHeadshot}></img>
                  <div className='agi-header'>
                    <h1>Daniel Liem</h1>
                    <h2>Front End Lead</h2>
                    <div className='agi-contact'>
                      <a
                        href='https://github.com/danielliem49'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={github} alt='Github Link' />
                      </a>
                      <a
                        href='https://www.linkedin.com/in/danielliem49/'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={linkedin} alt='LinkedIn Link' />
                      </a>
                      <a
                        href='https://danielliem49.github.io/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={portfolio} alt='Portfolio Link' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='agi-description'>
                  A design enthusiast with a background in the
                  Aerospace industry, Daniel strives to use the latest
                  tech to create stylish websites and guarantee
                  enjoyable user experiences. In his free time, Daniel
                  enjoys listening to new music, hanging out with
                  friends, and being bad at soccer.
                </div>
              </div>

              <div className='about-grid-item'>
                <div className='agi-info'>
                  <img src={edwardHeadshot}></img>
                  <div className='agi-header'>
                    <h1>Edward Ying</h1>
                    <h2>Team Lead</h2>
                    <div className='agi-contact'>
                      <a
                        href='https://github.com/Edbeans'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={github} alt='Github Link' />
                      </a>
                      <a
                        href='https://www.linkedin.com/in/ying-edward/'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={linkedin} alt='LinkedIn Link' />
                      </a>
                      <a
                        href='https://edbeans.github.io/Portfolio/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={portfolio} alt='Portfolio Link' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='agi-description'>
                  Nutrition and fitness aficionado. Passionate in
                  creating seamless and intuitive webpage designs.
                  Strives to uplift his peers and help them unlock
                  their hidden potentials. Outside of coding, Edward
                  loves listening to podcasts, playing basketball, and
                  having a great time with friends.
                </div>
              </div>

              <div className='about-grid-item'>
                <div className='agi-info'>
                  <img src={omarHeadshot}></img>
                  <div className='agi-header'>
                    <h1>Omar Camacho</h1>
                    <h2>Back End Lead</h2>
                    <div className='agi-contact'>
                      <a
                        href='https://github.com/camachoo1'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={github} alt='Github Link' />
                      </a>
                      <a
                        href='https://linkedin.com/in/omar-camacho-aa01b3133'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={linkedin} alt='LinkedIn Link' />
                      </a>
                      <a
                        href='https://camachoo1.github.io/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={portfolio} alt='Portfolio Link' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='agi-description'>
                  Music enthusiast that is passionate about creating
                  dynamic and innovative web applications. Outside of
                  programming, Omar loves exercising, playing soccer,
                  and networking.
                </div>
              </div>

              <div className='about-grid-item'>
                <div className='agi-info'>
                  <img src={profilepic}></img>
                  <div className='agi-header'>
                    <h1>Stephen Wong</h1>
                    <h2>Front End Lead</h2>
                    <div className='agi-contact'>
                      <a
                        href='https://github.com/danielliem49'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={github} alt='Github Link' />
                      </a>
                      <a
                        href='https://www.linkedin.com/in/danielliem49/'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ filter: 'invert(1)' }}
                      >
                        <img src={linkedin} alt='LinkedIn Link' />
                      </a>
                      <a
                        href='https://danielliem49.github.io/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={portfolio} alt='Portfolio Link' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='agi-description'>
                  About yourself or project duties go here?
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
