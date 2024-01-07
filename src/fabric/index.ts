import { createSignal } from 'solid-js'
import Item, { IItemProps, ItemType } from './Item'
import { defaultItemWidth, defaultItemHeight, itemGap } from './constant'
import { setFabricContext, setFabricData, setActiveFabricDataItem, activeFabricDataItem, fabricData, fabricContext, IAddItemOptions, IFabricDataItem } from './store'

function getDragItem(event: MouseEvent) {
  
  const offsetX = event.offsetX
  const offsetY = event.offsetY
  fabricData().forEach((item) => {
    const x = item.x
    const y = item.y

    if (x <= offsetX && (x + defaultItemWidth) >= x && y <= offsetY && (y + defaultItemHeight) >= offsetY) {
      setActiveFabricDataItem(item)
    }
  })
}

export function initBase(options: any, element: HTMLCanvasElement) {
  if (!element) {
    return
  }
  setFabricData([])
  const { width, height } = element?.getBoundingClientRect?.();
  const dpr = window.devicePixelRatio;
  
  element.width = width * dpr;
  element.height = height * dpr;
  element.style.backgroundColor = 'rgb(21, 20, 20)'

  const ctx = element?.getContext?.("2d") as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, element.width, element.height)
  setFabricContext(ctx)

  const x = Math.floor(width / 2 - defaultItemWidth / 2)
  const y = Math.floor(height / 2 - defaultItemHeight / 2)

  addItem({
    x,
    y,
    type: ItemType.COMPONENT,
    text: 'Page',
    withSlot: 1,
    parentId: -1,
    level: 0
  })
}

export function addItem(options: Partial<IAddItemOptions>) {
  const { parentId, x, y, level, withSlot, type, text } = options
  let targetX = x || 0
  let targetY = y || 0

  const data = fabricData()
  const rootNode = data[0] as Item

  if (data.length) {
    targetX = Math.floor(rootNode.x + 19)
    targetY = Math.floor(data[data.length - 1].y + defaultItemHeight + itemGap)
  }

  const targetParentId = rootNode ? 0 : (parentId || -1)

  const itemInstance = new Item({
    x: targetX,
    y: targetY,
    type: type || ItemType.COMPONENT,
    text,
    level: level === undefined ? rootNode?.props?.level : level,
    parentId: targetParentId
  })

  setFabricData(data.concat(itemInstance))
  itemInstance.render()
  
}

export function init(options: any, element: HTMLCanvasElement) {
  initBase(options, element)
  window.addEventListener("resize", () => initBase(options, element));
  element.addEventListener('mousemove', (event) => {
    activeFabricDataItem()?.clear()
    activeFabricDataItem()?.render({
      x: event.x - defaultItemWidth  / 2,
      y: event.y - defaultItemHeight
    })
  })

  element.addEventListener('mousedown', (event) => {
    getDragItem(event)
  })

  element.addEventListener('mouseup', (event) => {
    setActiveFabricDataItem(null)
    
  })
}
