import { render } from 'solid-js/web'
import { Graph, Shape, Node, Point } from '@antv/x6'
import {
  DEFAULT_LOOM_FABRIC_CONTAINER_CLASSNAME,
  LOOM_FABRIC_CLASSNAME,
  FABRIC_ITEM_DEFAULT_WIDTH,
  FABRIC_ITEM_DEFAULT_HEIGHT,
  FABRIC_ITEM_DEFAULT_SHAPE
} from "./constant"
import { isString } from "./utils"
import { useBaseItemComponent } from './hook'

import './style.css'

export const enum FabricItemType {
  Component = 'component',
  Action = 'action'
}

export interface IFabricOptions {
  container?: HTMLElement | string
}

export interface IAddFabricItemOptions {
  id: string
  type: FabricItemType
  x?: number
  y?: number
  name: string
  width?: number
  height?: number
  zIndex?: number
  data?: Object
  onMounted?: () => void
}

Shape.HTML.register({
  shape: FABRIC_ITEM_DEFAULT_SHAPE,
    width: FABRIC_ITEM_DEFAULT_WIDTH,
    height: FABRIC_ITEM_DEFAULT_HEIGHT,
    effect: ['data'],
    attrs: {
      body: {
        fill: 'none',
        stroke: 'none',
        refWidth: '100%',
        refHeight: '100%',
      },
    },
    html(cell) {
      const div = document.createElement('div')
      div.classList.add('fabric-item-view')
      render(
        () => useBaseItemComponent({ name: cell.data?.name, onMounted: cell.data?.onMounted }),
        div
      )
      // cell.data?.onMounted()

      return div
    }
})


export class Fabric {
  private container: HTMLElement | null = null
  private rootElement: HTMLDivElement | null = null
  private graphInstance: Graph
  private rootNode: Node | null = null

  public static registerNode() {

  }

  constructor(options?: IFabricOptions) {
    const {
      container
    } = options as IFabricOptions
    this.container = container as HTMLElement
    if (isString(container)) {
      this.container = document.querySelector(container as string) as HTMLElement
    }

    if (!this.container) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
      
    }

    this.container.classList.add(DEFAULT_LOOM_FABRIC_CONTAINER_CLASSNAME)

    this.rootElement = document.createElement('div')
    this.rootElement.classList.add(LOOM_FABRIC_CLASSNAME)
    this.container.appendChild(this.rootElement)

    this.graphInstance = new Graph({
      container: this.rootElement,
      autoResize: true,
    })

    // this.graphInstance.on('view:mounted', () => {
    //   this.graphInstance.centerContent()
    // })

    // 获取画布的宽度和高度
    // const content = this.graphInstance.getContentBBox();
    // debugger


    // 计算居中坐标
    // const centerX = width / 2;
    // const centerY = height / 2;

    // this.graphInstance.fromJSON({
    //   nodes: [{
    //     id: 'root',
    //     shape: 'rect', // FABRIC_ITEM_DEFAULT_SHAPE,
    //     x: 40,
    //     y: 40,
    //     width: 150,
    //     height: 48,
    //     data: {
    //       type: FabricItemType.Component
    //     },
    //   }]
    // })
    


    this.rootNode = this.addItem({
      id: 'root',
      type: FabricItemType.Component
    })

    this.graphInstance.centerContent()

    // setTimeout(() => {
    // }, 100)
    // this.graphInstance.zoomToFit({ maxScale: 0.8 })
  }

  addItem(options: IAddFabricItemOptions) {
    const {
      id,
      x,
      y,
      type,
      width,
      height,
      zIndex,
      name,
      onMounted
    } = options

    const rootNodePosition = this.rootNode?.position?.() as Point
    const point = [x, y]
    if (id !== 'root') {
      point[0] = rootNodePosition?.x + 16
      point[1] = rootNodePosition?.y + FABRIC_ITEM_DEFAULT_HEIGHT + 8
      if(isNaN(point[0])) {
        point[0] = 0
      }

      if(isNaN(point[1])) {
        point[1] = 0
      }
    }

    const item = this.graphInstance.addNode({
      id,
      x: point[0],
      y: point[1],
      width,
      height,
      shape: FABRIC_ITEM_DEFAULT_SHAPE,
      zIndex,
      data: {
        type: type || FabricItemType.Component,
        name,
        onMounted
      },
    })

    return item
  }
}