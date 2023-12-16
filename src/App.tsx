import { createSignal, onMount } from 'solid-js'
import './App.css'

function App() {
  let canvasRef: HTMLCanvasElement | ((el: HTMLCanvasElement) => void) | undefined
  onMount(() => {
    const ctx = (canvasRef as HTMLCanvasElement)?.getContext?.("2d") as CanvasRenderingContext2D;
    debugger
  })
  return (
    <>
      <canvas ref={canvasRef} />
    </>
  )
}

export default App
