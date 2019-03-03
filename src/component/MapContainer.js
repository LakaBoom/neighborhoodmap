import React, {Component} from 'react'
import {Map, InfoWindow,Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp'
import placeholder from '../css/icons/placeholder.svg'

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
    marker.setIcon(this.iconMaker(placeholder))
  }

  onMouseoverMarker=(props,marker,e)=>{
    var highlightedIcon = this.iconMaker(placeholder)
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

    const { restaurants,filter,query, google ,clickedList,mouseOvered, activeListInfo} = this.props
    const { activeMarker, selectedPlace, showingInfo,userClick} = this.state

    var showingRestaurants;

    if(filter === 'All Category'){ // no category selected
      if(query){//have input
        const match = new RegExp(escapeRegExp(query),'i')
        showingRestaurants = restaurants.filter(res=> match.test(res.name))
      }else{ //  no input
        showingRestaurants = restaurants
      }
    }else{// have category selected
      showingRestaurants= restaurants.filter(res=> res.categories[0].name === filter)//no input
      if(query){ // havev input
        const match = new RegExp(escapeRegExp(query),'i')
        showingRestaurants = showingRestaurants.filter(res=> match.test(res.name))
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
      var point = new google.maps.LatLng(showingRestaurants[i].location.lat,
                                         showingRestaurants[i].location.lng)
      bounds.extend(point)
    }

    if ((bounds.getNorthEast().lat()-bounds.getSouthWest().lat() <= 0.001) &&
        (bounds.getNorthEast().lng() - bounds.getSouthWest().lng() <= 0.001)
        ){

      bounds.extend(new google.maps.LatLng(bounds.getNorthEast().lat()+0.003,
                                           bounds.getNorthEast().lng()+0.003))
      bounds.extend(new google.maps.LatLng(bounds.getSouthWest().lat()-0.003,
                                           bounds.getSouthWest().lng()-0.003))
    }

    return (
      <Map
        google={google}
        bounds = {bounds}
        onClick = {this.onMapClick}
        >
        {showingRestaurants.map((restaurant,index) => (
        (((userClick)&&(userClick.title === restaurant.name))||
        ((mouseOvered)&&(restaurant.id.toString()===mouseOvered))||(clickedList))?<Marker
                  key = {restaurant.id}
                  title ={restaurant.name}
                  label={((clickedList)&&(clickedList.dataset))?clickedList.dataset.label:`${index+1}`}
                  position ={new google.maps.LatLng(restaurant.location.lat,
                                                     restaurant.location.lng)}
                  onClick = {this.onMarkerClick}
                  address = {restaurant.location.address+',' + restaurant.location.city+',' +restaurant.location.state+',' +restaurant.location.country+','+restaurant.location.postalCode}
                  category = {restaurant.categories[0].name}
                  URL = {(restaurant.delivery)&&(restaurant.delivery.url)?restaurant.delivery.url:'#'}
                  icon = {this.iconMaker(placeholder)}
                  onMouseover={this.onMouseoverMarker}
                  onMouseout ={this.onMouseoutMarker}/>:
        <Marker
          key = {restaurant.id}
          title ={restaurant.name}
          label={((clickedList)&&(clickedList.dataset))?clickedList.dataset.label:`${index+1}`}
          position ={new google.maps.LatLng(restaurant.location.lat,
                                             restaurant.location.lng)}
          onClick = {this.onMarkerClick}
          address = {restaurant.location.address+',' + restaurant.location.city+',' +restaurant.location.state+',' +restaurant.location.country+','+restaurant.location.postalCode}
          category = {restaurant.categories[0].name}
          URL = {(restaurant.delivery)&&(restaurant.delivery.url)?restaurant.delivery.url:'#'}
          onMouseover={this.onMouseoverMarker}
          onMouseout ={this.onMouseoutMarker}
        />
        ))}

        <InfoWindow
              google={google}
              className='infoWindow'
              visible = {activeListInfo}
              position = {(clickedList)?new google.maps.LatLng(clickedList.dataset.lat,clickedList.dataset.lng):undefined}
          >
          <div>
            <a className = 'info_link' href = {(clickedList)?clickedList.dataset.url:'#'}>{(clickedList)?clickedList.dataset.title:'unavailable'}</a>
            <div className = 'info_category'>{(clickedList)?clickedList.dataset.category:'unavailable'}</div>
            <span className = 'info_address'>{(clickedList)?clickedList.dataset.address:'unavailable'}</span>
          </div>
        </InfoWindow>

        <InfoWindow
          google = {google}
          className = 'infoWindow'
          marker = {activeMarker}
          visible = {showingInfo}
          onClose = {this.onCloseInfowindow}
          >
          <div>
            <a className = 'info_link' href = {selectedPlace.URL}>{selectedPlace.title}</a>
            <div className = 'info_category'>{selectedPlace.category}</div>
            <span className = 'info_address'>{selectedPlace.address}</span>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

const LoadingContainer = (props) => (
  <div className = 'noMapPage'> No Internet Connection</div>
)
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD_IBcj1SARmEqoebgGG8z92lBw3EEdgz4',
  LoadingContainer:LoadingContainer,
})(MapContainer)
