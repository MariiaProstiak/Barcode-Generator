var qrcode = undefined;
let result = document.querySelector('.code_result');
let buttonsBlock = document.querySelector('.buttons');
const textareaQR = document.getElementById('inputQRText');
const textareaBar = document.getElementById('inputBarText');
const typeCode = document.getElementById('typeCode');

textareaQR.addEventListener('focus', (e) => {
   if(result.classList.contains("active"))
   fly()
 }
);
textareaBar.addEventListener('focus', (e) => {
   if(result.classList.contains("active"))
   fly()
 }
);
typeCode.addEventListener('focus', (e) => {
   if(result.classList.contains("active"))
   fly()
 }
);

function fly() {
   result.classList.add("fly")
   setTimeout(() => result.remove(), 300);
   setTimeout(() => {
      addBlockResult();
      result = document.querySelector('.code_result');
      buttonsBlock = document.querySelector('.buttons');
      qrcode = undefined
   }, 350);
   
}
function addBlockResult() {
   const infoBlock = document.querySelector('.main');
   infoBlock.insertAdjacentHTML("beforeend",
      `      <div class="code_result">
            <div id="qrcode" class="qrcode"></div>
            <div class="buttons">
               <button type="button" class="fill" onclick="qrPNG()">Download<br>PNG</button>
               <button type="button" class="fill" onclick="qrSVG()">Download<br>SVG</button>
            </div>

         </div>
      `);   
}

function generateQRCode() { 
   let textareaQR = document.getElementById('inputQRText').value;
   if (!textareaQR) {
      alert("Please enter the text to code");
   } else {
      if (qrcode === undefined) {
         qrcode = new QRCode(document.getElementById('qrcode'), textareaQR);
      } else {
         qrcode.clear();
         qrcode.makeCode(textareaQR);
      }
      addClass(result, 'active');
      document.getElementById('inputQRText').value = "";
      setTimeout(() => {
         addClass(buttonsBlock, 'visible');
      }, 1000);

   }
}
const addClass = (el ,className) => {
   if (el.classList.contains(className)) {
         el.classList.remove(className);
      }
      el.classList.add(className);
}

function prepareImage() {
   const qrDiv = document.getElementById('qrcode');
   const qrImg = qrDiv.querySelector('img');
   const qrImgPath = qrImg.getAttribute('src');
   return qrImgPath;
}

function qrPNG() {
   const qrImgPath = prepareImage();
   let fileName = "QR.png";//getFileName(qrImgPath)

   download(qrImgPath, fileName, 'png')
}

function qrSVG(){
   const qrImgPath = prepareImage();
   
   const qrImgSvgPath = qrImgPath.replace("png", "svg+xml");
   let fileName = "QR.svg";//getFileName(qrImgPath)

   download(qrImgSvgPath, fileName, 'svg')
}



function download(qrImgPath, fileName, ext) {
   var a = document.createElement("a"); //Create <a>
   a.href = qrImgPath; //Image Base64 Goes here
   a.download = fileName || 'Code.'+ ext; //File name Here
   a.click(); //Downloaded file
}

function getFileName(str){
   return str.susting(str.lastIndex('/') + 1);
}

function openTab(evt, tabName) {
   if(result.classList.contains("active")){
   fly()
 }
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function generateBarCode() {
   const qrcodeBlock = document.querySelector('.qrcode');
   let barBlock = document.createElement('img');
   barBlock.setAttribute("id", "barcode");
   qrcodeBlock.prepend(barBlock);


   let textareaBar = document.getElementById('inputBarText').value;
   let formatInput = document.getElementById('typeCode').value || "codebar";
   let lineColor = document.getElementById('lineColor').value || "#000000";
   let backgroundColor = document.getElementById('backgroundColor').value || "#ffffff";
   let textIncluded = document.getElementById('textIncluded').checked;
   if (!textareaBar) {
      alert("Please enter the text to code");
   }
   else {
      let [valid, errorMessage] = veryfyCodeText(textareaBar, formatInput);
      if (valid) {
         try {
            JsBarcode("#barcode", textareaBar, {
               width: 2,
               height: 100,
               format: formatInput,
               lineColor: lineColor,
               background: backgroundColor,
               displayValue: textIncluded,
               textAlign: "center"
            });
            addClass(result, 'active');
            document.getElementById('inputBarText').value = "";
            setTimeout(() => {
               addClass(buttonsBlock, 'visible');
            }, 1000);
         }
         catch (e) {
            alert(e);
         }
         
         
      }
      else {
         alert(formatInput + ": " + errorMessage);
      }
   }
}

function veryfyCodeText(str, format) {
   switch (format) {
      case "EAN13": {
         let pattern1 = /^(\d{12})?$/;
         let pattern2 = /^(\d{13})?$/;
         return [pattern1.test(str) || pattern2.test(str), "Please enter 13 digits (12+ 1 control)"];
      }
      case "UPC": {
         let pattern1 = /^(\d{12})?$/;
         let pattern2 = /^(\d{11})?$/;
         return [pattern1.test(str) || pattern2.test(str) , "Please enter 12 digits (11+ 1 control)"];}
      case "EAN8": {
         let pattern1 = /^(\d{7})?$/;
         let pattern2 = /^(\d{8})?$/;
         return [pattern1.test(str) || pattern2.test(str), "Please enter 8 digits (7+ 1 control)"];
      }
      case "EAN5": {
         let pattern = /^(\d{5})?$/;
         return [pattern.test(str), "Please enter 5 digits (4+ 1 control)"];
      }
      case "EAN2": {
         let pattern = /^(\d{2})?$/;
         return [pattern.test(str), "Please enter 2 digits (1+ 1 control)"];
      }
      case "ITF14": {
         let pattern1 = /^(\d{13})?$/;
         let pattern2 = /^(\d{14})?$/;
         return [pattern1.test(str) || pattern2.test(str), "Please enter 13 or 14 digits"];
      }
      case "MSI": {
         let pattern = /^\d+?$/;
         return [pattern.test(str), "Please enter only digits"];
      }
      case "pharmacode": {
         let pattern = /^(\d{4})?$/;
         return [pattern.test(str), "Please enter 4 digits"];}
      case "codabar": {
         let pattern1 = /^(\d{10})?$/;
         let pattern2 = /^[A-D][0-9\+$:\-/.]*[A-D]$/;
         return [pattern1.test(str) || pattern2.test(str), "Please enter only 10 digits or You can set start and stop characters to A, B, C or D"];
      }
      default:
         return [true, ""];
   }
}