var staticConfig = require('./config.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library');

require('./src/frontend/frontend-app').startServer(staticConfig);
require('./src/backend/backend-app.js').startServer(staticConfig);
