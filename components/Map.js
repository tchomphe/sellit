import React, { Component } from 'react';
import Request from 'superagent';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      address: this.props.address,
      lat: "",
      lng: "",
      err: "",
    }
  }

    // Geocoding done in componentWillReceiveProps because props are empty in componentDidMount on it's first run.
    // First run is empty because MainPage calls PostModal with empty props in it's initial state.
    componentDidMount(){
    var filtered_address = (this.props.address).replace(/\s/g, "+");
    Request
      .get("https://maps.googleapis.com/maps/api/geocode/json?address="+filtered_address.toString()+"&key=AIzaSyD86X7QJpRthF_OfvzcftUNlPg1kzg6sKo")
      .end((err, res) => {
        if(err){
          console.log('error!')
        }
        else {
          this.setState({
            lat: res.body.results[0].geometry.location.lat,
            lng: res.body.results[0].geometry.location.lng,
          });
        }
      });
    }

  render() {
    var glink = "https://maps.googleapis.com/maps/api/staticmap?center="+this.state.lat+","+this.state.lng+"&zoom=14&size=500x120&maptype=roadmap&markers=color:red%7Clabel:C%7C"+this.state.lat+','+this.state.lng+"&key=AIzaSyBcxF_7FH1aEC4g6CGCvq7WPz1LCisZt3A";
    return (
      <div>
        <img src={glink} style={{width: '100%'}}/>
      </div>
    );
  }
}
export default Map;