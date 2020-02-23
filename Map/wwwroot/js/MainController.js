﻿mapboxgl.accessToken = 'pk.eyJ1IjoiZGVuaXNrMjAwMCIsImEiOiJjazRyaDVmNDQwcWVrM2dwNGQ0ZHQwdnd2In0.QBIPRRvLfwc6LvySuaJ1Ew';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    preserveDrawingBuffer: true,
    center: [32.4040917, 46.5311013],
    zoom: baseZoom
});

UpdateControls();

// geolocate control
var geolocate = new mapboxgl.GeolocateControl();
map.addControl(geolocate);

geolocate.on('geolocate', function (e) {
    var lon = e.coords.longitude;
    var lat = e.coords.latitude;
    var position = [lon, lat];
    console.log(position);
});

map.on('mouseup', function (e) {
    UpdateLatLngControls();
});

map.on('click', function (e) {

    var x = e.lngLat.wrap().lng;
    var y = e.lngLat.wrap().lat;

    console.log(x, y);

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat([x,y])
        .addTo(map);

    // todo add it like another function (to move to borders of screen by x and y)
    var offset = (x - map.getCenter().lng);
    x = x+offset;

    map.setCenter([x, map.getCenter().lat]);
    UpdateControls();
});

// get current zoom
map.on('wheel', function (e) {
    UpdateZoom();
});

var currentMap = "satellite-v9";

function ChangeMap() {
    if (currentMap == "satellite-v9") {
        currentMap = "cjaudgl840gn32rnrepcb9b9g";
    } else {
        currentMap = "satellite-v9";
    }
    map.setStyle('mapbox://styles/mapbox/' + currentMap);
}

function GrayScale() {
    map.setStyle('mapbox://styles/denisk2000/ck6zan8ql33651iqtbk57l0lx');
}

function GetImage() {
    var img = map.getCanvas().toDataURL('image/png', 1.0).split(',')[1];
    console.log(img);

    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + img; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
}

function Start(loopsNumber) {
    var center = map.getCenter();
    var x = center.lat;
    var y = center.lng;
    
    var newCenter = CalculateNewCoordinates(x,y,zoom);
    map.setCenter([newCenter[0], map.getCenter().lat]);
    for (var i = 0; i < loopsNumber; i++) {
       
    }
    UpdateControls();
}

function UpdateLatLngControls() {
    // get current map coordinates and pass them to view controls
    var longitude = map.getCenter().lng;
    var latitude = map.getCenter().lat;

    $("#lonInput").val(longitude);
    $("#latInput").val(latitude);

}

function UpdateZoom() {

    var zoom = map.getZoom();

    $("#zoomInput").val(zoom);
}

function UpdateControls() {
    UpdateLatLngControls();
    UpdateZoom();
}