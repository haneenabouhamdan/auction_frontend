import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import React from 'react' 
import axios from 'axios'
import '../style/User.css'
 
class ListCountries extends React.Component {
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }
 
  selectCountry (val) {
    this.passCountry(val);
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.passRegion(val);
    this.setState({ region: val });

  }
  passCountry (val){
    this.props.country(val);
  }
  passRegion(val){
    this.props.state(val);
  }
  componentDidMount() {
    axios.defaults.withCredentials=true;
      axios.get('/api/user').then((response)=>{
         this.setState({
          country:response.data.country,
           region:response.data.state,
         })
        })
      }
  render () {
    const { country, region } = this.state;
    return (
      <div>
     <CountryDropdown
          value={country}
          className="country"
          onChange={(val) =>{ this.selectCountry(val)}}
          // defaultValue={this.state.country} 
          />
        <RegionDropdown
          country={country}
          value={region}
          // defaultValue={this.state.country}
          className="country reg "
          onChange={(val) => {this.selectRegion(val)}} />
      </div>
    );
  }
}
export default ListCountries;