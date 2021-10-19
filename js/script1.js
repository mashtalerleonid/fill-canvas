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
  ctx.lineWidth = 3;
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

function handleClick(event) {
  if (isLineBtnPressed) {
    if (isFirstPoint) {
      ctx.moveTo(event.layerX, event.layerY);
      isFirstPoint = false;
      return;
    }

    ctx.lineTo(event.layerX, event.layerY);
    ctx.stroke();
  } else {
    let x = event.layerX;
    let y = event.layerY;
    // canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    // let canvas = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    // let data = canvas.data;
    let pixel = ctx.createImageData(1, 1);
    pixel.data[0] = 255;
    pixel.data[1] = 10;
    pixel.data[2] = 10;
    pixel.data[3] = 255;

    ctx.putImageData(pixel, x, y);

    imagesData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    canvasData = [];

    // Перенесення масиву даних Canvas  в масив пікселей
    for (let i = 0; i < imagesData.data.length; i += 4) {
      const str = `${imagesData.data[i]},${imagesData.data[i + 1]},${
        imagesData.data[i + 2]
      }`;
      if (str === strokeColor) {
        canvasData.push(1);
      } else if (str === bgdColor) {
        canvasData.push(0);
      } else if (str === fillColor) {
        canvasData.push(2);
      } else canvasData.push(0);
    }

    fill();
  }
}

// console.log(canvasData);
// function getPixelColor(data, index) {
//   // console.log(
//   //   `${data[index * 4]},${data[index * 4 + 1]},${data[index * 4 + 2]}`
//   // );
//   return `${data[index]},${data[index + 1]},${data[index + 2]}`;
//   // return `${data[index * 4]},${data[index * 4 + 1]},${data[index * 4 + 2]}`;
// }

// Заповнення фігури
function fill() {
  let count = 0;
  while (count < 4) {
    // Заповнення горизонтальними лініями
    for (let k = 0; k < canvasHeight; k += 1) {
      for (let i = 0; i < canvasWidth; i += 1) {
        if (canvasData[k * canvasWidth + i] === 2) {
          for (let j = i - 1; j > 0; j -= 1) {
            if (canvasData[k * canvasWidth + j] === 0) {
              canvasData[k * canvasWidth + j] = 2;
            } else if (canvasData[k * canvasWidth + j] === 2) {
              continue;
            } else {
              break;
            }
          }
          for (let j = i + 1; j < canvasWidth; j += 1) {
            if (canvasData[k * canvasWidth + j] === 0) {
              canvasData[k * canvasWidth + j] = 2;
            } else if (canvasData[k * canvasWidth + j] === 2) {
              continue;
            } else {
              break;
            }
          }
        } else {
        }
      }
    }

    // Заповнення вертикальними лініями
    for (let k = 0; k < canvasWidth; k += 1) {
      for (let i = 0; i < canvasHeight; i += 1) {
        if (canvasData[i * canvasWidth + k] === 2) {
          for (let j = i - 1; j > 0; j -= 1) {
            if (canvasData[j * canvasWidth + k] === 0) {
              canvasData[j * canvasWidth + k] = 2;
            } else if (canvasData[j * canvasWidth + k] === 2) {
              continue;
            } else {
              break;
            }
          }

          for (let j = i + 1; j < canvasHeight; j += 1) {
            if (canvasData[j * canvasWidth + k] === 0) {
              canvasData[j * canvasWidth + k] = 2;
            } else if (canvasData[j * canvasWidth + k] === 2) {
              continue;
            } else {
              break;
            }
          }
        } else {
        }
      }
    }

    // Перенесення масиву пікселей в масив даних Canvas
    for (let i = 0; i < canvasData.length; i += 1) {
      switch (canvasData[i]) {
        case 0:
          imagesData.data[i * 4] = 255;
          imagesData.data[i * 4 + 1] = 255;
          imagesData.data[i * 4 + 2] = 255;
          imagesData.data[i * 4 + 3] = 255;
          break;

        case 1:
          imagesData.data[i * 4] = 0;
          imagesData.data[i * 4 + 1] = 0;
          imagesData.data[i * 4 + 2] = 0;
          imagesData.data[i * 4 + 3] = 255;
          break;

        case 2:
          imagesData.data[i * 4] = 255;
          imagesData.data[i * 4 + 1] = 10;
          imagesData.data[i * 4 + 2] = 10;
          imagesData.data[i * 4 + 3] = 255;
          break;

        default:
          break;
      }
    }
    console.log(imagesData);

    ctx.putImageData(imagesData, 0, 0);
    count += 1;
  }
}
