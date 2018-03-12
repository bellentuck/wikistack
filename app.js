// IMPORTS ------------------ //
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');


// TEMPLATING BOILERPLATE SETUP ------------------ //
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });


// LOGGING MIDDLEWARE ------------------ //
app.use(morgan('dev'));

// BODY-PARSING MIDDLEWARE
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));  // true? false?
// for ajax requests:
app.use(bodyParser.json());

app.use(routes);



// UI CONFIG ------------------ //
app.use(express.static(path.join(__dirname, '/public')));


// DB CONFIG ------------------//
const models = require('./models');
models.db.sync({force: false}) // If 'true', will re-create tables
.then(() => {                  // on each 'npm start'
  console.log('All tables created!');
  // LISTEN STATEMT ------------------ //
  const server = app.listen(3000, function() {
    console.log('Server chillin on port 3000');
  });
  const io = socketio.listen(server);
})
.catch(console.error.bind(console));


// LISTEN STATEMT ------------------ //
// const server = app.listen(3000, function() {
//   console.log('Server chillin on port 3000');
// })
// const io = socketio.listen(server);

