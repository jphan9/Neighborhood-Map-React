## Neighborhood Map React Project
This project is a singe page application that is coded using [Create React App](https://github.com/facebook/create-react-app) that displays sports venues throughout Southern California. The application will display the locations of the sport venues as markers using the **Google Maps API** by default. When a user clicks on an associated marker, it will grab details of the venue location using the **Foursquare API** and displays it in an info window. There is also a Location list side bar that opens up with a button is pressed. The side bar provides an option for the user to filter the venues and open the info windows by clicking on the venue name on the side bar.

## How to run the project:
1. Download or clone the project from the following location: https://github.com/jphan9/Neighborhood-Map-React.git
2. Go into the project folder in command prompt or terminal and type in [npm install].
3. Type in [npm start] in command prompt or terminal to start the project.
4. It should open a webpage for the project or navigate to http://localhost:3000/.

## How to test the service worker:
The service worker only workers when the project is in an production environment.
To get started you need to perform the following.
1. Download or clone the project from the following location: https://github.com/jphan9/Neighborhood-Map-React.git
2. Go into the project folder in command prompt or terminal and type in [npm install].
3. Build the application by typing [npm run build] in command prompt or terminal.
4. After that is done type in the [serve -s build] in command prompt or terminal.
5. Connect to http://localhost:5000 in your browser to load up the project and test the service worker.
6. More information about this process can be found here: http://bit.ly/CRA-PWA
