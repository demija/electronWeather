# Weather app
This is a minimal **Electron** application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

Weather API is provided by [OpenWeatherMap](https://openweathermap.org/).


# Deployment
In order to build and package your app, we need the electron-packager module:
```javascript
npm install electron-packager -g
```


### Building for a specific platform
To build an application for a platform you'll need to execute the following command in the Node.js command prompt:
```javascript
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch>
```

The possible  values for the platform option are:

    Windows: win32
    MacOS: darwin or mas
    Linux: linux

And the possible values for the arch option are:

    32 Bits OS: x86
    64 Bits OS: x64
    armv7l (only for Linux)

Example:
```javascript
electron-packager . --platform=win32 --arch=x86
```

### Building for all platforms
```javascript
electron-packager . --all
```


# Screenshots
![01](https://github.com/demija/electronWeather/blob/master/screenshots/01.png)