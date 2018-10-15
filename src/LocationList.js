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

  // Function that filters the venue list names and markers when there is a query. It also sets the tab index for the list.
  filter = (event) => {
    var locationList = document.querySelector('.location-list');
    var list = locationList.getElementsByTagName('li');
    var locationItem;
    var listTab;

    // Loops through the list items and if the text matches in the filter display only the ones that match while hiding/disabling tabbing when it does not match.
    for (var i = 0; i < list.length; i++) {
        locationItem = list[i].querySelector('.location-name');
        listTab = list[i];
        if (locationItem.innerHTML.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
            locationItem.style.display = '';
            listTab.tabIndex = 0;
        } else {
            locationItem.style.display = 'none';
            listTab.tabIndex = -1;
        }
    }

    // loops through each locaiton and sets the marker to visible if the text matches in the filter.
    // Sets the markers to not be visisble if thee text does not match in the filter and also closes the info window when the filter is being used.
    this.state.locations.forEach((marker) => {
      this.props.infoWindow.close();
      if(marker.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
  }

  // Function that shows the location list when the Open Location List button is clicked.
  openLocationList = () => {
    var locationList = document.getElementById('location-listing');
    locationList.style.left = '0';
    locationList.style.visibility = 'visible';
  }

  // Function that hides the location list when the Close Location List button is clicked.
  closeLocationList = () => {
    var locationList = document.getElementById('location-listing');
    locationList.style.left = '-500px';
    locationList.style.visibility = 'hidden';
  }

  render() {
    return (
      <div>
        <button className='open-location-list-button' role='button' onClick={this.openLocationList}>Open Venue List</button>

        <div id='location-listing'>
          <button className='close-location-list-button' role='button' onClick={this.closeLocationList}>Close Venue List</button>
          <header className='header'>
            <h1 aria-label='side bar title' tabIndex='0'>Sports Venues</h1>
          </header>

          <div>
            <input className='search-bar' role='search' aria-label='search filter' type='text' placeholder='Type here to filter venues' onChange={this.filter}></input>
          </div>

          <ul className='location-list'>
            {this.state.locations.map((location) => (
              <li key={location.title} onClick={this.props.openInfoWindow.bind(this, location)} onKeyPress={this.props.openInfoWindow.bind(this, location)} className='location-items' role='button' tabIndex='0'>
                <h3 className='location-name'>{location.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default LocationList;
