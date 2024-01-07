import { createSignal } from 'solid-js'
import  Item, { IItemProps  } from './Item'

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

export interface IAddItemOptions extends IFabricDataItem, IItemProps {}

const [fabricContext, setFabricContext] = createSignal<CanvasRenderingContext2D | null>(null)

const [fabricData, setFabricData] = createSignal<Item[]>([])

const [activeFabricDataItem, setActiveFabricDataItem] = createSignal<Item | null>(null)

function getRootItemData() {
  return fabricData()?.find?.((item) => item.props.parentId === -1)
}

export {
  fabricData,
  fabricContext,
  setFabricData,
  setFabricContext,
  getRootItemData,
  activeFabricDataItem,
  setActiveFabricDataItem
}