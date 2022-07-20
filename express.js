const express = require('express');
const db = require('./server/models');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));
function serveIndev(req, res) {
  res.redirect('/');
}

app.get('*', serveIndev);
db.sequelize.sync()
  .then(() => app.listen(PORT, () => console.log(`Running on ${PORT}`)))
  .catch((err) => console.log(err));
