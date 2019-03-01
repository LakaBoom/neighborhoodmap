import React, { Component } from 'react';
import '../css/App.css';
import Map from './MapContainer'
import * as RestaurantAPI from './RestaurantAPI'
import Nav from './Nav'

class App extends Component {

  state = {
    restaurants:[],
    filter:'All Category',
    query:'',
    mouseOvered:'',
    clickedList:''
  }

  componentDidMount(){
    this.updateState()
  }


  updateState = ()=>{
    RestaurantAPI.getAll()
    .then(data=>data.restaurants)
    .then(tempRestaurants =>{
      this.setState({
        restaurants:tempRestaurants
      })
    })
    .catch(error=>console.log(error))
  }

  onCategoryChange = (event)=>{
    var selected = event.target.value
    this.setState({
      filter:selected,
      clickedList:'',
      mouseOvered:'',
      query:''
    })
  }

  onInputChange = (event)=>{
    this.setState({
      query:event.target.value,
      clickedList:'',
      mouseOvered:''
    })
  }

  onMouseOverList = (event)=>{
    if(this.state.clickedList.id!== event.currentTarget.id){
      this.setState({
        clickedList:''
      })
    }
    this.setState({mouseOvered:event.currentTarget.id})
  }

  onMouseOutList =()=>{
    this.setState({mouseOvered:''})
  }

  onClickedList = (event) =>{
    this.setState({clickedList:event.currentTarget})
  }

  toggleNav=()=>{
    document.querySelector('.app').classList.toggle('openNav')
    document.querySelector('.menuIcon').classList.toggle('closeIcon')
    if(document.querySelector('.menuIcon').classList.contains('closeIcon')){
      document.querySelector('.closeIcon').setAttribute('aria-label','close')
    }else{
      document.querySelector('.menuIcon').setAttribute('aria-label','menu')
    }
  }

  render() {
    return (
      <div className ='app'>
        <header>
          <h1  className ='title' tabIndex='0'>Best Food in Bay Area</h1>
          <div className = 'menuIcon' tabIndex='0' aria-label='menu' onClick ={this.toggleNav}></div>
        </header>

        <nav role='navigation' tabIndex='0' className='menu'>
            <Nav
            restaurants = {this.state.restaurants}
            onCategoryChange = {this.onCategoryChange}
            onInputChange = {this.onInputChange}
            query = {this.state.query}
            filter = {this.state.filter}
            showingRestaurants = {this.state.showingRestaurants}
            onMouseOverList = {this.onMouseOverList}
            onMouseOutList = {this.onMouseOutList}
            onClickedList = {this.onClickedList}
            />
          </nav>

        <main role='main'>
          <div role='application' id='map'>
            <Map restaurants = {this.state.restaurants}
                  filter = {this.state.filter}
                  query = {this.state.query}
                  clickedList = {this.state.clickedList}
                  mouseOvered = {this.state.mouseOvered}
                  />
          </div>
        </main>
      </div>
    )
  }
}

export default App;
