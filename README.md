# NASA APOD Screensaver

Plain HTML / CSS / JavaScript screensaver using images from NASA's Astronomy Picture of the Day.

## Installation instructions
1. Run `npm install`
2. Register for an API key for [NASA APOD](https://api.nasa.gov/index.html#apply-for-an-api-key) and create `apod_key.js` in root directory
```
module.exports = [API KEY];
```
3. Create database in PostgreSQL and create `db_config.js` with database credentials
```
module.exports = {
  database: [DATABASE],
  user: [DB_USER],
  password: [DB_PASSWORD]
};
```

4. Execute commands from `apod.sql` on database

## Usage instructions
```
# Run application
npm start
# Run application using Nodemon
npm run watch
Navigate to /api/pictures/load to pre-populate database
Navigate to / to view screensaver
```

## Technology used
- HTML
- CSS
- JavaScript
- jQuery
- Node.js
- Express.js
- [NASA APOD API](https://api.nasa.gov/api.html#apod)
