import axios from 'axios'

const database_URL='https://api.foursquare.com/v2/venues/explore?'

const parameters={
  client_id:'UD32LRWYYUW4Z4BJRTIIDQYYR5L4PYETWVJEJ2OKRDA324YR',
  client_secret:'VWISQ4LN3L35QWANEP2MCZLLC442HGRHMGMRVBULKLTYTLUA',
  query :'food',
  near :'Mountain View',
  v:'20190302'
}

export const getAll = () =>
  axios(database_URL+ new URLSearchParams(parameters))
    .then(res=>res.data.response.groups[0].items)
    .catch(err => {
          document.querySelector('.result-list').innerHTML = `<div class = 'noDataPage'>
                                                      <div> Not able to fetch data :( </div>
                                                      <p> error: ${err} </p>
                                                      </div>`
     })
