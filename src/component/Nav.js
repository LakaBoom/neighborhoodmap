import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Nav extends Component{
  render(){
    const {query,filter, restaurants,onCategoryChange, onInputChange, onMouseOverList, onMouseOutList, onClickedList} = this.props
    var categoryList=[]
    if(restaurants){
      restaurants.forEach(res=>{
        if(!categoryList.includes(res.categories[0].name)){
          categoryList.push(res.categories[0].name)
        }
      })
      categoryList.sort()
    }  
    categoryList.splice(0,0,'All Category')

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

  showingRestaurants.sort(sortBy('name'))

    return(
      <div role='menubar' className = 'menu-list'>
        <div className ='user-choose'>
          <div className = 'select'>
            <label htmlFor = 'categorySelector'>Select a Category</label>
              <select id='categorySelector' onChange = {onCategoryChange} placeholder='All Category'>
                {categoryList.map((c,index)=> <option key={index} value={c}>{c}</option>)}
              </select>

            </div>
            <div className = 'input'>
              <label htmlFor="nameSelector">Type the name of restaurant</label>
                <input
                  role ='search'
                  id="nameSelector"
                  type = 'text'
                  placeholder ='Restaurant Name'
                  value = {query}
                  onChange={onInputChange}/>
            </div>
          </div>

          <div className='result-list'>
              {(showingRestaurants.length === 0)&&
                (<p className ='notFoundResult' tabIndex = '0'> Not found related restaurants.</p>)}
              <ul>
                {showingRestaurants.map((res,index)=>
                  <li
                  className = 'restaurant-list'
                  aria-labelledby = {res.name}
                  data-label = {index+1}
                  data-title = {res.name}
                  data-lat= {res.location.lat}
                  data-lng= {res.location.lng}
                  data-category = {res.categories[0].name}
                  data-address ={res.location.address+',' + res.location.city+',' +res.location.state+',' +res.location.country+','+res.location.postalCode}
                  data-url ={(res.delivery)&&(res.delivery.url)?res.delivery.url:'#'}
                  id = {res.id}
                  key = {res.id}
                  tabIndex='0'
                  onMouseOver = {onMouseOverList.bind(this)}
                  onMouseOut = {onMouseOutList.bind(this)}
                  onClick={onClickedList.bind(this)}>
                    <span  className= 'labelNumber'>{index+1}</span>
                    <p className= 'restaurantName' >{res.name}</p>
                  </li>
                )}
              </ul>
            </div>
        </div>
    )
  }
}

export default Nav
