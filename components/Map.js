import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      address: this.props.address,
      zoom: 13
    }
  }  

  render() {
    var filtered_address = (this.props.address).replace(/\s/g, "+");
    var glink = "https://maps.googleapis.com/maps/api/staticmap?center="+filtered_address.toString()+"&zoom=13&size=640x400&maptype=roadmapkey=AIzaSyBcxF_7FH1aEC4g6CGCvq7WPz1LCisZt3A";
    return (
      <div>
         {/* <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=640x400&maptype=roadmapkey=AIzaSyBcxF_7FH1aEC4g6CGCvq7WPz1LCisZt3A" />    */}
            <img src={glink} />    
        <p>this.props.address: {this.props.address}</p>
        <p>this.state.address: {this.state.address}</p>
        <p>filtered_address: {filtered_address}</p>
      </div>
    );
  }
}

export default Map;