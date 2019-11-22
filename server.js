//Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
//External resources
const errorHandler = require('./helpers/error-handler');
const UsersRoutes = require('./routes/users');
const CriptosRoutes = require('./routes/criptos');
//Constants
const app = express();
const PORT = process.env.PORT || 3000;

/****
 * Express configuration
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//ROUTES
app.use('/users', UsersRoutes);
app.use('/criptos', CriptosRoutes);
app.get('*', (req,res) => res.send('Hello PLINK :)'));


// error handler
app.use(errorHandler);

//start server
app.listen(PORT, () => {
    console.log('Server run at '+PORT);
});
