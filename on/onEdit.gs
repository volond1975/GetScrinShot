function onEditPasteGridImage(e) {
    let cache = CacheService.getDocumentCache();
    var range = e.range;
    var sheet = range.getSheet();
    var url = e.range.getValue();
    console.log(url);
    var strRegExp = "https:\/\/c2n.me\/(.*)"
    var reg = new RegExp(reg)
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




        if (isRegTest(strRegExp, url)) {
            var altTextTitle = R.match(/https:\/\/c2n.me\/(.*)/, url)[1] //FIXME
            SpreadsheetApp.getActiveSpreadsheet().toast(altTextTitle)
            var obj = getImagesSheet()
            var testAltTextTitle = R.prop(altTextTitle, obj)
            console.log(R.test(/https:\/\/c2n.me\/(.*)/, url) && (!testAltTextTitle));
            if (!testAltTextTitle) {
                var gridImage = sheet.insertImage(objData[0].urlImage, range.getColumn(), range.getRow(), range.getHeight(), range.getWidth());
                gridImage.setAnchorCellXOffset(range.getHeight())
                gridImage.setAnchorCellYOffset(range.getWidth())




                var e = setAltTitle(range, altTextTitle)
                var w = setDataByNameRange({ range: range })
                addSizePreviewFormula('=smile', range)
                cache.put("oldImage", altTextTitle);
                objData[0]["urlImageDrive"] = getAndSetDrive(objData[0])
                range.setNote(JSON.stringify({ url: url, urlImageDrive: objData.urlImageDrive, urlImage: objData.urlImage, }))
                    //  return res
            } else {
                SpreadsheetApp.getActiveSpreadsheet().toast("Уже есть")
                console.log("Уже есть");
            }
        }



















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