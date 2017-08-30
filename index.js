const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const WaiterRoutes = require('./waiters');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiterapp');
const waiterRoutes = WaiterRoutes(models);
const app = express();

app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.get('/', function(req,res){
        res.redirect('/waiters');
        // console.log(waiter);
})

app.get('/waiters', waiterRoutes.showInfo);
app.post('/waiters', waiterRoutes.showForm );
app.get('/waiter/:user_id', waiterRoutes.waiterAccess);
app.post('/waiter/:user_id', waiterRoutes.waiterAccess)
app.get('/days', waiterRoutes.daysToWork)
app.post('/days', waiterRoutes.daysToWork)





const port = process.env.PORT || 3016;
app.listen(port, function(){
        console.log('web app started on port: ' + port);
})
