import './App.css';
import Login from './Components/Login';
import PaymentDetails from './Components/PaymentDetails';
import welcomePage from './Components/WelcomePage';
import UserProfile from './Components/UserProfile';
import MyAuctions from './Components/MyAuctions';
import CreateHomeAuction from './Components/CreateHomeAuction';
import CreateLandAuction from './Components/CreateLandAuction';
// import Maps from './Components/Maps';
// import Navbar from './Components/Navbar'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       {/* <Navbar/> */}
       <Router>   
        <Route exact path="/" component={welcomePage} />
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/myauctions" component={MyAuctions} /> 
        <Route exact path="/home" component={CreateHomeAuction} />
        <Route exact path="/land" component={CreateLandAuction} />
        <Route exact path="/logout" component={Login} /> 
        {/* <Route exact path="/maps" component={Maps} /> */}
        <Route exact path="/userprofile" component={UserProfile} /> 
        <Route exact path="/welcomePage" component={welcomePage} />
        <Route exact path="/PaymentDetails" component={PaymentDetails}/>
        </Router>
    </div>
  );
}

export default App;
