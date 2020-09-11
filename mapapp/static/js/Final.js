////////////////
//Progress bar//
////////////////

$(document).ready(function(e) {
	var progressbar = $('.progress-bar');
	$(".upload").click(function(){
		$(".upload-form").ajaxForm(
		{
			target: '.preview',
			beforeSend: function() {
				$(".progress").css("display","block");
				progressbar.width('0%');
				progressbar.text('0%');
			},
			uploadProgress: function (event, position, total, percentComplete) {
				progressbar.width(percentComplete + '%');
				progressbar.text(percentComplete + '%');
				if (percentComplete == 100) {
					location.reload();
				}
			},
		});
	});
});

////////////////////////
//Map and context menu//
////////////////////////

var newCenter = ol.proj.fromLonLat([0, 0]);
var newMap = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions: {
		collapsible: false
		}
	}),
	target: 'newMap',
	layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		})
	],
	view: new ol.View({
		center: newCenter,
		zoom: 1.3
	})
});
var menuDisplayed = false;
var menuBox = null;
var manage_marker = document.getElementById("manage");
var delete_marker = document.getElementById("delete");

for (var i in markerDetail) {
	markerDetail[i].imageId.id = i;
	var marker = new ol.Overlay({
		position: markerDetail[i].longlat,
		positioning: 'center-center',
		element: markerDetail[i].imageId,
		stopEvent: false
	});
	newMap.addOverlay(marker);
	var marker_context = false;
	markerDetail[i].imageId.addEventListener("contextmenu", function(e) {
		for(var l = 0; l < markerDetail.length; l++){
			markerDetail[l].imageId.style.color = "black";
		}
		var k = event.target.id;
		document.getElementById('marker_name').innerHTML = markerDetail[k].markerName;
		var name = document.getElementById('marker_name').innerHTML;
		if (name == markerDetail[k].markerName) {
			markerDetail[k].imageId.style.color = "red";
			for (var j in fileDetail) {
				if (name == fileDetail[j].marker){
					fileDetail[j].file.style.display = "block";
				} else if (name != fileDetail[j].marker) {
					fileDetail[j].file.style.display = "none";
				}
			}
			var del = markerDetail[k].deleteId.style;
			delete_marker.onclick = function() {
				del.display = "block";
			}
		}
		marker_context = true;
		if (e instanceof MouseEvent) {
			mouseEvt = e;
			var left = mouseEvt.clientX;
			var top = mouseEvt.clientY;
			menuBox = document.getElementById("menu");
			menuBox.style.left = left + "px";
			menuBox.style.top = top + "px";
			menuBox.style.display = "block";
			manage_marker.style.display = "block";
			delete_marker.style.display = "block";
			mouseEvt.preventDefault();
			menuDisplayed = true;
		}
	});
	newMap.addEventListener("click", function() {
		if (modal.style.display = "block") {
			modal.style.display = "none";
			for(var l = 0; l < markerDetail.length; l++){
				markerDetail[l].imageId.style.color = "black";
			}
		}
	});
}

window.addEventListener("contextmenu", function() {
	var left = arguments[0].clientX;
	var top = arguments[0].clientY;
	menuBox = document.getElementById("menu");
	menuBox.style.left = left + "px";
	menuBox.style.top = top + "px";
	menuBox.style.display = "block";
	arguments[0].preventDefault();
	menuDisplayed = true;
}, false);

var manage_block = document.getElementById("manage-block");
var create_block = document.getElementById("create-block");
newMap.addEventListener("click", function(e) {
	marker_context = false;
	manage_block.style.display = "none";
	create_block.style.display = "none";
	if (menuDisplayed == true) {
		menuBox.style.display = "none";
		manage_marker.style.display = "none";
		delete_marker.style.display = "none";
	}
});

var content = document.getElementById('popup-content');

newMap.on('contextmenu', function(e) {
	var coordinate = e.coordinate;
	var hdms = ol.proj.toLonLat(coordinate);
	document.getElementById("id_long").value = hdms[0];
	document.getElementById("id_lat").value = hdms[1];
});

/////////
//Modal//
/////////

var modal = document.getElementById('myModal');
var manage = document.getElementById("manage");
var manage_block = document.getElementById("manage-block");
var create = document.getElementById("create");
var create_block = document.getElementById("create-block");
var span = document.getElementsByClassName("close")[0];
manage.onclick = function() {
	modal.style.display = "block";
	manage_block.style.display = "block";
}
create.onclick = function() {
	modal.style.display = "block";
	create_block.style.display = "block";
	document.getElementById('marker_name').innerHTML = "Create a new marker";
}
span.onclick = function() {
	modal.style.display = "none";
	manage_block.style.display = "none";
	create_block.style.display = "none";
}
