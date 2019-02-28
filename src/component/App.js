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
    .then(tempRestaurants =>{
      this.setState({
        restaurants:tempRestaurants
      })
    })
    .catch(err => console.log(err))
  }

  onCategoryChange = (event)=>{
    var selected = event.target.value
    this.setState({
      filter:selected,
      clickedList:'',
      mouseOvered:''
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
  }

  render() {
    return (
      <div className ='app'>
        <header>
          <div className = 'menuIcon' onClick ={this.toggleNav}></div>
          <h2 className ='title'>Best Food in Bay Area</h2>
        </header>

        <nav className='menu'>
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

        <main>
          <div id='map'>
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
