var R = RAMDA.R;
const ListOfMenu = {
    title: 'c2n.me',
    items: [
        ['name', 'functionName'],
        ["🥑Показать все", "viewAll"],
        ['⚡Скрыть все все', 'hideAll'],
        ['🎉Предпросмотр', 'previewAll'],
        ['🔥Создать Лист Меню', 'getActiveCellImage'],
        ['🔥ActiveCellImage', 'getActiveCellImageNames'],
        ['Открыть с диска', 'inputurl'],
        ['addCheckboxActiveCell', 'addCheckboxActiveCell'],
        ['isIdByValue', 'isIdByValue'],
        ['setKeyFromNoteJson', 'setKeyFromNoteJson'],
        ['altTextTitle', 'tf'],
      //  altTextTitle
        
    ],

}

function onOpen() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    const entries = P.toObject(ListOfMenu.items)
    sheet.addMenu(ListOfMenu.title, entries);
};