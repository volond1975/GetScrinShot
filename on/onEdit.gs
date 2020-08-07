function closeWindow({window='index'}={}) {
 const scrProp=new Props("ScriptProperties");
  if (scrProp.get(window) == "open") {
    var html = HtmlService.createHtmlOutput("<script>google.script.host.close();</script>");
    SpreadsheetApp.getActiveSpreadsheet().show(html);
    scrProp.set(window, "close");
  }
}


function onEditPasteGridImage(e) {
    const scrProp=new Props("ScriptProperties");
    let cache = CacheService.getDocumentCache();
    var range = e.range;
    var sheet = range.getSheet();
    var url = e.range.getValue();
  
  var rule=getActiveRangeDataValidation(range)
  
  // if(rule==SpreadsheetApp.DataValidationCriteria.CHECKBOX&&range.getValue()){
   if(isCHECKBOX(rule)&&range.getValue()){
 //  inputurl();
   viewByCheckBox()
   console.log('inputurl()')
   }
   else{
    console.log('closeWindow()')
    closeWindow()
   //FIXME:unchek https://stackoverflow.com/questions/59485690/apps-script-how-to-detect-dialog-is-closed
   };
  
    var strRegExp = "https:\/\/c2n.me\/(.*)"
    var reg = new RegExp(reg)
  /*
  if (R.test(/https:\/\/c2n.me\/(.*)/, url)) {
        var altTextTitle = R.match(/https:\/\/c2n.me\/(.*)/, url)[1]
        var obj = getImagesSheet()
        var testAltTextTitle = R.prop(altTextTitle, obj)
        console.log(testAltTextTitle);
        
        
        let objData = [{
            pageLink: e.range.getValue(), //"https://clip2net.com/s/48CqgV3",
            fileName: altTextTitle,
            strRegExp: 'image-down-file" href="http:\/\/clip2net.com\/(.+).nocache',
            baseURL: "http://clip2net.com",
            folderId: "1Ewdf8RGsn_MkZzvDryw8fv9p9HJm01mW",
            urlImage: '',
            urlImageDrive: '',
        }, ]
        const response = UrlFetchApp.fetch(url);

        var getImageLinkByResponse = getImageLink(objData[0]);
        // var urlImage=getImageLinkByResponse(response)
        objData[0]["urlImage"] = getImageLinkByResponse(response)

        console.log('objData:', objData);


*/

        if (isRegTest(strRegExp, url)) {
            const getWidth=({name})=>getNameRangeActiveSpreadsheet({ name:name }).getValue()
            var lensBlob=R.lensProp('blob');
            var resizeFileById=R.curry((width,id)=>ImgApp.doResize(id,width))
            var imagePrefiks='ScrIns_'
            var altTextTitle = R.match(/https:\/\/c2n.me\/(.*)/, url)[1] //FIXME
            SpreadsheetApp.getActiveSpreadsheet().toast(` Ищем изображение по имени:${altTextTitle+altTextTitle}`)
            var obj = imagesObjFiltered//getImagesSheet().filter(filterScriptImage)
            
            var noteObj={}
            var testAltTextTitle = R.prop(imagePrefiks+altTextTitle, getImagesSheet())
            console.log(R.test(/https:\/\/c2n.me\/(.*)/, url) && (!testAltTextTitle));
            if (!testAltTextTitle) {
            let objData = [{
            pageLink: e.range.getValue(), //"https://clip2net.com/s/48CqgV3",
            fileName: altTextTitle,
            strRegExp: 'image-down-file" href="http:\/\/clip2net.com\/(.+).nocache',
            baseURL: "http://clip2net.com",
            folderId: "1Ewdf8RGsn_MkZzvDryw8fv9p9HJm01mW",
            urlImage: '',
            urlImageDrive: '',
        }, ]
        const response = UrlFetchApp.fetch(url);

        var getImageLinkByResponse = getImageLink(objData[0]);
        // var urlImage=getImageLinkByResponse(response)
        objData[0]["urlImage"] = getImageLinkByResponse(response)
        objData[0]["urlImageDrive"] = getAndSetDrive(objData[0])
        
        var id=getIdFromUrl( objData[0]["urlImageDrive"])
        var resize=getWidth({name:'insertImageToSheetSize'})
        if(resize){
        var [h,w,x,y]= resize.split("|")
        var resizeObj=resizeFileById(w,id)
        var source= R.view(lensBlob,resizeObj)
        var gridImage = sheet.insertImage(source, range.getColumn(), range.getRow(), h, w);
        noteObj={
 id: 'ScrIns_'+altTextTitle,
 urlImageDrive: objData[0].urlImageDrive,
  }
  logJson('noteObj',noteObj)

 }      
else{
 var source=objData[0].urlImage
 var gridImage = sheet.insertImage(source, range.getColumn(), range.getRow(),range.getWidth(), range.getHeight());
 const InherentHeight = gridImage.getInherentHeight();
 const InherentWidth = gridImage.getInherentWidth();
 noteObj={
 url: url,
 urlImageDrive: objData[0].urlImageDrive,
 urlImage: objData[0].urlImage,
 InherentHeight:InherentHeight,
 InherentWidth:InherentWidth
 }

 
 // gridImage.setAnchorCellXOffset(x)
   //           gridImage.setAnchorCellYOffset(y)
 }
 
  
        console.log('objData:', objData);
      var z = setAltTitle(range, imagePrefiks+altTextTitle)
      addCheckbox()//setDataByNameRange({ range: range }) 
     range.setValue(true)           
     range.setNote(JSON.stringify(noteObj))
        
            
            
            
                //insertImageToSheet
               
               // var gridImage = sheet.insertImage(objData[0].urlImage, range.getColumn(), range.getRow(), range.getHeight(), range.getWidth());
           //   var gridImage = sheet.insertImage(objData[0].urlImage, range.getColumn(), range.getRow(), h, w);
              
             
              
               


             //   var z = setAltTitle(range, 'ScrIns_'+altTextTitle)
             //   addCheckbox()//setDataByNameRange({ range: range })
              //  addSizePreviewFormula('=smile', range)
                
                cache.put("oldImage",imagePrefiks+altTextTitle);
                
                
                
               
                var window='index'
                viewByCheckBox({range:range})
                //scrProp.set(window, "close");
            } else {
               toast("Картинка с таким Именем Уже есть!","Внимание!!!",10)
                console.log("Уже есть");
              //  range.setNote("Уже есть")
                previewByName(imagePrefiks+altTextTitle)
            }
        }


















  //  }
  if(R.test(/.*\|.*/, url)){
   inputurl()
 }
   
    
}
//

