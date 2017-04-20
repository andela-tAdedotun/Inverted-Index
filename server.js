//  Dependencies
const express = require('express');
const path = require('path');

const app = express();

//  Routes
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
});
app.use(express.static(path.join(__dirname, 'src')));

//  Start server
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
