import { createSignal } from 'solid-js'
import Item, { IItemProps, ItemType } from './Item'
import { defaultItemWidth, defaultItemHeight, itemGap } from './constant'
import { setFabricContext, setFabricData, fabricData, fabricContext, IAddItemOptions, IFabricDataItem } from './store'

export function initBase(options: any, element: HTMLCanvasElement) {
  if (!element) {
    return
  }

  const { width, height } = element?.getBoundingClientRect?.();
  const dpr = window.devicePixelRatio;
  
  element.width = width * dpr;
  element.height = height * dpr;
  element.style.backgroundColor = 'rgb(21, 20, 20)'

  const ctx = element?.getContext?.("2d") as CanvasRenderingContext2D;
  setFabricContext(ctx)

  const x = width / 2 - defaultItemWidth / 2
  const y = height / 2 - defaultItemHeight / 2

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
  const rootNode = data[0] as IFabricDataItem

  if (data.length) {
    targetX = rootNode.x + 19
    targetY = data[data.length - 1].y + defaultItemHeight + itemGap
  }

  const targetParentId = rootNode ? 0 : (parentId || -1)
  setFabricData(data.concat({
    parentId: targetParentId,
    x: targetX,
    y: targetY,
    level: level || rootNode?.level,
    withSlot:  withSlot || 0
  }))

  const itemInstance = new Item(fabricContext() as CanvasRenderingContext2D, {
    x: targetX,
    y: targetY,
    type: type || ItemType.COMPONENT,
    text,
    parentId: targetParentId
  })
  itemInstance.render()
  
}

export function init(options: any, element: HTMLCanvasElement) {
  setFabricData([])
  initBase(options, element)
  window.addEventListener("resize", () => initBase(options, element));
}
