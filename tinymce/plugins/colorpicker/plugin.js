/**
 * plugin.min.js
 *
 * Copyright, Alberto Peripolli
 * Released under Creative Commons Attribution-NonCommercial 3.0 Unported License.
 *
 */
tinymce.PluginManager.add("colorpicker",function(e){function t(){e.focus(true);var t="Color Picker";win=e.windowManager.open({title:t,file:tinyMCE.baseURL+"/plugins/colorpicker/index.html",width:550,height:240,inline:1,resizable:true,maximizable:true})}e.addButton("colorpicker",{image:tinyMCE.baseURL+"/plugins/colorpicker/color.png",tooltip:"Color Picker",onclick:t})})