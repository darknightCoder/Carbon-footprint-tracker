//SPDX-License-Identifier: Apache-2.0

var carbon = require('./controller.js');


module.exports = function(app){

  app.post('/add/pollution',function(req,res){
    return carbon.insertIOTData(req, res);
  })
}
