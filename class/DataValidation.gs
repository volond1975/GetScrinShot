
const addCheckbox=({range=SpreadsheetApp.getActiveSpreadsheet().getActiveCell()}={})=> {
  var criteria = SpreadsheetApp.DataValidationCriteria.CHECKBOX;
  var rule = SpreadsheetApp.newDataValidation()
    .requireCheckbox()
    .build();
  range.setDataValidation(rule);
 return 
}

const getUrlFromNoteJson=R.curry((key,range)=>{
var note=range.getNote();
if (!note){toast("Нет примечания") ;return}
if (!IsJsonString(note)){toast("JSON в примечании не валидный");return}

var obj=JSON.parse(note);
var lensUrlImageDrive=R.lensProp(key);
var Url=R.view(lensUrlImageDrive,obj)
return Url
})
 const b=()=>logJson(getUrlFromNoteJson('url',aCell()))
const getUrlDriveFromNoteJson=getUrlFromNoteJson('urlImageDrive')
const aCell = () => SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell()
const aSheet = () => SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()//.getName()
const getNameDriveFromNoteJson = (range) => R.match(/https:\/\/c2n.me\/(.*)/, getUrlFromNoteJson('url', range))[1]
var altTextTitle = () => getNameDriveFromNoteJson({ range = aCell() } = {}) //FIXME

const isIdByValue=({url=SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue()}={})=>{

var id=getIdFromUrl(url)
if (!id){toast("Нет id") ;return id}else{toast(id);return }

}

const getUrlImageDriveToJson=(urlImageDrive)=>{return JSON.stringify({"urlImageDrive":urlImageDrive})}

const setKeyFromNoteJson=R.curry(({key='urlImageDrive',range=SpreadsheetApp.getActiveSpreadsheet().getActiveCell(),url=range.getValue()}={})=>{
var note=range.getNote();
if (!note){toast("Нет примечания");range.setNote(JSON.stringify({key:''}));note=range.getNote();}
if (!IsJsonString(note)){toast("JSON в примечании не валидный");return}
//toast(JSON.stringify(note))
var obj=JSON.parse(note);

var lensUrlImageDrive=R.lensProp(key);

//toast(JSON.stringify(Url))
var UrlObj=R.set(lensUrlImageDrive,url,obj)
range.setNote(JSON.stringify(UrlObj))
range.setValue(false)
//toast(JSON.stringify(Url))
addCheckbox({range:range})
var Url=R.view(lensUrlImageDrive,UrlObj)
return Url
})

 const viewByCheckBox=({range=SpreadsheetApp.getActiveSpreadsheet().getActiveCell()}={})=>{
 const scrProp=new Props("ScriptProperties");
 var rule=getActiveRangeDataValidation({cell:range})
if(!isCHECKBOX(rule)){toast("Нет чекбокса") ; return}
//var note=range.getNote()
//var obj=JSON.parse(note)
//var lensUrlImageDrive=R.lensProp('urlImageDrive');
//var id=getIdFromUrl(R.view(lensUrlImageDrive,obj))
var url=getUrlFromNoteJson('urlImageDrive',range)
if (!url){toast("Нет urlImageDrive") ;return}

var id=getIdFromUrl(url)
var chunky = ChunkyCache(CacheService.getDocumentCache(), 1024 * 90);

if (!id){toast("Нет id") ;return}
var lensBlob=R.lensProp('blob');


var rName={ name:'sizeHTML' }
var resizeFileById=R.curry((width,id)=>ImgApp.doResize(id,width))
const getWidth=({name})=>getNameRangeActiveSpreadsheet({ name:name }).getValue()
var  resizeObj=resizeFileById(getWidth(rName),id)
var check = chunky.get(id);
//toast(check)
if(!check){
 toast("Записываю в кеш!",10)
var b64URL=blobToBase64URL(R.view(lensBlob,resizeObj))

var imgTag=`<img src="${b64URL}" style="min-width:${resizeObj.resizedwidth-10}px;min-height:${resizeObj.resizedheight-10}px"/>`
var html=`<!DOCTYPE html>
<html>
  <head>
    <style>
    </style>
  </head>
  <body>
    <div style="overflow: scroll;">
      ${imgTag}
    </div>
   </body>
</html>`
 chunky.put(id, html, 120);
 }
 else{
 var html=check
 }
var modalDialog = HtmlService.createHtmlOutput(html)
    .setWidth(resizeObj.resizedwidth+10)
    .setHeight(resizeObj.resizedheight+30)
    .setTitle((resizeObj.resizedwidth+10)+'x'+(resizeObj.resizedheight+30));
  modalDialog.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
  SpreadsheetApp.getActiveSpreadsheet().show(modalDialog);
  scrProp.set("index", "open");
 
 
 
 
 
 }

