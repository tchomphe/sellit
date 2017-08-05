import React from 'react';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            zoom:15
        }
    }

	render() {
    return <div className="map">
      <div className='map-canvas' ref="mapCanvas">
      </div>
    </div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.marker = this.createMarker();
    this.infoWindow = this.createInfoWindow();
  
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created    
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map);
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    });
	}

  createInfoWindow() {
    return new google.maps.InfoWindow({
      map: this.map,
    });
  }
}

export default Map;