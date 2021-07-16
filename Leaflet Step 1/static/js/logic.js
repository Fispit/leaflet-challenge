var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"




var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});


// Create a baseMaps object
var baseMaps = {
  "Light Map": lightmap
};


//import geojson file
varearthquakemarkers=[];





d3.json(url).then((data)=>{

 console.log(data)



});




// Create an overlay object
var overlayMaps = {

};

// Define a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [lightmap]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, {
  collapsed: true
}).addTo(myMap);
