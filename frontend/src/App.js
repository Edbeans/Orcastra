import { AuthRoute } from "./components/Routes/Routes";
import { Switch } from "react-router-dom";
import LoginSignUpPage from './components/Auth/LoginSignUpPage'
function App() {
  return (
    <div>
      <Switch>
        <AuthRoute exact path='/' component={LoginSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
