const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//.set sets global configuration value for express to refer.
// app.set('view engine', 'pug'); //pug will auto regiter to express, tells express to use itself to render
app.set('view engine', 'ejs'); //pug will auto regiter to express, tells express to use itself to render
app.set('views','views');//views key will find the templating pages in views folder.


const rootDir = require('./utils/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController =  require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));

//recently urlencoded was included in express built in hence you can use it directly
// without importing bodyParser
//app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));//serve public files static

app.use('/admin',adminRoutes);

app.use(shopRoutes);

//at end if no routes satisfy then we want to throw 404 page not found error...
app.use(errorController.get404);// path = '/' is default argument.

let port = process.env.port || 3000; //if port is defined in environment

app.listen(port,() => {
    console.log(`Server started at port: ${port}`)
});