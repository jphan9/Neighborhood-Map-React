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

  render() {
    return (
      <div id="location-listing">
        <header className="header">
          <h1>Sports Venues</h1>
        </header>

        <div>
          <input type="text"></input>
        </div>

        <ul className='location-list'>
          {this.state.locations.map((location) => (
            <li key={location.title} onClick={this.props.openInfoWindow.bind(this, location)}>
              <h3 className="location-name">{location.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LocationList;
