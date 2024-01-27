import { onMount } from "solid-js"
import { createFabric } from "./fabric-v2"
import { createItem } from "./fabric-v2/item"
import { getfabricData } from "./fabric-v2/store"

export default function App() {
  let appStageElement: HTMLDivElement | undefined
  
  onMount(() => {
    if (appStageElement) {
      createFabric(appStageElement, {})
    }
  })

  const addItem = (options?: any) => {
    createItem({
      x: 50,
      y: 50
    })
  }

  return (
    <>
      <button onClick={() => addItem({})}>添加节点</button>
      {JSON.stringify(getfabricData())}
      <div ref={appStageElement}></div>
    </>
  )
}