const testFind = () => {
    var str = 'https://c2n.me/48CH2o2' ["https:\/\/c2n.me\/(.*)", "[-\w]{25,}"].find


}

const isRegTest = R.curry((strRegExp, str) => {
    //var str='https://c2n.me/48CH2o2'
    //var strRegExp="https:\/\/c2n.me\/(.*)"
    var reg = new RegExp(strRegExp)
    console.log(R.test(reg, str))
    return R.test(reg, str)
})

const getAltTextByRegExp = R.curry((strRegExp, str) => {
    //var str='https://c2n.me/48CH2o2'
    //var strRegExp="https:\/\/c2n.me\/(.*)"
    var reg = new RegExp(strRegExp)
    var altTextTitle = R.match(reg, str) // [1]
    return altTextTitle //{res:altTextTitle}
})




const isAltTextTitleTest = () => {
    var url = 'https://c2n.me/48CH2o2'
    var strRegExp = "https:\/\/c2n.me\/(.*)"
    var reg = new RegExp(reg)
    var altTextTitle = R.match(reg, url)[1]
    var obj = getImagesSheet()
    var testAltTextTitle = R.complement(R.prop(altTextTitle, obj))
    console.log(testAltTextTitle)
}


const getUrlImageLink = (objData) => {

    var response = UrlFetchApp.fetch(url);
    var getImageLinkByResponse = getImageLink(objData[0]);
    var urlImage = getImageLinkByResponse(response)

    var request1 = {

        'url': urlImage,
        'method': 'post'
    };
    var result = new RetriableRequestsBatch(UrlFetchApp, [request1]).fetchWithRetries();
    if (result.error) {
        console.error('Ошибка при получении пакета:', result.error);
        return;
    }
    console.log('Успешно извлеченный пакет запросов. Responses:', result.responses);
    return urlImage



}

const getAndSetDrive = ({ urlImage, fileName, folderId }) => {


        var request1 = {

            'url': urlImage,
            'method': 'post'
        };
        console.log('request1:', request1);
        var resultImage = new RetriableRequestsBatch(UrlFetchApp, [request1]).fetchWithRetries();
        if (resultImage.error) {
            console.error('Ошибка при получении пакета:', resultImage.error);
            return;
        }
        console.log('Успешно извлеченный пакет запросов. Responses:', resultImage.responses);
        const arrBlobImage = resultImage.responses.map((el, i) => { return { blob: el.getBlob(), fileName: fileName, destinationFolderId: folderId } })
        console.log('arrBlobImage:', arrBlobImage);
        var arrDownloadURl = arrBlobImage.map(createsFile)
        console.log('arrDownloadURl:', arrDownloadURl);
        return arrDownloadURl[0]
    }
    //const insertB
    //var blob = Utilities.newBlob(Utilities.base64DecodeWebSafe(obj.screenshot.data), "image/png", "sample.png");
    //DriveApp.createFile(blob);