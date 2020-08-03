const toObject = (array) => { const keys = array.shift(); return array.map(values => { return keys.reduce((o, k, i) => { o[k] = values[i]; return o }, {}) }) };
const toArray = (arrObj)=>{const keys=Object.keys(arrObj[0]);return arrObj.map(el=>{ return keys.reduce((o, k, i) => { o.push(el[k]) ; return o }, []) })};
const keysToArr=o=>Object.keys(o+''===o||o||0).flatMap(k=>[k,...keysToArr(o[k]).map(i=>k+'|'+i)])
const maxCountArr=(arr)=>Math.max(...arr.map(el=>el.length))
const normaliseArr=(arr)=>{ const m=maxCountArr(arr);return arr.map(el=>el.length=m)}
const normaliseArr2=(arr)=>{ const m=Math.max(...arr.map(el=>el.length));return arr.map(el=>el.length=m)}
//======================================================
const log = (text)=>console.log(text);
const json=(range)=>JSON.stringify(range)
const logJson=(msg,obj,key)=>{
 let jsonObj=(!key)?json(obj):json(obj[key]);
 log(`${msg}-${jsonObj}`)  
}
//=======================================================
function getNameRangeActiveSpreadsheet({name}) {
  
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name)
  
}
function getIdFromUrl(url) {return url.match(/[-\w]{25,}/); }
const toast=(text,title="Внимание",timeOut=3) => SpreadsheetApp.getActiveSpreadsheet().toast(text,title,timeOut)
/*
isNumeric function in Javascript
*/
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

