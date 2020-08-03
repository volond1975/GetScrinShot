function onSelectionChange(e) {
 let cache = CacheService.getDocumentCache();
  let range = e.range;
  var obj=getImagesSheet()
  var t= Object.keys(obj).filter(el=>obj[el].AnchorCellA1Notation===range.getA1Notation())
  console.log('cache.get oldRow'+' '+t[0])
  if (t.length>0){
  console.log('cache.get oldRow'+' '+t[0])
   let oldRow = cache.get("oldImage");
   console.log('cache.get oldRow'+' '+oldRow)
  if(oldRow){
  hide(obj[oldRow].image)
    console.log('hide '+oldRow)
  //obj[oldRow].image.setHeight(2)
 // obj[oldRow].image.setWidth(2)
  }
   cache.put("oldImage", t[0]);
   console.log('view'+t)
   var [h,w,x,y]=range.getValue().split("|")
  obj[t[0]].image.setHeight(h)
  obj[t[0]].image.setWidth(w)
   console.log('view  x'+ obj[t[0]].image.getAnchorCellXOffset())
  obj[t[0]].image.setAnchorCellXOffset(x)
  obj[t[0]].image.setAnchorCellYOffset(y)
    console.log('view   next x'+ obj[t[0]].image.getAnchorCellXOffset())
  
  }else{
  let oldRow = cache.get("oldImage");
  if(oldRow){
   hide(obj[oldRow].image)
    console.log('hide '+oldRow)
  //obj[oldRow].image.setHeight(2)
  //obj[oldRow].image.setWidth(2)
  }
  }
  /*
  let oldRow = cache.get("oldRow");
  if ( oldRow > 0 ) {
    e.source.getRange(oldRow+":"+oldRow).setBackground("#fff");
  }
  
  if ( range.getNumRows() === 1 ) {
    let row = range.getRow();
    
    e.source.getRange(row+":"+row).setBackground("#f3f3f3");
    
    cache.put("oldRow", row);
  } 
  */
}