const addCheckboxActiveCell=()=>{


const scrProp=new Props("ScriptProperties");

var range=SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
var rule=getActiveRangeDataValidation({cell:range})
if(!isCHECKBOX(rule)){toast("Нет чекбокса") ; return}
//var note=range.getNote()
//var obj=JSON.parse(note)
//var lensUrlImageDrive=R.lensProp('urlImageDrive');
//var id=getIdFromUrl(R.view(lensUrlImageDrive,obj))
var url=getUrlFromNoteJson('urlImageDrive',range)
if (!url){toast("Нет urlImageDrive") ;return}

var id=getIdFromUrl(url)
if (!id){toast("Нет id") ;return}
var lensBlob=R.lensProp('blob');


var rName={ name:'sizeHTML' }
var resizeFileById=R.curry((width,id)=>ImgApp.doResize(id,width))
const getWidth=({name})=>getNameRangeActiveSpreadsheet({ name:name }).getValue()
var  resizeObj=resizeFileById(getWidth(rName),id)
var b64URL=blobToBase64URL(R.view(lensBlob,resizeObj))
var imgTag=`<img src="${b64URL}" style="min-width:${resizeObj.resizedwidth-10}px;min-height:${resizeObj.resizedheight-10}px"/>`
var html=`<!DOCTYPE html>
<html>
  <head>
    <style>
    </style>
  </head>
  <body>
    <div style="overflow: scroll;">
      ${imgTag}
    </div>
   </body>
</html>`
var modalDialog = HtmlService.createHtmlOutput(html)
    .setWidth(resizeObj.resizedwidth+10)
    .setHeight(resizeObj.resizedheight+30)
    .setTitle((resizeObj.resizedwidth+10)+'x'+(resizeObj.resizedheight+30));
  modalDialog.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
  SpreadsheetApp.getActiveSpreadsheet().show(modalDialog);
  scrProp.set("index", "open");
//toast(html)
//addCheckbox({range:range})
}
const setDataByNameRange = ({ name = "Sizes", range }) => {
    var rangeList = getNameRangeActiveSpreadsheet({ name: name })
    var list = getNameRangeActiveSpreadsheet({ name: name }).getValues().flat().filter(el => el != '')
    var rule = SpreadsheetApp.newDataValidation().requireValueInRange(rangeList).build();
    range.setDataValidation(rule);
}

  var isDataValidationCriteria=R.curry((type,rule)=>rule==SpreadsheetApp.DataValidationCriteria[type])
  var isCHECKBOX=isDataValidationCriteria("CHECKBOX")
    
function getActiveRangeDataValidation({cell=SpreadsheetApp.getActive().getActiveRange()}) {
  // Log information about the data validation rule for cell A1.
//var cell = SpreadsheetApp.getActive().getActiveRange();
var rule = cell.getDataValidation();
if (rule != null) {
  var criteria = rule.getCriteriaType();
  var args = rule.getCriteriaValues();

 Logger.log('The data validation rule is %s %s', criteria, args);
 
  return criteria
} else {
  var info={
   values:cell.getValues(),
   background : cell.getBackgrounds(),
   banding : cell.getBandings(),
   mergedRanges : cell.getMergedRanges(),
   fontColor : cell.getFontColors(),
   fontFamily : cell.getFontFamilies(),
   fontLine : cell.getFontLines(),
   fontSize : cell.getFontSizes(),
   fontStyle : cell.getFontStyles(),
   fontWeight : cell.getFontWeights(),
   horAlign : cell.getHorizontalAlignments(),
   textStyle : cell.getTextStyles(),
   vertAlign : cell.getVerticalAlignments(),
   formula:cell.getFormula(),
   valueDisplay:cell.getDisplayValue(),
   sheetName:cell.getSheet().getName(),
   A1Not:cell.getA1Notation()
  
  }
 // Logger.log(JSON.stringify(info))
 // Logger.log('The cell does not have a data validation rule.')
 
//  Logger.log('The cell info %s .',JSON.stringify(info))
  return //JSON.stringify(info)
}
}    
    

