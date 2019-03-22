var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
// var {ProjectHolClient} = require('./ProjectHolClient') 

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res){
    res.redirect("/manufacturer");
})

//Get Manufacturer view
router.get('/manufacturer', function(req, res){
    res.sendFile(path.join(__dirname, '/clients/manufacturer.html'));
});

//Get POS view
router.get('/sale', function(req, res){
    res.sendFile(path.join(__dirname, '/clients/sale.html'));
});

// Get Stockist view
router.get('/stockist1',function(req, res){
    res.sendFile(path.join(__dirname, '/clients/stockist_1.html'));
})

router.get('/stockist2',function(req, res){
    res.sendFile(path.join(__dirname, '/clients/stockist_2.html'));
})

//Get Warehouse view
router.get('/warehouse1',function(req, res){
    res.sendFile(path.join(__dirname, '/clients/warehouse_1.html'));
})

router.get('/warehouse2',function(req, res){
    res.sendFile(path.join(__dirname, '/clients/warehouse_2.html'));
})

//Posting a new bottleID
router.post('/createbottle', function(req, res) {
    var bottleId = req.body.bottleId;
    var ProjectHolClient = new ProjectHolClient(); 
    //createNewBottle() to be implemented
    ProjectHolClient.createNewBottle(bottleId);    
    res.send({message:"Bottle "+ bottleId +" successfully created"});
});



module.exports = router;