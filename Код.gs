//lib RAMDA -1pkUU_vx-O8YwQrvq4knLMzPBqXNO8-CdWNgYMihhbfrGleJj9Eg1zr30
var R = RAMDA.R;
const P = ParametrsV6.P


function createsFile({ destinationFolderId, blob, fileName, contentType = 'image/jpeg' }) {
    // var contentType = 'image/jpeg';
    var resContentType = blob.getContentType()
    if (resContentType != "application/json") {
        var newBlob = blob.getAs(contentType)
            //const file=DriveApp.createFile(blob);
            //file.setName(fileName);
        const file = DriveApp.createFile(newBlob)
        file.setName(fileName);
        DriveApp.getFolderById(destinationFolderId).addFile(file);
        file
            .getParents()
            .next()
            .removeFile(file);
        return file.getUrl()
    } else {
        return "No Link" + JSON.parse(blob.getDataAsString()).args.test
    }

}



function DRIVE_IMAGE(link) {
    return link.replace("open?", "uc?export=download&");
}

const getActiveCellImage = () => {
    var obj = getImagesSheet()
    var t = Object.keys(obj).filter(el => obj[el].AnchorCellA1Notation === SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation())
    SpreadsheetApp.getActiveSpreadsheet().toast(([t[0].AltTextTitle]))
}
const filterScriptImage=(el)=>R.test(/ScrIns_.*/,el)
const imagesFiltered=()=>{
var obj = getImagesSheet()
var imageNames = Object.keys(obj)
  return imageNames.filter(filterScriptImage).map(el=>obj[el].image)
}
const imagesObjFiltered=()=>{
var obj = getImagesSheet()
var imageNames = Object.keys(obj)
  return imageNames.filter(filterScriptImage).map(el=>obj[el])
}
function viewAll() {
   // var obj = getImagesSheet()
   // var imageNames = Object.keys(obj)
    var ts = imagesFiltered()//imageNames.filter(filterScriptImage).map(el=>obj[el].image)
    ts.forEach(image => {
        image.setHeight(0)
        image.setWidth(0)
    })
}




function hideAll() {
   // var obj = getImagesSheet()
   // var imageNames = Object.keys(obj)
 var ts = imagesFiltered()//imageNames.filter(filterScriptImage).map(el=>obj[el].image)
    console.log(ts)
    ts.forEach(hide)

}

function previewAll() {
    var obj = getImagesSheet()
    var imageNames = Object.keys(obj)
    var ts = imageNames.filter(filterScriptImage).map(el=>obj[el].image)
    console.log(ts)
    ts.forEach(preview)

}
