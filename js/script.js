const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const lineBtn = document.querySelector("#line");
const fillBtn = document.querySelector("#fill");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const fillColor = "255,10,10";
const bgdColor = "255,255,255";
const strokeColor = "0,0,0";

let isFirstPoint = true; //Чи перша точка ламаної
let isLineBtnPressed = true; //Чи натиснута кнопка "Малювати ламану"
let isNotFilledPixel = true; //Чи є ще незафарбовані пікселі
let xFirstPixel = 0; //Координати першого зафарбованого пікселя
let yFirstPixel = 0;
let imagesData = []; //Масив даних з Canvas
let canvasData = []; //Масив пікселів

lineBtn.addEventListener("click", hanleLine);
fillBtn.addEventListener("click", handleFill);
canvas.addEventListener("click", handleClick);
window.addEventListener("load", handleLoad);

function handleLoad() {
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
}

function hanleLine() {
  window.location.reload();
  fillBtn.classList.remove("button--active");
  lineBtn.classList.add("button--active");
  isLineBtnPressed = true;
  isFirstPoint = true;
}

function handleFill() {
  fillBtn.classList.add("button--active");
  lineBtn.classList.remove("button--active");
  isLineBtnPressed = false;
}

// Малює лінії
function drawLine(event) {
  if (isFirstPoint) {
    ctx.moveTo(event.layerX, event.layerY);
    isFirstPoint = false;
    return;
  }
  ctx.lineTo(event.layerX, event.layerY);
  ctx.stroke();
}

// Перенесення масиву даних ImagesData  в масив пікселей (щоб зменшити кількість елементів масиву у 4 рази)
function convertImageDataToData() {
  imagesData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  canvasData = [];

  for (let i = 0; i < imagesData.data.length; i += 4) {
    const str = `${imagesData.data[i]},${imagesData.data[i + 1]},${
      imagesData.data[i + 2]
    }`;
    if (str === strokeColor || str === fillColor) {
      canvasData.push(str);
    } else {
      canvasData.push(bgdColor);
    }
  }
}

// Встановлення початкового пікселя
function setStartPixel(event) {
  let pixel = ctx.createImageData(1, 1);
  let fillColorArr = fillColor.split(",").map((el) => Number(el));
  pixel.data[0] = fillColorArr[0];
  pixel.data[1] = fillColorArr[1];
  pixel.data[2] = fillColorArr[2];
  pixel.data[3] = 255;

  xFirstPixel = event.layerX;
  yFirstPixel = event.layerY;

  ctx.putImageData(pixel, xFirstPixel, yFirstPixel);
}

// Заповнення першої вертикальної лінії, використовуючи відомі координати початкового пікселя
function fillFirstVerticalLine() {
  for (let i = yFirstPixel - 1; i > 0; i -= 1) {
    if (canvasData[i * canvasWidth + xFirstPixel] === bgdColor) {
      canvasData[i * canvasWidth + xFirstPixel] = fillColor;
    } else {
      break;
    }
  }
  for (let i = yFirstPixel + 1; i < canvasHeight; i += 1) {
    if (canvasData[i * canvasWidth + xFirstPixel] === bgdColor) {
      canvasData[i * canvasWidth + xFirstPixel] = fillColor;
    } else {
      break;
    }
  }
}

// Заповнення горизонтальними лініями
function fillHorizontalLines() {
  for (let k = 0; k < canvasHeight; k += 1) {
    for (let i = 0; i < canvasWidth; i += 1) {
      if (canvasData[k * canvasWidth + i] === fillColor) {
        for (let j = i - 1; j > 0; j -= 1) {
          let color = canvasData[k * canvasWidth + j];
          if (color === bgdColor) {
            isNotFilledPixel = true;
            canvasData[k * canvasWidth + j] = fillColor;
          } else if (color === fillColor) {
            continue;
          } else {
            break;
          }
        }
        for (let j = i + 1; j < canvasWidth; j += 1) {
          let color = canvasData[k * canvasWidth + j];
          if (color === bgdColor) {
            isNotFilledPixel = true;
            canvasData[k * canvasWidth + j] = fillColor;
          } else if (color === fillColor) {
            continue;
          } else {
            break;
          }
        }
      }
    }
  }
}

// Заповнення вертикальними лініями
function fillVerticalLines() {
  for (let k = 0; k < canvasWidth; k += 1) {
    for (let i = 0; i < canvasHeight; i += 1) {
      if (canvasData[i * canvasWidth + k] === fillColor) {
        for (let j = i - 1; j > 0; j -= 1) {
          let color = canvasData[j * canvasWidth + k];
          if (color === bgdColor) {
            isNotFilledPixel = true;
            canvasData[j * canvasWidth + k] = fillColor;
          } else if (color === fillColor) {
            continue;
          } else {
            break;
          }
        }

        for (let j = i + 1; j < canvasHeight; j += 1) {
          let color = canvasData[j * canvasWidth + k];
          if (color === bgdColor) {
            isNotFilledPixel = true;
            canvasData[j * canvasWidth + k] = fillColor;
          } else if (color === fillColor) {
            continue;
          } else {
            break;
          }
        }
      }
    }
  }
}

// Перенесення масиву пікселей в масив даних ImagesData
function convertDataToImageData() {
  for (let i = 0; i < canvasData.length; i += 1) {
    let index = i * 4;
    let color = canvasData[i].split(",").map((el) => Number(el));
    imagesData.data[index] = color[0];
    imagesData.data[index + 1] = color[1];
    imagesData.data[index + 2] = color[2];
    imagesData.data[index + 3] = 255;
  }
}

function handleClick(event) {
  if (isLineBtnPressed) {
    drawLine(event);
  } else {
    if (isFirstPoint) {
      ctx.fillStyle = `rgb(${fillColor})`;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      return;
    }

    setStartPixel(event);

    convertImageDataToData();

    fillFirstVerticalLine();

    do {
      isNotFilledPixel = false;

      fillHorizontalLines();

      fillVerticalLines();
    } while (isNotFilledPixel);

    convertDataToImageData();

    ctx.putImageData(imagesData, 0, 0);
  }
}
