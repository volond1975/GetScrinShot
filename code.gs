/*
function inputurl() {
  var html = HtmlService.createHtmlOutputFromFile('index')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setWidth(600)
    .setHeight(80);
  SpreadsheetApp.getUi().showModalDialog(html, 'URL?');
}
*/



function inputurl() {
const scrProp=new Props("ScriptProperties");
var rName={ name:'sizeHTML' }


//const sizeHTML=scrProp.get("sizeHTML")
var range=SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
var note=range.getNote()
//var json=SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getNote()
var obj=JSON.parse(note)
var id=getIdFromUrl(R.prop('urlImageDrive',obj))
//var file=DriveApp.getFileById(id)
//var blob=file.getBlob()
//var  blobSize  =  ImgApp . getSize ( blob ) ;

var  resizeObj=resizeFileById(getWidth(rName))

//var  blobSizeRes  =  ImgApp . getSize ( res.blob ) ;
//console.log(`${blobSize.filesize}=>${blobSizeRes.filesize}`)
var b64URL=blobToBase64UR(R.view(lensBlob,resizeObj(id)))//'data:' + resizeBlob.getContentType() + ';base64,' + Utilities.base64Encode(resizeBlob.getBytes())

//console.log(title)
//https://stepbystep-hdr.livejournal.com/208332.html
var html=`<!DOCTYPE html>
<html>
  <head>
    <style>
    </style>
  </head>
  <body>
<div style="overflow: scroll;"><img src="${b64URL}" style="min-width:${res.resizedwidth-10}px;min-height:${res.resizedheight-10}px"/></div>
 

  </body>
</html>`


  //var html = UrlFetchApp.fetch(p.url);
  var modalDialog = HtmlService.createHtmlOutput(html)
    .setWidth(res.resizedwidth+10)
    .setHeight(res.resizedheight+30)
    .setTitle((res.resizedwidth+10)+'x'+(res.resizedheight+30));
  modalDialog.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
  SpreadsheetApp.getActiveSpreadsheet().show(modalDialog);
  scrProp.set("index", "open");
}


/*
function launchbrowser(p) {
var obj=JSON.parse(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getNote())
//var id=getIdFromUrl(JSON.parse(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getNote()).urlImageDrive)
 const InherentHeight = obj.InherentHeight;
 const InherentWidth = obj.InherentWidth;

var id=getIdFromUrl(obj.urlImageDrive)

var file=DriveApp.getFileById(id)
var blob=file.getBlob()
var b64URL='data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes())
//console.log(title)
//https://stepbystep-hdr.livejournal.com/208332.html
var html=`<!DOCTYPE html>
<html>
  <head>
    <style>


    </style>
  </head>
  <body>
<div style="overflow: scroll;"><img src="${b64URL}" style="width:1365px;min-height:${InherentHeight}px" /></div>
 
</div> 
  </body>
</html>`


  //var html = UrlFetchApp.fetch(p.url);
  var blob = HtmlService.createHtmlOutput(html)
    .setWidth(12000)
    .setHeight(12000)
    .setTitle('title');
  blob.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
  SpreadsheetApp.getActiveSpreadsheet().show(blob);
}
*/



