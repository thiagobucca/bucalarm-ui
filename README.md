

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/thiagobucca/bucalarm-ui">
    <img src="images/appIcon.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BucAlarm</h3>

  <p align="center">
    Minimalist Alarm Control App
    <br />
  </p>
</p>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/thiagobucca/bucalarm-ui)

The idea behind this project, is to make a very minimalist security Home Alarm control App.
Firebase Push integration is used to notify when the Alarm is trigged. Within this app,
you can activate and deactivate the Alarm by touching any frame of the device screen. Backend for this example is implemented
with Python and some small shell scripts.

Other modules here: [Backend](https://github.com/thiagobucca/bucalarm-api) / [IoT](https://github.com/thiagobucca/bucalarm-iot)


### Built With

* [React Native](https://reactnative.dev/)
* [Firebase](https://firebase.google.com/)

### Running

1. Clone the repo
   ```sh
   git clone https://github.com/thiagobucca/bucalarm-ui.git
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Install pods
   ```sh
   cd ios && pod install && cd ..
   ```
3. Run! (yarn ios or yarn android)
   ```JS
   yarn ios;
   ```

<!-- LICENSE -->
## License

Distributed under the GNU License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/screenshot.png
