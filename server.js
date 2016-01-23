var express = require('express'),
    mccservice = require('./mccwebservice/mccItemMngr'),
    mccAvailability = require('./mccwebservice/mccAvailability');

var bodyParser = require('body-parser');
var app = express();

app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    // parse application/json
app.use(bodyParser.json());
});


app.get('/mccAvailabilityState',mccAvailability.findStateList);

app.get('/mccAllItemsStatic', mccservice.findAllOld);
app.get('/mccAllItems', mccservice.findAll);
app.get('/mccItemByID/:id', mccservice.findById);
app.post('/addnewItem',mccservice.addNew);
app.put('/updateItem/:id',mccservice.update);
app.put('/updatePrice/:id',mccservice.update);
//app.delete('/deleteItem/:id',mccservice.delete);



app.listen(3000);
console.log('Listening on port 3000...');