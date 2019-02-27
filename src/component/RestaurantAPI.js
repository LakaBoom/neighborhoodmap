
const database_URL= "http://localhost:3000/data/restaurants.json"
const headers = {
  'Accept': 'application/json'
}
export const getAll = () =>
  fetch(database_URL, { headers })
    .then(res => res.json())
    .then(data => data.restaurants)
