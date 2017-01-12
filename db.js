var config = require('./db_config');
module.exports = require('pg-promise')()(config);
