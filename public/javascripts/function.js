function displayForm(btnID){
	var txt = "form";
	var id = txt.concat(btnID);
	var x = document.getElementById(id);
	if (x.style.display === "none") {
    	x.style.display = "block";
  	} else {
  		x.style.display = "none";
  	}
}

function updateMenu(btnID, id, name, desc){
	displayForm(btnID);
	document.getElementById("ms_name_u").value = name;
	document.getElementById("ms_des_u").value = desc;
	document.getElementById("form4").action = "/updateMenu/"+id+"?_method=PUT";	
}

function updateItem(btnID, id, name, price, desc){
	displayForm(btnID);
	document.getElementById("i_name_u").value = name;
	document.getElementById("i_price_u").value = price;
	document.getElementById("i_des_u").value = desc;
	document.getElementById("form5").action = "/updateItem/"+id+"?_method=PUT";	
}

function updateModifier(btnID, id, desc){
	displayForm(btnID);
	document.getElementById("mo_name_u").value = desc;
	document.getElementById("form6").action = "/updateModifier/"+id+"?_method=PUT";	
}