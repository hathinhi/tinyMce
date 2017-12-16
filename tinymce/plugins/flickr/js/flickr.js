/**
 * Flickr search - a TinyMCE flickr image search and place plugin
 * flickr/js/flickr.js
 *
 * This is not free software
 *
 * Plugin info: http://www.cfconsultancy.nl/
 * Author: Ceasar Feijen
 *
 * Version: 1.1 released 29/09/2013
 */

// Api key ( http://www.flickr.com/services/apps/create/apply/ )
var flickrapikey = '41a92923de08d07adba4057aae48c000';
// Maxresults
var maxresults = '16';
// Search in 'text' or use 'tags'
var searchoption = 'tags';
// User licenses ( http://www.flickr.com/services/api/flickr.photos.licenses.getInfo.html )
var searchlicenses = '4,5,6,7';
var userlicenses = '0,1,2,3,4,5,6,7,8';
// Set option to choose lightbox popup
var lightbox = true;
var relname = 'lightbox';

function displayFlickr(data) {
	$.each(data.photos.photo, function (i, item) {
	    src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_s.jpg";
	    $("<img/>").attr("src", src).attr("style", "cursor:pointer;margin:7px").appendTo("#images").click(function () {
		view("http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_");
	    });
	});
}

function showUserphotos(username,paging) {
    var url = "http://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=" + flickrapikey + "&username=" + username;
    $.getJSON(url + "&format=json&jsoncallback=?", function (data) {
	var user_id=data.user.id;
		url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrapikey + "&user_id=" + user_id + "&safe_search=1&license=" + userlicenses + "&per_page=" + maxresults + "&page=" + paging;
	var src;
	    $.getJSON(url + "&format=json&jsoncallback=?", function (data) {
	        displayFlickr(data);
		$(".loadMore").show(500);
		});
    });
}

function showPhotos(key,paging) {
    var user_id = "";
    var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrapikey + "&" + searchoption + "=" + key + "&user_id=" + user_id + "&safe_search=1&license=" + searchlicenses + "&per_page=" + maxresults + "&page=" + paging;
    var src;
	    $.getJSON(url + "&format=json&jsoncallback=?", function (data) {
	       displayFlickr(data);
		$(".loadMore").show(500);
    });
}

function search(bNew) {
    if (bNew) {
	    $("#hidPage").val(1);
	    $("#images").html('');
	    $(".loadMore").hide();
    }else{
		$(".loadMore").hide();
    }
    var paging = $("#hidPage").val();
    if (searchoption == 'tags') {
    	var key = $("#inpKeywords").val().replace(" ", ",");
    }
    var username = $("#inpUsername").val().replace(" ", " ");

    if (username != "") {
		showUserphotos(username,paging);
    }
    else if (key != "") {
		showPhotos(key,paging);
    }
}

function loadmore() {
    $("#hidPage").val(($("#hidPage").val()*1) + 1);
    search(false);
}

function view(src) {
    var size= $("[name='rdoSize']:checked").val();
    $("#inpImgURL").val(src + size + '.jpg');
}

function changeSize() {
    var sURL = $("#inpImgURL").val();
    	if (sURL == "") return;

    var size=$("[name='rdoSize']:checked").val()
    var ss = $("#inpImgURL").val().substr(0, $("#inpImgURL").val().length - 5);
    	$("#inpImgURL").val(ss + size + '.jpg');
}

function I_Close() {
    parent.tinymce.activeEditor.windowManager.close();
}

function convertQuotes(string){
    return string.replace(/["']/g, "");
}

function I_Insert() {

    /* Link URL */
    var sLinkURL = "";
    if ($("#chkOpenLarger").prop('checked') ) {
		var ss = $("#inpImgURL").val().substr(0, $("#inpImgURL").val().length - 5);
    	var imgrel = ' rel="'+relname+'"';
			sLinkURL = ss + 'z.jpg';
    }

    /* Link Title */
    var sTitle = $("#inpTitle").val();

    /* Link Css Style */
    var sCssStyle = "";
    if ($("#selAlign").val() == "left")
		sCssStyle = " style='float:left;margin:0 10px 0 0;'";
    else if ($("#selAlign").val() == "right")
		sCssStyle = " style='float:right;margin:0 0 0 10px;'";

    /* Image URL */
    var sImgURL = $("#inpImgURL").val();

    if (sImgURL == "") return false;

    if (sLinkURL != "") {
       var sHTML = '<a title="' + convertQuotes(sTitle) + '" href="' + sLinkURL + '"' + imgrel + '><img' + sCssStyle + ' alt="' + convertQuotes(sTitle) + '" src="' + sImgURL + '" border="0" /></a>';
    }else{
       var sHTML = '<img style="' + sCssStyle + '" alt="' + convertQuotes(sTitle) + '" src="' + sImgURL + '" border="0" />';
    }

    parent.tinymce.activeEditor.insertContent(sHTML);

}

$(function(){
	search(false);

	$('#inpKeywords').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        search(true);
	    }
	});
	$('#inpUsername').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        search(true);
	    }
	});

	if (lightbox != true) {
		$('.lightbox').hide();
	}

});