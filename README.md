# SOA2015-Assignment-01

### Installation:
 - Install [NodeJS](https://nodejs.org/en/) 
 - Install [MongoDB](https://www.mongodb.org/downloads "mongoDB")
 - Run: `npm install -g gulp apidoc nw-builder`
 - Run: `npm install`
 - Run MongoDB 
 - Run: `gulp add-sample-data` to install db
 
### Build:
 - Build "Api-doc" run `gulp create-api-doc`
 - Build "App desktop" run `nwbuild -p [os] -v 0.12.3 -o [path build folder] ./desktop-app-using-node-webkit` (os: 'win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64') 

### Start system:
 - Run: `node run-server.js`
 - For normal user: [http://localhost:2000](http://localhost:2000)
 - Access management console with: [http://localhost:8000](http://localhost:8000)
 
### Other:
 - What to view api doc please build api-doc before go to link [http://localhost:8000/help](http://localhost:8000/help)