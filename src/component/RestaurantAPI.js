
const database_URL= "http://localhost:3000/data/restaurants.json"
const headers = {
  'Accept': 'application/json'
}
export const getAll = () =>
  fetch(database_URL, { headers })
    .then(res => res.json())
    .catch(err => {
          document.querySelector('.app').innerHTML = `<div class = 'noDataPage'>
                                                      <div> Not able to fetch data :( </div>
                                                      <p> error: ${err} </p>
                                                      </div>`
      })
