var folders=  document.getElementsByClassName("dir");

for (var i = 0; i < folders.length; i++) {
    folders[i].addEventListener('click',function() {openDir(this)}, false);
}
var root ='../image';
var currentFolder = root;
var imageRoot = '../image';
var currentImageFolder = imageRoot;
var result ;

function openDir(folder) {


    $('.pagingCont').remove();
    var folderName = folder.getAttribute("data-val");
    if(folderName!='') {
        if (folderName == 'back') {
            var the_arr = currentFolder.split('/');
            the_arr.pop();
            currentFolder = the_arr.join('/');

            var the_arrImg = currentImageFolder.split('/');
            the_arrImg.pop();
            currentImageFolder = the_arrImg.join('/');

        } else {
            currentFolder += ("/" + folderName);

            currentImageFolder += ("/" + folderName);
        }
        if (currentFolder != root) {

            $('.arrow').remove();
            $('<div class="col-md-3 dir arrow" onclick="openDir(this)" data-val="back" ><i class="fa fa-arrow-left fa-2x" aria-hidden="true">Back</i></div>').prependTo('.modal-header');
        } else {
            $('.arrow').remove();
        }
    }

    $(".modal-title").text(currentFolder);


    $.post('../admin/listDirecotry.php',{postDir:currentFolder,postName:currentImageFolder},function (data){
        result =JSON.parse(data)
        $(".pagination").arrayPaginate(result,$('#dirContent'))
    }) ;
}


function addDescription() {
   var customDescrition= $(".customDes");
    var descrition = $(".descContainer");
    if(customDescrition.css('display') == 'none')
    {

        customDescrition.css("display", "block");
        $('.descContainer').parent().addClass('col-sm-10');
        descriptionPreviewContainer.empty();
        $('.arrow').remove();
        customDescrition.setAttribute('name',"product_description[<?php echo $language['language_id']; ?>][description]");
        descrition.css("display", "none");
        descrition.setAttribute('name',"");
    } else{
        customDescrition.css("display", "none");
        descrition.css("display", "block");
        $('.descContainer').parent().removeClass('col-sm-10');
   //     descrition.setAttribute('name',"product_description[<?php echo $language['language_id']; ?>][description]");
    }
}

var imagPath='';
function getImagePath (image) {
    imagPath= $(image).attr('src');
$('#myModal').css('display','none');
}

var cutomDescTitle;
var customDescription;
var resultAll=[];
var currentString;

function getCustomDEscription() {
  var titleContainer = $('#inputTitle');
   var descriptionContainer = $('#inputDesc')
    cutomDescTitle= titleContainer.html();
    customDescription=descriptionContainer.html();
    $('#preview .shortDescN').append(currentString);
    $('#previewModal .arrow').remove();
   currentString ="<div class ='descriptionProduct descProdClima'><div class='col-md-6'><img src ='"+imagPath+"'></div><div class='col-md-6'><span><h3>"+cutomDescTitle+"</h3>"+customDescription+"</span></div></div>";

   resultAll.push(currentString);


       $('#preview').append(currentString);
$('.descContainer .note-editable').append(currentString);
 //   $(' #input-description2').append(currentString);
    titleContainer.empty();
  descriptionContainer.empty();
}

function addShortDescription() {
    var customShortDescrition = $(".customShortDes");
    if (customShortDescrition.css('display') == 'none') {
        customShortDescrition.css("display", "block");

    } else {
        customShortDescrition.css("display", "none");

    }
}



var isFirst=0;
var descriptionPreviewContainer = $('#preview');
var customSHortDescPreview = $('.shortDescriptionDiv');
function getCustomShortDescription() {
    var titleContainer = $('#inputShortLine');

    var decModelContainer =$('textarea[placeholder ="Short Description"]').nextAll(".note-editable");

   // var decModelContainer = $('.shortDescription .note-editable');
    $('#previewShort .arrow').remove();

  if (isFirst==0){


     // $('textarea[placeholder ="Short Description"]').closest('div').addClass('shortDescContainer');
$('.shortDescContainer .note-editable').html('<div class="shortDescN"></div>');
      isFirst=1;


  }
   // $('#previewShort .shortDescN').append('<span>'+titleContainer.html()+'</span>');
    customSHortDescPreview.append('<span>'+titleContainer.html()+'</span>');
    $('.shortDescN').append('<span>'+titleContainer.html()+'</span>');

    titleContainer.empty();

}
$( document ).ready(function() {

  $('textarea[placeholder ="Description"]').closest('div').addClass('descContainer');
 if ($('textarea[placeholder ="Short Description"]').length){
     $('textarea[placeholder ="Short Description"]').closest('div').addClass('shortDescContainer');
   var button  = $("<button data-val='' onclick='addShortDescription()' type='button' class='btn btn-info btn-md' >Add Custom Description</button>")
button.insertBefore($('.customShortDes'))
      // alert('exist')
 }
});