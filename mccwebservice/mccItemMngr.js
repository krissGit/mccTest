var mongo = require('mongodb');
var Server = mongo.Server,Db=mongo.Db,
             BSON=mongo.BSONPure;



var server=new Server('localhost',27017,{auto_reconnect:true});

db=new Db('mccdb',server);


db.open(function(err,db){
    if(!err)
        {
            console.log("Connected to 'mccdb' database ");
           db.collection('mccItems', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'mccItems' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
            
        }
    else{
        console.log("Not able to open database");
    }
    
});

exports.findAllOld = function(req, res) {
    res.send([{name:'wheat'}, {name:'White cron'}, {name:'yellow cron'}]);
};

exports.findAll = function(req, res) {
    db.collection('mccItems', function(err, collection) {
        collection.find().toArray(function(err, items) {
            if(err)
                {
                  res.send({'status':"ERROR",'items':items});
                    
                }
            else
                {
                    res.send({'status':"OK",'items':items});
                }
           
        });
    });
};

exports.findById = function(req, res) {
    
     var id = req.params.id;
    console.log('Retrieving Item: ' + id);
    db.collection('mccItems', function(err, collection) {
        collection.findOne({_id:id}, function(err, selecteditem) {
            
            if(err)
                {
                     res.send({"Status":"Error",selecteditem});            
                }
            else if(selecteditem!=null)
                {
                     res.send({"Status":"OK","Item":selecteditem})
                }
            else
                {
                    res.send({"Status":"ERROR","Message":"No item found with id "+id})
                }
        
        });
    });
    
    
    
    //res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.addNew =function(req,res){
     console.log('Adding new item Added:');
    
    if(req!=null)
        {
            
    console.log('req body>>>' + JSON.stringify(req.body));     
     var items = req.body;
      if(items!=null)
          {
    console.log('Adding new item: ' + JSON.stringify(items));
     
              //var document={name: "Yellow Corn ",price: "200",unit:"200KG",description: "description 2",picture: "corn.jpg"};          
               
              console.log('Adding new document: ' + JSON.stringify(items));
                           
    db.collection('mccItems', function(err, collection) {
        
        collection.insert(items, {safe:true}, function(err, result) {
        
       // var jsonObj = JSON.parse(result);        
            if (err) {
                
                //console.log("Error"+hasOwnProperty);
                res.send({'status':"ERROR",'error':'An error has occurred ','nInserted':"0"});
            } else {
                    console.log("ok");
                
                res.send({'Status':"OK" ,'insertedCount':"1" /*jsonObj.insertedCount*//* ,'insertedIds':jsonObj.insertedIds*/});
            }
        });
    });
          }
            else
                {
            res.send({'error':'No header'});        
                }

        }
    else
        {
            res.send({'error':'Need some item to add'});
        }
    };

exports.update =function(req,res){
    
  console.log('Updating mcc items:');
    var itemId = req.params.id;
//res.send({id:req.params.id, name: "The Name", description: "description"});
    
    var updateItem = req.body;
    console.log('Updating mcc items: ' + itemId);
    console.log(JSON.stringify(updateItem));
    //'_id':new BSON.ObjectID(id)
    db.collection('mccItems', function(err, collection) {
        collection.update({_id:itemId}, updateItem, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(result);
            }
        });
    });
};

exports.updatePrice =function(req,res){
    
  console.log('Updating mcc items:');
    var itemId = req.params.id;
//res.send({id:req.params.id, name: "The Name", description: "description"});
    
    var updateItem = req.body;
    console.log('Updating mcc items: ' + itemId);
    console.log(JSON.stringify(updateItem));
    //'_id':new BSON.ObjectID(id)
    db.collection('mccItems', function(err, collection) {
        collection.update({_id:itemId}, updateItem, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(result);
            }
        });
    });
};

exports.delete =function(req,res){
    
    console.log('Deleting mcc Item: '); 
    var itemId = req.params.id;
    
    //res.send({id:req.params.id, name: "The Name", description: " Dlete description"});
    
    console.log('Deleting mcc Item: ' + itemId);
    
    db.collection('mccItems', function(err, collection) {
        
            collection.remove({_id:itemId}, {safe:true},function(err, result) {
          
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(result);
            }
        });
                   
    });
    
};




/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var items = [
    {
        _id: "100",
        name: "Wheat ",
        price: "100",
        unit:"100KG",
        description: "description",
        picture: "wheat.jpg"
    },
    {
        _id: "101",
        name: "Corn ",
        price: "200",
        unit:"200KG",
        description: "description 2" ,
        picture: "corn.jpg"
    }
    ];

    db.collection('mccItems', function(err, collection) {
        collection.insert(items, {safe:true}, function(err, result) {});
    });

};