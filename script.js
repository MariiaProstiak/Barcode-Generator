var qrcode = undefined;
let result = document.querySelector('.code_result');
let buttonsBlock = document.querySelector('.buttons');
const textarea = document.getElementById('inputText');

textarea.addEventListener('focus', (e) => {
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
   const infoBlock = document.querySelector('.info_block');
   infoBlock.insertAdjacentHTML("afterend",
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
   let textarea = document.getElementById('inputText').value;
   if (!textarea) {
      alert("Please enter the text to code");
   } else {
      if (qrcode === undefined) {
         qrcode = new QRCode(document.getElementById('qrcode'), textarea);
      } else {
         qrcode.clear();
         qrcode.makeCode(textarea);
      }
      addClass(result, 'active');
      document.getElementById('inputText').value = "";
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