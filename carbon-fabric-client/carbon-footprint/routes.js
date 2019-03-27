//SPDX-License-Identifier: Apache-2.0

var tuna = require('./controller.js');
var carbon = require('./carbon-footprint.controller.js');
var bodyParser    = require('body-parser');




module.exports = function(app){
  
  app.get('/get_all_pollution', function(req, res){
    carbon.get_all_data(req, res);
  });
  
  app.post('/add/pollution',function(req,res){
    console.log('--------',req.body)
    let data =  req.body.response;
    console.log('insertIOT Data....',data)
    carbon.insertIOTData(data, res);
  })
  
  app.get('/get/pollution/:id',function(req,res){
    let ID = req.params.id
    ID = ID.toString()
    carbon.get_data(ID, res);
  })
}
