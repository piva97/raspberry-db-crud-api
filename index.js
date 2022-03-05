const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const weatherRouter = require('./routes/weather');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/weather-station', weatherRouter);

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});