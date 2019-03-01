import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp'

export class MapContainer extends Component {

  state ={
    activeMarker:{},
    selectedPlace:{},
    showingInfo:false,
    userClick:''
  }

  componentDidMount(){
    this.forceUpdate()
  }

  onMapClick = (props)=>{
    if(this.state.showingInfo){
      // set icon to default when click on the map
      if(this.state.userClick){
        this.state.userClick.setIcon(null)
      }
      this.setState({
        showingInfo:false,
        activeMarker:null,
        userClick:''
      })
    }
  }

  onMarkerClick = (props,marker,e)=>{
  //  e.preventDefault()
    if((this.state.userClick)&&this.state.userClick.title!== marker.title){// when user change another marker to click
      this.state.userClick.setIcon(null) // change back the previous clicked mark icon
    }
    this.setState({
      activeMarker:marker,
      selectedPlace:props,
      showingInfo:true,
      userClick:marker
    })
    marker.setIcon(this.iconMaker("http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png"))
  }

  onMouseoverMarker=(props,marker,e)=>{
    var highlightedIcon = this.iconMaker("http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Inside-Pink-icon.png")
    marker.setIcon(highlightedIcon)
  }

  onMouseoutMarker=(props,marker,e)=>{
    if(this.props.clickedList){
      if(this.props.clickedList.dataset.title!== marker.title){
        marker.setIcon(null)
      }
    }else{
      if(marker.title !== this.state.userClick.title){
        marker.setIcon(null)
      }
    }
  }

  iconMaker=(url)=>{
    var icon = {url:url,
      size: new this.props.google.maps.Size(40, 43),
      origin:new this.props.google.maps.Point(0, 0),
      anchor:new this.props.google.maps.Point(20, 43),
      scaledSize:new this.props.google.maps.Size(40,43)}
    return icon
  }

  onCloseInfowindow=()=>{
    this.setState({
      showingInfo:false,
      activeMarker:null,
      userClick:''
    })
  }


  render() {

    const { restaurants,filter,query, google ,clickedList,mouseOvered} = this.props
    const { activeMarker, selectedPlace, showingInfo,userClick} = this.state

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
       showingRestaurants = restaurants.filter(res=> res.id.toString() === clickedList.id)
    }
    // handle when no corresponding result
    if(showingRestaurants.length === 0){
      showingRestaurants = restaurants
    }

    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i<showingRestaurants.length; i++){
      var point = new google.maps.LatLng(showingRestaurants[i].properties.Location["Geo Coordinates"].Latitude,
                                         showingRestaurants[i].properties.Location["Geo Coordinates"].Longitude)
      bounds.extend(point)
    }

    if(showingRestaurants.length ===1){
      var bounds2= new google.maps.LatLngBounds()
      bounds2.extend(new google.maps.LatLng(showingRestaurants[0].properties.Location["Geo Coordinates"].Latitude+0.05,
                                           showingRestaurants[0].properties.Location["Geo Coordinates"].Longitude+0.05))
      bounds2.extend(new google.maps.LatLng(showingRestaurants[0].properties.Location["Geo Coordinates"].Latitude-0.05,
                                           showingRestaurants[0].properties.Location["Geo Coordinates"].Longitude-0.05))
    }

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return (
      <Map
        google={google}
        bounds = {showingRestaurants.length===1? bounds2:bounds}
        zoon ={10}
        onClick = {this.onMapClick}
        >
        {showingRestaurants.map((restaurant,index) => (
        (((userClick)&&(userClick.title === restaurant.properties.Title))||
        ((mouseOvered)&&(restaurant.id.toString()===mouseOvered))||(clickedList))?<Marker
                  key = {restaurant.id}
                  title ={restaurant.properties.Title}
                  label={((clickedList)&&(clickedList.dataset))?clickedList.dataset.label:labels[index % labels.length]}
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
          label={((clickedList)&&(clickedList.dataset))?clickedList.dataset.label:labels[index % labels.length]}
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
          onClose = {this.onCloseInfowindow}
          >
          <div>
            <a className = 'info_link'href = {selectedPlace.URL}>{selectedPlace.title}</a>
            <div className = 'info_category'>{selectedPlace.category}</div>
            <span className = 'info_address'>{selectedPlace.address}</span>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD4tnh6ycktKrrrZtZTlNdg7tulQih4r84'
})(MapContainer)
