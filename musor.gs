function convImageUrl(url){
  var url=url || "http://jimesteban.com/images/mimincoopers.png";
  var blob=UrlFetchApp.fetch(url).getBlob();
  var b64Url='data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());
  return b64Url;
}