
const blobToBase64URL=(blob)=>'data:' +blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes())