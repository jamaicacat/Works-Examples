// assigning map to the variable and setting its view up
var mymap = L.map('mapid').setView([51.505, -0.09], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiamFtYWljYWNhdCIsImEiOiJjazYyM2Vuc3owOThoM2tvMGx4b2xqangyIn0.VrBXWCKt8Dnx-mWxB3bSRQ'
}).addTo(mymap);

// creating and moving marker on the map
const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
let marker = L.marker([0.0, 0.0]).addTo(mymap);
function moveISS() {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback', function(data) {
        let lat = data['iss_position']['latitude'];
        let lon = data['iss_position']['longitude'];
        latitudeElement.innerText = lat;
        longitudeElement.innerText = lon;
        mymap.setView([lat, lon]);
        marker.setLatLng([lat, lon]);
    });
    setTimeout(moveISS, 5000 - (new Date()).getMilliseconds());
}
moveISS();

// date&time setting up
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
formatTime();
function formatTime() {
    setTimeout(formatTime, 1000 - (new Date()).getMilliseconds());
    let date = new Date();
    let hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
    let minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
    timeElement.innerText = `${hours}:${minutes}`;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateElement.innerText = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// creating list of astronaunt
$.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
    let number = data['number'];
    $('#spacepeeps').html(number);
    let astronautsNumber = document.getElementById('totalAmount');
    astronautsNumber.innerText = number;
    data['people'].forEach(function(d) {
        $('#astronames').append('<li>' + d['name'] + '</li>');
    });
});