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






d3.json(url).then(function(data){
  createfeatures(data);
});

function createfeatures(earthquakedata){
  var earthquakemarkers=[];
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  function pointtolayer(feature){
      var markeroptions={
        radius:feature.properties.mag,
        fillColor:"Red",
        color:"Red",
        weight:1,
      }
      latlng=[feature.geometry.coordinates[1],feature.geometry.coordinates[0]]
      return L.circleMarker(latlng, geojsonMarkerOptions)



  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakedata, {
    onEachFeature: onEachFeature,
    pointToLayer: pointtolayer
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

  
}


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

