//
//https://script.google.com/macros/library/versions/d/1pkUU_vx-O8YwQrvq4knLMzPBqXNO8-CdWNgYMihhbfrGleJj9Eg1zr30
//<div class="image-pic">
//<span class="image-pic-max">
//<img src="clip/m417673/ea061-clip-99kb.png?nocache=1" alt="" style="max-width: 678px; max-height: 288px;">
//</span>
//</div>
//http://clip2net.com/clip/m417673/ea061-clip-99kb.png
//http://clip2net.com/s/clip/m417673/ea061-clip-99kb.png


function test() {
    var url = 'https://clip2net.com/s/48CqgV3';
    const response = UrlFetchApp.fetch(url);
    Logger.log(response)
        //const $ = Cheerio.load(response.getContentText());
        // Logger.log($('.image-pic-max'));
    Logger.log($('img'));
}
//.child().attr('srs')span

//===================================================================================

const testGetUrlFromResponseHTML1 = () => {

    var url = 'https://clip2net.com/s/48CqgV3';
    const b = UrlFetchApp.fetch(url);

    var getImageLinkByResponse = getImageLink(objData[0]);
    console.log(getImageLinkByResponse(b));
};

const testgetAltTextByRegExp = () => { console.log(getAltTextByRegExp('https://c2n.me/48CH2o2', "https:\/\/c2n.me\/(.*)")) }