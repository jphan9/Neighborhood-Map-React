import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map';
import './App.css';

class App extends Component {

  state = {
    markers: [
      {
        name: 'Staples Center',
        lat: 34.0430058,
        lng: -118.2695484
      },
      {
        name: 'Los Angeles Memorial Colessium',
        lat: 34.0140526,
        lng: -118.2900641
      },
      {
        name: 'Rose Bowl Stadium',
        lat: 34.1613284,
        lng: -118.1698349
      },
      {
        name: 'Angel Stadium of Anaheim',
        lat: 33.800308,
        lng: -117.8849208
      },
      {
        name: 'Honda Center',
        lat: 33.8078476,
        lng: -117.8786574
      },
      {
        name: 'Dodger Stadium',
        lat: 34.073851,
        lng: -118.242147
      },
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
    })
  }

  render() {
    return (
      <main>
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
