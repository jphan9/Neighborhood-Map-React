import React, {Component} from 'react';

class LocationList extends Component {
  render() {
    /*
      {this.props.locations.map((location, i) =>
        <li key={i}>{location.name}</li>
      )}
    */
    return (
      <div id="location-listing">
        <h1>Sports Venues</h1>
        <ul>

        </ul>
      </div>
    )
  }
}

export default LocationList;
