import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map';
import LocationList from './LocationList';
import './App.css';

class App extends Component {
  state = {
    markers: [
      {
        name: 'Staples Center',
        lat: 34.0430058,
        lng: -118.2695484,
        id: "staples"
      },
      {
        name: 'Los Angeles Memorial Colessium',
        lat: 34.0140526,
        lng: -118.2900641,
        id: "Colessium"
      },
      {
        name: 'Rose Bowl Stadium',
        lat: 34.1613284,
        lng: -118.1698349,
        id: "Rose"
      },
      {
        name: 'Angel Stadium of Anaheim',
        lat: 33.800308,
        lng: -117.8849208,
        id: "Angel"
      },
      {
        name: 'Honda Center',
        lat: 33.8078476,
        lng: -117.8786574,
        id: "Honda"
      },
      {
        name: 'Dodger Stadium',
        lat: 34.073851,
        lng: -118.242147,
        id: "Dodger"
      },
      {
        name: 'Stub Hub Center',
        lat: 33.8643777,
        lng: -118.2633313,
        id: "Stub"
      },
      {
        name: 'Banc of California Stadium',
        lat: 34.0127625,
        lng: -118.2867372,
        id: "Banc"
      }
    ]
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap= () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDxN2DFeH5_jkVStwLZHfXak8jdW9kjCyY&callback=initMap");
    window.initMap = this.initMap;
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.0517416, lng: -118.3911628},
      zoom: 10
    });

    this.state.markers.forEach(markerLocation => {
      var marker = new window.google.maps.Marker({
        position: {lat:markerLocation.lat, lng: markerLocation.lng},
        map: map,
        title: markerLocation.name
      });

      var infoWindow = new window.google.maps.InfoWindow({
        content: markerLocation.name
      });

      marker.addListener('click', function() {
        infoWindow.open(map,marker);
      });

      this.getLocationInfo(marker,markerLocation.name,infoWindow);
    })
  }

  getLocationInfo(marker,locationName,infoWindow) {
    var clientId = "KI1SKBADGX3VXXYHGOMNNLSMC0I5NXP0KMDLB1J3CUS1DOWJ";
    var clientSecret = "WIBENCT2PDA0RTEP3NSMNPFUHZD4X4R3NQHIGMEX5KTCH51I";
    var locationPoint = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20181007&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    fetch(locationPoint)
      .then(response => {
        response.json().then(data => {
          var locationCity = data.response.venues[0].location.formattedAddress;
          var locationLat = data.response.venues[0].location.lat;
          var locationLng = data.response.venues[0].location.lng;
          infoWindow.setContent("Venue Name: " + locationName + "<br>" + "Location: " + locationCity + "<br>" + "Latitude: " + locationLat + "<br>"  + "Longitude: " + locationLng);
        })
      })
      .catch(error => {
        console.log("Error! " + error);
      })
  }


  render() {
    console.log(this.state.markers)
    return (
      <main>
        <LocationList markers={this.state.markers}></LocationList>
        <Map></Map>
      </main>
    );
  }
}

function loadScript(url) {
  var tag = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");

  script.src = url;
  script.async = true;
  script.defer = true;

  script.onerror = function() {
    document.write("Google Maps cannot be loaded.");
  }

  tag.parentNode.insertBefore(script,tag);
}

export default App;
