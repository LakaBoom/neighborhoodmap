#Neighborhood Map React project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##Overview

This app is the map that displaying all the restaurants that I like in Bay Area, also recommend you these restaurants.

## Installment

  `npm install --save-dev google-maps-react escape-string-regexp sort-by sw-precache`

###Dependencies

  `google-maps-react`
  `sw-precache`
  `sort-by`
  `escape-string-regexp`


## Run scripts  

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run-script build && sw-precache --config=sw-precache-config.js`

Builds the app for production to the `build` folder.<br>

##API used

Google Maps API for the Map.

##Helped Links

- All the icons are from https://www.flaticon.com/
- Service worker is guided by https://medium.freecodecamp.org/how-to-customize-service-workers-with-create-react-app-4424dda6210c

## Problems met

- When cache the google maps api, keeps showing error: Couldn't solve this problem, please give some advices.
 > Access to fetch at 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD_IBcj1SARmEqoebgGG8z92lBw3EEdgz4&callback=loaderCB01551493577177&libraries=places&v=3&language=en' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
