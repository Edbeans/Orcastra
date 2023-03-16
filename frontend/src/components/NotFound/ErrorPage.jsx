import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <>
      <div className='error-page'>
        <div className='error-container'>
          <h1>OOPS...</h1>
          <p>
            🛑 Uh-oh! It seems you tried to access a page that doesn't
            exist! Please go back and try a different link.
          </p>

          <ul className='error-links'>
            <li>
              <a
                href='https://github.com/Edbeans/Orcastra'
                target='_blank'
                rel='noreferrer'
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
