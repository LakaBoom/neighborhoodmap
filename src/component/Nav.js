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

    return(
      <div>
        <div>
          <label htmlFor = 'categorySelector'></label>
            <select id='categorySelector' onChange = {onCategoryChange}>
              <option value = 'All Category' placeholder = 'All Category'>All Category</option>
              <option value = 'Dining'> Dining </option>
              <option value = 'Hotpot'> Hotpot </option>
              <option value = 'BBQ'>BBQ</option>
              <option value ='Noodle'>Noodle</option>
              <option value = 'Desert & Drinks'> Desert & Drinks</option>
            </select>
            <label htmlFor="nameSelector"></label>
              <input
                id="nameSelector"
                type = 'text'
                value = {query}
                onChange={onInputChange}/>
              <button onSubmit = {this.onQuerySubmit}>Submit</button>
                {(showingRestaurants.length === 0)&&
                  (<div> Not found related restaurants.</div>)}
                <ul>
                  {showingRestaurants.map(res=>
                    <li
                    className = 'restaurant-list'
                    id = {res.id}
                    key = {res.id}
                    onMouseOver = {onMouseOverList}
                    onMouseOut = {onMouseOutList}
                    onClick ={onClickedList}>
                      {res.properties.Title}
                    </li>
                  )}
                </ul>
          </div>
      </div>


    )
  }
}

export default Nav
