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

  filter = (event) => {
    //var locationName = document.getElementsByClassName("location-name");
    this.state.locations.forEach(function (marker) {
      if(marker.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
        console.log("Test: ", marker.title.toLowerCase().indexOf(event.target.value.toLowerCase()));
        marker.setVisible(true);
        //locationName[0].style.display = "block";

      } else {
        //locationName[0].style.display = "none";
        marker.setVisible(false);
      }
    });
  }

  render() {
    return (
      <div id="location-listing">
        <header className="header">
          <h1>Sports Venues</h1>
        </header>

        <div>
          <input className="search-bar" type="text" placeholder="Type here to filter venues" onChange={this.filter}></input>
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
