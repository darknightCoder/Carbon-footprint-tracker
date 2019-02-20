//SPDX-License-Identifier: Apache-2.0

var carbon = require('./controller.js');


module.exports = function(app){

  app.post('/add/pollution',function(req,res){
    carbon.insertIOTData(req, res);
  })
}
