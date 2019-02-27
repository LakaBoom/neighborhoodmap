import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp';

export class MapContainer extends Component {

  state ={
    activeMarker:{},
    selectedPlace:{},
    showingInfo:false
  }

  componentDidMount(){
    this.forceUpdate()
  }

  onMapClick = (props)=>{
    if(this.state.showingInfo){
      this.setState({
        showingInfo:false,
        activeMarker:null
      })
    }
  }

  onMarkerClick = (props,marker,e)=>{
  //  e.preventDefault()
    this.setState({
      activeMarker:marker,
      selectedPlace:props,
      showingInfo:true
    })
  }

  onMouseoverMarker=(props,marker,e)=>{
    var highlightedIcon = this.iconMaker("http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png")
    marker.setIcon(highlightedIcon)
  }

  onMouseoutMarker=(props,marker,e)=>{
    marker.setIcon(null)
  }

  iconMaker=(url)=>{
    var icon = {url:url,
      size: new this.props.google.maps.Size(40, 43),
      origin:new this.props.google.maps.Point(0, 0),
      anchor:new this.props.google.maps.Point(20, 43),
      scaledSize:new this.props.google.maps.Size(40,43)}
    return icon
  }

  render() {
    const { restaurants,filter,query, google ,clickedList,mouseOvered} = this.props
    const { activeMarker, selectedPlace, showingInfo} = this.state

    var showingRestaurants;

    if(filter === 'All Category'){ // no category selected
      if(query){//have input
        const match = new RegExp(escapeRegExp(query),'i')
        showingRestaurants = restaurants.filter(res=> match.test(res.properties.Title))
      }else{ //  no input
        showingRestaurants = restaurants
      }
    }else{// have category selected
      showingRestaurants= restaurants.filter(res=> res.category === filter)//no input
      if(query){ // havev input
        const match = new RegExp(escapeRegExp(query),'i')
        showingRestaurants = showingRestaurants.filter(res=> match.test(res.properties.Title))
      }
    }

    if(clickedList){
      showingRestaurants = restaurants.filter(res=> res.id.toString() === clickedList)
    }

    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i<showingRestaurants.length; i++){
      var point = new google.maps.LatLng(showingRestaurants[i].properties.Location["Geo Coordinates"].Latitude,
                                         showingRestaurants[i].properties.Location["Geo Coordinates"].Longitude)
      bounds.extend(point)
    }
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    return (
      <Map
        google={google}
        bounds={bounds}
        onClick = {this.onMapClick}
        >
        {console.log(showingRestaurants,mouseOvered)}
        {showingRestaurants.map((restaurant,index) => (
        ((mouseOvered)&&(restaurant.id.toString()===mouseOvered))?<Marker
                  key = {restaurant.id}
                  title ={restaurant.properties.Title}
                  label = {labels[labelIndex++ % labels.length]}
                  position ={new google.maps.LatLng(restaurant.properties.Location["Geo Coordinates"].Latitude,
                                                     restaurant.properties.Location["Geo Coordinates"].Longitude)}
                  onClick = {this.onMarkerClick}
                  address = {restaurant.properties.Location.Address}
                  category = {restaurant.category}
                  URL = {restaurant.properties["Google Maps URL"]}
                  icon = {this.iconMaker("http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png")}
                  onMouseover={this.onMouseoverMarker}
                  onMouseout ={this.onMouseoutMarker}/>:
        <Marker
          key = {restaurant.id}
          title ={restaurant.properties.Title}
          label = {labels[labelIndex++ % labels.length]}
          position ={new google.maps.LatLng(restaurant.properties.Location["Geo Coordinates"].Latitude,
                                             restaurant.properties.Location["Geo Coordinates"].Longitude)}
          //animation= {google.maps.Animation.DROP}
          onClick = {this.onMarkerClick}
          address = {restaurant.properties.Location.Address}
          category = {restaurant.category}
          URL = {restaurant.properties["Google Maps URL"]}
          onMouseover={this.onMouseoverMarker}
          onMouseout ={this.onMouseoutMarker}
        />
        ))}

        <InfoWindow
          className = 'infoWindow'
          marker = {activeMarker}
          visible = {showingInfo}
          >
          <div>
            <a href = {selectedPlace.URL}>{selectedPlace.title}</a>
            <div className = 'category_block'>{selectedPlace.category}</div>
            <span>{selectedPlace.address}</span>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD4tnh6ycktKrrrZtZTlNdg7tulQih4r84'
})(MapContainer)
