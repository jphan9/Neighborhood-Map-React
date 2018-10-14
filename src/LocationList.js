import React, {Component} from 'react';

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    this.setState({
      locations: this.props.markerLocations
    });
  }

  // Function that filters the venue list names and markers when there is a query.
  filter = (event) => {
    var locationList = document.querySelector('.location-list');
    var list = locationList.getElementsByTagName('li');
    var locationItem;

    for (var i = 0; i < list.length; i++) {
        locationItem = list[i].querySelector('.location-name');
        if (locationItem.innerHTML.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
            locationItem.style.display = "";
        } else {
            locationItem.style.display = "none";
        }
    }

    this.state.locations.forEach((marker) => {
      if(marker.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
  }

  openLocationList = () => {
    var locationList = document.getElementById('location-listing');

    locationList.style.left = '0';
  }

  closeLocationList = () => {
    var locationList = document.getElementById('location-listing');

    locationList.style.left = '-500px';
  }

  render() {
    return (
      <div>
        <button id="open-location-list-button" onClick={this.openLocationList}>Open Venue List</button>

        <div id="location-listing">
          <button id="close-location-list-button" onClick={this.closeLocationList}>Close Venue List</button>
          <header className="header">
            <h1>Sports Venues</h1>
          </header>

          <div>
            <input className="search-bar" type="text" placeholder="Type here to filter venues" onChange={this.filter}></input>
          </div>

          <ul className='location-list'>
            {this.state.locations.map((location) => (
              <li key={location.title} onClick={this.props.openInfoWindow.bind(this, location)} className="location-items">
                <h3 className='location-name'>{location.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default LocationList;
