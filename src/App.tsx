import { createSignal, onMount } from 'solid-js'
import { init, addItem, fabricData } from './fabric'
import './App.css'

function positionInCanvas(e: { clientX: number; clientY: number; }, canvasLeft: number, canvasTop: number) {
  console.log('clientX：',e.clientX);
  console.log('clientY：',e.clientY);
  console.log('canvasLeft：', canvasLeft);
  console.log('canvasTop：', canvasTop);
    return {
        x: e.clientX - canvasLeft,
        y: e.clientY - canvasTop
    }
}

function resizeCanvas(canvasDOM: HTMLCanvasElement) {
  if (!canvasDOM) {
    return
  }
  const { width, height, left, top } = canvasDOM?.getBoundingClientRect?.();
  const dpr = window.devicePixelRatio;
  const ctx = canvasDOM?.getContext?.("2d") as CanvasRenderingContext2D;
  canvasDOM.width = width * dpr;
  canvasDOM.height = height * dpr;
  ctx.fillStyle = '#FF0000';
  ctx.strokeStyle = "green"
  ctx.scale(dpr, dpr);
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(50+200,50);
ctx.lineTo(50+200,50+80);
ctx.lineTo(50,50+80);
ctx.fill()
ctx.closePath();
ctx.stroke();
  
  canvasDOM.onmousedown = function (e) {
    // 获取点击的坐标
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // 判断点击是否在矩形内
    if (
      mouseX >= 50 &&
      mouseX <= 150 &&
      mouseY >= 50 &&
      mouseY <= 150
    ) {
      const mouseStart = new Map<'x'|'y', number | null>([
        ['x', null],
        ['y', null]
      ])//记录鼠标点下位置
      const position = positionInCanvas(e, left, top)
    } else {
      alert('点击在矩形外！');
    }
  }
  // const { width, height, left, top } = canvasDOM?.getBoundingClientRect?.();
  // canvasDOM.width = width;
  // canvasDOM.height = height;
  // const mouseStart = new Map<'x'|'y', number | null>([
  //   ['x', null],
  //   ['y', null]
  // ])//记录鼠标点下位置
  // canvasDOM.onmousemove = function (e) {
  //   // positionInCanvas(e, left, top)
  //   if (mouseStart.get('x') !== null && mouseStart.get('y') !== null) {
  //     ctx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
  //     ctx.strokeRect(
  //       mouseStart.get('x') as number,
  //       mouseStart.get('y') as number,
  //       100,
  //       80
  //     );
  //   }
  // }

  // canvasDOM.onmouseup = function (e) {
    
  // }

  // canvasDOM.onmousedown = function (e) {
  //   const position = positionInCanvas(e, left, top)
  //   console.log(ctx.isPointInStroke(50, 100))
  //   debugger
  //   if (ctx.isPointInStroke(50, 100)) {
  //     mouseStart.set('x', position.x)
  //     mouseStart.set('y', position.y)
  //     return;
  //   }
  // }
  // if (ctx) {
  //   // 重置画布后需要重新设置画布参数
  //   ctx.font = "20px Arial";
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";

  //   ctx.strokeStyle = getComputedStyle(canvasDOM).borderColor;
  //   ctx.rect(10, 10, 100, 100);
  //   ctx.stroke();
  //   console.log(ctx.isPointInStroke(50, 100))

    // ctx.moveTo(0, 80);
    // // ctx.quadraticCurveTo(
    // //   0,
    // //   0,
    // //   0,
    // //   80
    // // );
    // ctx.lineTo(140, 260);
    // ctx.strokeStyle = "#fcc";
    // ctx.stroke();

    // ctx.moveTo(20, 80);
    // // ctx.quadraticCurveTo(
    // //   0,
    // //   0,
    // //   0,
    // //   80
    // // );
    // ctx.lineTo(140, 260);
    // ctx.strokeStyle = "#fcc";
    // ctx.stroke();

    // ctx.strokeRect(
    //   140,
    //   260,
    //   100,
    //   80
    // );
  // }
}

function App() {
  let canvasRef: HTMLCanvasElement | ((el: HTMLCanvasElement) => void) | undefined
  
  onMount(() => {
    init({}, canvasRef as HTMLCanvasElement)
  })
  return (
    <>
      <button onClick={() => addItem({})}>这是按钮</button>
      {JSON.stringify(fabricData(), null, 2)}
      <canvas ref={canvasRef} />
    </>
  )
}

export default App
