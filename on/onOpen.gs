const ListOfMenu={
  title:'Меню',
  items:[['name','functionName'],
    ["🥑Показать все","viewAll"],
    ['⚡Скрыть все все','hideAll'],
    ['🎉Предпросмотр','previewAll'],
    ['🔥Создать Лист Меню','getActiveCellImage'],
    ['🔥ActiveCellImage','getActiveCellImageNames'],
   ],
 
}
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  const entries=P.toObject(ListOfMenu.items)
   sheet.addMenu(ListOfMenu.title, entries);
  };
  