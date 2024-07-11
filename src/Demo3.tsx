import { onMount, createSignal } from "solid-js"
import { Fabric, FabricItemType } from "./fabric-v3"

export default function App() {
  let appStageElement: HTMLDivElement | undefined
  const [fabricSignal, useFabricSignal ] = createSignal<Fabric | null>(null) 
  onMount(() => {
    if (appStageElement) {
      
      const fabric = new Fabric({
        container: appStageElement
      })
      useFabricSignal(fabric)
    }
  })

  const addItem = () => {
    
    // ?.().addItem({
    //   name: '测试'
    // })
    fabricSignal()?.addItem({
      type: FabricItemType.Component
    })
  }

  return (
    <>
      <button onClick={() => addItem()}>添加节点</button>
      {/* {JSON.stringify(fabric.items)} */}
      <div ref={appStageElement}></div>
    </>
  )
}