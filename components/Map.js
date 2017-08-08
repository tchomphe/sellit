import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 10
    }
  }  

  render() {
    return (
      <div className="GMap">
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >        
      </GoogleMapReact>
      </div>
    );
  }
}

export default Map;