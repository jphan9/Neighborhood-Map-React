import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: '',
      venueInfo: '',
      markerLocations: [],
      markers: [
        {
          name: 'STAPLES Center',
          lat: 34.0430847,
          lng: -118.2671909,
          id: 'staples'
        },
        {
          name: 'Los Angeles Memorial Coliseum',
          lat: 34.0140977,
          lng: -118.2865869,
          id: 'Colessium'
        },
        {
          name: 'Rose Bowl Stadium',
          lat: 34.162317861452344,
          lng: -118.16798852780228,
          id: 'Rose'
        },
        {
          name: 'Angel Stadium of Anaheim',
          lat: 33.8002813,
          lng: -117.8832092,
          id: 'Angel'
        },
        {
          name: 'Honda Center',
          lat: 33.8072745,
          lng: -117.8770175,
          id: 'Honda'
        },
        {
          name: 'Dodger Stadium',
          lat: 34.0735138,
          lng: -118.2404617,
          id: 'Dodger'
        },
        {
          name: 'StubHub Center',
          lat: 33.8703692,
          lng: -118.2617806,
          id: 'Stub'
        },
        {
          name: 'Banc of California Stadium',
          lat: 34.0121511,
          lng: -118.2845163,
          id: 'Banc'
        }
      ]
    };
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxN2DFeH5_jkVStwLZHfXak8jdW9kjCyY&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    var self = this;
    var markersLocations = this.state.markerLocations;

    // Creates a new map instance with the zoom and the lat long of the location that is centered. It is centered near the Walt Disney Concert Hall in Los Angeles California.
    // Also hides the map/satellite option.
    var map = new window.google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: {lat: 34.0517416, lng: -118.3911628},
      zoom: 10
    });

    var infoWindow = new window.google.maps.InfoWindow({});

    this.setState({
      venueInfo: infoWindow,
      map: map
    });

    // Creates a new marker instance for each location and adds the markers to the map based on the locations.
    this.state.markers.forEach(markerLocation => {
      var marker = new window.google.maps.Marker({
        position: {lat:markerLocation.lat, lng: markerLocation.lng},
        map: map,
        title: markerLocation.name,
      });

      // Opens the associated info window when a marker is clicked.
      marker.addListener('click', function() {
        self.openInfoWindow(marker);
      });

      this.setState({
        markerLocations: markersLocations.push(marker)
      });
    });
  }

  // Function that opens the info window and shows the details of venue location while setting the animation of the marker.
  openInfoWindow = (marker) => {
    this.getLocationInfo(marker);
    this.state.venueInfo.open(this.state.map,marker);
    marker.setAnimation(window.google.maps.Animation.DROP);
    // Set the marker animation to null after 5 seconds.
    setTimeout(() => {
      marker.setAnimation('null');
    },500);
  }

  // Function that gets details of the venue location using the foursquare api.
  getLocationInfo(marker) {
    this.state.venueInfo.setContent('Loading...');
    var clientId = 'KI1SKBADGX3VXXYHGOMNNLSMC0I5NXP0KMDLB1J3CUS1DOWJ';
    var clientSecret = 'WIBENCT2PDA0RTEP3NSMNPFUHZD4X4R3NQHIGMEX5KTCH51I';
    var locationPoint = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20181007&ll=' + marker.getPosition().lat() + ',' + marker.getPosition().lng() + '&limit=3';
    fetch(locationPoint)
      .then(response => {
        response.json().then(data => {
          var locationCity, locationLat, locationLng, locationName;

          // If the name of the four square venue is the same as the name of the location then set the correct foursquare venue information.
          if(data.response.venues[0].name === marker.title) {
            locationName = data.response.venues[0].name;
            locationCity = data.response.venues[0].location.formattedAddress;
            locationLat = data.response.venues[0].location.lat;
            locationLng = data.response.venues[0].location.lng;
          } else {
            locationName = data.response.venues[1].name;
            locationCity = data.response.venues[1].location.formattedAddress;
            locationLat = data.response.venues[1].location.lat;
            locationLng = data.response.venues[1].location.lng;
          }

          this.state.venueInfo.setContent('Venue Name: ' + locationName + '<br> Location: ' + locationCity + '<br> Latitude: ' + locationLat + '<br> Longitude: ' + locationLng);
        });
      })
      .catch(error => {
        console.log('Error! ' + error);
        this.state.venueInfo.setContent('ERROR: Data cannot be loaded.');
      });
  }

  render() {
    return (
      <main>
        <LocationList markerLocations={this.state.markerLocations} openInfoWindow={this.openInfoWindow} infoWindow={this.state.venueInfo}></LocationList>
        <Map></Map>
      </main>
    );
  }
}

/*
Function that creates a script that loads google maps on the app.
This function is based off of a tutorial of how to add Google Maps to React without any external components on Youtube (https://youtu.be/W5LhLZqj76s?t=472).
I have slightly modified it to show an error message when Google Maps cannot load.
*/
function loadScript(url) {
  var tag = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');

  script.src = url;
  script.async = true;
  script.defer = true;

  script.onerror = function() {
    document.write('Google Maps cannot be loaded.');
  }

  tag.parentNode.insertBefore(script,tag);
}

export default App;
