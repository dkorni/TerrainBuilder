mapboxgl.accessToken = 'pk.eyJ1IjoiZGVuaXNrMjAwMCIsImEiOiJjazRyaDVmNDQwcWVrM2dwNGQ0ZHQwdnd2In0.QBIPRRvLfwc6LvySuaJ1Ew';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    preserveDrawingBuffer: true
});

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
    // get current map coordinates and pass them to view controls
    longitude = map.getCenter().lng;
    latitude = map.getCenter().lat;

    $("#lonInput").val(longitude);
    $("#latInput").val(latitude);
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
});

// get current zoom
map.on('wheel', function (e) {
    zoom = map.getZoom();

    $("#zoomInput").val(zoom);
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
    map.setStyle('mapbox://styles/denisk2000/ck4rjo7os2qqt1co6bka6dbk0');
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
    for (var i = 0; i < loopsNumber; i++) {
        var center = map.getCenter();
        var x = center.lng;
        var y = center.ltd;

        map.setCenter([x, y]);
    }
}