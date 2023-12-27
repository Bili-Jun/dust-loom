import { createSignal } from 'solid-js'
import Item, { IItemProps, ItemType } from './Item'
import { defaultItemWidth, defaultItemHeight } from './constant'

export enum WithSlot {
  Y = 1,
  N = 0
}

export interface IFabricDataItem {
  x: number
  y: number
  parentId: number
  level: number
  withSlot: WithSlot
}

interface IAddItemOptions extends IFabricDataItem, IItemProps {}

const [fabricContext, setFabricContext] = createSignal<CanvasRenderingContext2D | null>(null)

const [fabricData, setFabricData] = createSignal<IFabricDataItem[]>([])

export {
  fabricData
}

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
}

export function addItem(options: Partial<IAddItemOptions>) {
  const { parentId, x, y, level, withSlot, type, text } = options
  let targetX = x || 0
  let targetY = y || 0

  const data = fabricData()
  const rootNode = data[0] as IFabricDataItem

  if (data.length) {
    targetX = rootNode.x + 19
    targetY = data[data.length - 1].y + defaultItemHeight + 10
  }
  const itemInstance = new Item(fabricContext() as CanvasRenderingContext2D, {
    x: targetX,
    y: targetY,
    type: type || ItemType.COMPONENT,
    text
  })
  itemInstance.render()
  setFabricData(data.concat({
    parentId: rootNode ? 0 : (parentId || -1),
    x: targetX,
    y: targetY,
    level: level || rootNode?.level,
    withSlot:  withSlot || 0
  }))
}

export function init(options: any, element: HTMLCanvasElement) {
  initBase(options, element)
  window.addEventListener("resize", () => initBase(options, element));
  window.addEventListener("load", () => initBase(options, element), { once: true });
  const { width, height } = element?.getBoundingClientRect?.();
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
