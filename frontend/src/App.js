import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AuthRoute } from "./components/Routes/Routes";
import { Switch } from "react-router-dom";
import LoginSignUpPage from './components/Auth/LoginSignUpPage'
import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <Switch>
          {/* <AuthRoute exact path='/' component={SplashPage} /> */}
          <AuthRoute exact path='/login' component={LoginSignUpPage} />
          <AuthRoute exact path='/signup' component={LoginSignUpPage} />
        </Switch>
      </>
    )
  );
}

export default App;
