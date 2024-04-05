const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5001;

// const DB = "mongodb+srv://sanjaydbg:OeLFVtAF6BUeodDK@cluster0.mlqxwj1.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(DB,{
//   useNewUrlParser : true,
//   useCreateIndex:true,
//   useUnifiedTopology:true,
//   useFindAndModify:false
// })

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')

app.use('/', routes);
// This function logs a message to the console indicating that the server is listening on a specified port.
// The port number is passed in as an argument to the function.
// This function is often used in server-side JavaScript applications, such as those built with Node.js and Express.
app.listen(port, ()=> console.log(`Listening to port ${port}`));