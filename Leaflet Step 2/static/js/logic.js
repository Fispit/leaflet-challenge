var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var test;
var q1;
var q2;
var q3;
var mintest=99999999999;
var maxtest=0;

//import geojson file






d3.json(url).then(function(data){



  // for (var i = 0; i < data.features.length; i++) {
  //   var compdata= data.features[i].geometry.coordinates[2];
  
  //   if(compdata>maxtest){
  //     maxtest=compdata;};
  //   if(compdata<mintest){
  //     mintest=compdata;
  //  };

  // };
  maxtest=100;
  mintest=-5;
  var q2=(maxtest+mintest)/2;
  var q1=(mintest+q2)/2;
  var q3=(maxtest+q2)/2;
  console.log("Inside")
  console.log(q3);
  console.log(q2);
  console.log(q1);
  
  createfeatures(data,q1,q2,q3,mintest,maxtest);
});

function createfeatures(earthquakedata,q1,q2,q3,mindepth,maxdepth){
  var earthquakemarkers=[];


  
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h2>" + feature.properties.place +
      "</h2><hr><h3>Magnitude: "+feature.properties.mag+"</h3><hr><h3>depth: "+feature.geometry.coordinates[2]+"</h3><p>Time: " + new Date(feature.properties.time) + "</p>");
  

    }

        
    //#51f542 //green
    //#f5f542 //yellow
    //#f59642 //orange
    //#ed2424 //red
  function pointtolayer(feature){
    function choosecolor(depth){
      if(depth<=q1){
      return "#51f542"
      }
      else if(depth<=q2){
        return "#f5f542"
      }
      else if(depth<=q3){
        return "#f59642"
      }
      else if(depth<=maxdepth){
        return "#ed2424"
      }
      else{
        return "Black"
      }

    }  





    //        fillColor:choosecolor(feature.geometry.coordinates[2]),
    //color:choosecolor(feature.geometry.coordinates[2]),
    var markeroptions={
        radius:feature.properties.mag*2.5,
        fillColor:choosecolor(feature.geometry.coordinates[2]),
        color:choosecolor(feature.geometry.coordinates[2]),
        weight:1,
        opacity: 1,
        fillOpacity: 1
      }
      //console.log(feature.geometry.coordinates[2])
    


      latlng=[feature.geometry.coordinates[1],feature.geometry.coordinates[0]]
      return L.circleMarker(latlng, markeroptions)
      


  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakedata, {
    onEachFeature: onEachFeature,
    pointToLayer: pointtolayer
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes,q1,q2,q3,mindepth,maxdepth);

  function createMap(earthquakes,q1,q2,q3,mindepth,maxdepth){
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
    
    // Create an overlay object
    var overlayMaps = {
      Earthquakes: earthquakes
    };
    
    // Define a map object
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [lightmap,earthquakes]
    });
    
    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps,{
      collapsed: true
    }).addTo(myMap);

    //Adding a Legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = [mindepth,q1,q2,q3,`${maxdepth}+`];
      var colors = ["#51f542","#f5f542" ,"#f59642" ,"#ed2424", "Black" ];
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Earthquake Depth</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
    
    

  }
}
// console.log("outside")
// console.log(maxtest)
// console.log(q3);
// console.log(q2);
// console.log(q1);
// console.log(mintest)