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
  componentWillMount(){    
    var filtered_address = (this.props.address).replace(/\s/g, "+");
    // console.log('componentWillMount:this.props.address:'+(this.props.address).toString());
    // console.log('componentWillMount:this.state.address:'+(this.state.address).toString());
    // console.log('FILTERED ADDRESS:'+ filtered_address);
    Request
      // .get("https://maps.googleapis.com/maps/api/geocode/json?address="+filtered_address.toString()+"&key=AIzaSyD86X7QJpRthF_OfvzcftUNlPg1kzg6sKo")
      .get('https://maps.googleapis.com/maps/api/geocode/json?address=96+Jameson+Ave,+Toronto+ON&key=AIzaSyD86X7QJpRthF_OfvzcftUNlPg1kzg6sKo')
      .end((err, res) => {
        if(err){
          // console.log('error!')
        }
        else{          
          this.setState({
            lat: res.body.results[0].geometry.location.lat,
            lng: res.body.results[0].geometry.location.lng,
          });          
        }
      });
    }

  render() {
    // var filtered_address = (this.props.address).replace(/\s/g, "+");
    var glink = "https://maps.googleapis.com/maps/api/staticmap?center="+this.state.lat+","+this.state.lng+"&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:C%7C"+this.state.lat+','+this.state.lng+"&key=AIzaSyBcxF_7FH1aEC4g6CGCvq7WPz1LCisZt3A";
    return (
      <div>         
        <img src={glink} />    
        <p>this.props.address: {this.props.address}</p>
        <p>this.state.address: {this.state.address}</p>
        {/* <p>filtered_address: {filtered_address}</p>   */}
        <p>lat: {this.state.lat}, lng: {this.state.lng}</p>                
      </div>
    );
  }
}

export default Map;