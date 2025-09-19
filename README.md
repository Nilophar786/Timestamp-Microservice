# Timestamp Microservice

This is a freeCodeCamp project that provides a timestamp microservice API.

## API Endpoints

- `GET /api/:date?` - Returns a JSON object with `unix` and `utc` keys for a valid date, or an error for invalid dates.

### Examples

- `/api/2015-12-25` -> `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`
- `/api/1451001600000` -> `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`
- `/api/invalid` -> `{ "error": "Invalid Date" }`
- `/api/` -> Returns current time

## How to Run

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Visit `http://localhost:3000` in your browser

## Dependencies

- Express.js
