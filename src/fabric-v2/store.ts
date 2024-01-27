import { Application, ICanvas, ColorSource } from 'pixi.js'
import { createSignal } from 'solid-js'
import { IFabricItem } from './index'

export type Fabric = Application<ICanvas> | null
export type FabricItemId = [number, number]


export type FabricDataSource = IFabricItem[]

const [fabric, setFabric] = createSignal<Fabric>(null)

const [fabricDataSource, setFabricDataSource] = createSignal<FabricDataSource>([])

export function useFabric(app: Fabric) {
  setFabric(app)
}

export function findFabricDataItemIndex(options: IFabricItem) {
  const itemIndex = fabricDataSource().findIndex((item) => {
    const [_x, _y] = item.id
    const [x, y] = options.id
    return x === _x && y === _y
  })

  return itemIndex
}

export function hasFabricDataItem(options: IFabricItem) {
  return findFabricDataItemIndex(options) !== -1
}

export function addFabricDataItem(options: IFabricItem) {
  if (hasFabricDataItem(options)) {
    return
  }
  setFabricDataSource(fabricDataSource().concat(options))
}

export function removeFabricDataItemIndex(options: IFabricItem) {
  const index = findFabricDataItemIndex(options)
  if (index !== -1) {
    const sourceData = fabricDataSource()
    sourceData.splice(index + 1)
    setFabricDataSource(sourceData)
  }
}

export function getfabricData() {
  return fabricDataSource()
}

export {
  fabric
}
