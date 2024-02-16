import { onMount, createSignal } from "solid-js"
import { Fabric } from "./fabric-v2"

export default function App() {
  let appStageElement: HTMLDivElement | undefined
  const [fabric, setFabric] = createSignal<Fabric>()
  onMount(() => {
    if (appStageElement) {
      setFabric(new Fabric(appStageElement))
      

    }
  })

  const addItem = () => {
    fabric()?.addItem?.({
      name: '测试'
    })
    
    // ?.().addItem({
    //   name: '测试'
    // })
  }

  return (
    <>
      <button onClick={() => addItem()}>添加节点</button>
      {/* {JSON.stringify(fabric.items)} */}
      <div ref={appStageElement}></div>
    </>
  )
}