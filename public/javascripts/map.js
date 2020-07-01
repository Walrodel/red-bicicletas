var map = L.map('mapid').setView([4.7481775, -74.0974518], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map);

var marker = L.marker([4.7481775, -74.0974518]).addTo(map);
var marker = L.marker([4.7440077, -74.0974715]).addTo(map);
var marker = L.marker([4.7443631, -74.0934841]).addTo(map);