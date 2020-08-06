var R = RAMDA.R;
const isImageHiden = R.curry((obj, el) => obj[el].Height == 2);
const isImageVisible = R.curry((obj, el) => obj[el].Height != 2);

const isImageRange = R.curry((range, obj, el) => obj[el].AnchorCellA1Notation == range.getA1Notation())
const isImageNotRange = R.curry((range, obj, el) => obj[el].AnchorCellA1Notation != range.getA1Notation())
    //const isImageVisible=R.complement(isImageHiden);
const getImagesKeys = R.curry((obj) => Object.keys(obj))
const filteredImageKey = R.curry((obj, fn) => R.filter(fn(obj), getImagesKeys(obj)))

function imageActiveCell() {
    var spreadsheet = SpreadsheetApp.getActive();
    var sh = spreadsheet.getActiveSheet()
    var images = sh.getImages()
    var range = sh.getActiveCell()
        // for(i of images){
        // log(i.getUrl())
        // }
    images[0].setAnchorCell(range)
}

function getImageObjByNameSheet(searchImage) {
    var imagesSheet = getImagesSheet();
    var nameLens = R.lensProp(searchImage);
    return R.view(nameLens, imagesSheet)
}

var tgetImageObjByNameSheet = () => {
    console.log(getImageObjByNameSheet('img_1m'))
}

var tgetImageObjsFromSpreadsheet = ({ ss = SpreadsheetApp.getActive() } = {}) => {
    //var spreadsheet = SpreadsheetApp.getActive();
    var sheets = ss.getSheets()
    sheets.map(sheet => {
        return getImagesSheet({ ss: ss, sh: sheet })
    })
    console.log(sheets)
}


function imageNameRange() {
    var spreadsheet = SpreadsheetApp.getActive();
    var sh = spreadsheet.getActiveSheet()
    var range = sh.getActiveCell()
    const nameR = getNameRangeActiveSpreadsheet({ name: range.getValues() })
    var image = sh.getImages()
    var range = sh.getActiveCell()
    image[0].setAnchorCell(nameR)
};

const getImagesSheet = ({ spreadsheet = SpreadsheetApp.getActive(), sh = spreadsheet.getActiveSheet() } = {}) => {
    const imagesData = {}
        // var spreadsheet = SpreadsheetApp.getActive();
        // var sh=spreadsheet.getActiveSheet() 
    var images = sh.getImages();
    for (image of images) {
        const v = gritImageData(image)
        imagesData[v.AltTextTitle] = v
    }
    return imagesData
        //  logJson("images",imagesData);
        //log(imagesData['Dice'].AnchorCellA1Notation);
}
const gritImageData = (image) => {
    //sheet
    const sheet = image.getSheet();
    const sheetId = sheet.getSheetId();
    const sheetName = sheet.getName();

    //AnchorCell
    const AnchorCell = image.getAnchorCell();
    const AnchorCellA1Notation = AnchorCell.getA1Notation();
    const AnchorCellHeight = AnchorCell.getHeight()
    const AnchorCellWidtht = AnchorCell.getWidth()
        //Offset
    const AnchorCellXOffset = image.getAnchorCellXOffset();
    const AnchorCellYOffset = image.getAnchorCellYOffset();


    //AltText
    const AltTextDescription = image.getAltTextDescription();
    const AltTextTitle = image.getAltTextTitle();
    //size
    const InherentHeight = image.getInherentHeight();
    const InherentWidth = image.getInherentWidth();
    const Height = image.getHeight();
    const Width = image.getWidth();

    const script = image.getScript();

    const url = image.getUrl();

    return {
        AnchorCell: AnchorCell,
        AltTextDescription: AltTextDescription,
        AltTextTitle: AltTextTitle,
        AnchorCellA1Notation: AnchorCellA1Notation,
        AnchorCellXOffset: AnchorCellXOffset,
        AnchorCellYOffset: AnchorCellYOffset,
        Height: Height,
        InherentHeight: InherentHeight,
        InherentWidth: InherentWidth,
        Script: script,
        sheetId: sheetId,
        Url: url,
        Width: Width,
        image: image,
    }

}


const resize = R.curry((size, image) => {
    image.setHeight(size)
    image.setWidth(size)
})
const hide = resize(2)
const preview = resize(200)
    //SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation()


function getActiveCellImageNames() {
    var range = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell()
    var url = range.getValue() //'https://c2n.me/48CH2o2'
    var strRegExp = "https:\/\/c2n.me\/(.*)"
        //isRegTest(strRegExp,url)
        //if (R.test(/https:\/\/c2n.me\/(.*)/,url)){
    if (isRegTest(strRegExp, url)) {
        var altTextTitle = R.match(/https:\/\/c2n.me\/(.*)/, url)[1] //FIXME
        SpreadsheetApp.getActiveSpreadsheet().toast(altTextTitle)
        var obj = getImagesSheet()
        var testAltTextTitle = R.prop(altTextTitle, obj)
        console.log(R.test(/https:\/\/c2n.me\/(.*)/, url) && (!testAltTextTitle));
        if (!testAltTextTitle) {





            var e = setAltTitle(range, altTextTitle)
            var w = setDataByNameRange({ range: range })
            addSizePreviewFormula('=smile', range)
                //  return res
        } else {
            console.log("Уже есть");
        }
    }
}
const addSizePreviewFormula = (formula, range) => {
    range.setFormula(formula)
}



const setAltTitle = (range, altTextTitle) => {
    var objImages = getImagesSheet()
    console.log(`${range.getSheet().getName()}!${range.getA1Notation()}`)
        // var fnImageActiveCell=isImageRange(range)
    var arrNames = filteredImageKey(objImages, isImageRange(range))
    var res = getImagesByArrNames({ arrNames: arrNames, objImages: objImages })

    if (res.length == 1) {
        //  console.log(JSON.stringify(res))
        res[0]['image'].setAltTextTitle(altTextTitle)
        return { res: objImages[altTextTitle] }
    } else {
        console.log(" К ячейке привязано более одного изображения");
        return { error: ' К ячейке привязано более одного изображения', res: res }
    }

}


const has=(key)=>{
 var obj = getImagesSheet()
 var testAltTextTitle = R.prop(altTextTitle, obj)



}