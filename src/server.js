/* eslint-disable no-console */
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
