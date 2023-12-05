/* eslint-disable no-console */
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
