Technologies used:
Node.js, Express.js, MySQL

MB.mwb file contains the database schema and ER diagram of the relations used in MySQL.

Assumptions:
-	Add button for items is displayed only after user selects a menu section.
-	Add button for modifications is displayed only after user selects an item.
-	User can add modifier to only one item with add button. If the modifier already exists, duplicate entry is not created and modifier is only added to the selected item.
-	User can map one modifier to multiple items using the URL specified below for mapping.
-	If user deletes a menu section, it deletes all the items and mapped modifiers with it. Similarly, if an item is deleted that still has modifiers, all mapped modifiers are deleted.

URLs:
GET / – displays homepage that contains entries from menu sections
GET /displayItems/:id – displays all items in the menu section with specified menu id
GET /displayModifiers/:id – displays all modifiers in the item with specified item id
GET /selectedModifiers/:id – selects the modifier with specified modifier id
POST /addMenu – adds an entry to the Menu Sections
POST / addItem – adds item entry to the selected Menu Section
POST /addModifier – adds modification entry to the selected Item
PUT /updateMenu/:id – updates the field(s) of specified menu id
PUT /updateItem/:id – updates the field(s) of specified item id
PUT /updateModifier/:id – updates the field of specified modifier id
DELETE /deleteMenu/:id – deletes the selected Menu Section
DELETE /deleteItem/:id – deletes the selected Item
DELETE /deleteModifier/:id - deletes the selected Modifier
GET /map/Item/:ItemID/Modifier/:ModifierID – maps (adds relation) the specified modifier to the specified item
GET /menu/full-menu – displays the entire hierarchy of menu in JSON format
