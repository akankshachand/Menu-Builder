var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/full-menu', function(req, res, next){
  getDriver(function(err, DriverResult){
    var js = JSON.parse(JSON.stringify(DriverResult));
    var json = Object.values(Object.values(js[0]));
    res.render('full-menu', {title: 'Menu List', menuData: json});
  });
});

function getDriver(callback){
  var sql = 'select json_arrayagg(json_object("name",Menu_Sections.Name,"id", Menu_Sections.ID,"items",(select json_arrayagg(json_object("id",Items.Item_ID,"title",Items.Name,"Modifiers",(select json_arrayagg(json_object("id",Modifiers.modifier_id,"title",Modifiers.Description)) from Modifiers, Item_Modifier where Item_Modifier.Item_ID = Items.Item_ID and Item_Modifier.Modifier_ID = Modifiers.Modifier_ID))) from Items where Items.Section_ID = Menu_Sections.ID))) from Menu_Sections;'
  db.query(sql, function(err,data){
    callback(err,data);
  })
}

module.exports = router;