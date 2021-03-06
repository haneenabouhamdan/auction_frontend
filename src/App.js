import './App.css';
import Login from './Components/Login';
import PaymentDetails from './Components/PaymentDetails';
import welcomePage from './Components/WelcomePage';
import UserProfile from './Components/UserProfile';
import CreateLandAuction from './Components/CreateLandAuction';
import CreateHome from './Components/CreateHome';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import ResItems from './Components/Residential';
import ComItems from './Components/Commercial';
import IndItems from './Components/Industrial';
import ItemDetails from './Components/ItemDetails';
import UserItems from './Components/userAuctions';
import Favorites from './Components/Favorites';
import WonItems from './Components/WonAuctions';
import WonDetails from './Components/WonDetails';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
       <Router history={history}>   
        <Route exact path="/" component={welcomePage} />
        <Route exact path="/login" component={Login} /> 
        <Route  exact path="/userauctions" component={UserItems} />
         <Route exact path="/land" component={CreateLandAuction} />
        <Route exact path="/home" component={CreateHome} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/logout" component={Login} /> 
        <Route exact path="/residentialitems" component={ResItems} /> 
        <Route exact path="/commercialitems" component={ComItems} /> 
        <Route exact path="/wonauctions" component={WonItems}/>
        <Route exact path="/WonDetails/:id" component={WonDetails}/>
        <Route exact path="/industrialitems" component={IndItems} /> 
        <Route exact path="/itemDetails/:id" component={ItemDetails}/>
        <Route exact path="/userprofile" component={UserProfile} /> 
        <Route exact path="/welcomePage" component={welcomePage} />
        <Route exact path="/PaymentDetails" component={PaymentDetails}/>
        </Router>
    </div>
  );
}

export default App;
