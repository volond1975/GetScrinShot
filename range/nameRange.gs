 //==============================================================
  //Код для вставки
  //============================================================
function getNameRangeActiveSpreadsheet({name}) {
  
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(name)
  
}