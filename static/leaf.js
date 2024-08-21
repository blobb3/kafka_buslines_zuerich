var mymap = L.map('mapid').setView([47.37128, 8.54161], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyaW9nemhhdyIsImEiOiJjbHpjanVvbHcwZDZ3MmlyeTEzMTJtbXF5In0.vVfSVeSJbG_cF53qDoSztA', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);

mapMarkers1 = [];
mapMarkers2 = [];
mapMarkers3 = [];

/* Icons-Settings */
/* https://github.com/pointhi/leaflet-color-markers  */
var myIcon = L.divIcon({
      className: 'my-div-icon',
      iconSize: [15, 15]
    });

var source = new EventSource('/topic/busdata_001'); //ENTER YOUR TOPICNAME HERE
source.addEventListener('message', function(e){

  console.log('Message');
  obj = JSON.parse(e.data);
  console.log(obj);

  if(obj.busline == '00001') {
    for (var i = 0; i < mapMarkers1.length; i++) {
      mymap.removeLayer(mapMarkers1[i]);
    }
    marker1 = L.marker([obj.latitude, obj.longitude], {icon: myIcon}).addTo(mymap);
	marker1.valueOf()._icon.style.backgroundColor = 'red';
    mapMarkers1.push(marker1);
  }

  if(obj.busline == '00002') {
    for (var i = 0; i < mapMarkers2.length; i++) {
      mymap.removeLayer(mapMarkers2[i]);
    }
    marker2 = L.marker([obj.latitude, obj.longitude], {icon: myIcon}).addTo(mymap);
	marker2.valueOf()._icon.style.backgroundColor = 'gold';
    mapMarkers2.push(marker2);
  }

  if(obj.busline == '00003') {
    for (var i = 0; i < mapMarkers3.length; i++) {
      mymap.removeLayer(mapMarkers3[i]);
    }
    marker3 = L.marker([obj.latitude, obj.longitude], {icon: myIcon}).addTo(mymap);
	marker3.valueOf()._icon.style.backgroundColor = 'green';
    mapMarkers3.push(marker3);
  }
}, false);
