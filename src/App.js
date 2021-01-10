import './App.css';
import Login from './Components/Login';
import PaymentDetails from './Components/PaymentDetails';
import welcomePage from './Components/WelcomePage';
import UserProfile from './Components/UserProfile';
import MyAuctions from './Components/MyAuctions';
import ResidentialItems from './Components/ResidentialItems';
import CommercialItems from './Components/CommercialItems';
import IndustrialItems from './Components/IndustrialItems';
import CreateHomeAuction from './Components/CreateHomeAuction';
import CreateLandAuction from './Components/CreateLandAuction';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import FavAuctions from './Components/FavoriteAuctions';
import ResItems from './Components/Residential';
import ComItems from './Components/Commercial';
import IndItems from './Components/Industrial';
import ItemDetails from './Components/ItemDetails';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
       <Router history={history}>   
        <Route exact path="/" component={welcomePage} />
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/myauctions" component={MyAuctions} /> 
        <Route exact path="/home" component={CreateHomeAuction} />
        <Route exact path="/land" component={CreateLandAuction} />
        {/* <Route exact path="/residentialItems" component={ResidentialItems} /> */}
        <Route exact path="/favItems" component={FavAuctions} />
        {/* <Route exact path="/commercialItems" component={CommercialItems}/> */}
        {/* <Route exact path="/industrialItems" component={IndustrialItems}/> */}
        <Route exact path="/logout" component={Login} /> 
        <Route exact path="/residentialitems" component={ResItems} /> 
        <Route exact path="/commercialitems" component={ComItems} /> 
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
