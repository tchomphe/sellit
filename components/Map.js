import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      address: "96 Jameson Ave., Toronto, ON, Canada",
      zoom: 12
    }
  }  

  render() {
    return (
      <div>
      <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=640x400&maptype=roadmapkey=AIzaSyBcxF_7FH1aEC4g6CGCvq7WPz1LCisZt3A" />
      </div>
    );
  }
}

export default Map;