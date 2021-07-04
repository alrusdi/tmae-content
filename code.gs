function onOpen() {
  addMenuItem()
}

function addMenuItem() {
  SpreadsheetApp
   .getUi()
   .createMenu("Preview")
   .addItem("Card preview", "showCardPreviewSidebar")
   .addToUi();
}

function showCardPreviewSidebar() {
  var widget = HtmlService.createHtmlOutputFromFile('card');
  SpreadsheetApp.getUi().showSidebar(widget);
}

function getCurrentCardData() {
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var selection = activeSheet.getSelection();
  var rowIndex = selection.getCurrentCell().getRowIndex();
  var row = activeSheet.getRange(rowIndex, 1, 1, 20).getValues()[0];

  var data = {
    "number": parseValue(row, 0),
    "title": parseValue(row, 1),
    "type": parseValue(row, 2).toLowerCase(),
    "cost": parseValue(row, 3),
    "tags": getNotEmptyValues(row, 6, 8),
    "vp": parseValue(row, 9),
    "requirement": parseValue(row, 10),
    "instants": getNotEmptyValues(row, 11, 14),
    "effects": getNotEmptyValues(row, 15, 16),
    "actions": getNotEmptyValues(row, 17, 17)
  }
  return data;
}

function parseValue(row, idx) {
  var value = row[idx];
  if ( ! value && value !== 0) return "";
  return value.toString();
}

function getNotEmptyValues(row, startCol, endCol) {
  var values = [];
  var text = "";
  for (var i=startCol; i<=endCol; i++) {
    text = parseValue(row, i);
    if (text) {
      values.push(text);
    }
  }
  return values;
}
