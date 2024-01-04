import { createSignal } from 'solid-js'
import  { IItemProps } from './Item'

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

const [fabricData, setFabricData] = createSignal<IFabricDataItem[]>([])

function getRootItemData() {
  return fabricData()?.find?.((item) => item.parentId === -1)
}

export {
  fabricData,
  fabricContext,
  setFabricData,
  setFabricContext,
  getRootItemData
}