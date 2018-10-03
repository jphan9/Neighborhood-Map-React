import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.loadMap();
  }

  loadMap= () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDxN2DFeH5_jkVStwLZHfXak8jdW9kjCyY&callback=initMap");
    window.initMap = this.initMap;
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return (
      <main>
        <div id="map"></div>
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
