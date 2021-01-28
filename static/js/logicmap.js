const tracker = new L.LayerGroup();

const darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 20,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
});

const lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 25,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
});

const outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 25,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
});

const satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 25,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});

const streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Â© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> Â© <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 25,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

const overlayMaps = {
    "Harvey": tracker,

};

const baseMaps = {
    "Dark Mode": darkMap,
    "Light Mode": lightMap,
    "Outdoor Mode": outdoorMap,
    "Satellite Mode": satelliteMap,
    "Street Mode": streetMap
};

const myMap = L.map("map", {
    center: [28.043892, -96.910181],
    zoom: 5,
    layers: [satelliteMap]
});

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);


var hurricaneIcon = L.icon({iconUrl:"https://img.icons8.com/material-rounded/48/4a90e2/hurricane.png"})
var waterIcon = L.icon({iconUrl:"https://img.icons8.com/color/48/000000/flood-car.png"})

d3.csv("../static/data/Harvey.csv", function(harveyData) {
    for (var i in harveyData) {
        var row = harveyData[i];

        var marker = L.marker([row.LAT, row.LON],{icon: hurricaneIcon}).addTo(myMap)
    }
});


d3.csv("../static/data/HighWaterMarkers.csv", function(waterData){
    for (var j in waterData) {
        var newrow = waterData[j];
        
        var marker = L.marker([newrow.latitude, newrow.longitude],{icon: waterIcon}).addTo(myMap)
    }
});
