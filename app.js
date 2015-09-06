var staticConfig = require('./config.js');

//require('./src/backend/backend-app.js').startServer(staticConfig);
require('./src/frontend/frontend-app').startServer(staticConfig);