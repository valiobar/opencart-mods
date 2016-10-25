<?php

$dir = $_POST['postDir'];
$result =array() ;
$dirName=$_POST['postName'];

foreach (new DirectoryIterator($dir) as $fileInfo) {
   $filename = $fileInfo->getFilename();
   if($fileInfo->isDot()) continue;
   if($fileInfo->isDir()){
       if($filename != 'cache') {
           array_push( $result, '<div class="col-md-3 dir page" onclick="openDir(this)" data-val=' . $filename . ' ><i class="fa fa-folder fa-5x"></i><br>' . $filename . '</div>');
       }
  }else{


       array_push($result , '<div class="col-md-3 page"><img data-dismiss="modal" onclick="getImagePath(this)" class="img-thumbnail" src="'.$dirName.'/'. $filename. '"alt="'. $filename.'" width="100" height="100" /></div>');

   }
}
echo json_encode( $result);