var hurricane = new L.LayerGroup();

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 524,
    maxZoom: 19,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
});

var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 524,
    maxZoom: 19,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
});

var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 524,
    maxZoom: 19,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
});

var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 524,
    maxZoom: 19,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});

var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 524,
    maxZoom: 19,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});


var baseMaps = {
    "Dark Mode": darkMap,
    "Light Mode": lightMap,
    "Outdoor Mode": outdoorMap,
    "Satellite Mode": satelliteMap,
    "Street Mode": streetMap
};


var overlayMaps = {
    "Harvey": hurricane,
};


var myMap = L.map("map", {
    center: [35.30, -92.00],
    zoom: 5,
    layers: [lightMap, hurricane]
});


L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

(function() {'use strict';
  
    var map = L.map('mapContainer');
  
    $.get('Harvey.csv', function(csvContents) {
      var geoLayer = L.geoCsv(csvContents, {firstLineTitles: true, fieldSeparator: ','});
      map.addLayer(geoLayer);
    });
  });



