# TINYMCE
Use:
- Call file script: tinymce/tinymce.min.js
- Add position call: tinymce.init({ selector:'.input_data textarea' })
- insert plugin:<br>
 // Ex: add 2 plugin image and link<br>
 // List image exits<br>
           
       tinymce.init({<br>
           selector:"textarea",<br>
           plugins: "image,link",<br>
           image_list: [<br>
           {title: 'My image 1', value: 'https://www.tinymce.com/my1.gif'},<br>
           {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
           ]<br>
           });

