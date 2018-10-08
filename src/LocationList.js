import React, {Component} from 'react';

class LocationList extends Component {
  state = {
    locations: [],
  }

  componentDidMount() {
    this.setState({
      locations: this.props.markers
    });
  }

  render() {
    console.log('props', this.props.markers)
    return (
      <div id="location-listing">
        <header className="header">
          <h1>Sports Venues</h1>
        </header>

        <ul className='location-list'>
          {this.state.locations.map((location) => (
            <li key={location.name}>
              <h3 className="location-name">{location.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LocationList;
