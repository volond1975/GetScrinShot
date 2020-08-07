function myFunction() {
  
}
/*
const f = () => {
    var siteUrl = "https://blog.banghasan.com/note/tutorial/bot/telegram/google%20script/GAS-Library-Cheerio/";
    var url = "https://www.googleapis.com/pagespeedonline/v4/runPagespeed?screenshot=true&fields=screenshot&url=" + encodeURIComponent(siteUrl);
    var res = UrlFetchApp.fetch(url).getContentText();
    var obj = JSON.parse(res);
    var blob = Utilities.newBlob(Utilities.base64DecodeWebSafe(obj.screenshot.data), "image/png", "sample.png");
    DriveApp.createFile(blob);
}
*/
function g() {
    var obj = getImagesSheet()
    var t = Object.keys(obj).filter(el => obj[el].AnchorCellA1Notation === SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation())
    SpreadsheetApp.getActiveSpreadsheet().toast((t[0]))
    var fn = { "img_1": (msg) => SpreadsheetApp.getActiveSpreadsheet().toast(msg) }
    fn[t[0]](t[0])
}
function hideAll1() {
    var obj = getImagesSheet()
    var ts = Object.keys(obj).map(el => obj[el].image)
    ts.forEach(image => {
        image.setHeight(2)
        image.setWidth(2)
    })
}

function getAllAltImageNames() {
    var objImages = getImagesSheet().filter(filterScriptImage)
    var arrNames = Object.keys(objImages).map(el => [el])
    var res = { arrNames: arrNames, objImages: objImages }
    return res
}

function getHidenImageNames() {
    var objImages = getImagesSheet().filter(filterScriptImage)
    var arrNames = filteredImageKey(objImages, isImageHiden)
        // var ts= Object.keys(objImages).filter(el=>objImages[el].Height==2)
    var res = { arrNames: arrNames, objImages: objImages }
    console.log(JSON.stringify(res))
    return res
}

function getVisibleImageNames() {
    var objImages = getImagesSheet().filter(filterScriptImage)

    var arrNames = filteredImageKey(objImages, isImageVisible)
        //var arrNames= Object.keys(objImages).filter(el=>objImages[el].Height!=2)
    var res = { arrNames: arrNames, objImages: objImages }
    console.log(JSON.stringify(res))
    return res

}



function getImagesByArrNames({ arrNames, objImages }) {
    console.log(arrNames)
    var res = arrNames.map(el => { return objImages[el] })
    return res
}

//const test2 = () => console.log(getImagesByArrNames(getVisibleImageNames()))
    /*
    Как равномерно уменьшить маштаб подобластей в заданной области
    Дано:
    Некая квадратная область с равными сторонами размера N на N точек. Назовем ее холст.
    Холст разделн на несколько прямоугольников (назовем их слоты). Слотов может быть от 2 до 8 (зависит от текущей конфигурации).
    Известны исходные размеры слотов и кордината левого верхнего угла каждого слота относительно левого верхнего угла холста.
    Изначально слоты своей площадью полностью закрывают площадь холста и не выходят за границы холста.
    Вопрос как можно реализовать пропорциональное уменьшение всех слотов на некий коэффициент X.
    При уменьшении каждый слот должен по возможности сохранить свои пропорции (отношение ширины к высоте, либо возможно изменение пропорций,
    но так чтобы, слоты изначально имевшие равные размеры относительно друг друга, 
    после уменьшения так же имели равные размеры, относительно друг друга),
    и изменить свое положение внутри холста, так чтобы, 
    расстояния между соседними слотами и расстояние между слотом и краем холста совпадало.
    После уменьшения каждый слот должен иметь с каждой своей стороны те же соседние слоты, что и до уменьшения.

    для примера исходная конфигурация из 8ми слотов
    postimg.org/image/5cz56qncr/
    результат после уменьшения
    postimg.org/image/63rvcipq3

    Слот это прямоугольник. Найти центр прямоугольника и уменьшать его относительно этого центра. То есть центры прямоугольников сохраняются при перемещении, если прямоугольник уменьшился в два раза то его левый угол переместился вниз и вправо на четверть размера по той оси по которой уменьшился.
    X Y начальное положение левого верхнего угла прямоугольника.
    W H — ширина и высота.
    K — коэффициент маштабирования (Wnew = W*X для уменьшения в два раза K = 0.5)
    Xnew = X + W*(1-K)/2
    Ynew = Y + H*(1-K)/2

    Это будет скорее частный случай, но попробуй подумать в этом направлении:
    Пусть:
    N — сторона квадрата
    r — количество слотов по горизонтали ( = количеству слотов по вертикали*)
    k — коэф. сжатия
    D = 2 + ( r — 1 )
    s = ( N — N / k ) / D

    Тогда s — та величина, на которые нужно сместить левый верхний угол первого слота (левого верхнего) вправо и вниз и т.д. То есть каждый «правый» слот отступать на s вправо, а каждый «нижний» — вниз.

    * — это и есть то ограничение, что количество слотов одинаково на любой линии, пересекающей квадрат. Я думаю можно от этого уйти усложнив систему.

    */