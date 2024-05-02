try {
    const fs = require('fs');
    console.log('!!!')
} catch (error) {
    console.error(error)
    console.log("error!")
}

const mymap = L.map('mapid').setView([0, 0], 5);

const marker_icon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/1200px-International_Space_Station.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
})

const marker = L.marker([0, 0], { icon: marker_icon }).addTo(mymap)

const attribution =
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)
const api_url = "https://api.wheretheiss.at/v1/satellites/25544"

var tracking = false

async function getData(url) {
    const result = await fetch(url)
    const data = await result.json()
    const lat = data.latitude
    const lon = data.longitude
    document.getElementById('lat').innerHTML = lat
    document.getElementById('lon').innerHTML = lon
    marker.setLatLng([lat, lon])
    if (tracking) {
        mymap.setView([lat, lon], 5)
    }
}

function trackISS() {
    tracking = !tracking
}

getData(api_url)

setInterval(function() {
    getData(api_url);
}, 1005)