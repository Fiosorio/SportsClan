
let map = L.map('map', {
    center: [-33.0088361, -71.5472972970676], 
    zoom: 15, 
    dragging: false, 
    tap: false, 
    scrollWheelZoom: false 
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([-33.0088361, -71.5472972970676]).addTo(map);
