const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Root route with instructions
app.get('/', (req, res) => {
  res.send('Timestamp Microservice API. Use /api/:date? endpoint.');
});

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  // If no date string, use current date
  if (!dateString) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // If dateString is a number string (allow negative for timestamps before epoch)
  if (/^-?\d+$/.test(dateString)) {
    let num = parseInt(dateString);

    // If it's in seconds (10 digits), convert to milliseconds
    if (Math.abs(num).toString().length === 10) {
      num = num * 1000;
    }
    dateString = num;
  }

  const date = new Date(dateString);

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: Number(date.getTime()),
    utc: date.toUTCString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
