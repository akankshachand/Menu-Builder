var express = require('express');
var router = express.Router();
var db=require('../database');

var mData; 
var iData;
var modData;
var selectedMenu;
var selectedItem;
var selectedModifier;

/* GET home page with menu items. */
router.get('/', function(req, res, next) {
	var sql='select * from `Menu_Sections`';
    db.query(sql, function (err, data, fields) {
    	if (err) throw err;
    	mData = data;
    	res.render('index', { menuSections: data, selectedMenu : 0, selectedItem : 0});
 	});
});  

/* GET items of selected menu. */
router.get('/displayItems/:id', function(req, res) {
	selectedMenu = parseInt(req.params.id);
	var sql='select * from `Items` where Section_ID = '+selectedMenu;
    db.query(sql, function (err, data, fields) {
    	if (err)  throw err;
    	iData = data;
    	res.render('index', {menuSections: mData, itemData: data, selectedMenu : selectedMenu, selectedItem:0});
  	});
});

/* GET modifiers of the selected item. */
router.get('/displayModifiers/:id', function(req, res) {
	selectedItem = req.params.id;
	var sql='Select m.Modifier_ID, m.Description from Modifiers m, item_modifier im where im.Item_ID ='+selectedItem+' and im.Modifier_ID = m.Modifier_ID;';
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
	    modData = data;
	    res.render('index', {menuSections: mData, itemData: iData, modifierData: data, selectedMenu: selectedMenu, selectedItem : selectedItem, selectedModifier: 0});
  	});
});

/* GET selected modifier */
router.get('/selectedModifiers/:id', function(req, res) {
        selectedModifier = req.params.id;
        res.render('index', {menuSections: mData, itemData: iData, modifierData: modData, selectedMenu: selectedMenu, selectedItem : selectedItem, selectedModifier: selectedModifier});
 });

/* POST insert to menu sections. */
router.post('/addMenu', function(req, res) {
	console.log("HEllo"+req.body.menu_section_name);
    var sql = "Insert INTO Menu_Sections (Name, Description) VALUES ('"+req.body.menu_section_name+"', '"+req.body.menu_section_description+"')";
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
		res.redirect('/');   
	});
});

/* POST insert item to selected menu section. */
router.post('/addItem', function(req, res) {
    var sql = "Insert INTO Items (Name, Price, Description, Section_ID) VALUES ('"+req.body.item_name+"', '"+req.body.item_price+"', '"+req.body.item_description+"', '"+selectedMenu+"')";
	console.log(sql);
    db.query(sql, function (err, data, fields) {
		if (err)  throw err;
		res.redirect('/displayItems/'+selectedMenu);   
	});
});

/* POST insert modifier to selected item. */
router.post('/addModifier', function(req, res) {
    var sql = "Insert IGNORE INTO Modifiers (Description) VALUES ('"+req.body.modifier_name+"'); Insert IGNORE INTO Item_Modifier (Item_ID, Modifier_ID) VALUES ('"+selectedItem+"',(Select Modifier_ID From Modifiers where Description ='"+ req.body.modifier_name+"'));";
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
	res.redirect('/displayModifiers/'+selectedItem);   
	});
});

/* PUT update selected menu section. */
router.put('/updateMenu/:id', function(req, res) {
	const id = req.params.id;
    var sql = "Update Menu_Sections Set Name='"+req.body.menu_section_name+"', Description='"+req.body.menu_section_description+"' where ID="+id+";";
	db.query(sql, function (err) {
	    if (err)  throw err;
		res.redirect('/');   
	});
});

/* PUT update selected item in a menu section. */
router.put('/updateItem/:id', function(req, res) {
	const id = req.params.id;
    var sql = "Update Items Set Name='"+req.body.item_name+"', Price='"+req.body.item_price+"', Description='"+req.body.item_description+"' where Item_ID="+id+";";
	db.query(sql, function (err) {
	    if (err)  throw err;
		res.redirect('/displayItems/'+selectedMenu);   
	});
});

/* PUT update selected modifier in an item. */
router.put('/updateModifier/:id', function(req, res) {
	const id = req.params.id;
    var sql = "Update Modifiers Set Description='"+req.body.modifier_name+"' where Modifier_ID="+id+";";
	db.query(sql, function (err) {
	    if (err)  throw err;
		res.redirect('/displayModifiers/'+selectedItem);   
	});
});

/* DELETE selected menu section. */
router.delete('/deleteMenu/:id', function(req, res) {
    var sql = "Delete from Menu_Sections where ID="+req.params.id;
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
		res.redirect('/');   
	});
});

/* DELETE selected item from menu section. */
router.delete('/deleteItem/:id', function(req, res) {
    var sql = "Delete from Items where Item_ID="+req.params.id;
    db.query(sql, function (err, data, fields) {
		if (err)  throw err;
		res.redirect('/displayItems/'+selectedMenu);   
	});
});

/* DELETE selected modifier from item. */
router.delete('/deleteModifier/:id', function(req, res) {
    var sql = "Delete from Item_Modifier where Modifier_ID="+req.params.id+" and Item_ID="+selectedItem+";";
	console.log(sql);
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
	res.redirect('/displayModifiers/'+selectedItem);   
	});
});

/* GET mapping of items and modifiers.*/
router.get('/map/Item/:ItemID/Modifier/:ModifierID', function(req, res) {
    var sql = "Insert Ignore INTO Item_Modifier (Item_ID, Modifier_ID) VALUES ('"+req.params.ItemID+"','"+req.params.ModifierID+"');";
    db.query(sql, function (err, data, fields) {
	    if (err)  throw err;
	res.redirect('/');   
	});
});

/* GET full menu page. */
router.get('/menu', function(req, res) {
	console.log('Connection Established Successfully index');
	res.render('full-menu', { });
});

module.exports = router;