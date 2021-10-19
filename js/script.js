const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const lineBtn = document.querySelector("#line");
const fillBtn = document.querySelector("#fill");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const fillColor = "255,10,10";
const bgdColor = "255,255,255";
const strokeColor = "0,0,0";
// console.log(canvasHeight, canvasWidth);

let isFirstPoint = true;
let isLineBtnPressed = true;
let imagesData = [];
let canvasData = [];
let modifyData = [];

lineBtn.addEventListener("click", lineHandle);
fillBtn.addEventListener("click", fillHandle);
canvas.addEventListener("click", handleClick);

window.addEventListener("load", () => {
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  // let canvasss = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  // canvasData = canvasss.data;
  // ctx.putImageData(canvass, 0, 0);

  // canvasData = canvass.data;
  // let x = [];
  // x = canvasss.data;
  // console.log(canvasss.data);
});

function lineHandle() {
  fillBtn.classList.remove("button--active");
  lineBtn.classList.add("button--active");
  isLineBtnPressed = true;
}

function fillHandle() {
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

    canvasData = imagesData.data;

    fill();
  }
}

// console.log(canvasData);
function getPixelColor(data, index) {
  // console.log(
  //   `${data[index * 4]},${data[index * 4 + 1]},${data[index * 4 + 2]}`
  // );
  return `${data[index]},${data[index + 1]},${data[index + 2]}`;
  // return `${data[index * 4]},${data[index * 4 + 1]},${data[index * 4 + 2]}`;
}

function fill() {
  let count = 0;
  while (count < 4) {
    // Заповнення горизонтальними лініями
    for (let k = 0; k < canvasHeight; k += 1) {
      for (let i = 0; i < canvasWidth; i += 1) {
        if (
          getPixelColor(canvasData, k * canvasWidth * 4 + i * 4) === fillColor
        ) {
          for (let j = i - 1; j > 0; j -= 1) {
            const colorIndex = k * canvasWidth * 4 + j * 4;
            const pixelColor = getPixelColor(canvasData, colorIndex);
            if (pixelColor === bgdColor) {
              canvasData[colorIndex] = 255;
              canvasData[colorIndex + 1] = 10;
              canvasData[colorIndex + 2] = 10;
              canvasData[colorIndex + 3] = 255;
            } else if (pixelColor === fillColor) {
              continue;
            } else {
              break;
            }
          }
          for (let j = i + 1; j < canvasWidth; j += 1) {
            const colorIndex = k * canvasWidth * 4 + j * 4;
            const pixelColor = getPixelColor(canvasData, colorIndex);
            if (pixelColor === bgdColor) {
              canvasData[colorIndex] = 255;
              canvasData[colorIndex + 1] = 10;
              canvasData[colorIndex + 2] = 10;
              canvasData[colorIndex + 3] = 255;
            } else if (pixelColor === fillColor) {
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
        if (
          getPixelColor(canvasData, i * canvasWidth * 4 + k * 4) === fillColor
        ) {
          for (let j = i - 1; j > 0; j -= 1) {
            const colorIndex = j * canvasWidth * 4 + k * 4;
            const pixelColor = getPixelColor(canvasData, colorIndex);
            if (pixelColor === bgdColor) {
              canvasData[colorIndex] = 255;
              canvasData[colorIndex + 1] = 10;
              canvasData[colorIndex + 2] = 10;
              canvasData[colorIndex + 3] = 255;
            } else if (pixelColor === fillColor) {
              continue;
            } else {
              break;
            }
          }

          for (let j = i + 1; j < canvasHeight; j += 1) {
            const colorIndex = j * canvasWidth * 4 + k * 4;
            const pixelColor = getPixelColor(canvasData, colorIndex);
            if (pixelColor === bgdColor) {
              canvasData[colorIndex] = 255;
              canvasData[colorIndex + 1] = 10;
              canvasData[colorIndex + 2] = 10;
              canvasData[colorIndex + 3] = 255;
            } else if (pixelColor === fillColor) {
              continue;
            } else {
              break;
            }
          }
        } else {
        }
      }
    }
    ctx.putImageData(imagesData, 0, 0);
    count += 1;
  }

  // let count = 0;
  // // while (count < 5) {
  // // Заповнення горизонтальними лініями
  // for (let k = 0; k < canvasHeight; k += 1) {
  //   for (let i = 0; i < canvasWidth; i += 1) {
  //     if (getPixelColor(canvasData, k * canvasWidth + i) === fillColor) {
  //       for (let j = i - 1; j > 0; j -= 1) {
  //         const pixelColor = getPixelColor(canvasData, k * canvasWidth + j);
  //         if (pixelColor === bgdColor) {
  //           let filledPixel = ctx.createImageData(1, 1);
  //           filledPixel.data[0] = 255;
  //           filledPixel.data[1] = 10;
  //           filledPixel.data[2] = 10;
  //           filledPixel.data[3] = 255;
  //           ctx.putImageData(filledPixel, j, k);
  //         } else if (pixelColor === fillColor) {
  //           continue;
  //         } else {
  //           break;
  //         }
  //       }
  //       for (let j = i + 1; j < canvasWidth; j += 1) {
  //         const pixelColor = getPixelColor(canvasData, k * canvasWidth + j);
  //         if (pixelColor === bgdColor) {
  //           let filledPixel = ctx.createImageData(1, 1);
  //           filledPixel.data[0] = 255;
  //           filledPixel.data[1] = 10;
  //           filledPixel.data[2] = 10;
  //           filledPixel.data[3] = 255;
  //           ctx.putImageData(filledPixel, j, k);
  //         } else if (pixelColor === fillColor) {
  //           continue;
  //         } else {
  //           break;
  //         }
  //       }
  //     } else {
  //     }
  //   }
  // }
  // canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

  // Заповнення вертикальними лініями
  // for (let k = 0; k < canvasWidth; k += 1) {
  //   for (let i = 0; i < canvasHeight; i += 1) {
  //     if (getPixelColor(canvasData, i * canvasWidth + k) === fillColor) {
  //       for (let j = i - 1; j > 0; j -= 1) {
  //         const pixelColor = getPixelColor(canvasData, j * canvasWidth + k);
  //         if (pixelColor === bgdColor) {
  //           let filledPixel = ctx.createImageData(1, 1);
  //           filledPixel.data[0] = 255;
  //           filledPixel.data[1] = 10;
  //           filledPixel.data[2] = 10;
  //           filledPixel.data[3] = 255;
  //           ctx.putImageData(filledPixel, k, j);
  //         } else if (pixelColor === fillColor) {
  //           continue;
  //         } else {
  //           break;
  //         }
  //       }

  //       for (let j = i + 1; j < canvasHeight; j += 1) {
  //         const pixelColor = getPixelColor(canvasData, j * canvasWidth + k);
  //         if (pixelColor === bgdColor) {
  //           let filledPixel = ctx.createImageData(1, 1);
  //           filledPixel.data[0] = 255;
  //           filledPixel.data[1] = 10;
  //           filledPixel.data[2] = 10;
  //           filledPixel.data[3] = 255;
  //           ctx.putImageData(filledPixel, k, j);
  //         } else if (pixelColor === fillColor) {
  //           continue;
  //         } else {
  //           break;
  //         }
  //       }
  //     } else {
  //     }
  //   }
  // }

  // count += 1;
  // }
}
