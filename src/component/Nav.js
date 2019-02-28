import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Nav extends Component{

  render(){
    const {query,filter, restaurants,onCategoryChange, onInputChange, onMouseOverList, onMouseOutList, onClickedList} = this.props

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

   showingRestaurants.sort(sortBy('properties.Title'))

   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return(
      <div className = 'menu-list'>
        <div className ='user-choose'>
          <div className = 'select'>
            <label htmlFor = 'categorySelector'></label>
              <select id='categorySelector' onChange = {onCategoryChange}>
                <option value = 'All Category' placeholder = 'All Category'>All Category</option>
                <option value = 'Dining'> Dining </option>
                <option value = 'Hotpot'> Hotpot </option>
                <option value = 'BBQ'>BBQ</option>
                <option value ='Noodle'>Noodle</option>
                <option value = 'Desert & Drinks'> Desert & Drinks</option>
              </select>
            </div>
            <div className = 'input'>
              <label htmlFor="nameSelector"></label>
                <input
                  id="nameSelector"
                  type = 'text'
                  placeholder ='Restaurant Name'
                  value = {query}
                  onChange={onInputChange}/>
            </div>
          </div>

          <div className='result-list'>
              {(showingRestaurants.length === 0)&&
                (<p> Not found related restaurants.</p>)}
              <ul>
                {showingRestaurants.map((res,index)=>
                  <li
                  className = 'restaurant-list'
                  data-label = {labels[index % labels.length]}
                  id = {res.id}
                  key = {res.id}
                  onMouseOver = {onMouseOverList.bind(this)}
                  onMouseOut = {onMouseOutList.bind(this)}
                  onClick={onClickedList.bind(this)}>
                    <span  className= 'labelNumber'>{labels[index % labels.length]}</span>
                    <p className= 'restaurantName'>{res.properties.Title}</p>
                  </li>
                )}
              </ul>
            </div>
        </div>
    )
  }
}

export default Nav
