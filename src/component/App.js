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
      clickedList:''
    })
  }

  onInputChange = (event)=>{
    this.setState({
      query:event.target.value,
      clickedList:''
    })
  }

  onMouseOverList = (event)=>{
    this.setState({mouseOvered:event.target.id})
  //  return event.target.id
  }

  onMouseOutList =()=>{
    this.setState({mouseOvered:''})
  }

  onClickedList = (event) =>{
    this.setState({clickedList:event.target.id})
  }

  openNav=()=>{
    document.querySelector('.menu').style.width='250px'
    document.querySelector('main').style.marginLeft = "250px"
    document.querySelector('.title').style.marginLeft = "250px"
  }

  closeNav=()=>{
    document.querySelector('.menu').style.width='0'
    document.querySelector('main').style.marginLeft = "0"
    document.querySelector('.title').style.marginLeft = "0"
  }



  render() {
  //  var mouseOvered = this.onMouseOverList()
    return (
      <div className ='app'>
      {console.log(this.state)}
        <header>
          <div className = 'menuIcon' onClick ={this.openNav}></div>
          <h2 className ='title'>Best Food in Bay Area</h2>
        </header>

        <nav className='menu hidden'>
          <span className="closebtn" onClick={this.closeNav}>&times;</span>
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
