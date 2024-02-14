import { onMount } from "solid-js"
import { Fabric } from "./fabric-v2"

export default function App() {
  let appStageElement: HTMLDivElement | undefined
  let fabric: Fabric
  
  onMount(() => {
    if (appStageElement) {
      fabric = new Fabric(appStageElement)
      fabric.addItem({
        name: '测试'
      })

    }
  })

  const addItem = (options?: any) => {
  }

  return (
    <>
      <button onClick={() => addItem({})}>添加节点</button>
      {/* {JSON.stringify(fabric.items)} */}
      <div ref={appStageElement}></div>
    </>
  )
}