import React, {Component} from 'react';

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationMarkers: []
    }
  }

  componentDidMount() {
    this.setState({
      locations: this.props.markers,
      locationMarkers: this.props.markerLocations
    });
  }

  test() {
    console.log("test");
  }

  render() {
    console.log('props markerLocations', this.props.markerLocations)
    console.log('props locationMarkers', this.state.locationMarkers)
    return (
      <div id="location-listing">
        <header className="header">
          <h1>Sports Venues</h1>
        </header>

        <ul className='location-list'>
          {this.state.locations.map((location) => (
            <li key={location.id} onClick={this.props.openInfoWindow.bind(this, this.props.markerLocations[2])}>
              <h3 className="location-name">{location.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LocationList;
